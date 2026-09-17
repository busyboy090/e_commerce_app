import { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Outlet, Link, useLocation } from 'react-router-dom';

function SidebarLink({ label, href, isActive }) {
  return (
    <li className={isActive ? 'text-[#DB4444]' : 'text-[rgba(0,0,0,0.4)]'}>
      <Link to={href}>{label}</Link>
    </li>
  );
}

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    {
      title: 'Manage My Account',
      links: [
        { label: 'My Profile', href: '/account/profile', isActive: path.includes('profile') },
        { label: 'Address Book', href: '/account/addresses', isActive: path.includes('addresses') },
        { label: 'My Payment Options', href: '/account/payment-methods', isActive: path.includes('payment-methods') },
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
    <ul>
      {links.map((section, index) => (
        <li key={index}>
          <h3 className='my-2'>{section.title}</h3>
          <ul className="md:ms-[35px] mt-[16px] flex flex-col gap-[8px]">
            {section.links.map((link, linkIndex) => (
              <SidebarLink key={linkIndex} {...link} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function AccountLayout() {
  const { user } = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef(null);

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setSidebar(prev => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSidebar(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="container mb-[140px!important] relative">
      <div className="flex justify-between mt-[15px] mb-[30px] md:my-[30px] lg:my-[80px]">
        <div className='flex gap-5'>
          <button className="text-left font-semibold text-2xl lg:hidden" onClick={toggleSidebar}>☰</button>
          <p className='mt-1 text-[1rem] max-md:hidden'>Home / My Account</p>
        </div>
        <p className='text-xl md:text-2xl'>
          Welcome! <span className="text-[#DB4444] font-bold">{user?.first_name}</span>
        </p>
      </div>

      <div className="grid grid-col-1 lg:grid-cols-12 md:gap-[80px] lg:gap-[100px]">
        <div className={`max-lg:w-[50%] max-lg:absolute ${sidebar ? 'max-lg:block' : 'max-lg:hidden'} bg-white z-99 h-[100%] lg:col-span-4`} ref={ref}>
          <Sidebar />
        </div>

        <div className="lg:col-span-8 md:shadow md:p-[40px] lg:p-[80px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
