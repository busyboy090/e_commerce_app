import React from 'react';
import NavLink from './NavLink';

function Nav() {
  return (
    <>
        {/* nav link */}
        <ul className='nav flex flex-col lg:flex-row max-md:space-y-[20px] space-x-[48px]'>
            <NavLink path='/' name='Home' active={true} />

            <NavLink path='/contact' name='Contact' active={false} />

            <NavLink path='/about' name='About' active={false} />
        </ul>
    </>
  )
}

export default Nav;
