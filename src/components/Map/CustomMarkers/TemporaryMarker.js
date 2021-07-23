import L from 'leaflet'
import tempMarker from "../../../assets/tempMarker.png";

const TemporaryMarker = new L.Icon({
    iconUrl: tempMarker,
    iconRetinaUrl: tempMarker,
    iconSize: [35, 35],
})

export default TemporaryMarker
