import React, {useState, useContext} from 'react';
import MainMap from '../Map/MainMap';
import Sidebar from '../Sidebar/Sidebar';

import {UserContext} from '../App'
import { Redirect } from 'react-router-dom';

export const MarkerContext = React.createContext()
export const AddMarkerContext = React.createContext()

function Dashboard() {  
  const {user} = useContext(UserContext)

  //when user clicks on an existing marker
  const [currentMarker, setCurrentMarker] = useState({}) 

  //when user clicks on map to add a new marker
  const [addLat, setAddLat] = useState(null)
  const [addLng, setAddLng] = useState(null)

    //ITT LESZ EGY CSOMÓ KÖZÖS STATE!
    const testData = [
      {
        "name": "mcdonalds",
        "coords": [51.505, -0.09],
        "likes": 3
      },
      {
        "name": "burger king",
        "coords": [51.500, -0.05],
        "likes": 6
      },
      {
        "name": "pokegym",
        "coords": [47.45427, 19.1516761],
        "likes": 2
      }
    ]

  if(!user){
    return <Redirect to ='/'/>
  }

    return (
      <article className="flex-grow md:flex">
        <MarkerContext.Provider value = {{currentMarker, setCurrentMarker, testData}}>
          <AddMarkerContext.Provider value = {{addLat, addLng, setAddLat, setAddLng}}>
           <Sidebar/>
           <MainMap/>
          </AddMarkerContext.Provider>
        </MarkerContext.Provider> 
      </article>
    )

}

export default Dashboard