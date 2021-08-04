import React, {useState} from 'react'
import FriendCard from './FriendCard'
import {Link} from 'react-router-dom'

//mindegyik React Link
//csak 6-OT renderelni 
//load more button -> nem kell külön page, megnyílik popup, lehet benne keresni

function ProfileFriends({userFromServer, setDefaultImg}) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    //no friends
    if(userFromServer.friends.length === 0){
        return <section className = "flex items-center justify-center w-full lg:w-1/2 border-l-2 border-fb-blue-light">
            <h1 className = "text-lg text-fb-blue-light text-shadow-sm">
                {userFromServer.username} has no MapPals yet
            </h1>
        </section>
    }
 
    return ( 
    <section 
        className = "w-full lg:w-1/2 border-l-2 border-fb-blue-light flex flex-col items-center">
        <button>show more friends</button>
        {
           userFromServer.friends.slice(0,3).map((friend) => {
              return <Link to = {`/profile/${friend._id}`} key = {friend._id}>
                  <h1>{friend.username}</h1>
                  <img src = {friend.imgUrl} onError = {setDefaultImg} alt = "profile img"/>
              </Link>
          })
        }
        {isModalOpen && 
            userFromServer.friends.map((friend) => {
                return <div key = {friend._id}>
                        <FriendCard friend = {friend} setDefaultImg = {setDefaultImg}/>
                        <button>close modal</button>
                    </div>
            })
        }
    </section>
    )
}

export default ProfileFriends
