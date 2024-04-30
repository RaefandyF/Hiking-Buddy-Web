import BodyNavigation from "@/components/BodyNavigation";
import Footer from "@/components/Footer";
import HeaderComponent from "@/components/Header";
import HeaderNavigation from "@/components/HeaderNavigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [currLogin, setCurrLogin] = useState('')

  // get current user login data
  const getCurrentUserLogin = () => {
    axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid")}`)
    .then((res)=>{
      setCurrLogin(res.data.data[0]["Userfullname"])
    })
  }

  useEffect(()=>{
    getCurrentUserLogin()
  }, [])

  return (
    <div>
      <HeaderComponent />
      <HeaderNavigation />
      <BodyNavigation />
      <Footer />
    </div>
  );
}
