import React from 'react';
import {Link} from 'react-router-dom'
import DefaultAvatar from '../../../assets/default-avatar.jpg'
import AcceptFR from './AcceptFR'
import SendFR from './SendFR'
 
function UserCard(props) {
  const {profile, user} = props

  const decideAction = (array, id) => array?.some(element => element._id === String(id))

  let friendAction
  if(user?._id === profile._id){
    friendAction = null
  } else if(decideAction(user?.friendRequests, profile._id)){
      friendAction = <AcceptFR {...props}/>
  } else if(decideAction(user?.friends, profile._id)){
      friendAction = <div className = "friendController"> Friends PIPA</div>
  } else if(decideAction(profile.friendRequests, user?._id)){
      friendAction = <div className = "friendController">friend request sent</div>
  } else{
      friendAction = <SendFR {...props}/>
  }

  const setDefaultAvatar = (e) => {
    e.target.src = DefaultAvatar
  }

  return (
      <div className="bg-blue-300 w-full my-7 flex items-center p-5 gap-5 rounded shadow-smd transition transform hover:translate-x-1.5">
        <Link to = {`/user/${profile._id}`} className = "flex items-center gap-5">
          <img src={`${profile.imgUrl}`} onError = {setDefaultAvatar} alt="profile pic" className="w-8 rounded-full"/>
          <h1>{profile.username}</h1>
        </Link>
        {friendAction}
      </div>
  );
}

export default UserCard;
