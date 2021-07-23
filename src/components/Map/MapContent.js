import React, { useEffect, useContext, useState} from 'react';
import { TileLayer, useMap, Marker, Popup, useMapEvents} from 'react-leaflet';
import {MarkerContext, AddMarkerContext} from '../Dashboard/DashBoard'
import CustomMarker from './CustomMarkers/CustomMarker'
import ClientLocMarker from './CustomMarkers/ClientLocMarker'
import TemporaryMarker from './CustomMarkers/TemporaryMarker';


function MapContent({lat, lng}) {
    const map = useMap(); 

    const {testData, setCurrentMarker} = useContext(MarkerContext)
    const {setAddLat, setAddLng} = useContext(AddMarkerContext)
    const [tempMarkPos, setTempMarkPos] = useState([])

    //set view when map loads
    useEffect(() => {
      map.flyTo([lat,lng], 14, {
          duration:2
      })
    }, [lat,lng,map])


    const handleNewMarker = (e) => {
      console.log(e.latlng)
      const {lat, lng} = e.latlng
      setAddLat(lat)
      setAddLng(lng)

      //remove  currentMarker jsx from sidebar
      setCurrentMarker({})

      //temporary marker position
      setTempMarkPos([lat, lng])
    }

    useMapEvents({
      click: handleNewMarker
    })
  
    return ( 
      <>
        <TileLayer 
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* {marker on client's location} */}
        <Marker position={[lat, lng]} icon = {ClientLocMarker}>
          <Popup>
            Your position
          </Popup>
        </Marker>

        {/*TEMP MARKER COMPONENT with CUSTOM COLOR !!!!!!*/}
        {tempMarkPos.length > 0 && <Marker position = {tempMarkPos} icon = {TemporaryMarker}><Popup>Add new place here</Popup></Marker>}

        { //markers with event listeners! and Popups with much info
          testData.map((place) => {
            return (
              <CustomMarker place = {place} key = {place.name}/>
            )
          })
        }
      </>
    );
  }

  export default MapContent