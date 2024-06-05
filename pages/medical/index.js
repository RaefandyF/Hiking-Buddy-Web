import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { useRouter } from "next/router";
import React from "react";
import { FaAmbulance } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

function index() {

  const route = useRouter()

  return (
    <div className="h-screen w-full">
      <div className="relative">
        <div>
          <img className="w-full" src="./rent-img.png" />
          <div className="absolute top-0 w-full">
            <NavbarComponent />
          </div>
          <div className="absolute top-[10rem] mx-[3rem]">
            <h1 className="text-[35px] text-white font-bold">
              Medical Fast Responsive
            </h1>
          </div>
          <div className="absolute text-[20px] text-white top-[18rem] mx-[3rem]">
            <p>Fast responsive for hiking accident</p>
          </div>
        </div>
      </div>
      <div className="mt-[5rem]">
        <div className="flex justify-center">
          <div className="mx-1">
            <select className="w-[100px] border p-1 bg-[#F4F3F3]">
              <option>Rinjani</option>
            </select>
          </div>
          <div className="mx-1">
            <input
              placeholder="search..."
              className="border rounded p-1 w-[300px]"
            />
          </div>
        </div>
        <div className="flex justify-center mt-[3rem]">
          <div
            className="w-[130px] h-[130px] 
            bg-gradient-to-r from-[#F04E09] to-[#8A2D05] rounded mx-3"
          >
            <div className="flex items-center justify-center h-[5rem]">
              <FaAmbulance color="white" size={30} />
            </div>
            <div className="w-full text-center text-white">
              <div>
                <p>Ambulance</p>
              </div>
            </div>
          </div>
          <div
              className="w-[130px] h-[130px] 
              bg-gradient-to-r from-[#F04E09] to-[#8A2D05] rounded mx-3"
            >
              <div className="flex items-center justify-center h-[5rem]">
                <FaCarSide color="white" size={30} />
              </div>
              <div className="w-full text-center text-white">
                <div>
                  <p>Car</p>
                </div>
              </div>
            </div>
            <div
              className="w-[130px] h-[130px] 
              bg-gradient-to-r from-[#F04E09] to-[#8A2D05] rounded mx-3"
            >
              <div className="flex items-center justify-center h-[5rem]">
                <FaMotorcycle color="white" size={30} />
              </div>
              <div className="w-full text-center text-white">
                <div>
                  <p>Motorcycle</p>
                </div>
              </div>
            </div>
        </div>
        <div className="min-h-[15vh] my-[3rem] flex flex-wrap px-[2rem]">
          <div 
          onClick={()=>{
            route.push({
              pathname: `/medical/${'AM001'}`, 
              query: {
                ambulanceName: 'Ambulance pak Budi', 
                ratingMedical: 4.9, 
                ownerMedical: 'pak Budi', 
                priceMedical: 10000,
                ambulanceDescription: 'ambulance dengan seat 6 kursi bisa menampung pasien dengan aman'
              }
            })
          }}
          className="w-[220px] h-[300px] shadow-md rounded border">
            <div className="mb-2">
              <img className="rounded-b-lg" src="./ambulance.jpeg" />
            </div>
            <div className="text-center font-bold">
              <p>Ambulance pak Budi</p>
            </div>
            <div className="text-center my-1">
              <p>Rp10000/km</p>
            </div>
            <div className="text-center">
              <p>Budi sudarsono</p>
            </div>
            <div className="my-1 flex justify-center">
              <FaStar color="#FF8A08" size={30} />
              <div className="flex items-center mx-1">
                <p>4.9</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default index;
