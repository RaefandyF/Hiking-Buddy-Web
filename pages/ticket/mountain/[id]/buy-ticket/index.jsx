import React from "react";
import { useRouter } from "next/router";
import ellipse from "@/public/ellipse-buyticket.png";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import gunung1 from "@/public/gunung1.png";
import { FiMapPin } from "react-icons/fi";

export default function index() {
  const router = useRouter();
  const { id } = router.query;

  const goBack = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.push("/"); // Redirects to home if there's no previous page
    }
  };
  return (
    <main className="font-poppins flex justify-center bg-[#F1F2F4] h-screen">
      <div className="w-full max-w-[440px]">
        <img className="absolute w-full top-[-1rem]" src={ellipse.src} />
        <section className="relative z-50 p-5">
          <button
            onClick={goBack}
            className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <div className="flex justify-center mt-[-1.7rem]">
            <h1 className="text-[18px] text-white font-bold">Beli Tiket</h1>
          </div>

          <div className="w-full bg-white p-5 rounded-xl mt-8">
            <div className="relative">
              <div>
                <img
                  className="rounded-xl w-full h-[12rem]"
                  src={gunung1.src}
                />
                <div className="bg-white p-3 py-2 absolute top-[5.8rem] max-w-[20rem] left-[-0.5rem] m-5 rounded-2xl">
                  <h1 className="text-[14px] font-semibold">Gunung Rinjani</h1>
                  <span className="flex items-center gap-1 mt-1">
                    <FiMapPin className="text-sm" />
                    <p className="text-[10px] text-[#274753] font-bold w-full">
                      Pulau Lombok, Nusa Tenggara Barat
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className=" mt-5">
              <div className="flex flex-col gap-1">
                <h5 className="text-[12px] text-black/60">Tanggal Pendakian</h5>
                <span>
                  <input className="text-[14px] outline-none" type="date" />
                </span>
                <hr />
              </div>
              <div className="flex flex-col gap-1 mt-5">
                <h5 className="text-[12px] text-black/60">Jam Pendakian</h5>
                <span>
                  <input className="text-[14px] outline-none" type="time" />
                </span>
                <hr />
              </div>
              <div className="flex flex-col gap-1 mt-5">
                <h5 className="text-[12px] text-black/60">Jumlah Pendaki</h5>
                <span>
                  <span className="flex items-center">
                    <input
                      type="number"
                      // value={peopleCount}
                      // onChange={handlePeopleChange}
                      placeholder="Jumlah Orang"
                      min="1"
                      max="100"
                      className="text-[12px] w-full px-1 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {/* <p className="text-[14px]">Orang</p> */}
                  </span>
                </span>
                <hr />
              </div>
            </div>
            <button className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]">
              Selanjutnya
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
