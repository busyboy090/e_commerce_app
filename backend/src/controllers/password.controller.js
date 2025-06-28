require('dotenv').config();
const speakeasy = require("speakeasy");
const bcrypt = require('bcryptjs');
const db = require('../models/index.js');
const { sendResetPasswordOtpEmail } = require("../services/emailService.js");

const { User, Otp } = db

const sendResetPasswordOtp = async (req, res) => {
	const { email } = req.body;

	if (!email) return res.status(400).json({ msg: 'Email is required'})

    try {
        let user = await User.findOne({ where: { email }});

        if(user) {
            // Generate a unique secret for the user
            const otpSecret = speakeasy.generateSecret(
				{
					name: `Exclusive (${user.email})`,
					length: 20,
				}
			).base32;

            // Generate a secure reset token(otp)
            const otp = speakeasy.totp({
                secret: otpSecret,
                encoding: 'base32',
                digits: 6,  // Generates a 6-digit OTP
                step: 600 // Sets the OTP validity period
            });

            // find the user in the otp table
            const userOtpDetails = await Otp.findOne({ where: { user_id: user.user_id }});

            if (!userOtpDetails) {
                await Otp.create({
                    otp,
                    otp_secret_key: otpSecret,
                    user_id: user.user_id
                })
            } else {
                userOtpDetails.set('otp', otp);
                userOtpDetails.set('otp_secret_key', otpSecret);
                await userOtpDetails.save();
            }

            const result = await sendResetPasswordOtpEmail(user.email,'support@exclusive.com', user.first_name, otp, '10');

			console.log(result.info)

			if (result.success) {
				res.sendStatus(200);
			} else {
				return res.status(500).json({ msg: 'Server error'})
			}
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Server error'})
    }

}

const verifyOtp = async (req, res) => {
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

const resetPassword = async (req, res) => {
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

module.exports = {
	sendResetPasswordOtp,
	verifyOtp,
	resetPassword
}