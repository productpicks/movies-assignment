// components/VoyageMap.tsx
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}
interface VoyageMapProps {
  startPortCoords: Coordinates | null;
  destinationPortCoords: Coordinates | null;
  mapHeight?: string;
}

const startPortIcon = L.icon({
  iconUrl: "/vessel-icon.jpg", // Path to your custom start port icon
  iconSize: [52, 32], // Adjust the size as needed
  iconAnchor: [16, 32], // Anchor point to center the icon properly
  popupAnchor: [0, -32], // Adjust the popup position relative to the icon
});

const destinationPortIcon = L.icon({
  iconUrl: "/vessel-icon.jpg", // Path to your custom destination icon
  iconSize: [52, 32], // Adjust the size as needed
  iconAnchor: [16, 32], // Anchor point to center the icon properly
  popupAnchor: [0, -32], // Adjust the popup position relative to the icon
});

const defaultCenter: [number, number] = [51.505, -0.09]; // Default center for the map

const MapViewUpdater: React.FC<{
  startCoords: Coordinates | null;
  destCoords: Coordinates | null;
}> = ({ startCoords, destCoords }) => {
  const map = useMap(); // Get the map instance

  useEffect(() => {
    if (startCoords && destCoords) {
      // Calculate bounds to fit both start and destination ports
      const bounds = L.latLngBounds([
        [startCoords.lat, startCoords.lng],
        [destCoords.lat, destCoords.lng],
      ]);
      map.fitBounds(bounds, { padding: [50, 50] }); // Fit the bounds with some padding
    } else if (startCoords) {
      // If only startCoords are available, center the map on the start port
      map.setView([startCoords.lat, startCoords.lng], 6); // Adjust zoom level as needed
    } else if (destCoords) {
      // If only destCoords are available, center the map on the destination port
      map.setView([destCoords.lat, destCoords.lng], 6); // Adjust zoom level as needed
    }
  }, [startCoords, destCoords, map]);

  return null;
};

const VoyageMap: React.FC<VoyageMapProps> = ({
  startPortCoords,
  destinationPortCoords,
  mapHeight,
}) => {
  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      style={{ height: mapHeight ? mapHeight : "350px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <MapViewUpdater
        startCoords={startPortCoords}
        destCoords={destinationPortCoords}
      />

      {startPortCoords && (
        <Marker
          position={[startPortCoords.lat, startPortCoords.lng]}
          icon={startPortIcon}
        >
          <Popup>Start Port</Popup>
        </Marker>
      )}
      {destinationPortCoords && (
        <Marker
          position={[destinationPortCoords.lat, destinationPortCoords.lng]}
          icon={destinationPortIcon}
        >
          <Popup>Destination Port</Popup>
        </Marker>
      )}

      {startPortCoords && destinationPortCoords && (
        <Polyline
          positions={[
            [startPortCoords.lat, startPortCoords.lng],
            [destinationPortCoords.lat, destinationPortCoords.lng],
          ]}
          color="#4D8C9C"
        />
      )}
    </MapContainer>
  );
};

export default VoyageMap;
