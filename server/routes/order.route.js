const express = require("express");
const router = express.Router();

const { protectRoute } = require("../middlewares/auth.middleware");
const { getOrders } = require("../controllers/order.controller");

router.get("/", protectRoute, getOrders);

module.exports = router;
