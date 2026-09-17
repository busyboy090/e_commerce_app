import { Link } from 'react-router-dom';

function NavLink({path, name, active}) {
  return (
    <>
        <li className='nav-item'>
            <Link className={`nav-link ${active ? 'active-link' : ''}`} to={path}>{name}</Link>
        </li>
    </>
  )
}

export default NavLink