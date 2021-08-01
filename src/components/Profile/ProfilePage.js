import React, {useContext, useState} from 'react'
import { UserContext, TokenContext } from '../App';
import useFetch from '../customHooks/useFetch';
import {useParams} from 'react-router-dom'

function ProfilePage() {
    const {id} = useParams()

    const {user} = useContext(UserContext) //only for conditional rendering! 
    const {data:userFromServer, error:userFSError} = useFetch(`http://localhost:3000/user/${id}`) //for displaying profile info!
    const {data:userMarkers} = useFetch(`http://localhost:3000/markers/user/${id}`)

    //MARKEREKET is fetchelni profile szerint!

    const { token } = useContext(TokenContext);

    if(userFSError){
        console.log('error happened, load error components!')
        //404 user not found
    }

    return (
        <article className="flex-grow flex flex-col p-4 items-center">
         <div>
            PROFILE PAGE
            megcsinálni join_date virtualt!!
         </div>
        </article>
    )
}

export default ProfilePage
 