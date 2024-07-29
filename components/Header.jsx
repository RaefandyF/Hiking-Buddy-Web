import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavbarComponent from "./Navbar";
import FindSelf from "./FindSelf";
import ListFeature from "./ListFeature";
import axios from "axios";

function HeaderComponent() {
  const [log, setLog] = useState('')

  // get current login
  const getCurrentLogin = () => {
    // console.log(sessionStorage.getItem("userid") == null)
    console.log(sessionStorage.getItem("userid"))
      axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid")}`)
      .then((res)=>{
        if(res.data.data[0]){
          console.log(res.data.data[0]["Userfullname"])
          setLog(res.data.data[0]["Userfullname"])
        }
      })
  }

  useEffect(()=>{
    getCurrentLogin()
  }, [])

  return (
    <div>
      <div>
        <div className="relative">
          <div>
            <img style={{ width: `100%` }} src="/imagepage.png" className="" />
            <div className="w-full absolute top-0">
              <NavbarComponent log={log}  />
            </div>
          </div>
          <FindSelf />
          <ListFeature />
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
