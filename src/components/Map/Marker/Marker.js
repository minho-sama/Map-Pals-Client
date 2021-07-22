import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerContext, AddMarkerContext } from '../../Dashboard/DashBoard';

function CustomMarker({ place }) {
  const { setCurrentMarker } = useContext(MarkerContext);
  const { setAddLat, setAddLng } = useContext(AddMarkerContext);

  return (
    <div>
      <Marker
        position={place.coords}
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
            {place.name}
        </Popup>
      </Marker>
    </div>
  );
}

export default CustomMarker;
