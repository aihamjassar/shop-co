const { check } = require("express-validator");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const { validatorMiddleware } = require("../middlewares/validator.middleware");

exports.registerValidator = [
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
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new ApiError("E-mail already in use", 400);
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .isLength({ max: 32 })
    .withMessage("Password must be at most 32 characters long")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be at least 6 characters, include upper, lower, and number"
    ),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("E-mail is required")
    .isEmail()
    .withMessage("Invalid E-mail address")
    .normalizeEmail()
    .trim(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorMiddleware,
];

exports.forgotPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("E-mail is required")
    .isEmail()
    .withMessage("Invalid E-mail"),
  validatorMiddleware,
];

exports.resetPasswordValidator = [
  check("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be at least 6 characters, include upper, lower, and number"
    ),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirm is required")
    .custom((confirmPassword, { req }) => {
      if (req.body.newPassword !== confirmPassword)
        throw new ApiError("Passwords do not match", 400);
      return true;
    }),
  validatorMiddleware,
];
