import { useEffect, useLayoutEffect, useState, Suspense } from 'react'
import useAuth from './hooks/useAuth.jsx';
import api from './api/axios.js';
import { useCart } from './hooks/useCart.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import Loading from './components/ui/Loading';  

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { refreshToken, access_token, getUserDetails, login, logout, isAuthenticated} = useAuth();
  const { cartItems, syncCartToDatabase, fetchCartFromDatabase, products } = useCart();

  // Refresh token on app load
  useLayoutEffect(() => {
    const fetchToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
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

  api.interceptors.request.use((config) => {
    if(access_token) config.headers['Authorization'] = `Bearer ${access_token}`

    return config
  })

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const response = await refreshToken();
          if (response?.payload?.access_token) {
            const token = response.payload.access_token;
  
            login(response.payload); // save new token
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest); // retry original request
          }
        } catch (err) {
          console.error('Token refresh failed');
          logout();
          return Promise.reject(err); // important to break loop
        }
      }
  
      return Promise.reject(error);
    }
  );


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

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
