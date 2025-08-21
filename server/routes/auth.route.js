const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  logout,
  resetPassword,
  forgetPassword,
} = require("../controllers/auth.controller");

const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/forget-password", forgetPassword);
// TODO create reset password validator
router.patch("/reset-password/:token", resetPassword);

module.exports = router;
