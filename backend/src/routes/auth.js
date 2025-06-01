import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { loginUser, logoutUser, registerUser, getUserDetails, refreshUserAccessToken, googleLogin, verifyEmail, verifyOtp, resetPassword } from '../controllers/user.controller.js';
import { validateRegister, validateLogin } from '../middlewares/validators.js';

const router = express.Router();

// Register route 
router.post('/register', validateRegister, registerUser);

// Google login route
router.post('/google-login', googleLogin)

// Login route
router.post('/login', validateLogin, loginUser);

// Logout route
router.post('/logout', authMiddleware, logoutUser);

// Protected route
router.get('/me', authMiddleware, getUserDetails);

// Refresh token route
router.get('/refresh-token', refreshUserAccessToken);

// Forgot password route
router.post('/forgot-password/email', verifyEmail);
router.post('/forgot-password/verify-otp', verifyOtp);
router.post('/forgot-password/reset-password', resetPassword);


export default router;