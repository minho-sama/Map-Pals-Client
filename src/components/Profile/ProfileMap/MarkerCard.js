import React from 'react'
import { FaMapMarked } from 'react-icons/fa' 

function MarkerCard({marker, styling, setClickedMarker, setLatitude, setLongitude}) {

    const handleMarkerClick = () => {
      setClickedMarker(marker)
      setLatitude(marker.lat)
      setLongitude(marker.lng)
    }

    return (
        <li 
          className = {styling}
          onClick = {handleMarkerClick}>
          <FaMapMarked className = "w-2"/>
          <h1>{marker.name}</h1>
        </li>
    )
}

export default MarkerCard
