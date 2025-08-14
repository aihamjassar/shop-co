const jwt = require("jsonwebtoken");

exports.generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // 15 minute
  });

exports.generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN, // 30 days
  });

exports.sendTokensAsCookies = (res, accessToken, refreshToken) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge:
      parseInt(process.env.JWT_COOKIE_EXPIRES_DAYS || "1", 10) *
      24 *
      60 *
      60 *
      1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge:
      parseInt(process.env.REFRESH_TOKEN_COOKIE_DAYS || "30", 10) *
      24 *
      60 *
      60 *
      1000,
  });
};
