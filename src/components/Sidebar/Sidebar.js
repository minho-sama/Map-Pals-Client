import React, {useContext} from 'react';
import {MarkerContext, AddMarkerContext} from '../Dashboard/DashBoard'
import { ReactComponent as Logo } from '../../assets/worldwide.svg';
import {BsArrowRight} from 'react-icons/bs'
import AddMarkerForm from './AddMarkerForm'

function Sidebar() {

  const {currentMarker} = useContext(MarkerContext)
  const {addLat, addLng} = useContext(AddMarkerContext)

  if(JSON.stringify(currentMarker) === '{}' && !addLat){
    return (
      <section className="hidden shadow-inner md:flex md:w-1/4 md:h-full p-2 py-4 text-lg flex-col gap-12 justify-center items-center text-center bg-gray-800 text-white">
        <h1>Add you favorite places to the <span className = "text-fb-blue-light">Map</span> with just a click!</h1>
        <BsArrowRight className = "hidden md:block animate-bounce text-fb-blue-light"/>
        <Logo className = "hidden md:block w-1/4 md:w-1/2"/>
        <h2>To see your <span className = "text-fb-blue-light">Friends'</span> places, click on the marker</h2>
      </section>
    )
  } else{ 
    return (
      <section className="w-full h-1/5 shadow-inner md:w-1/4 md:h-full p-4 flex flex-col items-center justify-center bg-gray-800 text-white">
          {
            JSON.stringify(currentMarker) === '{}' ? "" :
            <>
            <p>marker name: {currentMarker.name} added by: minho</p> 
            <p>marker likes: {currentMarker.likes}</p>
            </>        
          }
          {
            addLat && <AddMarkerForm addLat = {addLat} addLng = {addLng}/>
          }

      </section>
    );
  }
}

export default Sidebar;
