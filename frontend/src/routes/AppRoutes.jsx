import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from  "@/layouts/MainLayout";

// Protected routes
import ProtectedRoute from './ProtectedRoute';

// Components
import Loading from '@/components/Loading/Loading';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'));
const Shop = lazy(() => import('@/pages/Shop'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const WishList = lazy(() => import('@/pages/WishList'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const AccountLayout = lazy(() => import('@/pages/account/AccountLayout'));
const Profile = lazy(() => import('@/pages/account/Profile'));
const Address = lazy(() => import('@/pages/account/Address'));
const AddAddress = lazy(() => import('@/pages/account/AddAddress'));
const EditAddress = lazy(() => import('@/pages/account/EditAddress'));
const VendorOnboarding = lazy(() => import('@/pages/vendor/VendorOnboarding'));

function AppRoutes() {
  return (
    <ErrorBoundary>
    <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
              <Route path='wishlist' element={<WishList />} />
              <Route path='cart' element={<Cart />} />
              <Route path='product/:id' element={<ProductDetails />} />

              <Route element={<ProtectedRoute />}>
                <Route path='checkout' element={<Checkout />} />
                <Route path='account' element={<AccountLayout />}>
                  <Route index element={<Navigate to='profile' />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='addresses' element={<Address />} />
                  <Route path='addresses/new' element={<AddAddress />} />
                  <Route path='addresses/:id/edit' element={<EditAddress />} />
                </Route>
                <Route path='vendor/onboarding' element={<VendorOnboarding />} />
              </Route>

              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  )
}

export default AppRoutes