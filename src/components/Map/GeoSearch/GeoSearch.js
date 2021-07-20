import React from 'react'
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import './geosearch.css';

export default function GeoSearch() {
    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = SearchControl;
    return (
        <GeoSearchControlElement
        provider={prov}
        showMarker={true}
        showPopup={false}
        maxMarkers={3}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={false}
        searchLabel={"Enter a location"}
        keepResult={true}
        popupFormat={({ query, result }) => result.label}
      />
    )
}
