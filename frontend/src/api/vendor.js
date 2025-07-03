import api from './axios.js'

const completeProfile = async (profile) => {

    try {

        const res = await api.post('/vendor/completeprofile',
            JSON.stringify(profile)
        );

        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

const getAllBusinessTypes = async () => {
    try {

        const res = await api.get('/vendor/businesstypes')


        return res.data.businessTypes;
    } catch (error) {
        throw error.response?.data || error.message || 'Something went wrong';
    }
}

export default {
    completeProfile,
    getAllBusinessTypes
}