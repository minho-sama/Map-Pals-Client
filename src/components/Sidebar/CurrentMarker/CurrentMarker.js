import React, {useContext} from 'react'
import {UserContext, TokenContext} from '../../App'
import CommentSection from './CommentSection'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkerControllers from './LikeMarkDel'
import DefaultCity from '../../../assets/defaultCity.jpg'

function CurrentMarker({currentMarker, refreshMarkers, setRefreshMarkers, setCurrentMarker}) {

    const {user} = useContext(UserContext)
    const {token} = useContext(TokenContext)

    const addDefaultSrc = (e) => {
        e.target.src = DefaultCity
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

    return (
        <>
        <ToastContainer  position = "top-center" autoClose = {3000} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
        <section className={'hidden shadow-inner md:w-1/4 md:h-full md:flex flex-col bg-white text-gray-800 max-h-90 overflow-scroll'}>

          <img src = {`${currentMarker.imgUrl}`} onError = {addDefaultSrc} alt = "place" className ="shadow-lg mb-3 w-full object-cover rounded-sm"/>
            
            <div className = "p-2">

                <MarkerControllers 
                    user = {user} 
                    token = {token} 
                    notifyDeleted = {notifyDeleted} 
                    notifyError = {notifyError} 
                    currentMarker = {currentMarker} 
                    refreshMarkers = {refreshMarkers}
                    setRefreshMarkers = {setRefreshMarkers}
                    setCurrentMarker = {setCurrentMarker}
                  /> 

                {/* ez az egész legyen majd link! */}
                <div className = "text-xs flex gap-2 justify-end text-gray-600">
                  <h2>{currentMarker.user.username} minhImg</h2> |
                  <span>{currentMarker.post_date_formatted}</span>
                </div>

                {/*COMMENTS */}
                <CommentSection
                  user = {user} 
                  token = {token} 
                  notifyError = {notifyError} 
                  currentMarker = {currentMarker} 
                />
 
            </div>
        </section>
        </>
    )
}


export default CurrentMarker
