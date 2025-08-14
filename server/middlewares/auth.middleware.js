const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.access_token) token = req.cookies.access_token;
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) return next(new ApiError("You are not logged in", 401));

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(error);
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    throw new ApiError(
      "The user belonging to this token no longer exists",
      401
    );

  if (currentUser.passwordChangedAt) {
    const changedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (decoded.iat < changedTimestamp)
      return next(
        new ApiError("User recently changed password. Please login again", 401)
      );
  }

  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role))
      return next(
        new ApiError("You do not have permission to perform this action", 403)
      );
    next();
  };
