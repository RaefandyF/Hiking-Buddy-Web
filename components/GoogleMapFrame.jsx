import React, { useState } from "react";

const GoogleMapFrame = ({ location = "Jakarta" }) => {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-full h-auto">
      {/* Placeholder loading */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
          <span className="text-gray-500">Loading map...</span>
        </div>
      )}

      {/* Google Maps iframe */}
      <iframe
        className="rounded-md shadow-md"
        width="100%"
        height="100"
        id="gmap_canvas"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(
          location
        )}&t=&z=12&ie=UTF8&iwloc=B&output=embed`}
        onLoad={handleLoad}
        style={{ display: loading ? "none" : "block" }}
      ></iframe>
    </div>
  );
};

export default GoogleMapFrame;
