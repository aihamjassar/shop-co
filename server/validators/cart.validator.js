const { check } = require("express-validator");
const { validatorMiddleware } = require("../middlewares/validator.middleware");
const ApiError = require("../utils/apiError");
const Product = require("../models/product.model");

exports.addToCartValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product cart is required")
    .isMongoId()
    .withMessage("Invalid product id")
    .custom(async (productId) => {
      const product = await Product.findById(productId);
      if (!product) throw new ApiError("Product not found");
    }),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than or equal 1"),
  check("color").notEmpty().withMessage("Color is required"),
  check("size").notEmpty().withMessage("Size is required"),
  validatorMiddleware,
];

exports.updateQuantityValidator = [
  check("itemId").isMongoId().withMessage("Invalid product id"),
  check("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than or equal 0"),
  validatorMiddleware,
];

exports.deleteItemFromCartValidator = [
  check("itemId").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];
