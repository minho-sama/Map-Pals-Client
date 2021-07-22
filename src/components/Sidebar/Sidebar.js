import React, {useContext} from 'react';
import {MarkerContext, AddMarkerContext} from '../Dashboard/DashBoard'

function Sidebar() {

  const {currentMarker} = useContext(MarkerContext)
  const {addLat, addLng} = useContext(AddMarkerContext)

  return (
    <div className="w-full h-1/5 shadow-inner md:w-1/4 md:h-full p-2">

      <h2>sidebar stuff</h2>
        {
          JSON.stringify(currentMarker) === '{}' ? 
          <h1>Click on a marker!</h1> :
          <>
          <p>{currentMarker.name} added by: minho</p> 
          <p>{currentMarker.likes}</p>
          <div>
            img
          </div>
          <div>
            container for all actions
          </div>
          <div>
            comments
          </div>
          </>
                    
        }
        {
          addLat || addLng ? 
          <>
          <p>lat: {addLat} lng: {addLng}</p> 
          <button>add this new marker!</button>
          </> :
          <h1>Click on the map to add a new marker!</h1>
        }

    </div>
  );
}

export default Sidebar;
