const express = require('express');
const authRoutes = require('./auth.js')
const productRoutes = require('./product.js');
const cartRoutes = require('./cart.js');
const adminRoutes = require('./admin.js');
const vendorRoutes = require('./vendor.js');
const customerRoutes = require('./customer.js');
const userRoutes = require('./user.js');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/customer', customerRoutes);
router.use('/vendor', vendorRoutes);
router.use('/admin', adminRoutes)

module.exports = router;