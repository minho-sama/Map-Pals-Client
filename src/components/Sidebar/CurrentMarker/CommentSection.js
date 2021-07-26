import React from 'react'
import {IoMdAdd} from 'react-icons/io'
import {AiFillLike} from 'react-icons/ai'
import {BiMinus, BiRightArrowAlt} from 'react-icons/bi'
import {useForm} from 'react-hook-form'

function CommentSection({user, token, notifyError, currentMarker}) {

    const [showAddComment, setShowAddComment] = React.useState(false)

    //csinálni külön route-ot api-ban a kommenteknek és marker id alapján fetchelni!
    //így csak azt fetcheled ami kell is!!! és nincsen nested populate!

    const {register, handleSubmit, formState: { errors }, reset} = useForm();

    const addComment = (commentData) => {
        const newComment = {
            marker: currentMarker._id,
            user: user._id,
            content: commentData.content,

        }

        fetch(`http://localhost:3000/marker/${currentMarker._id}/comment/create`, {
            method:'POST',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newComment)
        })
        .then(res => res.json())
        .then(data => {
            if(data.err){
                notifyError()
            } else{
                console.log(data)
                reset()
                setShowAddComment(false)
                //error esetén notify!
                //a frissítés nem setRefreshMarkers!! mert külön fetchelem a kommenteket!!!
            }
        })
    }

    return (
        <section className = "border-t-2 border-grey-700 mt-5 py-2"> 
        <div className = "flex items-center">
            <h3 className = "w-full font-semibold text-fb-blue-light">Comments:</h3>
            {
                showAddComment? 
                 <BiMinus onClick = {() => setShowAddComment(!showAddComment)} className = "text-white cursor-pointer font-semibold rounded-full bg-fb-blue-light"/> : 
                 <div onClick = {() => setShowAddComment(!showAddComment)} className = "flex items-center cursor-pointer">
                  <span className = "font-semibold mr-2 text-sm">Add</span>
                  <IoMdAdd className = "text-fb-blue-light font-bold"/>
                 </div>
            }
        </div>
        
        {/*add comment form */}
        {showAddComment && 
         <form  className = " flex flex-col mt-1" onSubmit = {handleSubmit(addComment)}>
             <input {...register('content', {required:true})} 
                className = "p-1 outline-none border-b-2 border-fb-blue-light text-sm" autoComplete = "off" placeholder = "add comment"/>
                <div className = "flex items-center">
                    {errors.content?.type === 'required' && (
                        <span className = "form-err-msg w-full">You must enter a comment</span>
                    )}
                <button className = "ml-auto "><BiRightArrowAlt className = "text-fb-blue-light text-base"/></button>
              </div>
         </form>
        }

        {   
            true ? <h1 className = "text-center font-bold text-lg my-10">There are no comments yet</h1> :
            <>
                <div className = "border-2 border-gray-700 shadow-md p-2 my-2" >
                    <h1>comment title</h1>
                    <p>lorem lorem lorem lorem lorem</p>
                    <span>post date</span>
                    <p>username</p>
                    <p>IMG</p>
                    <AiFillLike className = "cursor-pointer"/><span>like</span>
                    <p>5</p>
                    <span>delete</span>
                </div>
                <div className = "border-2 border-gray-700 shadow-md p-2 my-2" >
                    <h1>comment title</h1>
                    <p>lorem lorem lorem lorem lorem</p>
                    <span>post date</span>
                    <AiFillLike className = "cursor-pointer"/>
                    <p>5</p>
                    <span>delete</span>
                </div>
                <div className = "border-2 border-gray-700 shadow-md p-2 my-2" >
                    <h1>comment title</h1>
                    <p>lorem lorem lorem lorem lorem</p>
                    <span>post date</span>
                    <AiFillLike className = "cursor-pointer"/>
                    <p>5</p>
                    <span>delete</span>
                </div>
                <div className = "border-2 border-gray-700 shadow-md p-2 my-2" >
                    <h1>comment title</h1>
                    <p>lorem lorem lorem lorem lorem</p>
                    <span>post date</span>
                    <AiFillLike className = "cursor-pointer"/>
                    <p>5</p>
                    <span>delete</span>
                </div>
            </>
        }
    </section>
    )
}

export default CommentSection
