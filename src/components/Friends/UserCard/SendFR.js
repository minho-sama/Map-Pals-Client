import React from 'react'
import {FaUserPlus} from 'react-icons/fa'

function SendFR({
  profile,
  user,
  notifyError,
  refreshUsers, 
  setRefreshUsers, 
  token
}) {
  const sendFriendRequest = () => {
    if (!profile.friendRequests.includes(user._id)) {
      profile.friendRequests.push(user._id);
    }

    fetch(`http://localhost:3000/user/${profile._id}/sendFR`, {
      method: 'PATCH',
      headers: new Headers({
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        friendRequests: profile.friendRequests
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          notifyError();
        } else {
          setRefreshUsers(!refreshUsers);
        }
      });
  };

  return (
    <div className="friendController hover:bg-blue-600" onClick={sendFriendRequest}>
      <p>Add</p>
      <FaUserPlus/>
    </div>
  );
}

export default SendFR
