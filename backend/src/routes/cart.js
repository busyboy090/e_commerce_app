import express from 'express';
import { getCart, updateCartProductQuantity, deleteCartProductFromCart, addProductToCart } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware)

router.post('/', addProductToCart);
router.get('/', getCart);
router.put('/:productId', updateCartProductQuantity);
router.delete('/:productId', deleteCartProductFromCart);

export default router