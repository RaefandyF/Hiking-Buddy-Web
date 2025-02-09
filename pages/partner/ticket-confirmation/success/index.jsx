import React, { useState, useEffect } from "react";
import successBg from "@/public/success-bg.png";
import successTicket from "@/public/success-ticket.png";
import successChecklist from "@/public/success-checklist.png";
import { FaShareAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
export default function Success() {
  const router = useRouter();

  return (
    <main className="font-poppins flex justify-center h-screen">
      <div className="w-full max-w-[440px]">
        <section className="h-full pb-[12.5rem] bg-custom-gradient">
          <img src={successBg.src} className="w-full" />
          <div className="relative mx-5 py-5 mt-[-3rem] text-center bg-white rounded-2xl">
            <div className="flex flex-col justify-center gap-3 items-center px-5">
              <img src={successChecklist.src} className="w-[4rem] mt-10" />
              <h1 className="text-[18px] font-bold">Konfirmasi Berhasil</h1>
              <p className="text-[12px] mb-14">Pendaki Berhasil di Konfirmasi</p>
            </div>
          </div>
          <div className="px-5 flex flex-col gap-3 mt-7">
            <Link
              className="bg-[#F09024] text-center text-white rounded-xl px-9 py-[0.85rem] text-[14px]"
              href="/partner/dashboard"
            >
              <button>Kembali ke Dashboard</button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
