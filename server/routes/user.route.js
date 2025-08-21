const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { protectRoute } = require("../middlewares/auth.middleware");
const { updateUserValidator } = require("../validators/user.validator");

router.get("/me", protectRoute, getUser);
router.patch("/me", protectRoute, updateUserValidator, updateUser);
router.delete("/me", protectRoute, deleteUser);

module.exports = router;
