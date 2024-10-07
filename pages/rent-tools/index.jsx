import Footer from "@/components/Footer";
import ListProductHome from "@/components/ListProductHome";
import NavbarComponent from "@/components/Navbar";
import React from "react";

function index() {
  return (
    <div className="min-h-screen">
      <div
        className="w-full h-[25rem] rounded-b-[5rem] bg-cover bg-center"
        style={{ backgroundImage: `url("/rent-img.png")` }}
      >
        <NavbarComponent />

        <h1 className="text-white font-bold text-[2.5rem] ml-12 max-w-[60rem]">
          Peak Provisions: Rent Top-Quality Gear for Your Ultimate Mountain
          Adventures
        </h1>

        <p className="text-white ml-12 text-xl mt-3">
          Save your adventure with Hiking Buddy !
        </p>
      </div>
      <div className="flex justify-between mx-[10px] my-[50px]">
        <div className="w-1/2 text-center text-[20px] font-bold">
          <p>Explore the tools you need and rent them !</p>
        </div>
        <div className="w-1/2 flex justify-center items-end">
          <input
            className="border-solid border-2 border-gray-500 w-3/4 rounded px-2 py-1"
            placeholder="search"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-center align-center">
        <ListProductHome />
        <ListProductHome />
        <ListProductHome />
        <ListProductHome />
        <ListProductHome />
        <ListProductHome />
        <ListProductHome />
        <ListProductHome />
      </div>

      <div className="mt-[5rem] mb-[40px] flex justify-center items-center">
        <button className="bg-[#F09024] w-72 h-9 font-bold text-white rounded-[15px] hover:pointer hover:text-lg">
          View more
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default index;
