import {React, useState} from 'react'
import SearchIcon from '../../assets/icons/search-icon.svg'
import CartIcon from '../../assets/icons/cart-icon.svg'
import WishlistIcon from '../../assets/icons/wishlist-icon.svg'
import './navbar.css';
import User from '../../assets/icons/user.svg'
import Account from '../../assets/icons/account.svg'
import OrderIcon from '../../assets/icons/icon-mallbag.svg'
import CancellationIcon from '../../assets/icons/icon-cancel.svg';
import ReviewIcon from '../../assets/icons/icon-reviews.svg';
import Logout from '../../assets/icons/icon-logout.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faBagShopping, faXmark, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { privateApi } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [accountDropdown, setAccountDropdown] = useState(false)
    const URL = window.location.href;

    const userIcon = URL.includes('/login') || URL.includes('/register');
    
    const { auth } = useAuth();

    const navigate = useNavigate()

    const logout = async () => {
        
        try {
            const response = await privateApi.post('/auth/logout');
            
            toast.success(response?.data?.message);
            localStorage.removeItem('authenticated')

            navigate('/login', { replace: true});
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

                    {
                        auth?.user && !userIcon ? (
                            <div className='relative mt-1 lg:hidden group'>
                                <button type='button'>
                                    <img src={User} alt="" />
                                </button>
                                <div className='hidden group-hover:block w-[265px] h-[265px] backdrop-blur-md bg-black/40 absolute top-[40px] right-[10%] z-10 rounded-[4px] p-[20px]'>
                                    <ul className='text-white'>
                                        {/* manage account */}
                                        <li>
                                            <a href="/account/manage-account/profile" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                <img src={Account} alt="" />
                                                <span className='text-[0.875rem]'>Manage My Account</span>
                                            </a>
                                        </li>
                                        {/* orders */}
                                        <li>
                                            <a href="/account/orders" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                <img src={OrderIcon} alt="" />
                                                <span className='text-[0.875rem]'>My Order</span>
                                            </a>
                                        </li>
                                        {/* cancellation */}
                                        <li>
                                            <a href="/account/cancellations" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                <img src={CancellationIcon} alt="" />
                                                <span className='text-[0.875rem]'>My Cancellations</span>
                                            </a>
                                        </li>
                                        {/* My Reviews */}
                                        <li>
                                            <a href="/account/reviews" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                <img src={ReviewIcon} alt="" />
                                                <span className='text-[0.875rem]'>My Reviews</span>
                                            </a>
                                        </li>
                                        {/* logout */}
                                        <li>
                                            <button type='button' onClick={logout} className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                <img src={Logout} alt="" />
                                                <span className='text-[0.875rem]'>Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : ""
                    }
                </div>

                <div className={`flex-col max-lg:w-screen mt-[10px] lg:mt-[0] lg:flex lg:flex-row space-x-[148px] lg:items-center ${toggle ? 'flex' : 'hidden'} `}>
                    {/* nav link */}
                    <ul className='nav flex flex-col lg:flex-row max-md:space-y-[20px] space-x-[48px]'>
                        <li className='nav-item'>
                            <a className='nav-link active-link' href='/'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/contact'>Contact</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/about'>About</a>
                        </li>
                       {
                        !auth?.access_token ? (
                            <li className='nav-item'>
                                <a className='nav-link' href='/register'>Sign Up</a>
                            </li>
                        ) : ''
                       }
                    </ul>

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
                                9
                            </span>
                        </a>
                        
                        {/* cart */}
                        <a href="/cart" className={`${URL.includes('login') || URL.includes('register') ? 'hidden' : ''} relative`}>
                            <img src={CartIcon} alt="Cart" />
                            <span className='bg-[#DB4444] rounded-full w-[20px] h-[20px] text-white text-[0.8rem] absolute top-[-4px] right-[-3px] flex items-center justify-center'>
                                99
                            </span>
                        </a>

                       {
                            auth?.user && !userIcon ? (
                                <div className='group relative hidden lg:block'>
                                    <button type='button' >
                                        <img src={(auth?.user?.picture) || User} alt="Profile Picture" className='rounded-[50%] h-[35px] w-[35px]' />
                                    </button>
                                    <div className= 'hidden group-hover:block w-[265px] h-[265px] backdrop-blur-md bg-black/40 absolute top-[40px] right-[10%] z-10 rounded-[4px] p-[20px]'>
                                        <ul className='text-white'>
                                            {/* manage account */}
                                            <li className='hover:bg-[white] hover:text-[black] rounded-[4px]'>
                                                <a href="/account/manage-account/profile" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                    <FontAwesomeIcon icon={faUser} className='text-[1.4rem]' />
                                                    <span className='text-[0.875rem]'>Manage My Account</span>
                                                </a>
                                            </li>
                                            {/* orders */}
                                            <li className='hover:bg-[white] hover:text-[black] rounded-[4px]'>
                                                <a href="/account/orders" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                    <FontAwesomeIcon icon={faBagShopping} className='text-[1.4rem]' />
                                                    <span className='text-[0.875rem]'>My Order</span>
                                                </a>
                                            </li>
                                            {/* cancellation */}
                                            <li className='hover:bg-[white] hover:text-[black] rounded-[4px]'>
                                                <a href="/account/cancellations" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                    <FontAwesomeIcon icon={faXmark} className='text-[1.4rem]' />
                                                    <span className='text-[0.875rem]'>My Cancellations</span>
                                                </a>
                                            </li>
                                            {/* My Reviews */}
                                            <li className='hover:bg-[white] hover:text-[black] rounded-[4px]'>
                                                <a href="/account/reviews" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                    <FontAwesomeIcon icon={faStar} className='text-[1.4rem]' />
                                                    <span className='text-[0.875rem]'>My Reviews</span>
                                                </a>
                                            </li>
                                            {/* logout */}
                                            <li className='hover:bg-[white] hover:text-[black] rounded-[4px]'>
                                                <button type='button' onClick={logout} className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                                                    <FontAwesomeIcon icon={faRightFromBracket} className='text-[1.4rem]' />
                                                    <span className='text-[0.875rem]'>Logout</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : ""
                       }
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar