const { check } = require("express-validator");
const Review = require("../models/reviews.model");
const ApiError = require("../utils/apiError");
const { validatorMiddleware } = require("../middlewares/validator.middleware");

exports.createReviewValidator = [
  check("user")
    .notEmpty()
    .withMessage("User is required")
    .isMongoId()
    .withMessage("Invalid user id")
    .custom((userId, { req }) => {
      if (userId !== req.user._id.toString())
        throw new ApiError("You are not allowed to preform this action", 403);
      return true;
    }),
  check("product")
    .notEmpty()
    .withMessage("Product is required")
    .isMongoId()
    .withMessage("Invalid product id")
    .custom(async (productId, { req }) => {
      const review = await Review.findOne({
        user: req.user._id,
        product: productId,
      });
      if (review) throw new ApiError("You already create a review before", 400);
      return true;
    }),
  check("title").optional(),
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating must be number")
    .isFloat({ min: 0.5 })
    .withMessage("Rating must be above or equal 0.5")
    .isFloat({ max: 5 })
    .withMessage("Rating must be below or equal 5"),
  validatorMiddleware,
];

exports.getReviewValidator = [
  check("id")
    .notEmpty()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Invalid review id"),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .notEmpty()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Invalid review id")
    .custom(async (id, { req }) => {
      const review = await Review.findById(id);
      if (!review) throw new ApiError("Review not found", 404);
      if (review.user.toString() !== req.user._id.toString())
        throw new ApiError("You are not allowed to preform this action", 403);
    }),
  check("title").optional(),
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating must be number")
    .isFloat({ min: 0.5 })
    .withMessage("Rating must be above or equal 0.5")
    .isFloat({ max: 5 })
    .withMessage("Rating must be below or equal 5"),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .notEmpty()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Invalid review id")
    .custom(async (id, { req }) => {
      const review = await Review.findById(id);
      if (!review) throw new ApiError("Review not found", 404);
      if (review.user.toString() !== req.user._id.toString())
        throw new ApiError("You are not allowed to preform this action", 403);
    }),
  validatorMiddleware,
];
