import React from 'react';
import SendIcon from '@/assets/icons/icon-send.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='bg-black pt-[80px] pb-[24px]'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-[60px] gap-[87px] container'>
            <div className='text-white max-md:col-span-2'>
                <h2 className='text-white text-[1.5rem] font-bold mb-[24px]'>Exclusive</h2>
                <h2 className='mb-[24px] text-[1.25rem]'>Subscribe</h2>
                <p className='text-[1rem] mb-[16px]'>Get 10% off your first order</p>
                <form >
                    <div className='border-1 border-white w-[100%] lg:w-[217px] ps-[10px] h-[48px] flex justify-center items-center'>
                        <input type="email" placeholder='Enter your email' className='w-[70%] focus:outline-0' />
                        <button className='text-white px-[20px]' type="submit" aria-label="Subscribe">
                            <img src={SendIcon} alt="Send" />
                        </button>
                    </div>
                </form>
            </div>

            <div className='text-white'>
                <h2 className='text-white text-[1.5rem] font-bold mb-[24px]'>Support</h2>
                <h2 className='mb-[24px]'>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</h2>
                <p className='text-[1rem] mb-[16px]'>exclusive@gmail.com</p>
                <p>+88015-88888-9999</p>
            </div>

            <div className='text-white'>
                <h2 className='text-white text-[1.5rem] font-bold mb-[24px]'>Account</h2>
                <ul className='flex flex-col gap-[16px]'>
                    <li>
                        <Link to='/account/profile'>My Account</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login / Register</Link>
                    </li>
                    <li>
                        <Link to='/cart'>Cart</Link>
                    </li>
                    <li>
                        <Link to='/wishlist'>Wishlist</Link>
                    </li>
                    <li>
                        <Link to='/shop'>Shop</Link>
                    </li>
                </ul>
            </div>

            <div className='text-white'>
                <h2 className='text-white text-[1.5rem] font-bold mb-[24px]'>Quick Link</h2>
                <ul className='flex flex-col gap-[16px]'>
                    <li>
                        <Link to='/'>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to='/'>Terms Of Use</Link>
                    </li>
                    <li>
                        <Link to='/'>FAQ</Link>
                    </li>
                    <li>
                        <Link to='/'>Contact</Link>
                    </li>
                </ul>
            </div>

            <div className='text-white max-md:col-span-2'>
                <h2 className='text-white text-[1.5rem] font-bold mb-[24px]'>Download App</h2>
                <p className='text-[0.75rem]'>Save $3 with App New User Only</p>
                
                <div className='flex gap-[30px] mt-[20px]'>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
