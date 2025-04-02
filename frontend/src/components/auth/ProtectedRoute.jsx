import { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { verifyToken } from './AuthProvider';

function ProtectedRoute() {
    const { auth } = useAuth();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(verifyToken(auth?.access_token));

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoute;
