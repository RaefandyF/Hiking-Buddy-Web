import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavbarComponent from "./Navbar";
import FindSelf from "./FindSelf";
import ListFeature from "./ListFeature";
import axios from "axios";

function HeaderComponent() {
  const [log, setLog] = useState('')
  const [sessionId, setSessionId] = useState('')

  // get current login
  const getCurrentLogin = (sessid) => {
    console
    // console.log(sessionStorage.getItem("userid") == null)
    if(sessid){
      
        axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid")}`)
        .then((res)=>{
          if(res.data.data[0]){
            console.log(res.data.data[0]["Userfullname"])
            setLog(res.data.data[0]["Userfullname"])
          }
        })
    }
  }

  useEffect(()=>{
    let sessid = ''
    if(typeof window !== 'undefined'){
      let sessionValue = sessionStorage.getItem("userid")
      sessid = sessionValue
    }
    getCurrentLogin(sessid)
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
