import React, { Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from  "@/layouts/MainLayout";
import DashboardLayout from '@/layouts/DashboardLayout';

// Protected routes
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Login from '@/pages/Login'
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import WishList from '@/pages/WishList';
import About from '@/pages/About';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Contact from '@/pages/Contact';
import ForgetPassword from '@/pages/ForgetPassword'; 
import ProductDetails from '@/pages/ProductDetails';
import AccountLayout from '@/pages/account/AccountLayout';
import Profile from '@/pages/account/Profile';
import Address from '@/pages/account/Address';
import VendorOnboarding from '@/pages/vendor/VendorOnboarding';
import AddAddress from '@/pages/account/AddAddress';
import EditAddress from '@/pages/account/EditAddress';
import useApp from '@/hooks/useApp';


// Features

// Components
import Loading from '@/components/ui/Loading';

function AppRoutes() {
  return (
    <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* layout for all routes */}
            <Route path='/' element={<MainLayout />}>

              <Route index element={<Home />} />
              <Route path='register' element={<Register />}></Route>
              <Route path='login' element={<Login />} />
              <Route path='wishlist' element={<WishList />} />
              <Route path='cart' element={<Cart />}></Route>
              <Route path='forgot-password' element={<ForgetPassword />}></Route>
              <Route path='product/:id' element={<ProductDetails />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>

                <Route path='checkout' element={<Checkout />}></Route>

                {/* accounnt routes */}
                <Route path='account' element={<AccountLayout />}>
                  <Route index element={<Navigate to='profile' />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='addresses' element={<Address />}/>
                  <Route path='addresses/new' element={<AddAddress/>} />
                  <Route path='addresses/:id/edit' element={<EditAddress/>} />
                </Route>

                {/* complete vendor profile */}
                <Route path='vendor/onboarding' element={<VendorOnboarding />}/>
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
        </Suspense>
      </Router>
  )
}

export default AppRoutes