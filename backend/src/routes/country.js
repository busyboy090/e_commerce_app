const express = require('express');
const countryController = require('../controllers/country.controller.js');

const router = express.Router();

router.get('/', countryController.getAllCountries);
router.get('/:country_id/states', countryController.getAllStatesOfACountry);
router.get('/:state_id/cities', countryController.getAllCitiesOfAState)


module.exports = router