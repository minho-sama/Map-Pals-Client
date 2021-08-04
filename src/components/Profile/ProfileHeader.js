import React from 'react'

function ProfileHeader({userFromServer, setDefaultImg}) {
    return (
        <figure className = "w-full flex flex-col items-center gap-4 bg-gray-800 text-white shadow-lg p-4 mb-6 relative">
        <img src = {`${userFromServer.imgUrl}`} onError = {setDefaultImg} alt = "profile img" 
            className = "w-48 rounded-full shadow-lg border-2 mt-2 border-white"
        />
        <figcaption className = "text-3xl font-semibold">
            {userFromServer.username}
        </figcaption>
        <h1 className = "text-sm md:absolute right-5 bottom-5">
                ITT LEGYEN AZ FR SEND meg legyen ACCEPT? az lehet bugos lesz lol
        </h1>
      </figure> 
    )
}

export default ProfileHeader
