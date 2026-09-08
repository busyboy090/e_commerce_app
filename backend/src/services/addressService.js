const AppError = require('../utils/appError.js')
const { Address, City, Country, State } = require('../models/index.js');


const getUserAddresses = async (user_id) => {
    const addresses = await Address.findAll({
      where: { user_id },
      attributes: [
        "first_name",
        "last_name",
        "phone_number",
        "additional_phone_number",
        "is_default",
        "address",
        "address_id",
      ],
      include: [
        {
          model: State,
          as: "state",
          attributes: ["name"],
        },
        {
          model: Country,
          as: "country",
          attributes: ["name", "code"],
        },
        {
          model: City,
          as: "city",
          attributes: ["name"],
        },
      ],
    });
  
    return addresses;
};
  
const createNewAddress = async ({data, user_id, t}) => {
    const {
      address,
      is_default,
      first_name,
      last_name,
      phone_number,
      additional_phone_number,
      country_id,
      state_id,
      city_id,
    } = data;
  
    let addressDetails;
  
    // check for previous default address and set it to false
    if (is_default === true) {
      addressDetails = await Address.findOne(
        {
          where: {
            user_id,
            is_default: true,
          },
        },
        { transaction: t }
      );
  
      if (addressDetails) {
        addressDetails.is_default = false;
        addressDetails.save();
      }
    }
  
    addressDetails = await Address.create(
      {
        user_id,
        first_name,
        last_name,
        phone_number,
        additional_phone_number: additional_phone_number || null,
        is_default,
        address,
        country_id,
        state_id,
        city_id,
      },
      { transaction: t }
    );
  
    return true;
};
  
const getUserAddress = async ({address_id, user_id}) => {
    const address = await Address.findOne({
      where: { user_id, address_id },
      attributes: [
        "first_name",
        "last_name",
        "phone_number",
        "additional_phone_number",
        "is_default",
        "address",
        "address_id",
        "country_id",
        "state_id",
        "city_id"
      ],
      include: [
        {
          model: State,
          as: "state",
          attributes: ["name","state_id"],
        },
        {
          model: Country,
          as: "country",
          attributes: ["name", "code",'country_id'],
        },
        {
          model: City,
          as: "city",
          attributes: ["name","city_id"],
        },
      ],
    });
  
    if(!address) throw new AppError('Address not found',404);
  
    return address;
}

const updateAddress = async ({address_id, user_id, updateFields}) => {
  const address = await Address.findOne({ where: { address_id, user_id}});

  if(!address) throw new AppError('Not authorized', 403);

  const updated = await address.update(updateFields);

  return updated;
}

const deleteAddress = async ({address_id, user_id}) => {
  const address = await Address.findOne({ where: { address_id, user_id}});

  if(!address) throw new AppError('Not authorized to delete this address', 403);

  await address.destroy();

  return;
}

module.exports = {
    getUserAddresses,
    createNewAddress,
    getUserAddress,
    updateAddress,
    deleteAddress
}