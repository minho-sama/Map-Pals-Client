import React, { useEffect} from 'react';
import { TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function MapContent({lat, lng, testData, setCurrentPlace}) {
    const map = useMap();
  
    useEffect(() => {
      map.flyTo([lat,lng], 15, {
          duration:2
      })
    }, [lat,lng,map])
  
    return (
      <>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            Start adding markers of your favorite places!
          </Popup>
        </Marker>

        { //marker külön componentbe!!!
          testData.map((place) => {
            return (
              <Marker
                position = {[place.coords[0], place.coords[1]]} 
                eventHandlers={{
                  click: (e) => {
                    setCurrentPlace(place)
                  },
                }}>
                <Popup>
                  {place.name}
                </Popup>
              </Marker>
            )
          })
        }
      </>
    );
  }

  export default MapContent