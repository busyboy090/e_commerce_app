import React, { useState, useEffect, useLayoutEffect} from 'react'
import Loading from '@/components/ui/Loading';  
import useAuth from '@/hooks/useAuth.jsx';
import api from '@/api/axios.js';
import { useCart } from '@/hooks/useCart.jsx';

function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const { refreshToken, access_token, getUserDetails, login, logout, isAuthenticated} = useAuth();
    const { cartItems, syncCartToDatabase, fetchCartFromDatabase, products } = useCart();

    // Refresh token on app load
    useLayoutEffect(() => {
        const fetchToken = async () => {
            try {
                await refreshToken();
            } catch (error) {
                // token refresh failed
            } finally {
                setIsLoading(false);
            }
        };

        const authenticate = JSON.parse(localStorage.getItem('exclusive_authenticate'));

        if(authenticate) {
            fetchToken();
        }else {
            setIsLoading(false)
        }
    
    }, []);

    // Axios interceptors - registered once, cleaned up on unmount
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use((config) => {
            if(access_token) config.headers['Authorization'] = `Bearer ${access_token}`
            return config
        });

        const responseInterceptor = api.interceptors.response.use(
            (res) => res,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const response = await refreshToken();
                        if (response?.payload?.access_token) {
                            const token = response.payload.access_token;

                            login(response.payload);
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            return api(originalRequest);
                        }
                    } catch (err) {
                        logout();
                        return Promise.reject(err);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [access_token, refreshToken, login, logout]);


    useEffect(() => {
        if(isAuthenticated) {
        fetchCartFromDatabase()
        }
    }, [isAuthenticated, cartItems.length])

    useEffect(() => {
        if(isAuthenticated) {
            getUserDetails();
        }
    },[access_token])

    if(isLoading) {
        return (
            <Loading />
        )
    }
    return children
}

export default AuthProvider