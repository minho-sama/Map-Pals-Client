import React from 'react'
import {IoMdAdd} from 'react-icons/io'
import {AiFillLike} from 'react-icons/ai'

function CommentSection() {
    return (
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
    )
}

export default CommentSection
