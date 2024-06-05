import NavbarComponent from "@/components/Navbar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function RouteDetail() {
  const router = useRouter()
  const param = useParams();
  const [currLogin, setCurrLogin] = useState("");
  const [mountain, setMountain] = useState([]);
  const [mountainRating, setMountainRating] = useState([]);

  // get current login
  const getCurrentLogin = () => {
    axios
      .get(
        `http://localhost:8080/customer/get-current-login?userid=${
          sessionStorage.getItem("userid") || "empty"
        }`
      )
      .then((res) => {
        if (!res.data.data[0]) {
          setCurrLogin(res.data.data[0]["Userfullname"]);
        }
      });
  };

  // GET detail mountain data
  const getDetailMountainData = () => {
    console.log(sessionStorage.getItem("montainid"));
    axios
      .get(
        `http://localhost:8080/mountain/get-detail-mountain/${sessionStorage.getItem(
          "montainid"
        )}`
      )
      .then((res) => {
        setMountain(res.data.mountain);
      });
  };

  // get rating data
  const getRatingData = () => {
    if (sessionStorage.getItem("montainid")) {
      axios
        .get(
          `http://localhost:8080/mountain/get-rating-data/${sessionStorage.getItem(
            "montainid"
          )}`
        )
        .then((res) => {
          console.log(res.data.data[0]);
          setMountainRating(res.data.data[0]);
        });
    }
  };

  useEffect(() => {
    getCurrentLogin();
    getDetailMountainData();
    getRatingData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <img src="/detailRoute.jpg" className="h-screen w-screen" />
        <div className="absolute top-0 w-full">
          <NavbarComponent log={currLogin} />
        </div>
        <div className="absolute bottom-[-60vh]">
          <img src="/detailRoute2.png" className="w-screen h-1/2" />
        </div>
        {mountain.map((mo, idx) => (
          <div
            className="text-white absolute bottom-[200px] left-[40px] right-3"
            key={idx}
          >
            <div>
              <div className="text-[45px] font-bold">
                <h3>{mo.MountainName}</h3>
              </div>
              <div className="my-5">
                <p className="text-[25px]">{mo.City}</p>
              </div>
              <div className="flex">
                <div className="flex">
                  <FaStar size={30} className="mx-1" />
                  <FaStar size={30} className="mx-1" />
                  <FaStar size={30} className="mx-1" />
                  <FaStar size={30} className="mx-1" />
                  <FaStar size={30} className="mx-1" />
                </div>
                <div className="mx-3 text-[20px] flex items-center">
                  <div className="">
                    <p>{mountainRating.Rating}</p>
                  </div>
                  <div className="mx-2">
                    <p>Reviews</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex w-[500px]">
                <div className="grid grid-rows grid-flow-col gap-4">
                  <div>
                    <p className="font-bold">Kesulitan</p>
                    <p>{mo.Kesulitan}</p>
                  </div>
                  <div>
                    <p className="font-bold">Jarak</p>
                    <p>{mo.JarakPuncak}</p>
                  </div>
                  <div>
                    <p className="font-bold">Ketinggian</p>
                    <p>{mo.Ketinggian}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex">
                <div>
                  <p>Status Gunung</p>
                </div>
                <div
                  className="rounded text-center w-[80px] mx-5"
                  style={{
                    backgroundColor: mo.StatusGunung == "aktif" ? `red` : ``,
                  }}
                >
                  <p>{mo.StatusGunung}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[-250px]">
              <p>{mo.BriefGunung}</p>
            </div>
            <div className="absolute bottom-[-40vh] w-full flex items-center justify-center text-white">
              <button
              onClick={()=>{
                router.push({pathname: `/map/${mo.MountainName}`, query: {
                  MountainName: mo.MountainName, 
                  MountainId: mo.MountainId
                } })
              }}
              className="mx-8 bg-[#F09024] p-3 rounded">Start Route</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RouteDetail;
