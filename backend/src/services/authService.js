const {
  User,
  EmailVerification,
  CustomerProfile,
  AdminProfile,
  Otp,
  Position,
  Level,
  Session,
  LevelPermission,
} = require("../models/index.js");
const AppError = require("../utils/appError.js");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt.js");
const userService = require("./userService.js");
const { Op } = require('sequelize');
const mailService = require('./emailService.js')

const registerUser = async (data, t, role) => {
  const { email, password, phone, first_name, last_name, country_id } = data;

  // Check if the user already exists
  let user = await User.findOne(
    {
      where: { email }
    },
    { transaction: t }
  );

  if (user) throw new AppError("User already exist", 400);

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Register the user
  user = await User.create(
    {
      email,
      password: hashedPassword,
      picture: null,
      first_name,
      last_name,
      country_id: country_id || null,
      is_email_verified: false,
      role: role ? role : "customer",
    },
    { transaction: t }
  );

  const missingFields = [];

  if (!user.country_id) missingFields.push("country");
  if (!user.phone) missingFields.push("phone");

  const emailSent = await mailService.sendEmailVerificationMail(
    email,
    first_name,
    user.user_id,
    24
  );

  if (!emailSent) {
    throw new AppError(
      "Failed to send verification email. User not created",
      500
    );
  }

  return user.role !== "customer" ? { user_id: user.user_id } : true;
};

const completeCustomerProfile = async (data, t) => {
  const { user_id, address, country_id, state_id, city_id, phone, gender } =
    data;
  // Check if the user already exists
  const user = await User.findOne(
    {
      where: { user_id },
    },
    { transaction: t }
  );

  if (!user) throw new AppError("User not found", 404);

  if (user.country_id === null) {
    user.country_id = country_id;
    user.save();
  }

  const profile = await CustomerProfile.findOne(
    { where: { user_id } },
    { transaction: t }
  );

  if (profile) throw new AppError("Profile already exist for this user.", 409);

  const existingPhone = await CustomerProfile.findOne(
    { where: { phone } },
    { transaction: t }
  );

  if (existingPhone)
    throw new AppError(
      "This phone number is already linked to another user.",
      409
    );

  await CustomerProfile.create(
    {
      user_id: user.user_id,
      address,
      state_id,
      city_id,
      phone,
      gender,
    },
    { transaction: t }
  );

  return user;
};

const completeVendorProfile = async (data, t) => {
  const {
    user_id,
    address,
    country_id,
    state_id,
    city_id,
    business_type,
    phone,
  } = data;
  // Check if the user already exists
  let user = await User.findOne(
    {
      where: { user_id },
    },
    { transaction: t }
  );

  if (!user) throw new AppError("User not found", 404);

  if (user.country_id === null) {
    user.country_id = country_id;
    user.save();
  }

  const profile = await VendorProfile.findOne(
    { where: { user_id } },
    { transaction: t }
  );

  if (profile) throw new AppError("Profile already exist for this user.", 409);

  const existingPhone = await VendorProfile.findOne(
    { where: { phone } },
    { transaction: t }
  );

  if (existingPhone)
    throw new AppError(
      "This phone number is already linked to another user.",
      409
    );

  const existingName = await VendorProfile.findOne(
    { where: { store_name } },
    { transaction: t }
  );

  if (existingName)
    throw new AppError("This store name is already exist.", 409);

  await VendorProfile.create(
    {
      user_id: user.user_id,
      store_name,
      address,
      country_id,
      state_id,
      city_id,
      business_type,
      phone,
    },
    { transaction: t }
  );

  return user;
};

const completeAdminProfile = async (data, t, created_by) => {
  const { user_id, department_id, position_id, country_id } = data;

  // Check if the user already exists
  const user = await User.findOne(
    {
      where: { user_id },
    },
    { transaction: t }
  );

  if (!user) throw new AppError("User not found", 404);

  if (user.country_id === null) {
    user.country_id = country_id;
    user.save();
  }

  const adminUser = await AdminProfile.findOne(
    { where: { user_id } },
    { transaction: t }
  );

  if (adminUser)
    throw new AppError("Admin profile already exist for this user.", 409);

  const adminPosition = await AdminProfile.findOne(
    { where: { position_id } },
    { transaction: t }
  );

  if (adminPosition) throw new AppError("Admin position already exist", 409);

  // Register the user
  await AdminProfile.create(
    {
      user_id,
      department_id,
      position_id,
      created_by,
    },
    { transaction: t }
  );

  return user;
};

