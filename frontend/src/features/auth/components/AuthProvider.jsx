import React, { useState, useEffect, useRef } from 'react'
import Loading from '@/components/Loading/Loading';  
import useAuth from '@/hooks/useAuth.jsx';
import api from '@/services/axios.js';
import { useCart } from '@/hooks/useCart.jsx';

function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const { refreshToken, access_token, getUserDetails, login, logout, isAuthenticated} = useAuth();
    const { cartItems, syncCartToDatabase, fetchCartFromDatabase, products } = useCart();
    const hasFetchedUser = useRef(false);

    // Refresh token on app load
    useEffect(() => {
        const fetchToken = async () => {
            try {
                await refreshToken();
            } catch (error) {
                // Token refresh failed — user will need to re-authenticate
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


    // Fetch cart from database when user becomes authenticated
    useEffect(() => {
        if(isAuthenticated) {
            fetchCartFromDatabase()
        }
    }, [isAuthenticated])

    // Fetch user details once after initial authentication
    useEffect(() => {
        if(isAuthenticated && !hasFetchedUser.current) {
            hasFetchedUser.current = true;
            getUserDetails();
        }
        if(!isAuthenticated) {
            hasFetchedUser.current = false;
        }
    },[isAuthenticated])

    if(isLoading) {
        return (
            <Loading />
        )
    }
    return children
}

export default AuthProvider