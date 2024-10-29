import React, { useEffect, useState } from "react";
import ProfileMobile from "@/components/MobileComponent/ProfileMobile/ProfileMobile";

export default function ProfilePage() {
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
    return <ProfileMobile />; // Jika ukuran layar mobile, render komponen LoginMobile
  }

  return <div>Profile Page Website</div>;
}
