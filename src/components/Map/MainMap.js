import React, { useState, useEffect} from 'react';
import { MapContainer} from 'react-leaflet';
import MapContent from './MapContent'
import GeoSearch from './GeoSearch/GeoSearch'

function MainMap() {

  //default location is London
  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);

  //getting user's location 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => console.log(err)
    );
  }, []);

  return (
    <section className="w-full h-full md:w-3/4 md:h-full ">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapContent lat={latitude} lng={longitude}/>
        <GeoSearch/>

      </MapContainer>
    </section>
  );
}



export default MainMap;
