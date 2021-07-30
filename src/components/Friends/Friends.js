import React, { useContext, useState } from 'react';
import { UserContext, TokenContext } from '../App';
import useFetch from '../customHooks/useFetch';
import {BsSearch} from 'react-icons/bs'
import UserCard from './UserCard/UserCard'
import { ToastContainer, toast } from 'react-toastify';

function Friends() {
  const {user, setUser} = useContext(UserContext)

  const { token } = useContext(TokenContext);

  const [searchValue, setSearchValue] = useState('')

  const {
    data: users,
    refresh: refreshUsers,
    setRefresh: setRefreshUsers,
  } = useFetch('http://localhost:3000/users');

  React.useEffect(() => {
    console.log(user)
  }, [user])

  const filteredUsers = users?.filter(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));

  const notifyError = () => toast.error('An error occured with the server', {
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  });

  return (
    <>
      <ToastContainer  position = "top-center" autoClose = {3000} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <article className="flex-grow flex flex-col p-4 items-center">
          <div className = "w-full md:w-1/2">
            <section className = "w-full p-2 flex items-center justify-center">
              <div className = "text-black p-1 text-sm w-1/2 flex items-center">
                <input
                  onChange = {(e) => setSearchValue(e.target.value)}
                  value = {searchValue}
                  placeholder = {`Search MapPals`}
                  className = "border-b-2 border-fb-blue rounded-sm outline-none w-full pl-2"/>
                  <BsSearch className = "text-gray-400 -ml-4 mb-1"/>
              </div>
            </section>
            <section className = "mt-4 mb-10 flex flex-col items-center">
              <h1 className = "text-gray-500 italic mb-3 self-start">friend requests</h1>
              {
                user && user.friendRequests.length > 0 ? 
                // itt majd mappolni UserCard-ot
                user.friendRequests.map(profile => {
                    return <p key = {profile._id}>{profile.username}</p>
                  }) :
                  <span className = "text-blue-400" >you have no pending friend requests</span>
              }
            </section>
            <h1 className = "text-gray-500 italic w-full border-t-2 border-gray-300 pt-2">MapPals community:</h1>
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
     </article>
    </>
  );
}


export default Friends;
