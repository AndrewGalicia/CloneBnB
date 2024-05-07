'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl; // Fixes leaflet's icon issue with Webpack
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src, // Fixed typo
});

interface MapProps {
    center?: [number, number]; // Ensured correct type declaration
}

export default function Map({ center }: MapProps) { // Corrected prop destructuring
    const defaultCenter: [number, number] = [51, -0.09]; // Default location
    return (
        <MapContainer
            center={center ?? defaultCenter} // Ensured correct fallback for center
            zoom={center ? 4 : 2} // Defined zoom logic
            scrollWheelZoom={false}
            className="h-[35vh] rounded"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {center && (
                <Marker
                position= {center as L.LatLngExpression}/>
            )}
            </MapContainer>
            )
}
