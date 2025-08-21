const asyncHandler = require("express-async-handler");
const Review = require("../models/reviews.model");
const ApiError = require("../utils/apiError");

exports.getAllReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({})
    .populate("user", "username")
    .populate("product", "title");
  res.status(200).json({ data: reviews });
});

exports.createReview = asyncHandler(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(201).json({ data: review });
});

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate(
    "user",
    "username"
  );
  if (!review) return next(new ApiError("Review not found", 404));
  res.status(200).json({ data: review });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { runValidators: true, new: true }
  ).populate("user", "username");
  res.status(200).json({ data: updatedReview });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(204).json({ data: null });
});
