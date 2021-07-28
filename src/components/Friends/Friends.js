import React, { useContext, useState } from 'react';
import { UserContext, TokenContext } from '../App';
import useFetch from '../customHooks/useFetch';
import {BsSearch} from 'react-icons/bs'
import UserCard from './UserCard'

function Friends() {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [searchValue, setSearchValue] = useState('')

  const {
    data: users,
    setData: setUsers,
    error, 
    setError,
    refresh: refreshUsers,
    setRefresh: setRefreshUsers,
  } = useFetch('http://localhost:3000/users');

  const filteredUsers = users?.filter(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));

  return (
      <article className="flex-grow md:flex flex-col p-4 items-center">
          <div className = "w-1/2">
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
            <section className = "border-2 border-red-500">
              <h1 className = "text-gray-500 italic">friend requests</h1>
              <span>you have no pending friend requests</span>
            </section>
            <h2 className = "text-gray-500 italic">Friend Suggestions</h2>
            {
              filteredUsers && filteredUsers.map(profile => {
               return <UserCard profile = {profile} user = {user} token = {token} key = {profile._id}/>
              })
            }
          </div>
     </article>
  );
}


export default Friends;
