const express = require("express");
const validationMiddleware = require("../middlewares/validators.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post(
    "/reset-password",
    authMiddleware.verifyOtp,
    authController.resetPassword
);

router.get("/verify-email", authController.verifyEmail);

router.post("/google-login", authController.googleLogin);

router.post("/login", validationMiddleware.validateLogin, authController.loginUser);

router.get("/refresh-token", authController.refreshTokens);

router.use(authMiddleware.authMiddleware);

router.post("/logout", authController.logoutUser);

router.get('/enable2fa', authController.enable2fa);

router.get('/disable2fa', authController.disable2fa);

module.exports = router;
