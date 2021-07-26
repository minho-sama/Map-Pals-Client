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
          <figure>
            <figcaption className = "font-semibold">{place.name}</figcaption><br/>
            <img src = {place.imgUrl} alt = "place img" className = "rounded-sm"/>
            <figcaption style = {{"font-size":"9px", "float": "right", "margin-top":"1px"}}>
              added by <span className = "font-semibold">
                {place.user.username}</span>
            </figcaption>
          </figure>
        </Popup>
      </Marker>
    </div>
  );
}

export default CustomMarker;
