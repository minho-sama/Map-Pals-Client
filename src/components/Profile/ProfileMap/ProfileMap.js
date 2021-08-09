import React, { useState } from 'react';
import useFetch from '../../customHooks/useFetch';
import MarkerCard from './MarkerCard';
import { MapContainer } from 'react-leaflet';
import ProfileMapContent from './ProfileMapContent';
import {FaMapMarked} from 'react-icons/fa'

function ProfileMap({ user, userFromServer }) {

  const { data: userMarkers } = useFetch(
      `http://localhost:3000/markers/user/${userFromServer._id}`
    );

  const [clickedMarker, setClickedMarker] = useState({});

  //default latlng
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  //setting map to first marker onload
  React.useEffect(() => {
      if(userMarkers?.length > 0){
        setClickedMarker(userMarkers[0])
        setLatitude(userMarkers[0].lat)
        setLongitude(userMarkers[0].lng)
      }
  }, [userMarkers])


  const decideBG = (name) => {
    if (name === clickedMarker.name) return 'marker-card-selected';
    else {
      return 'marker-card';
    }
  };

  return (
    <section className="mt-2 w-full h-full flex flex-col md:flex-row font-normal">
      <div className="w-full md:w-1/5 min-h-150 overflow-scroll overflow-x-hidden">
        <h1 className="w-full text-center font-semibold bg-fb-blue text-white rounded-sm mb-2">
          {userFromServer.username}'s Markers
        </h1>
        <ul className="flex flex-col items-center gap-1">
          {userMarkers && userMarkers.length > 0 ? (
            userMarkers.map((marker) => {
              return (
                <MarkerCard
                  key={marker._id}
                  marker={marker}
                  styling={decideBG(marker.name)}
                  setClickedMarker={setClickedMarker}
                  setLatitude = {setLatitude}
                  setLongitude = {setLongitude}
                />
              );
            })
          ) : (
            <span className="text-default text-fb-blue-light font-semibold mt-10 md:mt-20">
              {userFromServer.username} has no markers yet
            </span>
          )}
        </ul>
      </div>
      <section className="w-full min-h-300 md:min-h-0 h-full md:w-4/5 border-0 border-fb-blue md:border-l-2 relative">
        {userMarkers && userMarkers.length > 0 ? (
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <ProfileMapContent 
                lat={latitude} 
                lng={longitude} 
                clickedMarker = {clickedMarker}
            />
          </MapContainer>
        ) : (
          <div className="h-full w-full bg-berlin-map">
            <div className="w-full h-full backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center text-shadow-md">
              <FaMapMarked className="text-2xl" />
            </div>
          </div>
        )}
      </section>
    </section>
  );
}

export default ProfileMap;
