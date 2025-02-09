import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRCode(props) {
  const [scannedData, setScannedData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleScan = (result) => {
    props.handleScan(result);
  };

  const handleError = (err) => {
    console.error("Error:", err);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <QrReader
        constraints={{ facingMode: "environment" }}
        scanDelay={300}
        onResult={(result, error) => {
          //   console.log(result);
          if (result) {
            // console.log("Hasil QR Code:", result.text);
            handleScan(result.text);
          }
        }}
        className="w-full h-full"
      />
      {/* Tombol Upload */}
      <div className="flex justify-center mt-4">
        <label
          htmlFor="upload"
          className="cursor-pointer bg-[#0d6efd] text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          Upload Gambar QR
        </label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
      {/* Tampilkan Gambar yang Diunggah */}
      {uploadedImage && (
        <div className="mt-4 flex justify-center">
          <img
            src={uploadedImage}
            alt="Uploaded QR"
            className="max-w-[200p] border"
          />
        </div>
      )}
    </div>
  );
}
