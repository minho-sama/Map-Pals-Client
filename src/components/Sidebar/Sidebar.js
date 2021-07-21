import React, {useContext} from 'react';
import {PlaceContext} from '../Dashboard/DashBoard'

function Sidebar() {
  const {currentPlace}= useContext(PlaceContext)
  return (
    <div className="w-full h-1/5 md:w-1/4 md:h-full p-2">

      <h2>sidebar stuff</h2>
        {
          JSON.stringify(currentPlace) === '{}' ? 
          <h1>Click on a marker!</h1> :
          <>
          <p>{currentPlace.name} added by: minho</p>
          <p>{currentPlace.likes}</p>
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

    </div>
  );
}

export default Sidebar;
