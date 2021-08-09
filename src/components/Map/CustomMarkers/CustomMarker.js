import React, { useContext } from 'react';
import { Marker} from 'react-leaflet';
import { MarkerContext, AddMarkerContext } from '../../Dashboard/DashBoard';
import DefaultCity from '../../../assets/defaultCity.jpg'
import CustomPopup from '../Popup/CustomPopup'

function CustomMarker({ place }) {
  const { setCurrentMarker } = useContext(MarkerContext);
  const { setAddLat, setAddLng } = useContext(AddMarkerContext);

  const addDefaultSrc = (e) => {
    e.target.src = DefaultCity
  }

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
        <CustomPopup place = {place} addDefaultSrc = {addDefaultSrc}/>
      </Marker>
    </div>
  );
}

export default CustomMarker;
