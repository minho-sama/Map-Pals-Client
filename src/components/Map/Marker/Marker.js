import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { PlaceContext } from '../../Dashboard/DashBoard';

function CustomMarker({ place }) {
  const { setCurrentPlace } = useContext(PlaceContext);

  return (
    <div>
      <Marker
        position={place.coords}
        eventHandlers={{
          click: (e) => {
            setCurrentPlace(place);
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
