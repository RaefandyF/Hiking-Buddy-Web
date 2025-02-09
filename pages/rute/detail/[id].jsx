import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import gunung1 from "@/public/gunung1.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaRoute } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";

export default function DetailRute() {
  const router = useRouter();
  const { id } = router.query;
  const [mountainData, setMountainData] = useState();
  const [loading, setLoading] = useState(true);
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-detail-ticket?TicketId=${id}`
        )
        .then((res) => {
          setMountainData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <main className="font-poppins flex justify-center">
      {loading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px]">
          <section className="p-5">
            <div className="relative w-full h-[20rem] rounded-3xl overflow-hidden">
              {/* Gambar dengan overlay hitam */}
              <div
                style={{
                  backgroundImage: `url(${mountainData?.mainImage?.url})`,
                }}
                className="absolute inset-0 bg-cover bg-center bg-black bg-opacity-30"
              >
                <div className="absolute inset-0 bg-black bg-opacity-30" />
              </div>

              {/* Konten teks di atas gambar */}
              <div className="relative z-10 flex justify-between p-5 text-white">
                <button
                  onClick={goBack}
                  className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
                >
                  <IoIosArrowBack className="text-xl text-black" />
                </button>
                <span className="text-[10px] bg-black/30 py-3 px-7 rounded-full flex items-center gap-1">
                  <FaRoute className="text-[14px]" />
                  14km
                </span>
              </div>
              <div className="relative z-10 flex flex-col text-white gap-[0.5px] mt-[6.5rem] ml-3 justify-start">
                <p className="text-[10px] flex items-center gap-1">
                  <IoLocationOutline className="text-[14px]" />
                  Magelang, Jawa Tengah
                </p>
                <h2 className="text-[16px] font-bold">
                  {mountainData.averageScore[0]?.TicketName}
                </h2>
                <span className="p-1 py-2 bg-[#F09024] max-w-[8rem] mt-10 rounded-full">
                  <p className="text-[12px] text-center">Medium Level</p>
                </span>
              </div>
            </div>
          </section>

          <section className="px-5">
            <div className="flex justify-between gap-2 max-[349px]:flex-col">
              <span className="flex flex-col text-center">
                <h2 className="text-[13px] font-bold">Ketinggian</h2>
                <div className="border border-[#D9D9D9] py-5 px-5 mt-2 rounded-2xl">
                  <h2 className="text-[16px] text-[#F09024]">
                    {mountainData.averageScore[0]?.Elevation}m
                  </h2>
                </div>
              </span>
              <span className="flex flex-col text-center">
                <h2 className="text-[13px] font-bold">Status Gunung</h2>
                <div className="border border-[#D9D9D9] py-5 px-5 mt-2 rounded-2xl">
                  <h2 className="text-[16px] text-[#F09024]">Level II</h2>
                  <p className="text-[8px]">*aman untuk pendakian</p>
                </div>
              </span>
              <span className="flex flex-col text-center">
                <h2 className="text-[13px] font-bold">Nilai</h2>
                <div className="border border-[#D9D9D9] py-5 px-5 mt-2 rounded-2xl flex justify-center">
                  <h2 className="text-[16px] text-[#F09024] flex items-center">
                    <FaStar />
                    {mountainData.averageScore[0].Rating?.substring(0, 3)}
                  </h2>
                </div>
              </span>
            </div>
          </section>

          <section className="px-5 mt-5 pb-[8rem]">
            <h3 className="text-[14px] font-bold">Deskripsi</h3>
            <p className="text-[12px] text-black/60 mt-3">
              {mountainData.averageScore[0]?.TicketMountainDescription}
            </p>
          </section>

          <footer className="flex gap-4 justify-between max-w-[440px] items-center p-5 fixed bottom-0 w-full bg-white border-t-[1px] z-50">
            <a
              href={mountainData.map[0]?.RouteUrl}
              target="_blank"
              className="border-2 border-[#274753] w-full p-3 text-[#274753] rounded-xl text-[14px] gap-2 text-center"
            >
              Lihat Rute Maps
            </a>
            <a
              href={mountainData?.mapPdfUrl}
              target="_blank"
              className="bg-[#274753] text-center w-full p-3 text-white rounded-xl text-[14px]"
            >
              Lihat Peta
            </a>
          </footer>
        </div>
      )}
    </main>
  );
}
