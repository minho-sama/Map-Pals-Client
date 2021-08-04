import React from 'react'
import {Link} from 'react-router-dom'

function FriendCard({friend, setDefaultImg}) {
    return (
     <Link to = {`profile/${friend._id}`}>
         <img src = {friend.imgUrl} onError = {setDefaultImg} alt = "profile img"/>
         <h1>{friend.username}</h1>
     </Link>
    )
}

export default FriendCard
