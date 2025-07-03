import api from './axios.js'

const registerCustomer = async (data) => {

    try {
        const response = await api.post('/customer/register', {
            ...data,
        });

        return response.data
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

const registerVendor = async (data) => {

    try {
        const response = await api.post('/vendor/register', {
            ...data,
        });

        return response.data
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

export default {
    registerCustomer,
    registerVendor
}