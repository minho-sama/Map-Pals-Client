import React from 'react';
import {FaUserTimes} from 'react-icons/fa'

function DeclineFR({
  profile,
  user,
  setUser,
  notifyError,
  refreshUsers,
  setRefreshUsers,
  token
}) {

  const declineFriendRequest = () => {

    const filteredFriendRequqests = user.friendRequests.filter(requester => requester._id !== String(profile._id))

    fetch(`http://localhost:3000/user/${user._id}/${profile._id}/decline`, {
      method: 'PATCH',
      headers: new Headers({
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ 
        friendRequestsReceiver: filteredFriendRequqests
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
    <div className="text-xs cursor-pointer flex items-center justify-end font-bold text-white bg-red-500 gap-1 p-1 rounded-sm" 
      onClick={declineFriendRequest}
      >
      <p>Decline</p>
      <FaUserTimes/>
    </div>
  );
}

export default DeclineFR;
