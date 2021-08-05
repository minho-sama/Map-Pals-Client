import React from 'react'
import useFetch from '../../customHooks/useFetch';
import MarkerCard from './MarkerCard'

function ProfileMap({user, userFromServer}) {
    //state for lat lng
    //state for clicked marker card (for css)

    const {data:userMarkers} = useFetch(`http://localhost:3000/markers/user/${userFromServer._id}`)

    return (
        <section className = "mt-2 w-full h-full flex flex-col md:flex-row font-normal">
            <div className = "w-full md:w-1/5 min-h-150 overflow-scroll">
                <h1 className = "w-full text-center font-semibold bg-fb-blue text-white rounded-sm mb-2">
                    {userFromServer.username}'s Markers
                </h1>
                <ul className = "flex flex-col items-center gap-1">
                {
                    userMarkers && userMarkers.length > 0 ? 
                    userMarkers.map(marker => {
                        return <MarkerCard marker = {marker} key = {marker._id}/>
                    }) :
                    <span className = "text-default text-fb-blue-light font-semibold mt-10 md:mt-20">
                        {userFromServer.username} has no markers yet
                    </span>
                }
                </ul>
            </div>
            <div className = "w-full min-h-300 md:min-h-0 h-full md:w-4/5 border-blue-400 border-2">
                map
            </div>
        </section>
    )
}

export default ProfileMap
