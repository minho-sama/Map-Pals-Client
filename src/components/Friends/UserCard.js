import React from 'react';
import {Link} from 'react-router-dom'

function UserCard({profile, user, token}) {

    let friendAction
    if(user.friendRequests.includes(profile._id)){
        friendAction = <p>accept friend request</p>
    }
    else if(user.friends.includes(profile._id)){
        friendAction = <p>already friends button</p>
    } else if('user request sent'){
        friendAction = <p>friend request sent</p>
    } else{
        friendAction = <p>send friend request</p>
    }

  return (
    <Link to = {`/user/${profile._id}`}>
      <div className="bg-blue-300 w-full my-6 flex items-center p-5 gap-5 rounded shadow-md">
        <img src="https://i.imgur.com/NcPLMqc.jpg" alt="profile pic" className="w-8 rounded-full"/>
        <p>{profile.username}</p>
        {friendAction}
      </div>
    </Link>
  );
}

export default UserCard;
