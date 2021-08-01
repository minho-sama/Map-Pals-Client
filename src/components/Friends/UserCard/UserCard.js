import React from 'react';
import {Link} from 'react-router-dom'
import DefaultAvatar from '../../../assets/default-avatar.jpg'
import AcceptFR from './AcceptFR'
import DeclineFR from './DeclineFR';
import SendFR from './SendFR'
import {FaUserCheck, FaUserClock} from 'react-icons/fa'
 
function UserCard(props) {
  const {profile, user} = props

  const decideAction = (array, id) => array?.some(element => element._id === String(id))

  let friendAction
  if(user?._id === profile._id){
    friendAction = null
  } else if(decideAction(user?.friendRequests, profile._id)){
      friendAction = <div className = "flex flex-col md:flex-row gap-2 justify-end">
                      <DeclineFR {...props}/>
                      <AcceptFR {...props}/>
                    </div>
  } else if(decideAction(user?.friends, profile._id)){
      friendAction = <div className = "friendController"> Friends <FaUserCheck/></div>
  } else if(decideAction(profile.friendRequests, user?._id)){
      friendAction = <div className = "friendController">
                        <p>Sent</p>
                        <FaUserClock/>
                      </div>
  } else{
      friendAction = <SendFR {...props}/>
  }
 
  const setDefaultAvatar = (e) => {
    e.target.src = DefaultAvatar
  }

  return ( 
      <div className="w-full bg-blue-100 md:1/2 lg:w-3/10 my-3 flex items-center p-5 rounded shadow-smd transition transform hover:bg-blue-200">
        <Link to = {`/profile/${profile._id}`} className = "flex items-center gap-3 w-full">
          <img src={`${profile.imgUrl}`} onError = {setDefaultAvatar} alt="profile pic" className="w-8 rounded-full shadow-md"/>
          <h1 className = "font-semibold">{profile.username}</h1>
        </Link>
        {friendAction}
      </div>
  );
}

export default UserCard;
