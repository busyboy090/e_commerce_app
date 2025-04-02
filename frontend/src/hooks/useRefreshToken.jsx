import { React } from 'react';
import { privateApi } from '../api/axios';

function useRefreshToken() {

    const refresh = async () => {
        try {
            const response = await privateApi.get('/auth/refresh-token');
            return response?.data;
        } catch (error) {
            return null;
        }
    };

    return refresh;
}

export default useRefreshToken;
