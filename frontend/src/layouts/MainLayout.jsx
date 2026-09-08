import React, { useLayoutEffect } from 'react';
import { Outlet} from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './Footer/Footer.jsx'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
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

export default MainLayout;