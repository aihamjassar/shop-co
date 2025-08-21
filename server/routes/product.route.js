const express = require("express");
const router = express.Router();
const { protectRoute, restrictTo } = require("../middlewares/auth.middleware");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../validators/product.validator");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);

router.get("/:id", getProductValidator, getProduct);

router.post(
  "/",
  protectRoute,
  restrictTo("admin"),
  createProductValidator,
  createProduct
);

router.put(
  "/:id",
  protectRoute,
  restrictTo("admin"),
  updateProductValidator,
  updateProduct
);

router.delete(
  "/:id",
  protectRoute,
  restrictTo("admin"),
  deleteProductValidator,
  deleteProduct
);

module.exports = router;
