import React, { useState, useEffect } from "react";
import trending1 from "@/public/trending-1.png";
import { FaStar } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { FaRoute } from "react-icons/fa";
import fireIcon from "../../../public/fire-icon.png";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Nearest() {
  const router = useRouter();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [nearestTickets, setNearestTickets] = useState([]);
  const [loadingNearest, setLoadingNearest] = useState(true);
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  useEffect(() => {
    // Mendapatkan lokasi pengguna
    const fetchLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchNearestTickets(latitude, longitude); // Panggil API dengan koordinat
          },
          (err) => {
            console.error(err);
            // setError(
            //   "Unable to retrieve location. Please enable location services."
            // );
          }
        );
      } else {
        // console.log("Geolocation is not supported by this browser.");
        // setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  //  Memanggil API dengan koordinat
  const fetchNearestTickets = async (latitude, longitude) => {
    setLoadingNearest(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-nearest-ticket-data?latitude=${latitude}&longitude=${longitude}`
      );
      setNearestTickets(response.data.data); // Simpan data dari API
      setLoadingNearest(false);
    } catch (err) {
      setLoadingNearest(false);
      console.error(err);
      // setError("Failed to fetch nearest tickets.");
    }
  };

  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px] p-5">
        <section className="">
          <button
            onClick={goBack}
            className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <span className="flex gap-2 items-center justify-center mt-[-1.8rem]">
            <h1 className="text-[18px] font-bold">Gunung Terdekat</h1>
          </span>
        </section>
        <section className="flex flex-wrap justify-start gap-2">
          {loadingNearest ? (
            <div className="flex flex-wrap justify-start gap-2">
              <div>
                <Skeleton height={100} width={180} />
                <Skeleton count={3} />
              </div>
              <div>
                <Skeleton height={100} width={180} />
                <Skeleton count={3} />
              </div>
              <div>
                <Skeleton height={100} width={180} />
                <Skeleton count={3} />
              </div>
              <div>
                <Skeleton height={100} width={180} />
                <Skeleton count={3} />
              </div>
              <div>
                <Skeleton height={100} width={180} />
                <Skeleton count={3} />
              </div>
              <div>
                <Skeleton height={100} width={180} />
                <Skeleton count={3} />
              </div>
              <div>
                <Skeleton height={100} width={180} />
                <Skeleton count={3} />
              </div>
              <div>
                <Skeleton height={100} width={180} />
                <Skeleton count={3} />
              </div>
            </div>
          ) : (
            nearestTickets.map((item, index) => (
              <Link key={index} href={`/ticket/mountain/${item.TicketId}`}>
                <div className="min-w-[10rem] max-[368px]:max-w-[8rem] max-[368px]:min-w-[7rem] max-[303px]:max-w-full max-[303px]:min-w-[14rem]">
                  <span className="bg-white rounded-full p-1 px-3 text-[10px] relative top-8 left-[6rem] min-[401px]:left-[7rem] min-[432px]:left-[8rem] max-[368px]:left-[5rem] flex w-[3.5rem] items-center gap-1">
                    <FaStar className="text-[#F09024]" />
                    4.8
                  </span>
                  <img
                    className="h-[7rem] w-[12rem] max-[431px]:w-[11rem] max-[400px]:w-[10rem] max-[368px]:w-[9rem] object-cover rounded-md"
                    src={item.ImageUrl}
                  />
                  <h1 className="text-[14px] mt-2 max-w-[10rem]">
                    {item.TicketName}
                  </h1>

                  <div className="flex flex-col gap-[0.2rem]">
                    <p className="text-[10px] flex items-center gap-1">
                      <TbMapExclamation />
                      {item.LevelMountain.charAt(0).toUpperCase() +
                        String(item.LevelMountain).slice(1)}{" "}
                      Level
                    </p>
                    <p className="text-[10px] flex items-center gap-1 max-w-[10rem]">
                      <FiMapPin />
                      {item.TicketCity}, {item.TicketProvince}
                    </p>
                    <p className="text-[10px] flex gap-1">
                      <FaRoute />
                      {item.DistanceToPeak} km
                    </p>
                  </div>
                  <div className="p-[0.3rem] mt-3 rounded-full bg-[#274753] w-[6rem] text-center">
                    <h2 className="text-white text-[12px]">
                      Rp {item.TicketPrice.toLocaleString("id-ID")}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          )}

          
        </section>
      </div>
    </main>
  );
}
