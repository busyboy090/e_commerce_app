const express = require("express");
const cartController = require("../controllers/cart.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.use(authMiddleware.authMiddleware);

router.get("/", cartController.getUserCart);

router.post('/', cartController.addProductToCart);

router.put("/:product_id", cartController.updateCartProductQuantity);

router.delete("/:product_id", cartController.deleteCartProductFromCart);

router.get("/get-products", cartController.getProducts)

module.exports = router;
