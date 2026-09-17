import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import User from '@/assets/icons/user.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faBagShopping, 
  faXmark, 
  faRightFromBracket 
} from "@fortawesome/free-solid-svg-icons";

export function MenuLink({ name, icon, to, onClick }) {
  return (
    <li>
      <RouterLink 
        to={to} 
        onClick={onClick}
        className='flex items-center gap-3.5 p-2.5 text-sm w-full text-white/90 hover:bg-white hover:text-black rounded transition-colors duration-150'
      >
        <FontAwesomeIcon icon={icon} className='text-base w-5 text-center' />
        <span>{name}</span>
      </RouterLink>
    </li>
  );
}

function ProfileMenu({ user, logout, isAuthenticated }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggle = (e) => {
    e.stopPropagation();
    setOpen(prev => !prev);
  };

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={ref}>
      <button 
        type='button' 
        onClick={toggle} 
        aria-label="Toggle profile menu"
        className='focus:outline-none flex items-center'
      >
        <img 
          src={user?.picture || User} 
          onError={(e) => { e.target.src = User; }} 
          alt="Profile" 
          className='rounded-full h-[35px] w-[35px] object-cover border border-white/20' 
        />
      </button>

      {open && (
        <div className='absolute top-[45px] right-0 z-50 w-[240px] rounded-lg bg-neutral-900/90 backdrop-blur-md shadow-xl border border-white/10 p-3'>
          {isAuthenticated ? (
            <ul className='space-y-1'>
              <MenuLink to='/account/profile' name='Manage My Account' icon={faUser} onClick={closeMenu} />
              <MenuLink to='/account/orders' name='My Orders' icon={faBagShopping} onClick={closeMenu} />
              <MenuLink to='/account/cancellations' name='My Cancellations' icon={faXmark} onClick={closeMenu} />
              <li className='pt-1 border-t border-white/10 mt-1'>
                <button 
                  type='button' 
                  onClick={() => { logout(); closeMenu(); }} 
                  className='flex items-center gap-3.5 p-2.5 w-full text-sm text-white/90 hover:bg-white hover:text-black rounded transition-colors duration-150'
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className='text-base w-5 text-center' />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          ) : (
            <div className='flex flex-col gap-3 py-1 px-1 text-center'>
              <div className='text-left px-1'>
                <p className='text-white font-semibold text-sm'>Welcome</p>
                <p className='text-neutral-400 text-xs mt-0.5'>Access your orders and profile</p>
              </div>

              <RouterLink
                to='/login'
                onClick={closeMenu}
                className='w-full py-2 px-3 text-sm font-medium text-white bg-[#DB4444] hover:bg-[#c93535] rounded transition-colors shadow-sm'
              >
                Log In
              </RouterLink>

              <div className='text-xs text-neutral-400'>
                New customer?{' '}
                <RouterLink
                  to='/register'
                  onClick={closeMenu}
                  className='text-white underline underline-offset-2 hover:text-[#DB4444] transition-colors font-medium'
                >
                  Create account
                </RouterLink>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;