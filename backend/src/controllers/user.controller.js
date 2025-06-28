require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const authService = require("../services/authService.js");
const userService = require("../services/userService.js");
const { adminRole } = require("../config/admin.js");
const { User, Otp, sequelize } = require("../models/index.js");
const catchAsync = require("../utils/catchAsync.js");
const mail = require("../services/emailService.js");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// register
const getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await userService.getAllAdmins(req?.user?.level);
  return res.status(200).json({ admins });
});

const getAllCustomers = catchAsync(async (req, res, next) => {
  const customers = await userService.getAllCustomers();
  return res.status(200).json({ customers });
});

const getAllVendors = catchAsync(async (req, res, next) => {
  const vendors = await userService.getAllVendors();
  return res.status(200).json({ vendors });
});

const getUserDetails = async (req, res, next) => {
  const { user_id } = req.query;

  if (!user_id) return res.status(400).json({ error: "User id is required" });

  try {
    const user = await userService.getUserDetails(user_id);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const sendResetPasswordOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email is required" });
  const user = await userService.generateOtp();
  await mail.sendResetPasswordOtpMail(
    user.name,
    user.name,
    user.otp,
    user.expiry
  );
  res.status(200);
});

// verify otp
const verifyOtp = catchAsync(async (req, res) => {
  const { otp, email } = req.body;

  if (!otp) return res.status(400).json({ msg: "Otp is required" });

  await userService.verifyOtp(JSON.stringify(otp), email);
  res.status(200).json({ msg: "OTP verified" });
});

// reset password
const resetPassword = async (req, res) => {
  const { otp, email, password } = req.body;

  if (!otp || !email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      const userByInOtpTable = await Otp.findOne({
        where: { user_id: user.user_id },
      });

      const isValid = speakeasy.totp.verify({
        secret: userByInOtpTable.otp_secret_key,
        encoding: "base32",
        token: otp,
        window: 1, // Allows a small time drift,
        step: 600,
      });

      if (!isValid) return res.status(400).json({ msg: "Invalid Otp" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      user.set("password", hashedPassword);
      await user.save();

      res.status(201).json({ msg: "Password changed successfully" });
      userByInOtpTable.set("otp", null);
      userByInOtpTable.set("otp_secret_key", null);
      await userByInOtpTable.save;
    }
  } catch (err) {
    console.log(err);
    res.send(500).json({ msg: "Server error" });
  }
};

module.exports = {
  resetPassword,
  verifyOtp,
  getAllAdmins,
  getAllCustomers,
  getAllVendors,
  sendResetPasswordOtp,
  getUserDetails
};
