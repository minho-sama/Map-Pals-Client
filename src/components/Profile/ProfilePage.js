import React, {useContext, useState} from 'react'
import { UserContext, TokenContext } from '../App';
import useFetch from '../customHooks/useFetch';
import {useParams} from 'react-router-dom'
import DefaultAvatar from '../../assets/default-avatar.jpg'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileFriends from './ProfileFriends'

function ProfilePage() {
    const {id} = useParams()

    const {user} = useContext(UserContext) //only for conditional rendering! 
    const {data:userFromServer, error:userFSError, refresh:refreshUserFS, setRefresh:setRefreshUserFS} = useFetch(`http://localhost:3000/user/${id}`) //for displaying profile info!
    const {data:userMarkers} = useFetch(`http://localhost:3000/markers/user/${id}`)

    //MARKEREKET is fetchelni profile szerint!

    const { token } = useContext(TokenContext);

    if(userFSError){
        console.log('error happened, load error components!')
        //404 user not found PAGE
    }

    React.useEffect(() => {
        console.log(userFromServer)
    }, [userFromServer])

    const setDefaultImg = (e) => {
        e.target.src = DefaultAvatar
    }

    return (
        <article className="flex-grow flex flex-col items-center font-semibold">
        {userFromServer && 
         <>
           <figure className = "w-full flex flex-col items-center gap-4 bg-gray-800 text-white shadow-lg p-4 mb-6">
             <img src = {`${userFromServer.imgUrl}`} onError = {setDefaultImg} alt = "profile img" 
                 className = "w-48 rounded-full shadow-lg border-2 mt-2 border-white"
             />
             <figcaption className = "text-3xl font-semibold">
                 {userFromServer.username}
             </figcaption>
           </figure> 
           <div className = "w-full flex flex-col lg:flex-row gap-5 p-4">
             <ProfileInfo 
                userFromServer = {userFromServer} 
                user = {user}
                token = {token}
                refreshUserFS = {refreshUserFS}
                setRefreshUserFS = {setRefreshUserFS}
                />
             <ProfileFriends/>
           </div> 
         </>
        }
        </article> 
    )
}

export default ProfilePage
 