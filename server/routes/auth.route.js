const express = require("express");
const router = express.Router();
const {
  register,
  login,
  loginWithGoogle,
  loginWithApple,
  refreshToken,
  logout,
  resetPassword,
  forgotPassword,
} = require("../controllers/auth.controller");

const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/auth.validator");

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/google", loginWithGoogle);
router.post("/apple", loginWithApple);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/forgot-password", forgotPasswordValidator, forgotPassword);
router.patch("/reset-password/:token", resetPasswordValidator, resetPassword);

module.exports = router;
