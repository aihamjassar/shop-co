const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const redis = require("../utils/redisClient");
const { storeRefreshToken } = require("../utils/storeRefreshToken");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const {
  generateAccessToken,
  generateRefreshToken,
  sendTokensAsCookies,
} = require("../utils/generateTokens");
const { OAuth2Client } = require("google-auth-library");
const { sendEmail, verifyTransport } = require("../utils/sendEmail");
const { resetPasswordTemplate } = require("../utils/emailTemplates");
const axios = require("axios");

function generateAppleClientSecret() {
  const claims = {
    iss: process.env.APPLE_TEAM_ID,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 15777000,
    aud: "https://appleid.apple.com",
    sub: process.env.APPLE_CLIENT_ID,
  };

  return jwt.sign(claims, process.env.APPLE_PRIVATE_KEY.replace(/\\/g, "\n"), {
    algorithm: "ES256",
    keyid: process.env.APPLE_KEY_ID,
  });
}

async function getAppleTokens(code) {
  const clientSecret = generateAppleClientSecret();

  const params = new URLSearchParams();
  params.append("client_id", process.env.APPLE_CLIENT_ID);
  params.append("client_secret", clientSecret);
  params.append("code", code);
  params.append("grant_type", "authorization_code");

  const response = await axios.post(
    "https://appleid.apple.com/auth/token",
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return response.data;
}

function parseAppleIdToken(id_token) {
  return jwt.decode(id_token);
}

exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = await User.create({ username, email, password });

  const accessToken = generateAccessToken(newUser._id);
  const refreshToken = generateRefreshToken(newUser._id);

  await storeRefreshToken(newUser._id, refreshToken);
  sendTokensAsCookies(res, accessToken, refreshToken);

  newUser.password = undefined;
  res.status(201).json({ data: newUser });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password)))
    return next(new ApiError("Incorrect E-mail or password", 401));

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await storeRefreshToken(user._id, refreshToken);
  sendTokensAsCookies(res, accessToken, refreshToken);

  user.password = undefined;
  res.status(200).json({ data: user });
});

exports.loginWithGoogle = asyncHandler(async (req, res, next) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const { access_token } = req.body;

  let data;
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    data = response.data;
  } catch (error) {
    return next(new ApiError("Google auth failed", 500));
  }
  const { name: username, email } = data;

  let user = await User.findOne({ email });
  let isNew = false;

  if (!user) {
    user = await User.create({
      username,
      email,
      password: crypto.randomBytes(16).toString("hex"),
    });
    isNew = true;
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await storeRefreshToken(user._id, refreshToken);
  sendTokensAsCookies(res, accessToken, refreshToken);

  user.password = undefined;
  res.status(isNew ? 201 : 200).json({ data: user });
});

exports.loginWithApple = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  let data;

  try {
    const token = await getAppleTokens(code);
    const appleUser = parseAppleIdToken(token.id_token);

    data = appleUser;
  } catch (error) {
    return next(new ApiError("Apple auth failed", 500));
  }

  const { email } = data;

  let user = await User.findOne({ email });
  let isNew = false;

  if (!user) {
    user = await User.create({
      username: data.name || email.split("@")[0],
      email,
      password: crypto.randomBytes(16).toString("hex"),
    });
    isNew = true;
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await storeRefreshToken(user._id, refreshToken);
  sendTokensAsCookies(res, accessToken, refreshToken);

  user.password = undefined;
  res.status(isNew ? 201 : 200).json({ data: user });
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies["refresh_token"];
  if (!refreshToken)
    return next(new ApiError("Unauthorized: No refresh token provided", 401));

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return next(error);
  }

  const stored = await redis.get(`refresh-token:${payload.id}`);

  if (!stored || stored !== refreshToken)
    return next(new ApiError("Refresh token revoke or not found", 401));

  const newAccessToken = generateAccessToken(payload.id);
  const newRefreshToken = generateRefreshToken(payload.id);

  await storeRefreshToken(payload.id, newRefreshToken);
  sendTokensAsCookies(res, newAccessToken, newRefreshToken);

  const user = await User.findById(payload.id);

  res.status(200).json({ data: user || null });
});

exports.logout = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies["refresh_token"];
  if (!refreshToken)
    return next(new ApiError("Unauthorized: No refresh token provided", 401));

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return next(error);
  }

  await redis.del(`refresh-token:${payload.id}`);

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError("There is no user with that email", 404));

  const restToken = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(restToken).digest("hex");

  user.passwordResetToken = hashed;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${restToken}`;

  try {
    const { subject, text, html } = resetPasswordTemplate({
      user: user.username,
      resetURL,
      expiresInMinutes: 10,
    });
    verifyTransport();
    await sendEmail({
      from: `Shop.co <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject,
      text,
      html,
    });

    res.status(200).json({ message: "Password rest token sent to email" });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ApiError("Email could not be sent. Try again later.", 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const token = req.params.token;
  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashed,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password");

  if (!user) return next(new ApiError("Token is invalid or has expired", 400));

  user.password = req.body.newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await storeRefreshToken(user._id, refreshToken);
  sendTokensAsCookies(res, accessToken, refreshToken);

  user.password = undefined;
  res.status(200).json({ data: user });
});
