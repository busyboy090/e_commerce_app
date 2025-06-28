const AppError = require('../utils/appError.js')
const axios = require('axios')

const getLocationFromIp = async (ip) => {
    try {
        const response = await axios.get(`https://ipwho.is/${ip}`);

        const { city, region, country_name } = response ;

        console.log(response)

        return {
            city,
            region,
            country_name
        }
    } catch (err) {
        console.error('Error fetching location from IP:', err.message);
        throw new AppError('Failed to retrieve location information', 500);
    }
}

module.exports = getLocationFromIp;