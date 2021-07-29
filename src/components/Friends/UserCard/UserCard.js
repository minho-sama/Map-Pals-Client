import React from 'react';
import {Link} from 'react-router-dom'
import DefaultAvatar from '../../../assets/default-avatar.jpg'
import AcceptFR from './AcceptFR'
import SendFR from './SendFR'

function UserCard(props) {
  const {profile, user} = props

  //ez azért nem jó mert populateltem a friendRequests key-t (/loginban) és nested lesz így!
  // let friendAction
  // if(user._id === profile._id){
  //   friendAction = null
  // } else if(user.friendRequests.includes(profile._id)){
  //     friendAction = <AcceptFR/>
  // } else if(user.friends.includes(profile._id)){
  //     friendAction = <div className = "friendController">already friends button</div>
  // } else if(profile.friendRequests.includes(user._id)){
  //     friendAction = <div className = "friendController">friend request sent</div>
  // } else{
  //     friendAction = <div className = "friendController" onClick = {sendFriendRequest}>Send friend request</div>
  // }

  const decideAction = (array, id) => array.some(element => element._id === String(id))

  let friendAction
  if(user._id === profile._id){
    friendAction = null
  } else if(decideAction(user.friendRequests, profile._id)){
      friendAction = <AcceptFR {...props}/>
  } else if(decideAction(user.friends, profile._id)){
      friendAction = <div className = "friendController">already friends button</div>
  } else if(decideAction(profile.friendRequests, user._id)){
      friendAction = <div className = "friendController">friend request sent</div>
  } else{
      friendAction = <SendFR {...props}/>
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
