import React from 'react'

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

    console.log(profile.friendRequests)

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
    <div className="friendController" onClick={sendFriendRequest}>
      Send friend request
    </div>
  );
}

export default SendFR
