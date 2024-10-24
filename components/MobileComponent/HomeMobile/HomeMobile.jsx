import React from "react";
import { FaRegCompass, FaMapSigns, FaUser } from "react-icons/fa";
import logo from "@/public/logo.png";
import banner1 from "@/public/home-banner1.png";
import { IoIosNotifications } from "react-icons/io";
import ruteIcon from "./assets/rute-menu.png";
import tripIcon from "./assets/trip-menu.png";
import alatIcon from "./assets/alat-menu.png";
import artikelIcon from "./assets/artikel-menu.png";
import daruratIcon from "./assets/darurat-menu.png";
import fireIcon from "./assets/fire-icon.png";
import article1 from "./assets/article1-photo.png";
import FooterMobile from "../FooterMobile/FooterMobile";
// }border-t-[4px] border-[#F09024] text-[#F09024]
export default function HomeMobile() {
  return (
    <main className="font-poppins pb-[7rem]">
      <header className="flex justify-between p-5 items-center">
        <img height={80} width={80} src={logo.src} />
        <div className="flex gap-3">
          <FaRegCompass className="text-2xl" />
          <IoIosNotifications className="text-2xl" />
        </div>
      </header>
      <section>
        <div className="">
          <img src={banner1.src} className="w-full h-[12rem]" />
        </div>
        <div className="flex mx-5 shadow-xl rounded-xl p-5 relative bottom-4 bg-white gap-8 max-[410px]:gap-7 max-[330px]:gap-5 max-[290px]:gap-3 justify-center">
          <span className="flex flex-col max-w-[2rem] items-center gap-1">
            <img className="max-w-[2rem] max-h-[2rem]" src={ruteIcon.src} />
            <p className="text-[0.6rem] text-center">Rute dan Informasi</p>
          </span>
          <span className="flex flex-col max-w-[4rem] max-[379px]:max-w-[2rem] items-center gap-1">
            <img className="max-w-[2rem]" src={tripIcon.src} />
            <p className="text-[0.6rem] text-center">Open Trip</p>
          </span>
          <span className="flex flex-col max-w-[4rem] max-[379px]:max-w-[2rem] items-center gap-1">
            <img className="max-w-[2rem]" src={alatIcon.src} />
            <p className="text-[0.6rem] text-center">Sewa Alat</p>
          </span>
          <span className="flex flex-col items-center gap-1">
            <img className="max-w-[2rem]" src={artikelIcon.src} />
            <p className="text-[0.6rem] text-center">Artikel</p>
          </span>
          <span className="flex flex-col max-w-[2rem] items-center gap-1">
            <img className="max-w-[2rem]" src={daruratIcon.src} />
            <p className="text-[0.6rem] text-center">Kontak Darurat</p>
          </span>
        </div>
      </section>

      <section className="px-5 mt-2">
        <div>
          <span className="flex justify-between items-center">
            <span className="flex gap-2">
              <img className="w-4 h-5" src={fireIcon.src} />
              <h1 className="font-bold">Temukan Artikel Terpopuler</h1>
            </span>
            <h2 className="text-sm text-[#F09024] w-[5.7rem]">Lihat Semua</h2>
          </span>
          <p className="text-xs text-[#908989] mt-1">
            plus rekomendasi lainnya
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <img
              height={80}
              width={130}
              src={article1.src}
              className="max-[348px]:h-[190px] max-[307px]:h-[250px]"
            />
            <div className="flex flex-col gap-2">
              <span className="flex gap-5 text-[0.6rem] text-[#B5ADAD]">
                <p>BY LOREM IPSUM</p>
                <p>23 Februari 2024</p>
              </span>
              <h1 className="text-[0.8rem] font-bold">
                Gunung Rinjani, Pesona Keindahan Alam Eksotis di Atap Lombok
              </h1>
              <p className="text-[0.6rem]">
                Lorem ipsum sit amet lorem ipsum sit amet lorem ipsum sit amet
                Lorem ipsum sit amet lorem....
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <img height={80} width={130} src={article1.src} />
            <div className="flex flex-col gap-2">
              <span className="flex gap-5 text-[0.6rem] text-[#B5ADAD]">
                <p>BY LOREM IPSUM</p>
                <p>23 Februari 2024</p>
              </span>
              <h1 className="text-[0.8rem] font-bold">
                Gunung Rinjani, Pesona Keindahan Alam Eksotis di Atap Lombok
              </h1>
              <p className="text-[0.6rem]">
                Lorem ipsum sit amet lorem ipsum sit amet lorem ipsum sit amet
                Lorem ipsum sit amet lorem....
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <img height={80} width={130} src={article1.src} />
            <div className="flex flex-col gap-2">
              <span className="flex gap-5 text-[0.6rem] text-[#B5ADAD]">
                <p>BY LOREM IPSUM</p>
                <p>23 Februari 2024</p>
              </span>
              <h1 className="text-[0.8rem] font-bold">
                Gunung Rinjani, Pesona Keindahan Alam Eksotis di Atap Lombok
              </h1>
              <p className="text-[0.6rem]">
                Lorem ipsum sit amet lorem ipsum sit amet lorem ipsum sit amet
                Lorem ipsum sit amet lorem....
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterMobile home={"border-t-[4px] border-[#F09024] text-[#F09024]"} />
    </main>
  );
}
