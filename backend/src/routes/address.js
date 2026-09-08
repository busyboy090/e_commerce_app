const express = require('express')
const addressController = require('../controllers/address.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js')

const router = express.Router();

router.use(authMiddleware.authMiddleware);

router.get("/", addressController.getUserAddresses);

router.post("/", addressController.createNewAddress);

router.get("/:address_id", addressController.getUserAddress);

router.put('/:address_id', addressController.updateAddress)

router.delete('/:address_id', addressController.deleteAddress);

module.exports =  router;