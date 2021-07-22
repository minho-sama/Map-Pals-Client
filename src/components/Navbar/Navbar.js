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

  // //szerverről fetchelt user a context user id alapján!
  // const [validatedUser, setValidatedUser] = useState(null)
  //   const validateUserById = (id) => {
  //   fetch(`http://localhost:3000/accounts/user/${id}`)
  //     .then(res => res.json())
  //     .then(data=> setValidatedUser(data))
  //     .catch(err => console.log(err))
  // }
  // useEffect(() => {
  //   const getVUser = async () => {
  //     const vUser = await validateUserById(user?._id)
  //     setValidatedUser(vUser)
  //   }
  //   getVUser()
  // }, [user])
  // //ha ez nincs, akkor localStorageból be lehet jutni manuálisan! figyelni majd h ez a user lehet mindig frissebb lesz!

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
