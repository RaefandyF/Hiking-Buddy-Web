import React from "react";
import hikingImage from "./assets/hiking-image-login.png";
import { useRouter } from "next/router";
import FooterMobile from "../FooterMobile/FooterMobile";

export default function ProfileMobileNotLogin() {
  const router = useRouter();

  return (
    <div>
      <section className="p-5 shadow-sm drop-shadow-xs">
        <h1 className="font-bold">Profil Saya</h1>
      </section>

      <section className="flex flex-col justify-center items-center p-5 h-[25rem]">
        <img
          alt="hiking image"
          src={hikingImage.src}
          className="w-[5rem] h-[5rem] rounded-lg mt-[10rem]"
        />
        <p className="mt-4 text-sm">Jadilah Bagian dari Hiking Buddy!</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-[#F09024] text-white text-sm px-7 py-2 rounded-full"
        >
          Login/Daftar
        </button>
      </section>
      <FooterMobile
            home={"py-7"}
            komunitas={"py-7"}
            aktivitas={"py-7"}
            profile={"py-7 border-t-[4px] border-[#F09024] text-[#F09024]"}
          />
    </div>
  );
}
