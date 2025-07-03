const express = require("express");
const validationMiddleware = require("../middlewares/validators.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const userController = require("../controllers/user.controller.js");
const authController = require("../controllers/auth.controller.js");
const vendorController =  require('../controllers/vendor.controller.js');

const router = express.Router();

router.post(
  "/register",
  validationMiddleware.validateRegisterVendor,
  authController.registerVendor
);

// router.use(authMiddleware.authMiddleware);

router.get('/businesstypes', vendorController.getAllBusinessTypes)

router.post(
  "/completeprofile",
  validationMiddleware.validateRegisterVendor,
  authController.completeVendorProfile
);

module.exports = router;
