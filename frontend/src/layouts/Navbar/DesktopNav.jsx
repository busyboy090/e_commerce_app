import React, { useState, useRef, useEffect } from 'react';
import User from '@/assets/icons/user.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping, faXmark, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export function Link({name, icon, to}) {
    return (
        <>
            <li>
                <a href={to} className='flex items-center gap-[16px] p-[10px] text-[0.875rem] w-[100%] hover:bg-[white] hover:text-[black] rounded-[4px]'>
                    <FontAwesomeIcon icon={icon} className='text-[1.4rem]' />
                    <span className='text-[0.875rem]'>{name}</span>
                </a>
            </li>
        </>
    )
}


function DesktopNav({user, logout}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const toggle = (e) => {
        e.stopPropagation();
        setOpen(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(ref.current && !ref.current.contains(e.target)){
                setOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click',handleClickOutside)
    },[])
  return (
    <>
        <div className='group relative hidden lg:block' ref={ref}>
            <button type='button' onClick={toggle}>
                <img src={(user?.picture) || User} onError={(e) => {
                    e.target.src = User
                }} alt="Profile Picture" className='rounded-[50%] h-[35px] w-[35px]' />
            </button>
            {
                open && (
                    <div className= 'block w-[265px] h-[265px] backdrop-blur-md bg-black/40 absolute top-[40px] right-[10%] z-10 rounded-[4px] p-[20px]'>
                        <ul className='text-white'>
                            {/* manage account */}
                            <Link to='/account/profile' name='Manage My Account' icon={faUser}/>
                            {/* orders */}
                            <Link to='/account/orders' name='My Order' icon={faBagShopping}/>
                            {/* cancellation */}
                            <Link to='/account/cancellations' name='My Cancellations' icon={faXmark}/>
                            {/* My Reviews */}
                            <Link to='/account/reviews' name='My Reviews' icon={faStar}/>
                            {/* logout */}
                            <li>
                                <button type='button' onClick={logout} className='flex items-center gap-[16px] p-[10px] w-[100%] text-[0.875rem] hover:bg-[white] hover:text-[black] rounded-[4px]'>
                                    <FontAwesomeIcon icon={faRightFromBracket} className='text-[1.4rem]' />
                                    <span className='text-[0.875rem]'>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    </>
  )
}

export default DesktopNav