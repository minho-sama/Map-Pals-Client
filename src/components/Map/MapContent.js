import React, { useEffect, useContext} from 'react';
import { TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import {MarkerContext, AddMarkerContext} from '../Dashboard/DashBoard'
import CustomMarker from './Marker/Marker'

function MapContent({lat, lng}) {
    const map = useMap(); 

    const {testData, setCurrentMarker} = useContext(MarkerContext)
    const {setAddLat, setAddLng} = useContext(AddMarkerContext)

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

      //remove currentMarker jsx from sidebar
      setCurrentMarker({})
    }

    map.on('click', handleNewMarker)
  
    return ( 
      <>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* majd törölni, vagy legyen egy emberke h itt állsz */}
        <Marker position={[lat, lng]}>
          <Popup>
            Start adding markers of your favorite places!
          </Popup>
        </Marker>

        { //marker külön componentbe!!! + useContext h ne kelljen prop drillelni!!!
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