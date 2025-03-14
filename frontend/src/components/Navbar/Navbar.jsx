import {React, useState} from 'react'
import SearchIcon from '../../assets/icons/search-icon.svg'
import CartIcon from '../../assets/icons/cart-icon.svg'
import WishlistIcon from '../../assets/icons/wishlist-icon.svg'
import './navbar.css'

function Navbar() {
    const [toggle, setToggle] = useState(false)
  return (
    <nav className='container border-b-[1.5px] border-[#E5E5E5]'>
        <div className='navbar flex-wrap my-[25px] flex justify-between items-center'>
            <a className='font-bold text-2xl' href='#'>Exclusive</a>

            <div className='flex lg:hidden items-center space-x-6'>
                {/* mobile search bar */}
                <button>
                    <img src={SearchIcon} alt="search" />
                </button>

                {/* mobile nav toggle */}
                <button onClick={() => {
                    setToggle(!toggle)
                }}>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                    </svg>
                </button>
            </div>

            <div className={`flex-col max-lg:w-screen mt-[10px] lg:mt-[0] lg:flex lg:flex-row space-x-[148px] lg:items-center ${toggle ? 'flex' : 'hidden'} `}>
                {/* nav link */}
                <ul className='nav flex flex-col lg:flex-row max-md:space-y-[20px] space-x-[48px]'>
                    <li className='nav-item'>
                        <a className='nav-link active-link' href='/home'>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/contact'>Contact</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/about'>About</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/register'>Sign Up</a>
                    </li>
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
                    <a href="/wishlist">
                        <img src={WishlistIcon} alt="Wishlist" />
                    </a>
                    
                    {/* cart */}
                    <a href="/cart">
                        <img src={CartIcon} alt="Cart" />
                    </a>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar