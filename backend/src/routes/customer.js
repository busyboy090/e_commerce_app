const express = require("express");
const validationMiddleware = require("../middlewares/validators.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const userController = require("../controllers/user.controller.js");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post(
  "/register",
  authController.registerCustomer
);

module.exports = router;
