import L from 'leaflet'
import stickman from "../../../assets/street-view.png";

const ClientLocMarker = new L.Icon({
    iconUrl: stickman,
    iconRetinaUrl: stickman,
    iconSize: [50, 55],
})

export default ClientLocMarker
