'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet's icon issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
    center?: [number, number]; // Ensure correct type declaration
}

export default function Map({ center }: MapProps) {
    const defaultCenter: [number, number] = [51, -0.09]; // Default location

    console.log('Map center:', center); // Debugging log

    return (
        <MapContainer
            center={center ?? defaultCenter} // Ensure correct fallback for center
            zoom={center ? 4 : 2} // Define zoom logic
            scrollWheelZoom={false}
            className="h-[35vh] rounded z-40"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {center && (
                <Marker position={center as L.LatLngExpression} />
            )}
        </MapContainer>
    );
}
