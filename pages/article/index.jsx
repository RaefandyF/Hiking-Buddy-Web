import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import article1 from "../../public/article1-photo.png";
import Link from "next/link";

export default function Article() {
  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px] p-5">
        <section>
          <button className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]">
            <Link href="/">
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <div>
            <h1 className="mt-5 text-lg font-bold">Artikel</h1>
            <p className="text-[0.6rem] text-black/50">
              Temukan berbagai artikel untuk menambah referensi pendakianmu
            </p>
            <div className="mt-4 w-full border bg-[#F3F5F7] gap-2 p-2 rounded-full flex items-center ">
              <FaSearch className="text-black/30 text-lg ml-2" />
              <input
                type="text"
                placeholder="Cari artikel"
                className="w-full outline-none bg-[#F3F5F7] text-[0.7rem]"
              />
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="flex flex-col gap-3">
            <Link href={"/article/1"}>
              <div className="flex gap-3 items-center">
                <img
                  alt="article"
                  height={100}
                  width={100}
                  src={article1.src}
                  className="max-[348px]:h-[160px] max-[307px]:h-[200px]"
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
                    Lorem ipsum sit amet lorem ipsum sit amet lorem ipsum sit
                    amet Lorem ipsum sit amet lorem....
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex gap-3 items-center">
              <img
                alt="article"
                height={100}
                width={100}
                src={article1.src}
                className="max-[348px]:h-[160px] max-[307px]:h-[200px]"
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
              <img
                alt="article"
                height={100}
                width={100}
                src={article1.src}
                className="max-[348px]:h-[160px] max-[307px]:h-[200px]"
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
              <img
                alt="article"
                height={100}
                width={100}
                src={article1.src}
                className="max-[348px]:h-[160px] max-[307px]:h-[200px]"
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
              <img
                alt="article"
                height={100}
                width={100}
                src={article1.src}
                className="max-[348px]:h-[160px] max-[307px]:h-[200px]"
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
              <img
                alt="article"
                height={100}
                width={100}
                src={article1.src}
                className="max-[348px]:h-[160px] max-[307px]:h-[200px]"
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
          </div>
        </section>
      </div>
    </main>
  );
}
