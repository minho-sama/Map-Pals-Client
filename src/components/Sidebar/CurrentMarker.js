import React, {useContext} from 'react'
import {UserContext, TokenContext} from '../App'
import {AiFillLike} from 'react-icons/ai'
import {BsFillBookmarkFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import {IoMdAdd} from 'react-icons/io'

function CurrentMarker({currentMarker}) {
    console.log(currentMarker)
    const {user} = useContext(UserContext)
    const {token} = useContext(TokenContext) //majd delete requesthez!

    return (
        <section className={'hidden shadow-inner md:w-1/4 md:h-full md:flex flex-col bg-white text-gray-800 max-h-90 overflow-scroll'}>
          {/*kipróbálni rendes imagegel (netninja tailwind tut image követni) */}
          <img src = {`${currentMarker.imgUrl}`} alt = "place" className ="shadow-lg mb-3 w-full object-cover"/>
            
            <div className = "p-2">
                <div className = "flex w-full mb-2">
                  <h1 className = "text-2xl font-semibold text-fb-blue-light w-full">
                      {currentMarker.name}
                  </h1>
                  <div className = "flex items-center gap-4 justify-end">
                      <figure className = "flex items-center text-lg">
                          <AiFillLike className = "cursor-pointer"/>
                          <figcaption>{currentMarker.likes.length}</figcaption>
                      </figure>
                      <BsFillBookmarkFill className = "text-lg cursor-pointer"/>
                      {user?._id === currentMarker.user?._id &&  <MdDelete className = "text-xl text-red-600 cursor-pointer"/> }  
                  </div>
                </div>
                {/* ez legyen majd link! */}
                <div className = "text-xs flex gap-2 justify-end text-gray-600">
                  <h2>added by: {currentMarker.user.username}</h2>
                  |
                  <span>{currentMarker.post_date_formatted}</span>
                </div>

                {/* MOVE TO COMPONENT (comment section) */}
                <section className = "border-t-2 border-grey-700 mt-5 py-2">
                    <div className = "flex items-center">
                        <h3 className = "w-full font-semibold text-fb-blue-light">Comments:</h3>
                        <IoMdAdd className = "bg-fb-blue-light text-white rounded-full cursor-pointer"/>
                    </div>
                    {   
                        false ? <h1 className = "text-center font-bold text-lg my-10">There are no comments yet</h1> :
                        <>
                            <div className = "border-2 border-gray-700 shadow-md p-2 my-2" >
                                <h1>comment title</h1>
                                <p>lorem lorem lorem lorem lorem</p>
                                <span>post date</span>
                                <AiFillLike className = "cursor-pointer"/>
                            </div>
                            <div className = "border-2 border-gray-700 shadow-md p-2 my-2" >
                                <h1>comment title</h1>
                                <p>lorem lorem lorem lorem lorem</p>
                                <span>post date</span>
                                <AiFillLike className = "cursor-pointer"/>
                            </div>
                            <div className = "border-2 border-gray-700 shadow-md p-2 my-2" >
                                <h1>comment title</h1>
                                <p>lorem lorem lorem lorem lorem</p>
                                <span>post date</span>
                                <AiFillLike className = "cursor-pointer"/>
                            </div>
                            <div className = "border-2 border-gray-700 shadow-md p-2 my-2" >
                                <h1>comment title</h1>
                                <p>lorem lorem lorem lorem lorem</p>
                                <span>post date</span>
                                <AiFillLike className = "cursor-pointer"/>
                            </div>
                        </>
                    }
                </section>
           {/* scrollbox- (vmi overflow lesz a neve) lehessen scrollolni a sidebaron belül*/}
            </div>
        </section>
    )
}

export default CurrentMarker
