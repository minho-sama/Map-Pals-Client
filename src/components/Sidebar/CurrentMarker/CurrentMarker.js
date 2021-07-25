import React, {useContext} from 'react'
import {UserContext, TokenContext} from '../../App'
import {AiFillLike} from 'react-icons/ai'
import {RiBookmark3Fill} from 'react-icons/ri'
import {FaTrashAlt} from 'react-icons/fa'
import CommentSection from './CommentSection'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CurrentMarker({currentMarker, refreshMarkers, setRefreshMarkers, setCurrentMarker}) {

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
                notifyError()
            } else{
                notifyDeleted()

                //refreshing markers in useFetch hook and "rerender sidebar"
                setRefreshMarkers(!refreshMarkers)
                setCurrentMarker({})
            }
        })
    } 

    const handleLike = () => {

        if(currentMarker.likes.includes(user._id)){
            currentMarker.likes.splice(currentMarker.likes.indexOf(user._id),1)
        } else{
            currentMarker.likes.push(user._id)
        }
        fetch(`http://localhost:3000/marker/${currentMarker._id}/like`, {
            method: 'PATCH',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                likes: currentMarker.likes
            })
        })
        .then(res => res.json()) 
        .then(data => {
            if(data.err){
                notifyError() //
            }
        })
        //refresh again
        setRefreshMarkers(!refreshMarkers)
    }

    const notifyDeleted = () => toast.success(`You removed ${currentMarker?.name} !`, {
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

    const notifyError = () => toast.error('An error occured with the server', {
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
                  <div className = "flex items-center gap-4 justify-end ">
                      <figure onClick = {handleLike} className = {`flex items-center text-lg cursor-pointer ${currentMarker.likes.includes(user._id) && 'text-fb-blue-light'}`}>
                          <AiFillLike/>
                          <figcaption>{currentMarker.likes.length}</figcaption>
                      </figure>
                      <RiBookmark3Fill className = "text-lg cursor-pointer"/>
                      {user?._id === currentMarker.user?._id &&  <FaTrashAlt onClick = {handleDelete} className = "text-md text-red-600 cursor-pointer"/> }  
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
