import React, { useState, useEffect } from "react";
import AktivitasMobile from "@/components/MobileComponent/AktivitasMobile/AktivitasMobile";

export default function AktivitasPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430); // Mengatur breakpoint untuk ukuran mobile (768px)
    };

    handleResize(); // Cek ukuran layar saat pertama kali komponen di-mount
    window.addEventListener("resize", handleResize); // Event listener untuk menangani perubahan ukuran layar

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  if (isMobile) {
    return <AktivitasMobile />; // Jika ukuran layar mobile, render komponen LoginMobile
  }

  return <div>AktivitasPage</div>;
}
