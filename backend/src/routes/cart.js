import express from 'express';
import { createCart, getCart } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware)

router.post('/', createCart);
router.get('/', getCart);

export default router