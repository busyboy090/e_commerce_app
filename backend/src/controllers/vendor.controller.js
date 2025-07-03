const vendorService =  require('../services/vendorService.js');

const getAllBusinessTypes = async (req, res, next) => {

    try {

        const businessTypes = await vendorService.getAllBusinessTypes();
        
        res.status(200).json({ businessTypes });

    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllBusinessTypes
}