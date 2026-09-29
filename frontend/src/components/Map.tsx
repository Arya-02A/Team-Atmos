import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const STATIONS = [
  { id: "s1", name: "Anand Vihar", lat: 28.6476, lon: 77.3158, pm25: 180 },
  { id: "s2", name: "Punjabi Bagh", lat: 28.6738, lon: 77.1273, pm25: 140 },
  { id: "s3", name: "RK Puram", lat: 28.5632, lon: 77.1869, pm25: 120 },
  { id: "s4", name: "Okhla", lat: 28.5648, lon: 77.2913, pm25: 160 },
  { id: "s5", name: "ITO", lat: 28.6276, lon: 77.2405, pm25: 150 },
];

export default function Map({ stations = STATIONS }) {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-atmos-border relative">
      <MapContainer 
        center={[28.6139, 77.2090]} 
        zoom={11} 
        style={{ height: '100%', width: '100%', background: '#0a0f12' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        />
        {stations.map(station => (
          <CircleMarker
            key={station.id}
            center={[station.lat, station.lon]}
            radius={station.pm25 > 150 ? 12 : 8}
            pathOptions={{ 
              color: station.pm25 > 150 ? '#ef4444' : '#00e5ff',
              fillColor: station.pm25 > 150 ? '#ef4444' : '#00e5ff',
              fillOpacity: 0.6
            }}
          >
            <Popup className="custom-popup">
              <div className="text-black p-1">
                <h3 className="font-bold">{station.name}</h3>
                <p>PM2.5: {station.pm25} µg/m³</p>
                <span className="text-xs font-bold text-blue-600">OBSERVED</span>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
