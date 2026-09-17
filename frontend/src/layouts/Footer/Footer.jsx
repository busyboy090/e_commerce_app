import React from 'react';
import SendIcon from '@/assets/icons/icon-send.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
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
                        <FontAwesomeIcon icon={faFacebookF} className='text-[1.5rem]' />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter}  className='text-[1.5rem]'/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} className='text-[1.5rem]' />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedinIn}  className='text-[1.5rem]'/>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer