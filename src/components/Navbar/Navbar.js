import React from 'react';

function Navbar() {
  return (
    <nav className="bg-fb-blue text-white p-2 flex items-center">
      <a href = "/" className="text-2xl">MapPals</a>

      {/*ezek majd react routerek lesznek */}
      <ul className = "justify-end flex gap-7 w-full navbar">
        <li className = "bg-yellow-400 rounded-sm px-2">
          <a href="/signin/demo">Demo</a>
        </li>
        <li>
          <a href="/login">Log in</a>
        </li>
        <li>
          <a href="/signup">Sign Up</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
