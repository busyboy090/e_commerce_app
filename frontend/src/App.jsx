import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import Checkout from './components/checkout/Checkout';
// import About from './components/about/About'
// import Contact from './components/contact/Contact'
import NotFound from './components/NotFound'
import Login from './components/auth/Login'
import Register from './components/auth/Register';
import Cart from './components/cart/Cart.jsx';
// import Dashboard from './components/dashboard/Dashboard'
// import Admin from './components/admin/Admin'
// import User from './components/user/User';
import Wishlist from './components/wishlist/Wishlist.jsx';
import Layout from './components/Layout';
import Account from './components/account/Account';
import Profile from './components/account/Profile';
import Address from './components/account/address-book/Address';
import AddNewAddress from './components/account/address-book/AddNewAddress';
import EditAddress from './components/account/address-book/EditAddress';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ForgetPassword from './components/auth/forgot-password/ForgetPassword';
import useAuth from './hooks/useAuth.jsx';
import api from './api/axios.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { refreshToken, access_token, login, logout, isAuthenticated} = useAuth();

  // Refresh token on app load
  useEffect(() => {
    const fetchToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchToken();
  }, []);

  api.interceptors.request.use((config) => {
      if(access_token) config.headers['Authorization'] = `Bearer ${access_token}`

      return config
  })

  api.interceptors.response.use((res) => res, async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              const response = await refreshToken();
              if (response.payload) {
                  const token = response.payload.access_token;
                  login(response);
                  originalRequest.headers['Authorization'] = `Bearer ${token}`;
                  return api(originalRequest);
              }
          } catch (err) {
              console.error('Failed to refresh token:', err);
              logout()
          }
      }
      return Promise.reject(error); 
  });

  return (
    <>
      <Router>
        <Routes>
          {/* layout for all routes */}
          <Route path='/' element={<Layout />}>

            <Route index element={<Home />} />
            <Route path='register' element={<Register />}></Route>
            <Route path='login' element={<Login />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='cart' element={<Cart />}></Route>
            <Route path='forgot-password' element={<ForgetPassword />}></Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='checkout' element={<Checkout />}></Route>
              <Route path='account/manage-account/profile' element={<Account component={<Profile />} />}></Route>
              <Route path='account/manage-account/address-book' element={<Account component={<Address />} />}></Route>
              <Route path='account/manage-account/address-book/add-address' element={<Account component={<Address component={<AddNewAddress/>} />} />}></Route>
              <Route path='account/manage-account/address-book/edit-address/:id' element={<Account component={<Address component={<EditAddress/>} />} />}></Route>
            </Route>

            {/* Missing Routes */}
            <Route path='*' element={<NotFound />} />
          </Route>
          {/* <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/user' element={<User />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
