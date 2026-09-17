import api from './axios.js';

const getAllCountries = async () => {    
    try {
        const res = await api.get('/country');

        return res.data.countries
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
    
}

const getAllStatesOfACountry = async (country_id) => {
    if(!country_id) return [];
    try {

        const res = await api.get(`/country/${country_id}/states`);

        return res.data.states
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

const getAllCitiesOfAState = async (state_id) => {
    if(!state_id) return []
    try {

        const res = await api.get(`/country/${state_id}/cities`);

        return res.data.cities
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

export default {
    getAllCountries,
    getAllStatesOfACountry,
    getAllCitiesOfAState
}
