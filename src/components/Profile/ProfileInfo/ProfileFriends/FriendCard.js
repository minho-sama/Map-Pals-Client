import React from 'react'
import {Link} from 'react-router-dom'

function FriendCard({friend, setDefaultImg, setIsModalOpen}) {
    return (
     <Link to = {`/profile/${friend._id}`} 
           className = "flex gap-2 bg-fb-blue-light mx-4 my-2 p-2 items-center rounded-sm transition hover:bg-blue-600"
           onClick = {() => setIsModalOpen(false)}>
         <img 
            className = "w-8 rounded-full"
            src = {friend.imgUrl} onError = {setDefaultImg} alt = "profile img"/>
         <h1 className = "text-sm text-white">{friend.username}</h1>
     </Link>
    )
}

export default FriendCard
