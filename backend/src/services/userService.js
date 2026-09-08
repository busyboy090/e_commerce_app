const {
  User,
  CustomerProfile,
  VendorProfile,
  AdminProfile,
  Department,
  Country,
  Otp,
  Permission,
  State,
  BusinessType,
  City,
  Position,
  Level,
  Address,
} = require("../models/index.js");
const AppError = require("../utils/appError.js");
const bcrypt = require("bcryptjs");
const { sendEmailVerificationMail } = require("./emailService.js");
const { Op, where } = require("sequelize");
const speakeasy = require("speakeasy");
const otp = require("../utils/otp.js");
const qrcode = require("qrcode");
const { Where } = require("sequelize/lib/utils");

const getUser = async (id) => {
  const user = await User.findOne({
    where: { user_id: id },
    attributes: [
      "email",
      "role",
      "is_totp_enabled",
      "picture",
      "is_email_verified",
      "status",
    ],
    include: [
      {
        model: AdminProfile,
        as: "adminProfile",
        include: {
          model: Department,
          as: "department",
          attributes: ["name"],
        },
      },
      {
        model: CustomerProfile,
        as: "customerProfile",
        attributes: ["first_name", "last_name", "phone_number"],
        include: {
          model: Country,
          as: "customerCountry",
          attributes: ["country_name", "country_code"],
        },
      },
      {
        model: VendorProfile,
        as: "vendorProfile",
        attributes: [
          "store_name",
          "is_verified",
          "account_status",
          "address",
          "phone_number",
          "verified_by",
        ],
        include: {
          model: User,
          as: "verifiedBy",
          attributes: ["role", "email"],
          include: {
            model: AdminProfile,
            as: "adminProfile",
            attributes: ["level", "permissions"],
            include: {
              model: Department,
              as: "department",
              attributes: ["name"],
            },
          },
        },
      },
    ],
  });

  if (!user) throw new AppError("User not found", 404);

  return user;
};

const getUserDetails = async (user_id) => {
  const user = await User.findOne({
    where: { user_id },
    attributes: [
      "email",
      "first_name",
      "last_name",
      "role",
      "is_2fa_enabled",
      "picture",
      "is_email_verified",
    ],
  });

  if (!user) throw new AppError("User not found", 404);

  let profile;

  if (user.role === "admin") {
    profile = await getAdminProfile(user_id);
  } else if (user.role === "vendor") {
    profile = await getVendorProfile(user_id);
  } else {
    profile = await getCustomerProfile(user_id);
  }

  return {
    user,
    profile,
  };
};

const getAdminProfile = async (user_id) => {
  const adminProfile = await AdminProfile.findOne({
    where: { user_id },
    attributes: ["approved"],
    include: [
      {
        model: Department,
        as: "department",
        attributes: ["name"],
      },
      {
        model: Position,
        as: "position",
        attributes: ["title"],
        include: {
          model: Level,
          as: "level",
          attributes: ["name"],
        },
      },
    ],
  });

  if (!adminProfile) return null;

  return adminProfile;
};

const getVendorProfile = async (user_id) => {
  const vendorProfile = await VendorProfile.findOne({
    where: { user_id },
    attributes: ["business_name", "phone", "address", "is_verified"],
    include: [
      {
        model: BusinessType,
        key: "businessType",
        attributes: ["name", "description"],
      },
      {
        model: Country,
        key: "country",
        attributes: ["name", "code"],
      },
    ],
  });

  if (!vendorProfile) return null;
};

const getCustomerProfile = async (user_id) => {
  const customerProfile = await CustomerProfile.findOne({
    where: { user_id },
    attributes: ["address", "gender", "phone"],
    include: [
      {
        model: State,
        as: "state",
        attributes: ["name", "state_id"],
      },
      {
        model: City,
        key: "city",
        attributes: ["name", "city_id"],
      },
    ],
  });

  if (!customerProfile) return null;

  return customerProfile;
};

const getCustomerById = async (id) => {
  const user = await User.findOne({
    where: {
      user_id: id,
      role: "customer",
    },
    attributes: ["email", "role", "picture", "is_email_verified"],
    include: {
      model: CustomerProfile,
      as: "customerProfile",
      attributes: ["first_name", "last_name", "phone_number"],
      include: {
        model: Country,
        as: "customerCountry",
        attributes: ["country_name", "country_code"],
      },
    },
  });

  if (!user) throw new AppError("Customer not found", 404);

  return user;
};

