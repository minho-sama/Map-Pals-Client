import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerContext, AddMarkerContext } from '../../Dashboard/DashBoard';

function CustomMarker({ place }) {
  const { setCurrentMarker } = useContext(MarkerContext);
  const { setAddLat, setAddLng } = useContext(AddMarkerContext);

  return (
    <div>
      <Marker
        position={[place.lat, place.lng]}
        eventHandlers={{
          click: (e) => {
            setCurrentMarker(place);

            //remove addNewMarker jsx from sidebar
            setAddLat(null)
            setAddLng(null)
          },
        }}
      >
        <Popup>
        <span className = "font-semibold">{place.name}</span>
        </Popup>
      </Marker>
    </div>
  );
}

export default CustomMarker;
