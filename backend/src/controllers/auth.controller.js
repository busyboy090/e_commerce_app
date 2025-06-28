require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const authService = require("../services/authService.js");
const userService = require('../services/userService.js');
const { sequelize } = require("../models/index.js");
const getLocationFromIp = require('../utils/getLocationFromIp.js')

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerVendor = async (req, res, next) => {
  const { first_name, last_name, email, password, country_id } =
    req.body;
  const t = await sequelize.transaction();

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !country_id
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const { user_id, missingFields } = await authService.registerUser(req.body, t, "vendor");
    await t.commit();

    res.status(201).json({ msg: "User registered successfully", user_id, missingFields });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const registerCustomer = async (req, res, next) => {
  const { first_name, last_name, email, phone, password, country_id } =
    req.body;
  const t = await sequelize.transaction();

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone ||
    !password ||
    !country_id
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const { user_id, missingFields } = await authService.registerUser(req.body, t, "customer");
    await t.commit();

    res.status(201).json({ msg: "User registered successfully", user_id, missingFields });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const registerAdmin = async (req, res, next) => {
  const { first_name, last_name, email, password, country_id } =
    req.body;
  const t = await sequelize.transaction();

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !country_id
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const { user_id, missingFields } =await authService.registerUser(req.body, t, "admin");
    await t.commit();

    res.status(201).json({ msg: "User registered successfully", user_id, missingFields });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const completeVendorProfile = async (req, res, next) => {
    const { user_id, address, country_id, state_id, city_id, business_type, phone } = req.body;

    if(!user_id  || !address || !country_id || !state_id || !city_id || !business_type || !phone) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const t = sequelize.transaction();

        await userService.completeVendorProfile(req.body,t);

        await t.commit();

        res.status(201).json({ msg: 'User profile created successfully'})
    } catch(err) {
        await t.rollback()
        next(err)
    }
}

const completeCustomerProfile = async (req, res, next) => {
    const { user_id, address, country_id, state_id, city_id, phone } = req.body;

    if(!user_id  || !address || !country_id || !state_id || !city_id || !business_type || !phone) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const t = sequelize.transaction();

        await authService.completeVendorProfile(req.body,t);

        await t.commit();

        res.status(201).json({ msg: 'User profile created successfully'})
    } catch(err) {
        await t.rollback()
        next(err)
    }
}

const completeAdminProfile = async (req, res, next) => {
    const { user_id,  position_id, department_id } = req.body;

    if(!user_id  || !position_id || !department_id ) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const t = sequelize.transaction();

        await userService.completeAdminProfile(req.body,t,req.user.id);

        await t.commit();

        res.status(201).json({ msg: 'User profile created successfully'})
    } catch(err) {
        await t.rollback()
        next(err)
    }
}

// signin through google
const googleLogin = async (req, res, next) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ msg: "Token is required" });

  try {
    const userInfo = await userService.getGoogleUser(token);

    const { email, family_name, picture, given_name, email_verified } = userInfo;
    const t = sequelize.transaction();

    // Check if the user already exists
    let user = await userService.findUser({ where: { email } },t);

    if (!user) {
      // Register the user
      const {user_id, missingFields} = await userService.registerUser({
        email,
        first_name: given_name,
        last_name: family_name,
        password: null,
        googleLogin: true,
        is_email_verified: email_verified,
        picture,
        country_id: null
      },t);


      return res.status(200).json({ user_id, missingFields, msg: "User registered successfully" });
    }

    const { access_token, refresh_token, sessionId } = await authService.googleLogin(email);

    // Set cookie securely
    res
      .cookie("refresh_token", refresh_token, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
      }).cookie("session_id", sessionId, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
      })
      .status(201).json({
        msg: "Logged in successfully",
        access_token,
    });
  } catch (err) {
    next(err);
  }
};

// login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const userAgent = req.headers['user-agent'];
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const device_id = req.headers['device_id'];
  const { city, region, country_name} = await getLocationFromIp(ip);

  // if(!device_id) {
  //   return res.status(400).json({ 
  //     error: true,
  //     msg: "Device id are required" 
  //   });
  // }

  const request = {
    user_agent: userAgent,
    ip,
    device_id,
    location: `${city} ${region} ${country_name}`
  }


  if (!email || !password) {
    return res.status(400).json({
      error: true,
      msg: "Email and password are required" 
      });
  }

  try {
    const { access_token, refresh_token, session_id } = await authService.loginUser({
      email,
      password,
    });

    // Set cookie securely
    res
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
      }).cookie("session_id", session_id, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
      })
      .json({
        access_token,
        msg: "Logged in successfully",
      });
  } catch (err) {
    next(err);
  }
};

// logout
const logoutUser = async (req, res, next) => {
  const refresh_token = req.signedCookies?.refresh_token;
  const session_id = req.signedCookies?.session_id;

  if (!refresh_token && !session_id)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    res.clearCookie("refresh_token", { httpOnly: true, signed: true });
    res.clearCookie("session_id", { httpOnly: true, signed: true });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

// refresh token
const refreshTokens = async (req, res, next) => {
  const refreshToken = req.signedCookies.refresh_token;
  if (!refreshToken) {
    return res.status(400).json({ msg: "No token, authorization denied" });
  }

  try {
    const { access_token, refresh_token } = await authService.refreshTokens(
      refreshToken
    );

    res
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
      })
      .status(200)
      .json({ access_token });
  } catch (err) {
    next(err);
  }
};

// Verify email
const verifyEmail = async (req,res,next) => {
  const { token } = req.query;
  const t = await sequelize.transaction();

  if (!token) return res.status(400).json({ msg: "Token is required" });

  try {
      await authService.verifyEmail(token,t);
      await t.commit()
  
      return res.status(200).json({ msg: "Email verified successfully" });
  } catch (err) {
      await t.rollback();
      next(err);
  }
}

// enable 2 factor authentication
const enable2fa = async (req, res, next) => {
  try {
    const t = await sequelize.transaction();
    const data = await authService.enable2fa(req.user.id, t);
    await t.commit();
    res.status(200).json(data);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

// enable 2 factor authentication
const disable2fa = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    await authService.disable2fa(req.user.id, t);
    await t.commit();
    res.status(200);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    await authService.resetPassword(password, email);

    res.status(200).json({ msg: 'Password updated successfully.'})
  } catch (err) {
    next(err)
  }
}

module.exports = {
  loginUser,
  googleLogin,
  logoutUser,
  refreshTokens,
  verifyEmail,
  registerAdmin,
  registerCustomer,
  registerVendor,
  completeAdminProfile,
  completeCustomerProfile,
  completeVendorProfile,
  disable2fa,
  enable2fa,
  resetPassword
};
