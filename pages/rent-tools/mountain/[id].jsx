import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import CardTools from "@/components/Card/CardTools";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
export default function RentToolsId() {
  const router = useRouter();
  const { id } = router.query;
  const [toolsData, setToolsData] = useState([]);
  const { ticketId, ticketName, entryPost, exitPost, rentDate } = router.query;

  const formData = {
    ticketId,
    ticketName,
    entryPost,
    exitPost,
    rentDate,
  };

  function formatTanggal(dateString) {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  }

  useEffect(() => {
    if (id) {
      axios
        .get(`https://app.hikingbuddy.my.id/api/v2/tools/get-all-tools`)
        .then((res) => {
          setToolsData(res.data.toolsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleClickTool = (toolId) => {
    router.push({
      pathname: `/rent-tools/tools/${toolId}`,
      query: formData,
    });
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };
  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px]">
        <section className="flex justify-between p-5 border-b-2">
          <button
            onClick={goBack}
            className="flex justify-between items-center p-3 rounded-full bg-[#F5F5F5]"
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <div className="flex justify-center mt-1 flex-col text-center">
            <h1 className="text-[16px] font-bold">{ticketName}</h1>
            <p className="text-[10px] text-black/50">
              {formatTanggal(rentDate)}
            </p>
          </div>
          <button
            onClick={goBack}
            className="flex justify-between items-center p-3 rounded-full bg-[#F5F5F5]"
          >
            <span className="absolute bg-[#F09024] text-white right-5 top-5 rounded-full w-4 h-3 items-center text-[8px]">
              2
            </span>
            <FaShoppingCart className="text-xl" />
          </button>
        </section>

        <section className="px-5 pb-8">
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

          <div className="flex flex-wrap gap-x-8 justify-center max-[425px]:gap-x-6 max-[416px]:gap-x-4 max-[408px]:gap-x-2">
            {toolsData.map((tool, index) => (
              <div key={index} onClick={() => handleClickTool(tool.ToolId)}>
                <CardTools
                  name={tool.ToolName}
                  price={tool.ToolPrice}
                  rentMount={tool.TotalRent}
                  rating={tool.AvgReview}
                  image={tool.imgUrl}
                />
              </div>
            ))}
            {/* <CardTools image={alat1.src} />
            <CardTools image={alat1.src} />
            <CardTools image={alat1.src} />
            <CardTools image={alat1.src} />
            <CardTools image={alat1.src} /> */}
          </div>
        </section>
      </div>
    </main>
  );
}
