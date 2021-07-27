import React from 'react'
import {IoMdAdd} from 'react-icons/io'
import {AiFillLike} from 'react-icons/ai'
import {BiMinus, BiRightArrowAlt} from 'react-icons/bi'
import {useForm} from 'react-hook-form'
import useFetch from '../../customHooks/useFetch'
import deleteThis from '../../../assets/default-avatar.jpg'

function CommentSection({user, token, notifyError, currentMarker}) {

    const [showAddComment, setShowAddComment] = React.useState(false)

    const {data:comments, error, refresh:refreshComments, setRefresh:setRefreshComments} = useFetch(`http://localhost:3000/marker/${currentMarker._id}/comments`)

    const {register, handleSubmit, formState: { errors }, reset} = useForm();

    React.useEffect(() => {
        console.log(comments)
    }, [comments])

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
                reset()
                setShowAddComment(false)
                setRefreshComments(!refreshComments)
            }
        })
    }

    const deleteComment = (id) => {

        fetch(`http://localhost:3000/marker/comment/${id}/delete`, {
            method:'DELETE',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
        })
        .then(res => res.json())
        .then(data => {
            if(data.err){
                notifyError()
            } else{
                setRefreshComments(!refreshComments)
            }
        })

    } 

    const likeComment = (comment) => {

        if(comment.likes.includes(user._id)){
            comment.likes.splice(comment.likes.indexOf(user._id),1)
        } else{
            comment.likes.push(user._id)
        }
        fetch(`http://localhost:3000/marker/comment/${comment._id}/like`, {
            method: 'PATCH',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                likes: comment.likes
            })
        })
        .then(res => res.json()) 
        .then(data => {
            if(data.err){
            }
        })
        setRefreshComments(!refreshComments)
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
                         <span className = "form-err-msg w-full" style = {{fontSize:'12px'}}>You must enter a comment</span>
                     )}
                 <button className = "ml-auto "><BiRightArrowAlt className = "text-fb-blue-light text-base"/></button>
               </div>
          </form>
         }
 
        {error && <div className = "my-16 animate-pulse">
            <h1 className = "text-red-600 text-center">
                An error occured while loading comments. 
                <br/> Please try again later</h1>
            </div>
        }
        {
            comments && comments.length > 0 ? 
                null : <h1 className = {`text-center font-bold text-base my-10 ${error && 'hidden'}`}>
                            There are no comments yet
                        </h1>
        }
        { 
            comments && comments.map(comment => {
                return (
                  <div className = "flex items-center my-7 group" key = {comment._id}>
                    <img src = {deleteThis} alt = "profpic" className = 'w-6 rounded-full'/>
                    <div className = "bg-blue-100 rounded-lg shadow-sm p-2 pl-3 my-2 flex flex-col w-full relative" >
                        <h1 className = 'text-xs font-semibold text-fb-blue-light' >
                            {comment.user.username}
                        </h1>
                        <p>{comment.content}</p>
                        <div className = 'absolute text-xs -bottom-5'>
                            <span className = "cursor-pointer hover:text-fb-blue-light"
                                onClick = {() => likeComment(comment)}> {comment.likes.includes(user._id) ? 'Unlike' : 'Like'} </span>
                            |<span> {comment.time_since_post} </span>
                            {user?._id === comment.user?._id &&
                                 <span onClick = {() => deleteComment(comment._id)}
                                    className = "text-xs opacity-0 group-hover:opacity-100 cursor-pointer text-red-600"
                                    >| delete</span>}
                        </div>
                        <div className = "absolute flex items-center right-2 -bottom-2 bg-fb-blue-light rounded-lg p-1 text-white" style = {{fontSize:"11px"}}>
                          <AiFillLike/>
                          <span>{comment.likes.length}</span>
                        </div>

                    </div> 
                  </div>
                )
            })
         }
    </section>
    )
}

export default CommentSection