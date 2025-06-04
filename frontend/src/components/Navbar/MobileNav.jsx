import React from 'react';
import User from '../../assets/icons/user.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping, faXmark, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

function MobileNav({user, logout}) {
  return (
    <>
        <div className='relative mt-1 lg:hidden group'>
            <button type='button'>
                <img src={(user?.picture) || User} onError={(e) => {
                    e.target.src = User
                }} alt="" />
            </button>
            <div className='hidden group-hover:block w-[265px] h-[265px] backdrop-blur-md bg-black/40 absolute top-[40px] right-[10%] z-10 rounded-[4px] p-[20px]'>
                <ul className='text-white'>
                    {/* manage account */}
                    <li>
                        <a href="/account/manage-account/profile" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                            <FontAwesomeIcon icon={faUser} className='text-[1.4rem]' />
                            <span className='text-[0.875rem]'>Manage My Account</span>
                        </a>
                    </li>
                    {/* orders */}
                    <li>
                        <a href="/account/orders" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                            <FontAwesomeIcon icon={faBagShopping} className='text-[1.4rem]' />
                            <span className='text-[0.875rem]'>My Order</span>
                        </a>
                    </li>
                    {/* cancellation */}
                    <li>
                        <a href="/account/cancellations" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                            <FontAwesomeIcon icon={faXmark} className='text-[1.4rem]' />
                            <span className='text-[0.875rem]'>My Cancellations</span>
                        </a>
                    </li>
                    {/* My Reviews */}
                    <li>
                        <a href="/account/reviews" className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                            <FontAwesomeIcon icon={faStar} className='text-[1.4rem]' />
                            <span className='text-[0.875rem]'>My Reviews</span>
                        </a>
                    </li>
                    {/* logout */}
                    <li>
                        <button type='button' onClick={logout} className='flex items-center gap-[16px] p-[10px] text-[0.875rem]'>
                            <FontAwesomeIcon icon={faRightFromBracket} className='text-[1.4rem]' />
                            <span className='text-[0.875rem]'>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default MobileNav