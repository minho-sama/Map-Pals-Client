import React, { useState, useEffect} from 'react';
import { MapContainer} from 'react-leaflet';
import MapContent from './MapContent'
import GeoSearch from './GeoSearch/GeoSearch'

function MainMap({testData, setCurrentPlace}) {

  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);

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
    <section className="w-full h-4/5 md:w-3/4 md:h-full ">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapContent lat={latitude} lng={longitude} testData = {testData} setCurrentPlace={setCurrentPlace}/>
        <GeoSearch/>

      </MapContainer>
    </section>
  );
}



export default MainMap;
