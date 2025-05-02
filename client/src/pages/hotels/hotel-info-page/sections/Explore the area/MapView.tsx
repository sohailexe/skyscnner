import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import images for marker icon and shadow
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Define types for the SetMapView props
interface SetMapViewProps {
  center: [number, number]; // Ensures the center is a tuple with two numeric values (latitude, longitude)
  zoom?: number; // Defines the zoom level as a number
}

// Fix for missing types (default marker icon)
const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

// SetMapView component to set the map view based on center and zoom level
const SetMapView: React.FC<SetMapViewProps> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null; // This component doesn't render anything but updates the map view
};

// MapView component
const MapView: React.FC<{ className?: string; zoom?: number }> = ({
  className,
}) => {
  const position: [number, number] = [24.92423, 67.054455]; // Set the position as a tuple
  const zoomLevel: number = 14; // Zoom level as a number

  return (
    <MapContainer
      scrollWheelZoom={true}
      className={`h-[350px] w-full ${className}`} // Optional height for the map
    >
      <SetMapView center={position} zoom={zoomLevel} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={defaultIcon}>
        <Popup>Pakistan Central Employees Housing Society</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