const getAdminById = async (id) => {
  const user = await User.findOne({
    where: {
      user_id: id,
      role: "admin",
    },
    attributes: [
      "email",
      "role",
      "is_totp_enabled",
      "picture",
      "is_email_verified",
      "status",
    ],
    include: {
      model: AdminProfile,
      as: "adminProfile",
      attributes: ["level", "permissions"],
      include: {
        model: Department,
        as: "department",
        attributes: ["name"],
      },
    },
  });

  if (!user) throw new AppError("Admin not found", 404);

  return user;
};

const getVendorById = async (id) => {
  const user = await User.findOne({
    where: {
      user_id: id,
      role: "vendor",
    },
    attributes: [
      "email",
      "role",
      "is_totp_enabled",
      "picture",
      "is_email_verified",
      "status",
    ],
    include: {
      model: VendorProfile,
      as: "vendorProfile",
      attributes: [
        "store_name",
        "is_verified",
        "account_status",
        "address",
        "phone_number",
      ],
    },
  });

  if (!user) throw new AppError("Vendor not found", 404);

  return user;
};

const getAllAdmins = async (level) => {
  let admins;
  if (level !== "super") {
    admins = await User.findAll({
      where: {
        role: "admin",
      },
      attributes: [
        "email",
        "role",
        "is_totp_enabled",
        "picture",
        "is_email_verified",
        "status",
      ],
      include: {
        model: AdminProfile,
        as: "adminProfile",
        where: {
          level: { [Op.ne]: "super" },
        },
        attributes: ["level", "permissions"],
        include: {
          model: Department,
          as: "department",
          attributes: ["name"],
        },
      },
    });
  } else {
    admins = await User.findAll({
      where: {
        role: "admin",
      },
      attributes: [
        "email",
        "role",
        "is_totp_enabled",
        "picture",
        "is_email_verified",
        "status",
      ],
      include: {
        model: AdminProfile,
        as: "adminProfile",
        attributes: ["level", "permissions"],
        include: {
          model: Department,
          as: "department",
          attributes: ["name"],
        },
      },
    });
  }

  if (!admins || admins.length < 1) throw new AppError("Admin not found", 404);

  return admins;
};

const getAllCustomers = async () => {
  const customers = await User.findAll({
    where: {
      role: "customer",
    },
    attributes: ["email", "role", "picture", "is_email_verified", "status"],
    include: {
      model: CustomerProfile,
      as: "customerProfile",
      attributes: ["first_name", "last_name", "phone_number"],
      include: {
        model: Country,
        as: "customerCountry",
        attributes: ["country_name", "country_code"],
      },
    },
  });

  if (!customers || customers.length < 1)
    throw new AppError("Customer not found", 404);

  return customers;
};

const getAllVendors = async () => {
  const vendors = await User.findAll({
    where: {
      role: "vendor",
    },
    attributes: [
      "email",
      "role",
      "is_totp_enabled",
      "picture",
      "is_email_verified",
      "status",
    ],
    include: {
      model: VendorProfile,
      as: "vendorProfile",
      attributes: [
        "store_name",
        "is_verified",
        "account_status",
        "address",
        "phone_number",
      ],
      include: {
        model: Country,
        as: "country",
        attributes: ["country_name", "country_code"],
      },
      required: true,
    },
  });

  if (!Array.isArray(vendors) || vendors.length < 1)
    throw new AppError("Vendor not found", 404);

  return vendors;
};

const findUser = async (value) => {
  return await User.findOne(value);
};

const getGoogleUser = async (token) => {
  // get user details from google
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new AppError("Error fetching Google user info", response.status);
  }

  const userInfo = await response.json();

  if (!userInfo || !userInfo.email) {
    throw new AppError("Invalid user info received from Google", 400);
  }

  return userInfo;
};

const getUserCountry = async (user_id) => {
  const user = User.findOne({ 
    where: { user_id },
    include: {
      model: Country,
      as: 'country',
      attributes: ['name','code'],
      include: {
        model: Currency,
        as: 'currency',
        attributes: ['name','code','symbol']
      }
    }
  });

  if(!user) throw new AppError('User does not exist', 404);

  return user;
}

module.exports = {
  findUser,
  getUser,
  getAdminById,
  getCustomerById,
  getVendorById,
  getAllAdmins,
  getAllCustomers,
  getAllVendors,
  getGoogleUser,
  getUserDetails,
  getUserCountry
};
