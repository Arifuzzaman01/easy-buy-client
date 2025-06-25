import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const districts = useLoaderData();
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    // console.log(value);
    setSearch(value);
    const match = districts.find((d) =>
      d.district.toLowerCase().includes(value.toLowerCase())
    );
    if (match) {
      setSelectedLocation({ lat: match.latitude, lon: match.longitude }); 
    } else {
      setSelectedLocation(null);
    }
  };
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 ">
      <h2 className="text-3xl font-bold text-center">
        We are available in 64 districts
      </h2>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search district..."
          className="input input-bordered w-full max-w-sm"
        />
      </div>

      <div className="mt-8 rounded-xl overflow-hidden shadow-lg py-10">
        <BangladeshMap
          selectedLocation={selectedLocation}
          districts={districts}
        />
      </div>
    </section>
  );
};

export default Coverage;
