const addressService = require('../services/addressService.js');
const { sequelize } = require('../models/index.js')

const createNewAddress = async (req, res, next) => {
    const user_id = req.user.id;
    const {
      phone_number,
      first_name,
      last_name,
      address,
      city_id,
      country_id,
      state_id,
      additional_phone_number,
      additional_information,
      is_default,
    } = req.body;
  
    if(!first_name || !last_name || !address || !phone_number || !city_id || !country_id || !state_id  || !is_default) {
      return res.status(400).json({ error: true, msg: 'All fields are required.'});
    }
  
    const t = await sequelize.transaction();
  
    try {
      await addressService.createNewAddress({data: req.body, user_id, t});
  
      await t.commit();
  
      res.status(200).json({ msg: 'Address created successfully'});
    } catch (err) {
      await t.rollback();
      next(err);
    }
};
  
const getUserAddresses = async (req, res, next) => {
    const user_id = req.user.id;
  
    try {
      const addresses = await addressService.getUserAddresses(user_id);
  
      res.status(200).json({ addresses });
    } catch (err) {
      next(err);
    }
};
  
const getUserAddress = async (req, res, next) => {
  const user_id = req.user.id;
  const { address_id } = req.params;
  try {

      const address = await addressService.getUserAddress({address_id,user_id})

      res.status(200).json({address});
  } catch (err) {
      next(err)
  }
}

const updateAddress = async (req, res, next) => {
  const { address_id } = req.params;
  const user_id = req.user.id

  try {
    await addressService.updateAddress({address_id, user_id, updateFields: {...req.body}})

    res.status(200).json({msg: 'Address updated successfully'})
  } catch (err) {
    next (err)
  }
}

const deleteAddress = async (req, res, next) => {
    const { address_id } = req.params;
    const user_id = req.user.id
    try {

      await addressService.deleteAddress({ address_id, user_id})

      res.status(200).json({ msg: 'Address deleted successfully'})
    } catch (err) {
      next (err)
    }
}

module.exports = {
    getUserAddresses,
    createNewAddress,
    getUserAddress,
    deleteAddress,
    updateAddress
}