const express = require("express");
const validationMiddleware = require("../middlewares/validators.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const userController = require("../controllers/user.controller.js");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.use(authMiddleware.authMiddleware, authMiddleware.adminMiddleware);

router.post(
  "/register",
  validationMiddleware.validateRegisterAdmin,
  authController.registerAdmin
);

router.get(
  "/all-admins",
  authMiddleware.allowSelectedAdmins(["hr", "super"]),
  authMiddleware.checkPermission("view-all-admins"),
  userController.getAllAdmins
);

router.get(
  "/all-customers",
  authMiddleware.allowSelectedAdmins(["super", "hr"]),
  authMiddleware.checkPermission("view-all-users"),
  userController.getAllCustomers
);

router.get(
  "/all-vendors",
  authMiddleware.allowSelectedAdmins(["super", "hr"]),
  authMiddleware.checkPermission("view-all-vendors"),
  userController.getAllVendors
);

module.exports = router;
