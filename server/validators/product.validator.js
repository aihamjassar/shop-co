const { check } = require("express-validator");
const { validatorMiddleware } = require("../middlewares/validator.middleware");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short product title")
    .isLength({ max: 100 })
    .withMessage("Too long product title")
    .trim(),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20 })
    .withMessage("Too short description")
    .isLength({ max: 1000 })
    .withMessage("Too long description")
    .trim(),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be number")
    .isInt({ min: 0 })
    .withMessage("Quantity cannot be negative"),
  check("price")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product price must be number")
    .isFloat({ min: 0 })
    .withMessage("Price cannot be negative")
    .trim(),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("discount")
    .optional()
    .isNumeric()
    .withMessage("Product discount must be number")
    .isFloat({ min: 0 })
    .withMessage("Discount must be greater than or equal to 0")
    .isFloat({ max: 100 })
    .withMessage("Discount must be less than or equal to 100"),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Available colors must be array of string"),
  check("sizes")
    .optional()
    .isArray()
    .withMessage("Available sizes must be array of string"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be array of string"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Ratings quantity must be number")
    .isFloat({ min: 0.5 })
    .withMessage("Rating must be above or equal 0.5")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Ratings average must be number"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];
