import React from 'react';
import {Link} from 'react-router-dom'
import DefaultAvatar from '../../assets/default-avatar.jpg'

function UserCard({profile, user, token, notifyError, refreshUsers, setRefreshUsers}) {

  const sendFriendRequest = () => {
    if(!profile.friendRequests.includes(user._id)){
      profile.friendRequests.push(user._id)
    }
    console.log(profile.friendRequests)

    fetch(`http://localhost:3000/user/${profile._id}/sendFR`, {
      method:'PATCH',
      headers: new Headers ({
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        friendRequests: profile.friendRequests
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.err){
        notifyError()
      } else{
        setRefreshUsers(!refreshUsers)
      }
    })
  }
 
  let friendAction
  if(user._id === profile._id){
    friendAction = ""
  } else if(user.friendRequests.includes(profile._id)){
      friendAction = <div className = "friendController">accept friend request</div>
  } else if(user.friends.includes(profile._id)){
      friendAction = <div className = "friendController">already friends button</div>
  } else if(profile.friendRequests.includes(user._id)){
      friendAction = <div className = "friendController">friend request sent</div>
  } else{
      friendAction = <div className = "friendController" onClick = {sendFriendRequest}>Send friend request</div>
  }

  const setDefaultAvatar = (e) => {
    e.target.src = DefaultAvatar
  }

  return (
      <div className="bg-blue-300 w-full my-6 flex items-center p-5 gap-5 rounded shadow-md">
        <Link to = {`/user/${profile._id}`} className = "flex items-center gap-5">
          <img src={`${profile.imgUrl}`} onError = {setDefaultAvatar} alt="profile pic" className="w-8 rounded-full"/>
          <h1>{profile.username}</h1>
        </Link>
        {friendAction}
      </div>
  );
}

export default UserCard;
