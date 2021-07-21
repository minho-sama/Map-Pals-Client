import React from 'react';
import {FaMapMarked} from 'react-icons/fa'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-fb-blue-light text-white p-2 flex items-center">
      <a href = "/" className="text-2xl">MapPals</a>
      <FaMapMarked className = "mx-2 w-4"/>
      
      {/*ezek majd react routerek lesznek */}
      <ul className = "justify-end flex gap-7 w-full navbar">
        <li className = "bg-yellow-400 rounded-sm px-2">
          <a href="/signin/demo">Demo</a>
        </li>
        <li>
          <Link to = '/login'>Log in</Link>
        </li>
        <li>
          <a href="/signup">Sign Up</a>
        </li>
      </ul>
      {/* ha logged in: profile, search friends, log out */}
    </nav>
  );
}

export default Navbar;
