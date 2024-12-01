import { useState, useEffect } from "react";

const CompassComponent = () => {
  const [heading, setHeading] = useState(0);

  // Mengambil data DeviceOrientation
  useEffect(() => {
    const handleOrientation = (event) => {
      const alpha = event.alpha; // Sudut kompas dalam derajat
      setHeading(alpha || 0); // Jika `alpha` undefined, default ke 0
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Lingkaran kompas */}
      <div className="relative w-40 h-40 border-4 border-gray-300 rounded-full flex items-center justify-center">
        {/* Panah yang berputar */}
        <div
          className="absolute top-1/2 left-1/2 w-1 h-16 bg-red-500 origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${heading}deg)`,
          }}
        />
        {/* Arah Utara */}
        <span className="absolute top-2 text-sm font-bold">N</span>
        {/* Arah Selatan */}
        <span className="absolute bottom-2 text-sm font-bold">S</span>
        {/* Arah Timur */}
        <span className="absolute right-2 text-sm font-bold">E</span>
        {/* Arah Barat */}
        <span className="absolute left-2 text-sm font-bold">W</span>
      </div>
      {/* Tampilkan sudut */}
      <p className="mt-4 text-lg font-medium">
        Heading: {Math.round(heading)}°
      </p>
    </div>
  );
};

export default CompassComponent;
