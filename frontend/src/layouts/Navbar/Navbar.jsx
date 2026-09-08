import {React, useEffect, useState} from 'react'
import SearchIcon from '@/assets/icons/search-icon.svg'
import CartIcon from '@/assets/icons/cart-icon.svg'
import WishlistIcon from '@/assets/icons/wishlist-icon.svg'
import './navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faBagShopping, faXmark, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import api from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useCart } from '@/hooks/useCart';
import { useWishList } from '@/hooks/useWishList';
import Nav from './Nav';
import Auth from '@/features/auth/Auth';
import ProfileMenu from './ProfileMenu';

function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [accountDropdown, setAccountDropdown] = useState(false)
    const URL = window.location.href;

    const { cartItems } = useCart();
    const { wishList } = useWishList();

    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); 
    const totalWishList = wishList.length; 


    const userIcon = URL.includes('/login') || URL.includes('/register');
    
    const { isAuthenticated, user, logout } = useAuth();

    const navigate = useNavigate()

    const handleLogout = async () => {
        
        try {
            const response = await api.post('/auth/logout');
            
            toast.success(response?.data?.message);

            if(response.status === 200) {
                logout()
                navigate('/login', { replace: true});
            }

        } catch(err) {
            console.log(err)
        } 
    }

  return (
    <nav className='border-b-[1.5px] border-[#E5E5E5]'>
        <div className='container'>
            <div className='navbar flex-wrap my-[25px] flex justify-between items-center'>
                <div className='flex gap-5 items-center'>
                    {/* mobile nav toggle */}
                    <button onClick={() => {
                        setToggle(!toggle)
                    }} className='text-[1.5rem] lg:hidden'>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <a className='font-bold text-3xl' href='/'>Exclusive</a>
                </div>

                <div className='flex lg:hidden items-center space-x-6'>
                    {/* mobile search bar */}
                    <button>
                        <img src={SearchIcon} alt="search" />
                    </button>

                    <Auth>
                        <ProfileMenu user={user} logout={handleLogout} />
                    </Auth>
                </div>

                <div className={`flex-col max-lg:w-screen mt-[10px] lg:mt-[0] lg:flex lg:flex-row space-x-[148px] lg:items-center ${toggle ? 'flex' : 'hidden'} `}>
                    <Nav isAuthenticated={isAuthenticated}/>

                    <div className='flex  items-center space-x-6 mt-[10px] lg:mt-[0]'>
                        {/* search form */}
                        <form className='hidden lg:block'>
                            <div className='bg-[#F5F5F5] flex space-x-[20px] items-center rounded-sm ps-[20px] py-[7px] pe-[12px]'>
                                <input type="text" placeholder='What are you looking for?' className='w-50 focus:bg-transparent focus:outline-[0]'/>
                                <button>
                                    <img src={SearchIcon} alt="search" />
                                </button>
                            </div>
                        </form>

                        {/* wishlist */}
                        <a href="/wishlist" className={`${URL.includes('login') || URL.includes('register')  ? 'hidden' : ''} relative`}>
                            <img src={WishlistIcon} alt="Wishlist" className='skeleton'/>
                            <span className='bg-[#DB4444] rounded-full w-[18px] h-[18px] text-white text-[0.75rem] absolute top-[-1px] right-[-3px] flex items-center justify-center'>
                                { totalWishList }
                            </span>
                        </a>
                        
                        {/* cart */}
                        <a href="/cart" className={`${URL.includes('login') || URL.includes('register') ? 'hidden' : ''} relative`}>
                            <img src={CartIcon} alt="Cart" />
                            <span className='bg-[#DB4444] rounded-full w-[20px] h-[20px] text-white text-[0.8rem] absolute top-[-4px] right-[-3px] flex items-center justify-center'>
                                { totalCartQuantity }
                            </span>
                        </a>

                       <Auth>
                            <ProfileMenu user={user} logout={handleLogout}/>
                       </Auth>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar