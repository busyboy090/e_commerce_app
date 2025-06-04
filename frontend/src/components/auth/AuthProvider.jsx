import { createContext, useState, useEffect, useLayoutEffect } from 'react';
import { privateApi } from '../../api/axios';
import useRefreshToken from '../../hooks/useRefreshToken';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({});

export function verifyToken(token) {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (err) {
        console.error('Invalid token:', err);
        return false;
    }
}

function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const refreshToken = useRefreshToken();
    const [loading, setLoading] = useState(true);
    const authenticated = JSON.parse(localStorage.getItem('authenticated'));

    useEffect(() => {
        async function fetchToken() {
            const newAuth = await refreshToken();
            setAuth(newAuth);
            setLoading(false)
        }

        
        if(authenticated === true) {
            fetchToken();
        }else {
            setLoading(false)
        }

    }, []);

    useEffect(() => {
        if (auth?.access_token) {
            const isValid = verifyToken(auth.access_token);
            if (!isValid) refreshToken().then(setAuth);
        }
    }, [auth]);

    useLayoutEffect(() => {
        privateApi.interceptors.request.use(config => {
            if (auth?.access_token) {
                config.headers['Authorization'] = `Bearer ${auth.access_token}`;
            }
            return config;
        });
    }, [auth]);

    if(loading) {
        return (
            <div className='flex justify-center items-center h-screen bg-[black]'>
                <svg viewBox="25 25 50 50" className='loading'>
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
