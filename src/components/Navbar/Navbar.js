import React, {useContext} from 'react';
import {FaMapMarked} from 'react-icons/fa'
import {Link, useHistory, useLocation} from 'react-router-dom';
import {UserContext, TokenContext} from '../App'
import DefaultAvatar from '../../assets/default-avatar.jpg'

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
      if(route === '/profile'){
        return ' border-l-2 border-fb-blue flex flex-row'
      } else{
        return 'border-l-2 border-fb-blue'
      }
    }
  }

  const verifyToken = () => {
    fetch('https://mappals.herokuapp.com/checkToken', {
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
    if(user && !token){
      removeUser()
      history.push('/login')
    }
  }, [user]) 

  const setDefaultAvatar = (e) => {
    e.target.src = DefaultAvatar
  }

  return (
    <nav className="bg-fb-blue-light text-white p-2 flex items-center px-4">
      <a href = "/" className="text-base md:text-2xl">MapPals</a>
      <FaMapMarked className = "mx-2 w-5"/>

        {user ?
          <ul className = "navbar text-xs md:text-sm md:text-base justify-end items-center flex w-full gap-3 md:gap-6 font-semibold">
                <li className = {decideBorder('/map')}>
                 <Link to = '/map' className = "text-center">The Map</Link>
                </li>
                <li className = {decideBorder('/friends')}>
                  <Link to="/friends" className = 'relative'>
                    Search Friends
                    {user.friendRequests?.length > 0 && 
                      <span className = "text-xs text-white bg-red-600 rounded-sm px-1 absolute -top-1">
                        {user.friendRequests?.length}
                      </span>}
                  </Link>
                </li>
                <li className = {decideBorder('/profile')}>
                  <Link to = {`/profile/${user._id}`} className = 'flex gap-2 items-center'>
                    <img src={`${user.imgUrl}`} onError = {setDefaultAvatar} alt = "profile-pic" className = "w-6 rounded-full shadow-lg"/>
                    <p>{user.username} </p>
                  </Link>
                </li>
                <li>
                  <button onClick = {handleLogout}>Log Out</button>
                </li>
          </ul>
          :<ul className = " text-sm md:text-base justify-end items-center flex w-full gap-6 font-semibold">
            <li className = "transition hover:text-gray-100">
              <Link to = '/login' className = "border-transparent">Log in</Link>
            </li>
            <li className = "transition hover:text-gray-100">
              <Link to= "/signup" className = "border-transparent">Sign Up</Link>
            </li>
          </ul>
        }


    </nav>
  );
}

export default Navbar;
