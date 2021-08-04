import React from 'react'
import Earth from '../../assets/worldwide.svg'

function Profile404() {
    return (
        <article className = "flex-grow flex flex-col items-center justify-center font-semibold gap-10 text-shadow-sm">
            <h1 className = "text-3xl">Error 404</h1>
            <img src = {Earth} alt = "earth" className = "w-56 shadow-lg rounded-full"/>
            <h2 className = "text-lg mx-4 md:text-2xl">We couldn't find the user you're looking for</h2>
        </article>
    )
}

export default Profile404
