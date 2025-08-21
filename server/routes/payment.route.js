const express = require("express");
const router = express.Router();

const { createCheckoutSession } = require("../controllers/payment.controller");
const { protectRoute } = require("../middlewares/auth.middleware");

router.post("/create-checkout-session", protectRoute, createCheckoutSession);

module.exports = router;
