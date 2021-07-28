import React, {useContext} from 'react';
import {FaMapMarked} from 'react-icons/fa'
import { Link, useHistory, useLocation} from 'react-router-dom';
import {UserContext, TokenContext} from '../App'

function Navbar() {

  const {user,removeUser} = useContext(UserContext)
  const {token, removeToken} = useContext(TokenContext)

  let history = useHistory()

  let location = useLocation()

  const handleLogout = () => {
    removeUser()
    removeToken()
    history.push('/')
  }

  const decideBorder = (route) => {
    if(route === location.pathname){
      return ' border-b-2 border-fb-blue'
    }
  }

  const verifyToken = () => {
    fetch('http://localhost:3000/checkToken', {
      method:'POST',
      headers: new Headers ({
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
    }),
    })
    .then(res => res.json())
    .then(data => {
       if(data.err){
         removeUser()
         removeToken()
         history.push('/login')
       }
    })
  }

  //redirect if  user not logged out properly and jwt expired
  React.useEffect(() => {
    if(user){
      verifyToken()
    }
  }, [])

  return (
    <nav className="bg-fb-blue-light text-white p-2 flex items-center px-4">
      <a href = "/" className="text-base md:text-2xl">MapPals</a>
      <FaMapMarked className = "mx-2 w-4"/>
      <ul className = "navbar text-sm md:text-base justify-end items-center flex w-full gap-5">

        {user ? <>
                <li className = {decideBorder('/map')}>
                 <Link to = '/map' className = "text-center">The Map</Link>
                </li>
                <li className = {decideBorder('/friends')}>
                  <Link to="/friends">Search Friends</Link>
                </li>
                <li className = {decideBorder('/profile')}>
                  <Link to = "/profile">{user.username} IMG</Link>
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
