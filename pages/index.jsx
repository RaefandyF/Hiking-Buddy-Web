import BodyNavigation from "@/components/BodyNavigation";
import Footer from "@/components/Footer";
import HeaderComponent from "@/components/Header";
import HeaderNavigation from "@/components/HeaderNavigation";
import HomeMobile from "@/components/MobileComponent/HomeMobile/HomeMobile";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [currLogin, setCurrLogin] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // get current user login data
  // const getCurrentUserLogin = () => {
  //     axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid") || 'empty'}`)
  //     .then((res)=>{
  //       if(!res.data.data[0]){
  //         console.log(res.data.data[0]["Userfullname"])
  //         setCurrLogin(res.data.data[0]["Userfullname"])
  //       }
  //     })
  // }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440); // Mengatur breakpoint untuk ukuran mobile (768px)
    };

    handleResize(); // Cek ukuran layar saat pertama kali komponen di-mount
    window.addEventListener("resize", handleResize); // Event listener untuk menangani perubahan ukuran layar

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useEffect(() => {
    // getCurrentUserLogin()
  }, []);

  if (isMobile) {
    return <HomeMobile />; // Jika ukuran layar mobile, render komponen LoginMobile
  }

  return (
    <HomeMobile />

    // <div>
    //   <HeaderComponent />
    //   <HeaderNavigation />
    //   {/* <BodyNavigation /> */}
    //   <Footer />
    // </div>
  );
}
