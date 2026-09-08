import api from './axios.js';

const getUserAddresses = async () => {

    try {

        const res = await api.get('/user/addresses');

        return res.data.addresses;
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

const createNewAddress = async (data) => {

    const formData = {
        phone_number: data.phone_number,
        first_name: data.first_name,
        last_name: data.last_name,
        country_id: data.country.country_id,
        state_id: data.state.state_id,
        city_id: data.city.city_id,
        address: data.address,
        additional_phone_number: data.additional_phone_number,
        is_default: data.is_default,
        additional_information: data.additional_information
    }

    try {

        const res = await api.post('/user/address/create',{
            ...formData
        })


        return res.data
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

const getAddress = async (address_id) => {
    try {
        const res = await api.get(`/user/address?address_id=${address_id}`)

        return res.data.address
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

export default {
    getUserAddresses,
    createNewAddress,
    getAddress
}