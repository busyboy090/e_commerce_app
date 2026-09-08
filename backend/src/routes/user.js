const express = require("express");
const validationMiddleware = require("../middlewares/validators.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const userController = require("../controllers/user.controller.js");
const cartController = require("../controllers/cart.controller.js");

const router = express.Router();

router.post("/forgot-password", userController.sendResetPasswordOtp);

router.post("/forgot-password/verify-otp", userController.verifyOtp);

router.post(
  "/forgot-password/reset-password",
  authMiddleware.verifyOtp,
  userController.resetPassword
);

router.use(authMiddleware.authMiddleware);

router.get("/me", userController.getUserDetails);

module.exports = router;
