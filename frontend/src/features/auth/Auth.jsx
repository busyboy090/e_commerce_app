import React from 'react';
import useAuth from '@/hooks/useAuth';

function Auth({ children }) {
    const { isAuthenticated } = useAuth()

    if(isAuthenticated) {
        return children
    }else {
        return null
    }
}

export default Auth;