import React from 'react';
import {FaUserCheck}  from 'react-icons/fa'

function AcceptFR({
  profile,
  user,
  setUser,
  notifyError,
  refreshUsers,
  setRefreshUsers,
  token
}) {

  const acceptFriendRequest = () => {

    user.friends.push(profile._id);
    const filteredFriendRequqests = user.friendRequests.filter(requester => requester._id !== String(profile._id))
    profile.friends.push(user._id);
    const filteredFriends = [...new Set(profile.friends)]

    fetch(`http://localhost:3000/user/${user._id}/${profile._id}`, {
      method: 'PATCH',
      headers: new Headers({
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ 
        friendsReceiver: user.friends,
        friendRequestsReceiver: filteredFriendRequqests,
        friendsSender: filteredFriends,
      }),
    }) 
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          console.log(data.err)
          notifyError();
        } else { 
          setRefreshUsers(!refreshUsers);
          setUser(data) //refresh userContext (localStorage)
        }
      });
  };

  return (
    <div className="text-xs cursor-pointer flex items-center justify-end font-bold text-white bg-green-custom-darker hover:bg-green-custom gap-1 p-1 rounded-sm" 
      onClick={acceptFriendRequest}
      >
      <p>Accept</p>
      <FaUserCheck/>
    </div>
  );
}

export default AcceptFR;
