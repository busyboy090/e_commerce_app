import React, { useState } from 'react';
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
function SidebarSection({ title, links }) {
  return (
    <li>
      <h3>{title}</h3>
      <ul className="md:ms-[35px] mt-[16px] flex flex-col gap-[8px]">
        {links.map((link, index) => (
          <SidebarLink key={index} {...link} />
        ))}
      </ul>
    </li>
  );
}

// MobileNavigation Component
function MobileNavigation() {
  return (
    <div className="md:hidden bg-white p-4 rounded-lg shadow-md mb-4">
      <button className="w-full text-left font-semibold">☰ Manage Account</button>
    </div>
  );
}

// Main Account Component
function AccountLayout() {
  const URL = window.location.href;
  const { user, profile } = useAuth();

  // Sidebar configuration
  const sidebarSections = [
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
    <div className="container mb-[140px!important]">
      {/* Header */}
      <div className="flex justify-between mt-[15px] mb-[30px] md:my-[30px] lg:my-[80px]">
        <p>Home / My Account</p>
        <p className='text-xl md:text-2xl'>
          Welcome! <span className="text-[#DB4444] font-bold">{user?.first_name}</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-col-1 md:grid-cols-12 md:gap-[80px] lg:gap-[100px]">
        {/* Sidebar (Desktop) */}
        <aside className="max-md:hidden md:col-span-3">
          <ul className="flex flex-col gap-[24px]">
            {sidebarSections.map((section, index) => (
              <SidebarSection key={index} {...section} />
            ))}
          </ul>
        </aside>

        {/* Mobile Navigation */}
        <MobileNavigation />

        {/* Main Content Area */}
        <div className="md:col-span-7 lg:col-span-8 md:shadow md:p-[40px] lg:p-[80px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;