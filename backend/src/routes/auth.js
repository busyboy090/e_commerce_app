<<<<<<< HEAD
import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { loginUser, logoutUser, registerUser, getUserDetails, refreshUserAccessToken, googleLogin, verifyEmail, verifyOtp, resetPassword } from '../controllers/user.controller.js';
import { validateRegister, validateLogin } from '../middlewares/validators.js';
=======
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
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
import { validateRegister, validateLogin } from "../middlewares/validators.js";
>>>>>>> 7845db247ff58e810601e383dfc09bc00857a281

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
