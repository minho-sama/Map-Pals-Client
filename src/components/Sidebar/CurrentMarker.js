import React, {useContext} from 'react'
import {UserContext, TokenContext} from '../App'
import {AiFillLike} from 'react-icons/ai'

function CurrentMarker({currentMarker}) {
    console.log(currentMarker)
    const {user} = useContext(UserContext)
    const {token} = useContext(TokenContext) //majd delete requesthez!

    return (
        <section className={'w-full h-1/5 shadow-inner md:w-1/4 md:h-full p-4 flex flex-col items-center justify-center bg-white text-gray-800'}>
          <h1>{currentMarker.name}</h1>
          <figure>
             <AiFillLike/>
              <figcaption>{currentMarker.likes.length}</figcaption>
          </figure>
          {/*kipróbálni rendes imagegel (netninja tailwind tut image követni) */}
          <img src = {`${currentMarker.img_url}`} alt = "place"/>
          <p>{currentMarker.user.username}</p>
          <p>{currentMarker.post_date}</p>
          {user._id === currentMarker.user._id &&  <button>delete place</button>}
          <h2>Comments:</h2>
          {/* scrollbox- (vmi overflow lesz a neve) lehessen scrollolni a sidebaron belül*/}
        </section>
    )
}

export default CurrentMarker
