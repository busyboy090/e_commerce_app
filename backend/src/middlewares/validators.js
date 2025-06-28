const { body, validationResult } = require("express-validator");
const { adminRole } = require('../config/admin.js');

// Common validation handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User registration validation
const validateRegisterCustomer = [
  body("first_name")
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("First Name is required"),
  body("last_name")
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Last Name is required"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),
  body("country")
    .notEmpty()
    .withMessage("Country is required"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validate, // Call the common validation handler
];

const validateRegisterVendor = [
  body("phone")
    .notEmpty()
    .isString()
    .withMessage("Phone number is required"),
  body("email") 
    .isEmail()
    .withMessage("Invalid email format"),
  body("country")
    .notEmpty()
    .isString()
    .isLength({ min: 2})
    .withMessage("Country name must be valid"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body('store_name')
    .notEmpty()
    .isString()
    .withMessage('Store name is required'),
  body('address')
    .notEmpty()
    .isString()
    .isLength({ min: 50})
    .withMessage('Address must be at least 50 characters'),
  validate, // Call the common validation handler
];

const validateRegisterAdmin = [
  body("email") 
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body('department')
    .notEmpty()
    .isString()
    .withMessage('Department is required'),
  body('level')
    .notEmpty()
    .toLowerCase()
    .isIn(adminRole)
    .withMessage('Admin level must be valid'),
  validate, // Call the common validation handler
];

// User login validation
const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .isString()
    .withMessage("Password is required"),
  validate,
];

module.exports = {
  validateRegisterCustomer,
  validateRegisterVendor,
  validateRegisterAdmin,
  validateLogin,
};
