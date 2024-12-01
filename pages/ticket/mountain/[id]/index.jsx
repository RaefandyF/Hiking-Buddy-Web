import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import gunung1 from "@/public/gunung1.png";
import { IoIosArrowBack } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoShareSocial } from "react-icons/io5";
import { FaStar, FaParking } from "react-icons/fa";
import ExpandableText from "@/components/ExpandableText/ExpandableText";
import GoogleMapFrame from "@/components/GoogleMapFrame";
import { BiMaleFemale } from "react-icons/bi";
import { RiHotelFill } from "react-icons/ri";
import { FaShop } from "react-icons/fa6";

export default function MountainDetail() {
  const router = useRouter();
  const { id } = router.query;
  const mountainText =
    "Pendakian Gunung Rinjani (puncak) merupakan salah satu objek wisata yang menjadi andalan di kawasan Taman Nasional Gunung Rinjani. Gunung Rinjani sebagai gunung vulkanik yang  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const goBack = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.push("/"); // Redirects to home if there's no previous page
    }
  };
  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px]">
        <div className="w-full max-w-[440px]">
          <section
            style={{ backgroundImage: `url(${gunung1.src})` }}
            className="w-full h-[20rem] bg-cover bg-no-repeat bg-center p-5"
          >
            <div className="">
              <button
                onClick={goBack}
                className="flex justify-between items-center p-2 rounded-full bg-white"
              >
                <IoIosArrowBack className="text-xl" />
              </button>
            </div>
          </section>

          <section className="bg-white rounded-[2rem] z-10 relative bottom-7 h-[10rem]">
            <div className="flex items-center gap-2 px-5 pt-8">
              <FiMapPin />
              <p className="text-[12px] text-[#274753] font-bold w-full">
                Pulau Lombok, Nusa Tenggara Barat
              </p>
              <span className="flex justify-end text-xl">
                <IoShareSocial />
              </span>
            </div>

            <div className="px-5">
              <h1 className="text-[22px] font-semibold mt-4">Gunung Rinjani</h1>
              <div className="mt-3 flex gap-8 items-center justify-left max-[415px]:gap-6 max-[367px]:gap-4 max-[319px]:gap-2">
                <span>
                  <p className="text-[10px] text-black/60">Distance</p>
                  <p className="font-bold text-[12px]">10.0 km</p>
                </span>
                <span className="border-l border-black/30 h-5" />
                <span>
                  <p className="text-[10px] text-black/60">Elevation</p>
                  <p className="font-bold text-[12px]">319 m</p>
                </span>
                <span className="border-l border-black/30 h-5" />
                <span>
                  <p className="text-[10px] text-black/60">Duration</p>
                  <p className="font-bold text-[12px]">2hr 50m</p>
                </span>
                <span className="border-l border-black/30 h-5" />
                <span className="">
                  <p className="text-[10px] text-black/60">Rate</p>
                  <p className="font-bold text-[12px] flex items-center gap-1">
                    <FaStar />
                    4.9
                  </p>
                </span>
              </div>
              <div className="mt-5">
                <ExpandableText text={mountainText} maxLength={150} />
              </div>
            </div>

            <div className="mt-4 px-5">
              <h1 className="font-bold mb-2">Foto</h1>
              <span className="flex gap-4">
                <img
                  className="max-w-[5rem] h-[5rem] rounded-2xl max-[370px]:w-[4rem] max-[370px]:h-[4rem] max-[305px]:w-[3rem] max-[305px]:h-[3rem]"
                  src={gunung1.src}
                />
                <img
                  className="max-w-[5rem] h-[5rem] rounded-2xl max-[370px]:w-[4rem] max-[370px]:h-[4rem] max-[305px]:w-[3rem] max-[305px]:h-[3rem]"
                  src={gunung1.src}
                />
                <img
                  className="max-w-[5rem] h-[5rem] rounded-2xl max-[370px]:w-[4rem] max-[370px]:h-[4rem] max-[305px]:w-[3rem] max-[305px]:h-[3rem]"
                  src={gunung1.src}
                />
                <img
                  className="max-w-[5rem] h-[5rem] rounded-2xl max-[370px]:w-[4rem] max-[370px]:h-[4rem] max-[305px]:w-[3rem] max-[305px]:h-[3rem]"
                  src={gunung1.src}
                />
              </span>
            </div>

            <div className="mt-5">
              <h1 className="font-bold mb-3 px-5">Rating dan Review</h1>
              <div className="flex gap-6 overflow-x-scroll scrollbar-hide w-full">
                <div className="flex w-max gap-4 px-5 pb-4">
                  <div className="flex flex-col gap-4 bg-[#F3F5F7] p-4 w-[20rem] rounded-2xl drop-shadow-xl">
                    <span className="flex gap-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </span>
                    <p className="text-[12px] text-black/60">
                      “Pengalaman yang tidak terlupakan! Pemandangan dari puncak
                      luar biasa, tapi pendakian cukup menantang. Persiapkan
                      fisik dan mental!”
                    </p>
                    <span className="flex items-center gap-2">
                      <img className="h-8 w-8 rounded-full bg-black" />
                      <p className="text-[12px] font-bold">John Adove</p>
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 bg-[#F3F5F7] p-4 w-[20rem] rounded-2xl drop-shadow-xl">
                    <span className="flex gap-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </span>
                    <p className="text-[12px] text-black/60">
                      “Pengalaman yang tidak terlupakan! Pemandangan dari puncak
                      luar biasa, tapi pendakian cukup menantang. Persiapkan
                      fisik dan mental!”
                    </p>
                    <span className="flex items-center gap-2">
                      <img className="h-8 w-8 rounded-full bg-black" />
                      <p className="text-[12px] font-bold">John Adove</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 mt-4">
              <h1 className="font-bold mb-3">Peta Lokasi</h1>
              <h3 className="text-[12px] flex gap-2 items-center p-2 rounded-full bg-[#E7F8FF]">
                <FiMapPin />
                <b>Lokasi Basecamp:</b> Desa Sembalun atau Desa Senaru
              </h3>
              <div className="mt-4">
                <GoogleMapFrame location="Jakarta" />
              </div>
            </div>

            <div className="px-5 mt-9 pb-[7rem]">
              <h1 className="font-bold mb-5">Fasilitas Sekitar Basecamp</h1>
              <div className="flex gap-7">
                <span className="flex flex-col items-center gap-1">
                  <BiMaleFemale className="text-2xl" />
                  <p className="text-[12px]">Toilet</p>
                </span>
                <span className="flex flex-col items-center gap-1">
                  <FaParking className="text-2xl" />
                  <p className="text-[12px]">Parkir</p>
                </span>
                <span className="flex flex-col items-center gap-1">
                  <RiHotelFill className="text-2xl" />
                  <p className="text-[12px]">Penginapan</p>
                </span>
                <span className="flex flex-col items-center gap-1">
                  <FaShop className="text-2xl" />
                  <p className="text-[12px]">Warung</p>
                </span>
              </div>
            </div>
          </section>
        </div>
        <footer className="flex justify-between items-center p-5 fixed bottom-0 w-full bg-white border-t-[1px] z-50">
          <div className="">
            <p className="text-[10px] text-black/50">Harga tiket masuk</p>
            <h1 className="text-[14px] text-[#F09024]">Rp 65.000</h1>
            <p className="text-[10px] text-black/50">
              Total Rp67.000 termasuk pajak & biaya
            </p>
          </div>
          <Link href={"/ticket/mountain/1/buy-ticket"}>
            <button className="h-[2rem] px-3 rounded-md text-white bg-[#F09024]">
              Beli Tiket
            </button>
          </Link>
        </footer>
      </div>
    </main>
  );
}
