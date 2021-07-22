import React from 'react';
import {FaMapMarked} from 'react-icons/fa'
import { Link } from 'react-router-dom';

import {useContext} from 'react';
import {UserContext, TokenContext} from '../App'

function Navbar() {

  const {user,removeUser} = useContext(UserContext)
  const {removeToken} = useContext(TokenContext)

  const handleLogout = () => {
    removeUser()
    removeToken()
  }

  return (
    <nav className="bg-fb-blue-light text-white p-2 flex items-center">
      <a href = "/" className="text-2xl">MapPals</a>
      <FaMapMarked className = "mx-2 w-4"/>

      <ul className = "justify-end flex gap-7 w-full navbar">

        {user ? <>
                <li>
                  <a href="/">search friends</a>
                </li>
                <li>
                  <a href="/profile">my profile: {user.username}</a>
                </li>
                <li>
                  <button onClick = {handleLogout}>log out</button>
                </li>
                </>
        :<>
          <li className = "bg-yellow-400 rounded-sm px-2">
          <a href="/signin/demo">Demo</a>
        </li>
        <li>
          <Link to = '/login'>Log in</Link>
        </li>
        <li>
          <Link to= "/signup">Sign Up</Link>
        </li>
        </>
        }

      </ul>
    </nav>
  );
}

export default Navbar;
