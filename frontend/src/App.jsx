import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import Checkout from './components/checkout/Checkout';
// import About from './components/about/About'
// import Contact from './components/contact/Contact'
import NotFound from './components/NotFound'
import Login from './components/login/Login'
import Register from './components/register/Register';
import Cart from './components/cart/Cart';
// import Dashboard from './components/dashboard/Dashboard'
// import Admin from './components/admin/Admin'
// import User from './components/user/User';
import Wishlist from './components/wishlist/Wishlist';
import Layout from './components/Layout';
import Account from './components/account/Account';
import Profile from './components/account/Profile';
import Address from './components/account/address-book/Address';
import AddNewAddress from './components/account/address-book/AddNewAddress';
import EditAddress from './components/account/address-book/EditAddress';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />}></Route>
            <Route path='login' element={<Login />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='cart' element={<Cart />}></Route>
            <Route path='checkout' element={<Checkout />}></Route>
            <Route path='account/manage-account/profile' element={<Account component={<Profile />} />}></Route>
            <Route path='account/manage-account/address-book' element={<Account component={<Address />} />}></Route>
            <Route path='account/manage-account/address-book/add-address' element={<Account component={<Address component={<AddNewAddress/>} />} />}></Route>
            <Route path='account/manage-account/address-book/edit-address/:id' element={<Account component={<Address component={<EditAddress/>} />} />}></Route>
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
