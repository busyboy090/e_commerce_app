const countryService = require('../services/countryService.js');

const getAllCountries = async (req, res, next ) => {

    try  {

        const countries = await countryService.getAllCountries();

        res.status(200).json({ countries });

    } catch (err) {
        next(err)
    }
}

const getAllStatesOfACountry = async(req,res,next) => {
    const { country_id } = req.params;

    if(!country_id) return res.status(400).json({ error: true, msg: 'Country is required'});
    
    try {

        const states = await countryService.getAllStatesOfACountry(country_id);

        res.status(200).json({ states });

    } catch (err) {
        next(err)
    }
}

const getAllCitiesOfAState = async (req, res, next) => {
    const { state_id } = req.params;

    if(!state_id) return res.status(400).json({ error: true, msg: 'State is required'});

    try {

        const cities = await countryService.getAllCitiesOfAState(state_id);

        res.status(200).json({ cities });
        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllCountries,
    getAllStatesOfACountry,
    getAllCitiesOfAState
}