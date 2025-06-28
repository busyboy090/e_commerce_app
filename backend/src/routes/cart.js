const express = require("express");
const {
  getCart,
  updateCartProductQuantity,
  deleteCartProductFromCart,
  addProductToCart,
} = require("../controllers/cart.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.use(authMiddleware);

router.post("/", addProductToCart);
router.get("/", getCart);
router.put("/:productId", updateCartProductQuantity);
router.delete("/:productId", deleteCartProductFromCart);

module.exports = router;
