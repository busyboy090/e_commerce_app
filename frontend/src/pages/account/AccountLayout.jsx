import React, { useEffect, useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';

// SidebarLink Component
function SidebarLink({ label, href, isActive }) {
  return (
    <li className={isActive ? 'text-[#DB4444]' : 'text-[rgba(0,0,0,0.4)]'}>
      <a href={href}>{label}</a>
    </li>
  );
}

// SidebarSection Component
function Sidebar() {
  const URL = window.location.href;
  // Sidebar configuration
  const links = [
    {
      title: 'Manage My Account',
      links: [
        { label: 'My Profile', href: '/account/profile', isActive: URL.includes('profile') },
        { label: 'Address Book', href: '/account/addresses', isActive: URL.includes('addresses') },
        { label: 'My Payment Options', href: '/account/payment-methods', isActive: URL.includes('payment-methods') },
      ],
    },
    {
      title: 'My Orders',
      links: [
        { label: 'My Returns', href: '#', isActive: false },
        { label: 'My Cancellations', href: '#', isActive: false },
      ],
    },
    {
      title: 'My Wishlist',
      links: [],
    },
  ];
  return (
    <>
      <ul>
        {
          links.map((link, index) => (
            <li key={index} >
              <h3 className='my-2'>{link.title}</h3>
              <ul className="md:ms-[35px] mt-[16px] flex flex-col gap-[8px]">
                {link.links.map((link, index) => (
                  <SidebarLink key={index} {...link} />
                ))}
              </ul>
            </li>
          ))
        }
      </ul>
    </>
  );
}

// Main Account Component
function AccountLayout() {
  const { user } = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef(null)

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setSidebar(prev => !prev)
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if(ref.current && !ref.current.contains(e.target)) {
        setSidebar(false)
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  },[])

  return (
    <div className="container mb-[140px!important] relative">
      {/* Header */}
      <div className="flex justify-between mt-[15px] mb-[30px] md:my-[30px] lg:my-[80px]">
        <div className='flex gap-5'>
          <button className="text-left font-semibold text-2xl lg:hidden" onClick={toggleSidebar}>☰</button>
          <p className='mt-1 text-[1rem] max-md:hidden'>Home / My Account</p>
        </div>
        <p className='text-xl md:text-2xl'>
          Welcome! <span className="text-[#DB4444] font-bold">{user?.first_name}</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-col-1 lg:grid-cols-12 md:gap-[80px] lg:gap-[100px]">
        <div className={`max-lg:w-[50%] max-lg:absolute ${sidebar ? 'max-lg:block' : 'max-lg:hidden'} bg-white z-99 h-[100%] lg:col-span-4`} ref={ref}>
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 md:shadow md:p-[40px] lg:p-[80px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;