const { Country, State, City } = require('../models/index.js');
const AppError = require('../utils/appError.js');

const getAllCountries = async () => {
    const countries = await Country.findAll({ attributes: ['name', 'country_id']});

    if(!countries || countries.length < 1) throw new AppError('Countries not found', 404);
    
    return countries;
}

const  getAllStatesOfACountry = async (country_id) => {
    const states = await State.findAll({
        where: { country_id },
        attributes: ['state_id','name']
    })

    if(!states || states.length < 1) throw new AppError('States not found', 404);

    return states;
}

const getAllCitiesOfAState = async (state_id) => {
    const cities = await City.findAll({
        where: { state_id },
        attributes: ['name','state_id','city_id']
    })

    if(!cities || cities.length < 1) throw new AppError('Cities not found', 404);

    return cities
}

module.exports = {
    getAllCountries,
    getAllStatesOfACountry,
    getAllCitiesOfAState
}