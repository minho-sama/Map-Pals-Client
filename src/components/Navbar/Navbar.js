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

  //URL LINK ALAPJÁN VÁLTOZZON A LINKEK ALATT A DEKORÁCIÓ!
  //LINKEKE ALATT FEHÉR VONAL (aktuális oldal, useParams-sal)

  return (
    <nav className="bg-fb-blue-light text-white p-2 flex items-center px-4">
      <a href = "/" className="text-2xl">MapPals</a>
      <FaMapMarked className = "mx-2 w-4"/>

      <ul className = "justify-end flex w-full gap-7 navbar">

        {user ? <>
                <li className = "border-b-2 border-fb-blue">
                 <Link to = '/map' className = "text-center">The Map</Link>
                </li>
                <li>
                  <a href="/">Search Friends</a>
                </li>
                <li>
                  <a href="/profile">My Profile: {user.username}</a>
                </li>
                <li>
                  <button onClick = {handleLogout}>Log Out</button>
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
