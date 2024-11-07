import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RegisterMobile from "../../components/MobileComponent/Register/RegisterMobile";

function RegisterPage() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440); // Mengatur breakpoint untuk ukuran mobile (768px)
    };

    handleResize(); // Cek ukuran layar saat pertama kali komponen di-mount
    window.addEventListener("resize", handleResize); // Event listener untuk menangani perubahan ukuran layar

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msgServer, setMsgServer] = useState('')

  const navigate = useRouter()

  // register new user 
  const registerNewUser = async () => {

    // generate user id 
    const num1 = Math.floor(Math.random()*(9) + 1)
    const num2 = Math.floor(Math.random()*(9) + 1)
    const num3 = Math.floor(Math.random()*(9) + 1)
    const num4 = Math.floor(Math.random()*(9) + 1)
    const num5 = Math.floor(Math.random()*(9) + 1)

    const id = "US"+num1.toString()+num2.toString()+num3.toString()+num4.toString()+num5.toString()

    console.log(id)
    axios.post(`http://localhost:8080/customer/register`, {
      Userid: id, 
      Userfullname: fullname, 
      Useremail: email, 
      Userpassword: password, 
      Userconfirmpassword: confirmPassword, 
      UserDOB: dob, 
      Userrole: 'Customer'
    })
    .then((res)=>{
      console.log(res.data)
      setMsgServer(res.data.message)

      if(res.data.message == "register successfully !"){
        navigate.push('/login')
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  if (isMobile) {
    return <RegisterMobile />; // Jika ukuran layar mobile, render komponen LoginMobile
  }

  return (
    <div className="h-screen w-full flex flex-row">
      <img
        src="/register-img.png"
        className="absolute left-0 h-screen z-0 w-[700px]"
      />
      <div>
        <img
          src="/elipse-register.png"
          className="h-screen absolute right-0 w-2/3 z-20"
        />
        <div className="absolute mx-10 top-[10%] md:right-[15%] lg:right-[15%] max-w-[400px] z-30">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#274753]">Register</h1>
          </div>
          <div className="flex justify-center">
            <img src="/rec-blur.png" className="w-[300px] my-5" />
          </div>
          <div className="my-5">
            <input
              value={fullname}
              onChange={(e)=>setFullname(e.target.value)}
              type="text"
              placeholder="Full name"
              className="w-full border-2 p-3 rounded-md border-[#CDCDCD]"
            />
          </div>
          <div className="my-5">
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full border-2 p-3 rounded-md border-[#CDCDCD]"
            />
          </div>
          <div className="my-5">
            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full border-2 p-3 rounded-md border-[#CDCDCD]"
            />
          </div>
          <div className="my-5">
            <input
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="w-full border-2 p-3 rounded-md border-[#CDCDCD]"
            />
          </div>
          <div>
            <input 
              type="date"
              value={dob}
              onChange={(e)=>setDob(e.target.value)}
              className="w-full border-2 p-3 rounded-md border-[#CDCDCD]"
            />
          </div>
          <div className="my-5">
            <button onClick={()=>registerNewUser()} 
            className="w-full rounded-lg bg-[#F09024] text-white p-3">
              Masuk
            </button>
          </div>
          {
            msgServer.length != 0 ? 
            <div className="text-center w-full bg-red-600 text-white rounded-lg p-3">
              <p>{msgServer}</p>
            </div>
            : <></>
          }
          <div className="my-5 w-full flex flex-row items-center justify-center">
            <img src="/rec-blur.png" className="w-5/12" />
            <p>atau</p>
            <img src="/rec-blur.png" className="w-5/12" />
          </div>
          <div className="my-3">
            <button className="w-full bg-black p-4 rounded-[25px] flex flex-row justify-center">
              <img src="/google-icon.png" className="mx-2" />
              <p className="text-white mx-2">Lanjutkan dengan Google</p>
            </button>
          </div>
          <div className="my-3 w-full flex justify-center">
            <div className="mx-1">
              <p>Sudah memiliki akun?</p>
            </div>
            <div className="mx-1 text-[#F09024]">
              <p>Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
