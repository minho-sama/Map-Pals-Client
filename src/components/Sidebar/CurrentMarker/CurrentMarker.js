import React, {useContext} from 'react'
import {UserContext, TokenContext} from '../../App'
import {AiFillLike} from 'react-icons/ai'
import {BsFillBookmarkFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import CommentSection from './CommentSection'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CurrentMarker({currentMarker, refreshMarkers, setRefreshMarkers, setCurrentMarker}) {

    console.log(currentMarker)
    const {user} = useContext(UserContext)
    const {token} = useContext(TokenContext) //majd delete requesthez!

    const handleDelete = () => {
        fetch(`http://localhost:3000/marker/${currentMarker._id}/delete`, {
            method:'DELETE',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
        })
        .then(res => res.json())
        .then(data => {
            if(data.err){
                notifyErrorDeleted()
            } else{
                notifyDeleted()

                //refreshing markers in useFetch hook and "rerender sidebar"
                setRefreshMarkers(!refreshMarkers)
                setCurrentMarker({})
            }
        })
    } 

    const notifyDeleted = () => toast.success(`You removed ${currentMarker?.name} !`, {
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

    const notifyErrorDeleted = () => toast.error(`An error occured while deleting ${currentMarker?.name}`, {
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

    const addDefaultSrc = (e) => {
        e.target.src = 'https://i.imgur.com/qBJ1H0r.jpg'
    }

    return (
        <>
        <ToastContainer  position = "top-center" autoClose = {3000} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
        <section className={'hidden shadow-inner md:w-1/4 md:h-full md:flex flex-col bg-white text-gray-800 max-h-90 overflow-scroll'}>

          <img src = {`${currentMarker.imgUrl}`} onError = {addDefaultSrc} alt = "place" className ="shadow-lg mb-3 w-full object-cover"/>
            
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
                      {user?._id === currentMarker.user?._id &&  <MdDelete onClick = {handleDelete} className = "text-xl text-red-600 cursor-pointer"/> }  
                  </div>
                </div>

                {/* ez legyen majd link! */}
                <div className = "text-xs flex gap-2 justify-end text-gray-600">
                  <h2>added by: {currentMarker.user.username}</h2> |
                  <span>{currentMarker.post_date_formatted}</span>
                </div>

                {/*COMMENTS */}
                <CommentSection/>

            </div>
        </section>
        </>
    )
}


export default CurrentMarker
