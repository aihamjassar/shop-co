const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middlewares/auth.middleware");

const {
  addToCartValidator,
  updateQuantityValidator,
  deleteItemFromCartValidator,
} = require("../validators/cart.validator");

const {
  getCart,
  addToCart,
  updateQuantity,
  deleteItemFromCart,
  clearCart,
} = require("../controllers/cart.controller");

router.get("/", protectRoute, getCart);

router.post("/", protectRoute, addToCartValidator, addToCart);

router.patch("/", protectRoute, updateQuantityValidator, updateQuantity);

router.delete(
  "/:itemId",
  protectRoute,
  deleteItemFromCartValidator,
  deleteItemFromCart
);

router.delete("/", protectRoute, clearCart);

module.exports = router;
