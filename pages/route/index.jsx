import NavbarComponent from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import cookie from "cookie";

function index() {
  const [currLogin, setCurrLogin] = useState("");
  const [mountains, setMountains] = useState([]);
  const router = useRouter();

  // get all mountain data
  // const getAllMountainData = () => {
  //     axios.get(`http://localhost:8080/mountain/get-all-mountain`)
  //     .then((res)=>{
  //         console.log(res.data.mountains[0]['MountainId'])
  //         setMountains(res.data.mountains)
  //     })
  // }

  // // get current login
  // const getCurrentLogin = () => {
  //     axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid") || 'empty'}`)
  //     .then((res)=>{
  //         if(res.data.data){
  //             setCurrLogin(res.data.data[0]["Userfullname"])
  //         }
  //     })
  // }

  // direct to page
  // const directToDetail = (id) => {
  //     console.log(id)
  //     sessionStorage.setItem("montainid", id);
  //     router.push(`/route/${id}`)
  // }

  // useEffect(()=>{
  //     getCurrentLogin()
  //     getAllMountainData()
  // }, [])

  return (
    <div className="min-h-screen">
      <div
        className="w-full h-[25rem] rounded-b-[5rem] bg-cover bg-center"
        style={{ backgroundImage: `url("/route_image.png")` }}
      >
        <NavbarComponent log={currLogin} />
        <div className="p-12">
          <h1 className="text-white font-bold text-[2.5rem] max-w-[60rem]">
            Welcome to Mountain Trail: "Begin Your Journey to the Summit !
          </h1>
          <p className="text-white text-[1rem]">
            There are list of routes that available
          </p>
        </div>
      </div>

      <div className="p-[50px] flex justify-between">
        <div className="font-bold text-[20px]">
          <p>Explore your route!</p>
        </div>
        <div className="flex">
          <div>
            <input
              className="border border-grey-400 w-[400px] rounded-lg p-1 mx-2"
              placeholder="search"
            />
          </div>
          <div>
            {/* get data from api */}
            <select className="border border-grey-400 p-1 rounded-lg w-[150px] bg-gray-400">
              <option>-</option>
              <option>Lombok</option>
            </select>
          </div>
        </div>
      </div>
      <div className="min-h-[500px] flex flex-wrap">
        {/* api in this */}
        {mountains.map((mo, idx) => (
          <div
            onClick={() => directToDetail(mo.MountainId)}
            key={idx}
            className="cursor-pointer h-[320px] min-w-[250px] relative mt-[5px] mx-3"
          >
            <div className="absolute w-full h-full">
              <img src="/route_card_image.png" className="w-full h-full" />
              <div className="w-[200px] flex justify-between absolute top-3 m-3 mx-5">
                <div className="text-white text-center rounded-lg min-w-[80px] backdrop-blur-sm bg-white/30">
                  <p>{mo.City}</p>
                </div>
                <div>
                  <img src="/save_icon.png" />
                </div>
              </div>
              <div className="absolute rounded-[20px] py-2 bg-black bg-opacity-50 translate-x-[10px] text-center text-white bottom-[40px]">
                <div className="w-[230px] h-[100px]">
                  <div className="font-bold">
                    <p>{mo.MountainName}</p>
                  </div>
                  <div className="flex justify-left items-center mx-3">
                    <IoLocationSharp />
                    <div className="mx-1">
                      <p>{`Jarak ${mo.JarakPuncak}`}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mx-3">
                    <div className="flex items-center">
                      <MdAccessTimeFilled />
                      <div className="mx-1">
                        <p>{`${mo.WaktuTempuh} jam`}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaStar color="#FFC94A" className="mx-2" />
                      <div className="">
                        <p>4.9</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default index;
