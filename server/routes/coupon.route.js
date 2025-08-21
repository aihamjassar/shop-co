const express = require("express");
const router = express.Router();

const {
  getCoupon,
  validateCoupon,
} = require("../controllers/coupon.controller");

const { protectRoute } = require("../middlewares/auth.middleware");

router.get("/", protectRoute, getCoupon);

router.post("/", protectRoute, validateCoupon);

module.exports = router;
