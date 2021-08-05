import React, {useState} from 'react'
import { FaMapMarked } from 'react-icons/fa' 

function MarkerCard({marker}) {
    const [clickedMarker, setClickedMarker] = useState({})

    const decideBG = (name) => {
        // if name === clickedMarker.name
        //     return bg-fb-blue-light
        // else{
        //     basic class
        // }
    }

    React.useEffect(() => {
        console.log('CLICKEDMARKER:')
        console.log(clickedMarker)
    }, [clickedMarker])

    return (
        <li 
          className = "flex gap-2 items-center w-9/10 bg-gray-800 p-2 text-sm text-white cursor-pointer transition hover:bg-fb-blue-light"
          onClick = {() => setClickedMarker(marker)}>
          <FaMapMarked className = "w-2"/>
          <h1>{marker.name}</h1>
        </li>
    )
}

export default MarkerCard
