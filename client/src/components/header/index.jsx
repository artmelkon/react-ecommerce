import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth';
import { auth } from '../../firebase/config';
import CartIcon from '../cart-icon';
import './index.styles.scss';

const Header = () => {
  const { user } = useContext(AuthContext);
  console.log("header user: ", user);
  return (
    <nav className='nav-menu container'>
      <div className="logo">
        <Link to='/'>NOMAD</Link>
      </div>
      <ul>
        <li>
          <Link to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/shop'>
            Shop
          </Link>
        </li>
        {
          !user ? (
            <li>
              <Link to='/signin'>
                Sign In
              </Link>
            </li>
          ) : (
            <li onClick={() => auth.signOut()}>
              Sign Out
            </li>
          )
        }
      </ul>
      <CartIcon />
    </nav>
  );
}

export default Header;
