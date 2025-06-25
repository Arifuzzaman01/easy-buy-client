import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import { districts } from "../data/districts";

function FlyToLocation({ selectedLocation }) {
  const map = useMap();

  React.useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lon], 10, {
        animate: true,
        duration: 1,
      });
    }
  }, [selectedLocation, map]);

  return null;
}

export default function BangladeshMap({ selectedLocation, districts }) {
  return (
    <MapContainer
      center={
        selectedLocation
          ? [selectedLocation.lat, selectedLocation.lon]
          : [23.685, 90.3563]
      }
      zoom={selectedLocation ? 8 : 7}
      style={{ height: "380px", width: "90%", margin: "auto" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FlyToLocation selectedLocation={selectedLocation} />
      {districts.map((district) => (
        <Marker
          key={district.district}
          position={[district.latitude, district.longitude]}
          icon={L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            iconSize: [25, 25],
          })}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{district.district}</h3>
              <p>{district.city}</p>
              <p>{district.covered_area.join(", ")}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
