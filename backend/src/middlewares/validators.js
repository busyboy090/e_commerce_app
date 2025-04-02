import { body, validationResult } from 'express-validator';

// Common validation handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User registration validation
const validateRegister = [
  body('first_name').notEmpty().withMessage('First Name is required'),
  body('last_name').notEmpty().withMessage('Last Name is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  validate, // Call the common validation handler
];

// User login validation
const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

export { validateRegister, validateLogin };