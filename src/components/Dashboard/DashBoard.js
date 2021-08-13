import React, {useState, useContext, useEffect} from 'react';
import MainMap from '../Map/MainMap';
import Sidebar from '../Sidebar/Sidebar';
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import useFetch from '../customHooks/useFetch'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MarkerContext = React.createContext()
export const AddMarkerContext = React.createContext()

function Dashboard() {  
  const {user} = useContext(UserContext)
  let history = useHistory()

  //fetching markers
  //only FRIENDS' markers (and own markers)
  const {data:allMarkers, error, refresh:refreshMarkers, setRefresh:setRefreshMarkers} = useFetch(`https://mappals.herokuapp.com/markers/user/friends/${user._id}`)

  //when user clicks on an existing marker
  const [currentMarker, setCurrentMarker] = useState({}) 

  //when user clicks on map to add a new marker
  const [addLat, setAddLat] = useState(null)
  const [addLng, setAddLng] = useState(null)

  if(!user){ 
    history.push('/')
  }

  //error if server fails
  const notifyServerErr = () => toast.error('Error while retrieving data from the server, sorry for the inconvenience', {
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  });
  if(error) { 
    notifyServerErr()
  }

  return (
    <>
    <ToastContainer  position = "top-center" autoClose = {3000} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <article className="flex-grow md:flex">
      <MarkerContext.Provider value = {{currentMarker, setCurrentMarker, allMarkers}}>
        <AddMarkerContext.Provider value = {{addLat, addLng, setAddLat, setAddLng}}>
         <Sidebar refreshMarkers = {refreshMarkers} setRefreshMarkers = {setRefreshMarkers}/>
         <MainMap/>
        </AddMarkerContext.Provider>
      </MarkerContext.Provider> 
    </article>
    </>
  )

}

export default Dashboard