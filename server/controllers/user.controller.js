const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

exports.getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return next(new ApiError("User not found", 404));
  res.status(200).json({ data: user });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return next(new ApiError("User not found", 404));
  user.username = req.body.username;
  user.email = req.body.email;
  await user.save();
  res.status(200).json({ data: user });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) return next(new ApiError("User not found", 404));
  res.status(204).json({});
});
