const { BusinessType } = require('../models/index.js');

const getAllBusinessTypes = async () => {
    return await BusinessType.findAll({
        attributes: ['business_type_id','name']
    });
}

module.exports = {
    getAllBusinessTypes
}