import React, {useEffect} from 'react'
import { TileLayer, useMap, Marker} from 'react-leaflet';
import DefaultCity from '../../../assets/defaultCity.jpg'
import CustomPopup from '../../Map/Popup/CustomPopup'

function ProfileMapContent({lat, lng, clickedMarker}) {
    const map = useMap()

    useEffect(() => {
        map.flyTo([lat,lng], 14, {
            duration:2
        })
      }, [lat,lng,map])

      const addDefaultSrc = (e) => {
        e.target.src = DefaultCity
      }

    return (
      <>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
            <CustomPopup place = {clickedMarker} addDefaultSrc = {addDefaultSrc}/>
        </Marker>
      </>
    );
}

export default ProfileMapContent
