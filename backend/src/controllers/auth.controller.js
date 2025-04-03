import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import { Op } from "sequelize";

// Load environment variables
dotenv.config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		// Check if user already exists
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: "User registered",
			user: { id: user.id, username: user.username, email: user.email },
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Function to handle user login
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Missing email or password" });
		}

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Generate access token
		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "15m",
		});
		// Generate refresh token
		const refreshToken = jwt.sign(
			{ id: user.id },
			process.env.JWT_REFRESH_SECRET,
			{ expiresIn: "7d" }
		);

		res.status(200).json({ accessToken, refreshToken });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const googleLogin = async (req, res) => {
	try {
		const { token } = req.body;
		if (!token) {
			return res.status(400).json({ message: "Missing Google token" });
		}

		const ticket = await googleClient.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		const { email, name } = payload;

		// Check if user exists
		let user = await User.findOne({ where: { email } });
		if (!user) {
			user = await User.create({
				username: name,
				email,
				password: bcrypt.hashSync(
					Math.random().toString(36).slice(-8),
					10
				),
			});
		}

		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign(
			{ id: user.id },
			process.env.JWT_REFRESH_SECRET,
			{ expiresIn: "7d" }
		);

		res.status(200).json({ accessToken, refreshToken });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Function to handle user logout
const logoutUser = async (req, res) => {
	try {
		res.status(200).json({ message: "User logged out successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const refreshUserAccessToken = async (req, res) => {
	try {
		const { refreshToken } = req.body;
		if (!refreshToken) {
			return res.status(400).json({ message: "Missing refresh token" });
		}

		jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET,
			(err, decoded) => {
				if (err) {
					return res
						.status(401)
						.json({ message: "Invalid refresh token" });
				}

				const newAccessToken = jwt.sign(
					{ id: decoded.id },
					process.env.JWT_SECRET,
					{ expiresIn: "15m" }
				);
				res.status(200).json({ accessToken: newAccessToken });
			}
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export {
	registerUser,
	loginUser,
	googleLogin,
	logoutUser,
	refreshUserAccessToken,
};
