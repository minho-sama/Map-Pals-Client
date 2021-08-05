import React, {useState} from 'react'
import {FiEdit2} from 'react-icons/fi'
import UpdateForm from './UpdateForm'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileInfo({userFromServer, user, token, refreshUserFS, setRefreshUserFS}) {

    const [isUpdateMode, setIsUpdateMode] = useState(false)

    const notifyError = () => toast.error("Something's wrong with the servers", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return (
      <>
       <ToastContainer
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
       />
       <section className="p-4 md:self-start border-l-2 border-r-2 border-fb-blue-light w-full lg:w-1/2">
         {isUpdateMode ? (
           <UpdateForm 
            setIsUpdateMode = {setIsUpdateMode} 
            notifyError = {notifyError} 
            userFromServer = {userFromServer}
            token = {token}
            user = {user}
            refreshUserFS = {refreshUserFS}
            setRefreshUserFS = {setRefreshUserFS}
            />
         ) : (
           <div className="flex gap-7 mb-5">
             <ul className="text-fb-blue-light flex flex-col gap-3">
               <li>CITY: </li>
               <li>BIO: </li>
               <li>JOINED: </li>
             </ul>
             <ul className="flex flex-col gap-3 justify-center">
               <li className = "capitalize">
                 {userFromServer.city?.length > 0 ? 
                  userFromServer.city :
                  <p className = "text-gray-500 italic font-normal">Somewhere nice</p>  
                 }
                </li>
               <li className = "">
                 {userFromServer.bio?.length > 0 ? 
                  userFromServer.bio :
                  <p className = "text-gray-500 italic text-center font-normal">{userFromServer.username} has no bio yet</p>  
                 }
               </li>
               <li>{userFromServer.join_date_formatted} </li>
             </ul>
           </div>
         )}
 
         {user._id === userFromServer._id && !isUpdateMode ? (
           <button  onClick = {() => setIsUpdateMode(true)} className = "flex gap-2 items-center text-sm text-white bg-fb-blue rounded-sm p-2 float-right">
             <span>Edit Profile</span>
             <FiEdit2/>
           </button>
         ) : (
           null
         )}
       </section>
      </>
    );
}

export default ProfileInfo