const jwt = require("jsonwebtoken");

exports.generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m", // 15 minute
  });

exports.generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d", // 30 days
  });

exports.sendTokensAsCookies = (res, accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge:
      parseInt(process.env.JWT_COOKIE_EXPIRES_DAYS || "1", 10) *
      24 *
      60 *
      60 *
      1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge:
      parseInt(process.env.REFRESH_TOKEN_COOKIE_DAYS || "30", 10) *
      24 *
      60 *
      60 *
      1000,
  });
};
