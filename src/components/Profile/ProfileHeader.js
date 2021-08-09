import React from 'react' 

function ProfileHeader({userFromServer, setDefaultImg}) {
    return (
        <figure className = "w-full flex flex-col items-center gap-4 bg-gray-800 text-white shadow-lg p-4 mb-6 relative">
        <img src = {`${userFromServer.imgUrl}`} onError = {setDefaultImg} alt = "profile img" 
            className = "w-40 rounded-full shadow-lg border-2 mt-2 border-white"
        />
        <figcaption className = "text-2xl font-semibold">
            {userFromServer.username}
        </figcaption>
        {/* <h1 className = "text-sm md:absolute right-5 bottom-5">
                friend controllers
        </h1> */}
      </figure> 
    )
}

export default ProfileHeader
