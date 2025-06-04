import React, { useLayoutEffect } from 'react';
import { Outlet} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from '../hooks/useAuth';

function Layout() {
  
  return (
    <>
        <ToastContainer
          autoClose={3000} // Closes after 3 seconds
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />

        <Navbar />

        <Outlet />

        <Footer />
    </>
  )
}

export default Layout