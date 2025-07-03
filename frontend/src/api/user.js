import api from './axios.js';

const getUserAddresses = async () => {

    try {

        const res = await api.get('/user/address');

        return res.data.addresses;
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

const createNewAddress = async (data) => {

    try {

        const res = await api.post('/user/address/create',
            JSON.stringify(data)
        )


        return res.data
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

export default {
    getUserAddresses,
    createNewAddress
}