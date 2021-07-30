import React from 'react';

function AcceptFR({
  profile,
  user,
  setUser,
  notifyError,
  refreshUsers,
  setRefreshUsers,
  token
}) {

  console.log('setUser: ' + setUser)

  const acceptFriendRequest = () => {
    //ide majd kis validation

    user.friends.push(profile._id);
    const filteredFriendRequqests = user.friendRequests.filter(requester => requester._id !== String(profile._id))
    profile.friends.push(user._id);

    console.log(filteredFriendRequqests)

    fetch(`http://localhost:3000/user/${user._id}/${profile._id}`, {
      method: 'PATCH',
      headers: new Headers({
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        friendsReceiver: user.friends,
        friendRequestsReceiver: filteredFriendRequqests,
        friendsSender: profile.friends,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          notifyError();
        } else { 
          setRefreshUsers(!refreshUsers);
          setUser(data) //refresh userContext (localStorage)
        }
      });
  };

  return (
    <div className="friendController" onClick={acceptFriendRequest}>
      Accept friend request
    </div>
  );
}

export default AcceptFR;
