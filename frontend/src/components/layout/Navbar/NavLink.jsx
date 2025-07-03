import React from 'react'

function NavLink({path, name, active}) {
  return (
    <>
        <li className='nav-item'>
            <a className={`nav-link ${active ? 'active-link' : ''}`} href={path}>{name}</a>
        </li>
    </>
  )
}

export default NavLink