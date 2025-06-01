import dotenv from "dotenv";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

dotenv.config();

export const verifyEmail = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const secret = speakeasy.generateSecret({ length: 20 });
		const otp = speakeasy.totp({
			secret: secret.base32,
			encoding: "base32",
			step: 300,
		});

		user.otp = otp;
		user.otpCreatedAt = new Date();
		await user.save();

		let transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: process.env.EMAIL_SECURE === "true",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Send the OTP email
		await transporter.sendMail({
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Password Reset OTP",
			text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
		});

		res.status(200).json({ message: "OTP sent to your email." });
	} catch (error) {
		res.status(500).json({
			message: "Could not send OTP.",
			error: error.message,
		});
	}
};

export const verifyOtp = async (req, res) => {
	try {
		const { email, otp } = req.body;

		// Find the user in the database
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const now = new Date();
		const otpAge = (now - new Date(user.otpCreatedAt)) / 1000;
		if (otpAge > 300) {
			return res.status(400).json({ message: "OTP expired." });
		}

		if (otp !== user.otp) {
			return res.status(400).json({ message: "Invalid OTP." });
		}

		res.status(200).json({ message: "OTP verified successfully." });
	} catch (error) {
		res.status(500).json({
			message: "OTP verification failed.",
			error: error.message,
		});
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { email, newPassword } = req.body;

		// Find the user in the database
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
		user.password = hashedPassword;

		user.otp = undefined;
		user.otpCreatedAt = undefined;

		await user.save();
		res.status(200).json({ message: "Password updated successfully." });
	} catch (error) {
		res.status(500).json({
			message: "Password reset failed.",
			error: error.message,
		});
	}
};
