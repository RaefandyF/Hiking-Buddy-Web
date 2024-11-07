import React, { useEffect, useState } from "react";
import { FaRegCompass, FaFileSignature } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import CommunityImage1 from "./assets/community1.png";
import { FaHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import FooterMobile from "../FooterMobile/FooterMobile";
import Link from "next/link";
import axios from "axios";

export default function CommunityMobile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lakukan GET request ke API
        const response = await axios.get(
          "http://localhost:8080/api/v2/threads/get-all-thread"
        );
        // Set data dari respons API ke state
        setData(response);
        setLoading(false);
      } catch (err) {
        // Set error jika terjadi kesalahan
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="font-poppins pb-[7rem]">
      <header className="flex justify-between p-5 items-center gap-2 shadow-lg">
        <div className="w-[100%] border border-black/10 p-2 rounded-full flex gap-3 items-center">
          <CiSearch className="text-2xl" />
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Cari Community"
          />
        </div>
        <div className="flex gap-3">
          <FaRegCompass className="text-2xl" />
          <IoIosNotifications className="text-2xl" />
        </div>
      </header>

      <section className="p-5">
        <div className="flex flex-col gap-5">
          {/* {data.map((item) => ( */}
            <div className="border border-black/10 p-3 rounded-xl">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img className="rounded-full bg-black w-11 h-11" />
                  <div>
                    <h1 className="font-bold">Ann Calista</h1>
                    <p className="text-xs text-black/30">21 Jam yang Lalu</p>
                  </div>
                </div>
                <CiMenuKebab className="text-3xl rotate-90" />
              </div>
              <div className="mt-3 flex flex-col gap-3">
                <p className="text-[0.65rem]">{}</p>
                <img src={CommunityImage1.src} className="" />
                <div className="flex gap-8">
                  <span className="flex gap-2 items-center">
                    <FaHeart className="text-2xl text-[#F09024]" />
                    <h3 className="text-black/50">101</h3>
                  </span>
                  <span className="flex gap-2 items-center">
                    <AiOutlineMessage className="text-2xl text-black/50" />
                    <h3 className="text-black/50">15</h3>
                  </span>
                  <span className="flex gap-2 items-center">
                    <PiShareFat className="text-2xl text-black/50" />
                    <h3 className="text-black/50">9</h3>
                  </span>
                </div>
              </div>
            </div>
          {/* ))} */}

          <div className="border border-black/10 p-3 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img className="rounded-full bg-black w-11 h-11" />
                <div>
                  <h1 className="font-bold">Ann Calista</h1>
                  <p className="text-xs text-black/30">21 Jam yang Lalu</p>
                </div>
              </div>
              <CiMenuKebab className="text-3xl rotate-90" />
            </div>
            <div className="mt-3 flex flex-col gap-3">
              <p className="text-[0.65rem]">
                Pendakian Gunung Rinjani (puncak) merupakan salah satu objek
                wisata yang menjadi andalan di kawasan Taman Nasional Gunung
                Rinjani. Gunung Rinjani sebagai gunung vulkanik yang masih aktif
                nomor 2 tertinggi di Indonesia. Puncak Gunung Rinjani merupakan
                tujuan sebagian besar para petualang dan pencinta alam yang
                mengunjungi...
              </p>
              <img src={CommunityImage1.src} className="" />
              <div className="flex gap-8">
                <span className="flex gap-2 items-center">
                  <FaHeart className="text-2xl text-[#F09024]" />
                  <h3 className="text-black/50">101</h3>
                </span>
                <span className="flex gap-2 items-center">
                  <AiOutlineMessage className="text-2xl text-black/50" />
                  <h3 className="text-black/50">15</h3>
                </span>
                <span className="flex gap-2 items-center">
                  <PiShareFat className="text-2xl text-black/50" />
                  <h3 className="text-black/50">9</h3>
                </span>
              </div>
            </div>
          </div>
        </div>

        <Link href={"/create-community"}>
          <div className="fixed right-5 bottom-[7rem] bg-[#F09024] pl-5 pr-3 pt-4 pb-4 rounded-full flex justify-center items-center">
            <FaFileSignature className="text-2xl text-white" />
          </div>
        </Link>
      </section>

      <FooterMobile
        komunitas={"border-t-[4px] border-[#F09024] text-[#F09024] py-5"}
        aktivitas={"py-5"}
        profile={"py-5"}
      />
    </main>
  );
}
