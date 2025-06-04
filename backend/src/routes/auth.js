import express from "express";
import { validateRegister, validateLogin } from "../middlewares/validators.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  googleLogin,
  loginUser,
  logoutUser,
  refreshUserAccessToken,
} from "../controllers/auth.controller.js";
import { getUserDetails } from "../controllers/profile.controller.js";
import {
  verifyEmail,
  verifyOtp,
  resetPassword,
} from "../controllers/password.controller.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/google-login", googleLogin);

router.post("/login", validateLogin, loginUser);

router.post("/logout", authMiddleware, logoutUser);

router.get("/me", authMiddleware, getUserDetails);

router.get("/refresh-token", refreshUserAccessToken);

router.post("/forgot-password/email", verifyEmail);
router.post("/forgot-password/verify-otp", verifyOtp);
router.post("/forgot-password/reset-password", resetPassword);

export default router;
