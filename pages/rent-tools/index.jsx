import React from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import banner1 from "@/public/home-banner1.png";
import fireIcon from "../../public/fire-icon.png";
import CardTools from "@/components/Card/CardTools";
import alat1 from "@/public/alat1.png";

export default function RentTools() {
  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px]">
        <section className="p-5">
          <button className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]">
            <Link href="/">
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <div className="mt-5 flex flex-col gap-2">
            <h1 className="font-bold text-xl">Sewa Alat</h1>
            <p className="text-[0.6rem] text-black/50">
              Temukan berbagai alat pendakian untuk melengkapi pendakianmu
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
              placeholder="Cari Alat"
            />
          </div>

          <img
            src={banner1.src}
            className="rounded-2xl mt-5 h-[10rem] w-[25rem]"
          />
        </section>

        <section>
          <div className="flex justify-between mt-5 items-center px-5">
            <span className="flex gap-2 items-center">
              <h1 className="text-[14px] font-bold">Sedang Dicari</h1>
              <img className="w-4 h-5" alt="fire icon" src={fireIcon.src} />
            </span>
            <Link href="/ticket/trending">
              <p className="text-[#F09024] text-[12px]">Lihat Semua</p>
            </Link>
          </div>

          <div className="p-5 flex flex-wrap gap-x-2 max-[369px]:justify-center">
            <CardTools image={alat1.src} />
            <CardTools image={alat1.src} />
          </div>
        </section>
      </div>
    </main>
  );
}
