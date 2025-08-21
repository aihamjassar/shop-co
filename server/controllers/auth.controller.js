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
const { sendEmail, verifyTransport } = require("../utils/sendEmail");
const { resetPasswordTemplate } = require("../utils/emailTemplates");

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

exports.forgetPassword = asyncHandler(async (req, res, next) => {
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

    res
      .status(200)
      .json({ message: "Password rest token sent to email", resetURL });
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
