import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import gunung1 from "@/public/gunung1.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaRoute } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Rute() {
  const [mountainData, setMountainData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-list-ticket`)
      .then((res) => {
        setMountainData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px]">
        <section className="p-5">
          <button
            onClick={goBack}
            className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <div className="mt-5 flex flex-col gap-2">
            <h1 className="font-bold text-xl">Rute dan Informasi</h1>
            <p className="text-[0.6rem] text-black/50">
              Temukan berbagai informasi dan rute untuk memudahkan pendakianmu
            </p>
          </div>
          <div
            // onClick={handleClickSearch}
            className="w-[100%] mt-5 bg-[#F3F5F7] border border-black/10 p-[0.4rem] rounded-full flex gap-3 items-center"
          >
            <CiSearch className="text-xl" />
            <input
              className="w-full outline-none bg-[#F3F5F7] text-[12px]"
              type="text"
              placeholder="Cari Gunung"
            />
          </div>
        </section>

        <section className="p-5 flex flex-col gap-5">
          {isLoading ? (
            <>
              <div>
                <Skeleton className="w-full h-[13rem]" />
              </div>
              <div>
                <Skeleton className="w-full h-[13rem]" />
              </div>
              <div>
                <Skeleton className="w-full h-[13rem]" />
              </div>
            </>
          ) : (
            mountainData?.map((mountain, index) => (
              <div className="relative w-full h-[15rem] rounded-3xl overflow-hidden">
                {/* Gambar dengan overlay hitam */}
                <div
                  style={{
                    backgroundImage: `url(${mountain?.ImageUrl})`,
                  }}
                  className="absolute inset-0 bg-cover bg-center"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30" />
                </div>

                {/* Konten teks di atas gambar */}
                <div className="relative z-10 flex justify-end p-5 text-white">
                  <span className="text-[10px] bg-black/30 py-3 px-7 rounded-full flex items-center gap-1">
                    <FaRoute className="text-[14px]" />
                    {mountain?.DistanceToPeak} km
                  </span>
                </div>

                <div className="relative z-10 flex flex-col text-white gap-[0.5px] mt-[3.5rem] ml-3 justify-start">
                  <p className="text-[10px] flex items-center gap-1">
                    <IoLocationOutline className="text-[14px]" />
                    {mountain?.TicketCity}, {mountain?.TicketProvince}
                  </p>
                  <h2 className="text-[16px] font-bold">
                    {mountain?.TicketName}
                  </h2>
                  <Link href={`/rute/detail/${mountain?.TicketId}`}>
                    <button className="text-[14px] p-2 px-3 bg-[#F09024] max-w-[10rem] mt-3 rounded-full">
                      Eksplor Sekarang
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
