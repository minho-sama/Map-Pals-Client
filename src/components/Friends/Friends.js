import React, { useContext, useState } from 'react'; 
import { UserContext, TokenContext } from '../App';
import useFetch from '../customHooks/useFetch';
import {BsSearch} from 'react-icons/bs'
import UserCard from './UserCard/UserCard'
import { ToastContainer, toast } from 'react-toastify';
import DefaultAvatar from '../../assets/default-avatar.jpg'
import {Link} from 'react-router-dom'

function Friends() {
  const {user, setUser} = useContext(UserContext)

  const { token } = useContext(TokenContext);

  const [searchValue, setSearchValue] = useState('')

  const {
    data: users,
    refresh: refreshUsers,
    setRefresh: setRefreshUsers,
  } = useFetch('http://localhost:3000/users');

  const filteredUsers = users?.filter(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));

  const notifyError = () => toast.error('An error occured with the server', {
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  });

  const setDefaultAvatar = (e) => {
    e.target.src = DefaultAvatar
  }

  return (
    <>
      <ToastContainer  position = "top-center" autoClose = {3000} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <article className="flex-grow flex flex-col p-4 items-center">
          <div className = "w-full md:w-4/5">
            <section className = "w-full p-2 flex items-center justify-center">
              <div className = "text-black p-1 text-sm w-1/2 flex items-center mt-4">
                <input
                  onChange = {(e) => setSearchValue(e.target.value)}
                  value = {searchValue}
                  placeholder = {`Search MapPals`}
                  className = "border-b-2 border-fb-blue rounded-sm outline-none w-full pl-2"/>
                  <BsSearch className = "text-gray-400 -ml-4 mb-1"/>
              </div>
            </section>
            <section className = "mt-4 mb-7 flex flex-col items-center">
              <h1 className = "text-gray-500 italic self-start mb-3">Friend requests</h1>
              <div className = "flex gap-10">
                {
                  user && user.friendRequests.length > 0 ? 
                  user.friendRequests.map(profile => {
                      return <div key = {profile._id}>
                        <Link to = {`/profile/${profile._id}`} className = "flex flex-wrap items-center gap-2 font-semibold rounded bg-fb-blue-light text-white text-sm py-2 px-4 shadow-md">
                          <img src={`${profile.imgUrl}`} onError = {setDefaultAvatar} alt="profile pic" className="w-6 rounded-full shadow-md"/>
                          <p>{profile.username}</p>
                        </Link>
                      </div>
                    }) :
                    <span className = "text-blue-400" >You have no pending friend requests</span>
                }
              </div>
            </section>
            <h1 className = "text-gray-500 italic w-full border-t-2 border-gray-300 pt-2">MapPals community:</h1>
            <div className = "flex flex-wrap mt-6 md:ml-4 lg:ml-12 gap-2"> 
               {
                 filteredUsers && filteredUsers.length > 0 ? filteredUsers.map(profile => {
                 return <UserCard 
                           key = {profile._id}
                           user = {user}
                           setUser = {setUser}
                           profile = {profile} 
                           token = {token} 
                           notifyError = {notifyError}
                           refreshUsers = {refreshUsers}
                           setRefreshUsers = {setRefreshUsers}
                         />
                 }) : <p className = "italic text-gray-600 mt-10">there is no user "{searchValue}"</p>
               }
            </div>
          </div>
     </article>
    </>
  );
}


export default Friends;
