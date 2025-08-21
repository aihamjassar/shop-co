const { check } = require("express-validator");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const { validatorMiddleware } = require("../middlewares/validator.middleware");
const { default: slugify } = require("slugify");

exports.updateUserValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Username must be at most 32 characters long"),
  check("email")
    .notEmpty()
    .withMessage("E-mail is required")
    .isEmail()
    .withMessage("Invalid E-mail address")
    .normalizeEmail()
    .trim()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && req.user._id.toString() !== user._id.toString()) {
        throw new ApiError("E-mail already in use", 400);
      }
    }),
  validatorMiddleware,
];
