import React from 'react'
import {Link} from 'react-router-dom'

function ProfileFriends({userFromServer, setDefaultImg, IsModalOpen, setIsModalOpen}) {

    //no friends
    if(userFromServer.friends.length === 0){
        return <section className = "flex items-center justify-center w-full lg:w-1/2 glassmorphism-light">
            <h1 className = "text-lg text-fb-blue-light text-shadow-sm">
                {userFromServer.username} has no MapPals yet
            </h1>
        </section>
    }
 
    return ( 
    <>
      <section 
          className = "w-full lg:w-1/2 flex flex-wrap items-center glassmorphism-light p-2 gap-5 flex-row relative justify-center">
        <span className = "text-fb-blue-light font-normal text-sm absolute -top-5 right-0 md:left-0">{userFromServer.friends.length} Pals</span>
        {
           userFromServer.friends.slice(0,5).map((friend) => {
              return <Link to = {`/profile/${friend._id}`} key = {friend._id} className = "flex flex-col" onClick = {() => setIsModalOpen(false)}>
                  <div className = "relative">
                    <h1 className = "text-xs absolute bottom-2 right-2 bg-fb-blue-light text-white rounded-lg px-2">
                        {friend.username}
                        </h1>
                    <img src = {friend.imgUrl} 
                        onError = {setDefaultImg} 
                        alt = "profile img"
                        className = "w-28 rounded-md shadow-sm hover:shadow-lg"
                    />
                  </div>
              </Link>
          })
        }
        <button 
            onClick = {() => setIsModalOpen(true)}
            className = "md:absolute bottom-1 right-5 text-xs text-fb-blue-light hover:underline">
            Show more
            </button>
      </section>
    </>
    )
}

export default ProfileFriends
