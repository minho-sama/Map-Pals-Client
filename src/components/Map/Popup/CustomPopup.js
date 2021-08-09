import React from 'react';
import {Popup } from 'react-leaflet';

function CustomPopup({place, addDefaultSrc}) {
  return (
    <Popup>
      <figure>
        <figcaption className="font-semibold">{place.name}</figcaption>
        <br />
        <img
          src={place.imgUrl}
          onError={addDefaultSrc}
          alt="place img"
          className="rounded-md"
        />
        <figcaption
          style={{ fontSize: '9px', float: 'right', marginTop: '1px' }}
        >
          added by <span className="font-semibold">{place.user.username}</span>
        </figcaption>
      </figure>
    </Popup>
  );
}

export default CustomPopup;