const loginUser = async ({ email, password }, request) => {
  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user) throw new AppError("Invalid credentials", 400);

  // Check if Google login only
  if (user.googleLogin === true && user.password === null)
    throw new AppError("Please log in using your Google account.", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Invalid credentials", 400);

  const payload = {
    id: user.user_id,
    role: user.role
  };

  const missingFields = [];

  // Admin profile check
  if (user.role === "admin") {
    const adminProfile = await AdminProfile.findOne({
      where: { user_id: user.user_id },
      include: {
        model: Position,
        as: "position",
        attributes: ["title"],
        include: {
          model: Level,
          as: "level",
          attributes: ["name"],
          include: {
            model: LevelPermission,
            as: "permissions"
          }
        }
      }
    });

    if (!adminProfile) {
      missingFields.push("adminProfile");
      // throw new AppError("Admin profile is missing. Contact support.", 400);
    }
  }

  // Vendor profile check
  else if (user.role === "vendor") {
    const vendorProfile = await VendorProfile.findOne({
      where: { user_id: user.user_id }
    });

    if (!vendorProfile) {
      missingFields.push("vendorProfile");
      // throw new AppError("Vendor profile is missing. Complete onboarding.", 400);
    }
  }

  // Customer profile check
  else if (user.role === "customer") {
    const customerProfile = await CustomerProfile.findOne({
      where: { user_id: user.user_id }
    });

    if (!customerProfile) {
      missingFields.push("customerProfile");
      // throw new AppError("Customer profile is missing.", 400);
    }
  }


  if(!user.country_id) {
    missingFields.push('country');
  }

  // Optional: Create session
  const now = new Date();
  const next7days = new Date(now);
  next7days.setDate(now.getDate() + 7);

  // Uncomment if using session table
  // const session = await Session.create({
  //   user_id: user.user_id,
  //   user_agent: request.user_agent,
  //   ip_address: request.ip,
  //   device: request.device,
  //   location: request.location,
  //   last_active_at: now,
  //   deleteAt: next7days
  // });

  const refresh_token = jwt.generateRefreshToken(payload);
  const access_token = jwt.generateAccessToken(payload);

  return {
    access_token,
    refresh_token,
    // session_id: session.session_id,
    missingFields, // helpful for frontend redirect
  };
};

const googlelogin = async (email) => {
  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user) throw new AppError("Invalid credentials", 400);

  if (user.googleLogin === true) {
    let payload;

    if (user.role === "admin") {
      // Fetch admin profile details
      const adminProfile = await AdminProfile.findOne({
        where: { user_id: user.user_id },
      });

      payload = {
        id: user.user_id,
        role: user.role,
        level: adminProfile.level,
        permissions: adminProfile.permissions,
      };
    } else {
      payload = {
        id: user.user_id,
        role: user.role,
      };
    }
    // Generate tokens
    const refresh_token = jwt.generateRefreshToken(payload);
    const access_token = jwt.generateAccessToken(payload);

    return {
      access_token,
      refresh_token,
    };
  }
};

const refreshTokens = async (token) => {
  const decoded = jwt.verifyRefreshToken(token);

  const user = await User.findByPk(decoded.id);

  if (!user) throw new AppError("Invalid or expired refresh token", 401);

  const newAccessToken = jwt.generateAccessToken({
    id: user.user_id,
    role: user.role,
  });
  const newRefreshToken = jwt.generateRefreshToken({
    id: user.user_id,
    role: user.role,
  });

  return {
    access_token: newAccessToken,
    refresh_token: newRefreshToken,
  };
};

const verifyEmail = async (token, t) => {
  const decoded = jwt.verifyEmailToken(token);

  if (!decoded)
    throw new AppError("This verification link is invalid or has expired", 400);

  const user = await User.findByPk(decoded.id, { transaction: t });
  user.is_email_verified = true;
  user.save();

  return user;
};

const enable2fa = async (id, t) => {
  const user = await User.findOne(
    { where: { user_id: id } },
    { transaction: t }
  );

  if (!user) throw new AppError("User does not exist", 400);

  const secret = speakeasy.generateSecret({
    name: `Exclusive (${user.email})`,
    length: 20,
  });

  const { encryptedData, iv } = otp.encrypt(secret.base32);

  user.is_2fa_enabled = true;
  user.totp_iv = iv;
  user.totp_secret = encryptedData;

  user.save();

  const data_url = await qrcode.toDataURL(secret.otpauth_url);

  if (!data_url) {
    throw new AppError("Failed to generate qrcode", 500);
  }

  return {
    base32: secret.base32,
    data_url,
  };
};

const disable2fa = async (id, t) => {
  const user = await User.findOne(
    { where: { user_id: id } },
    { transaction: t }
  );

  if (!user) throw new AppError("User does not exist", 400);

  user.is_2fa_enabled = false;
  user.totp_iv = null;
  user.totp_secret = null;

  user.save();

  return true;
};

const generateOtp = async (email) => {
  const user = await User.findOne({
    where: { email, status: "active" },
    attributes: ["first_name"],
  });

  if (!user)
    throw new AppError("This email is not associated with any account.");

  const otpDetails = await Otp.create({
    otp: otp.generateOtp(),
    expireAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  if (!otpDetails) throw new AppError("Error occur while generating otp", 500);

  user = {
    code: user.otp.code,
    expiry: 10,
    name: user.first_name,
  };

  return user;
};

const verifyOtp = async (otp, email) => {
  const user = await User.findOne({
    where: { email },
    include: {
      model: Otp,
      as: "otp",
      where: { used: false, otp },
      attributes: ["code", "expire_at"],
      required: true,
    },
  });

  if (!user) {
    throw new AppError(
      "The OTP is invalid or has expired. Please request a new one."
    );
  }

  if (user.otp.code !== otp) {
    throw new AppError(
      "The OTP is invalid or has expired. Please request a new one."
    );
  }

  const now = new Date();
  const expireAt = new Date(user.otp.expireAt);

  if (now > expireAt) {
    throw new AppError(
      "The OTP is invalid or has expired. Please request a new one."
    );
  }

  return user;
};

const resetPassword = async ({ email, password }) => {
  const user = userService.findUser({ where: email });

  if (!user) throw new AppError("User not found.", 404);

  const hashedPassword = bcrypt(password, 10);
  user.password = hashedPassword;
  user.save();

  return user;
};

module.exports = {
  loginUser,
  refreshTokens,
  verifyEmail,
  googlelogin,
  completeAdminProfile,
  completeCustomerProfile,
  completeVendorProfile,
  registerUser,
  enable2fa,
  disable2fa,
  generateOtp,
  verifyOtp,
  resetPassword,
};
