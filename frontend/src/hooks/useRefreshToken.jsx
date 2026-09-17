import api from '@/services/axios';

function useRefreshToken() {
    const refresh = async () => {
        try {
            const response = await api.get('/auth/refresh-token');
            return response?.data;
        } catch (error) {
            return null;
        }
    };

    return refresh;
}

export default useRefreshToken;
