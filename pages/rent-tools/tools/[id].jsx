import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar, FaParking } from "react-icons/fa";
import ExpandableText from "@/components/ExpandableText/ExpandableText";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";
import { getRelativeTime } from "@/utils/timeUtils";
import jwt from "jsonwebtoken";

export default function ToolsDetail() {
  const router = useRouter();
  const { id, ticketId, ticketName, entryPost, exitPost, rentDate } =
    router.query;
  const [toolsData, setToolsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(userId);
  

  const [transactionToolData, setTransactionToolData] = useState({
    ToolId: "",
    UserId: "",
    TicketId: "",
    EntryPost: "",
    ExitPost: "",
    EntryDate: "",
    TransactionStatus: "pending",
  });

  useEffect(() => {
    const token = localStorage.getItem("HikingBuddyToken"); // Sesuaikan nama token jika perlu
    console.log(token);
    
    if (!token) {
      // Jika token tidak ada, arahkan ke halaman login
      router.push("/login");
    } else {
      const decoded = jwt.decode(token);
      setUserId(decoded.result[0].UserId);
      setTransactionToolData((prevData) => ({
        ...prevData,
        ToolId: id,
        UserId: decoded.result[0].UserId,
        TicketId: ticketId,
        EntryPost: entryPost,
        ExitPost: exitPost,
        EntryDate: rentDate,
        TransactionStatus: "pending",
      }))
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios
        .get(
          `https://app.hikingbuddy.my.id/api/v2/tools/get-detail-tools?ToolId=${id}`
        )
        .then((res) => {
          setToolsData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);

  // useEffect(() => {
  //   console.log(id);
  // }, []);
  const mountainText =
    "Carrier bag berkapasitas 30 liter ini dirancang untuk mendukung aktivitas pendakian ringan hingga menengah. Dibuat dari material polyester tahan air, tas ini memastikan perlindungan barang jadi andalan di kawasan Taman Nasional Gunung Rinjani. Gunung Rinjani sebagai gunung vulkanik yang  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  const handleClickRentNow = async () => {
    try {
      // Mengirim data ke backend menggunakan Axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tools/insert-transaction-tools`,
        transactionToolData
      );
      if (response.status === 200) {
        router.push(`/rent-tools/checkout/${response.data.transactionId}`);
      } else {
        console.error("Gagal menambahkan transaksi alat!");
      }
    } catch (error) {
      console.error("Error inserting tool transaction:", error);
      // setMessage("Terjadi kesalahan saat menambahkan tiket.");
    }
  };
  return (
    <main className="font-poppins flex justify-center">
      {loading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px]">
          <div className="w-full max-w-[440px]">
            <section className="w-full h-[26rem] p-5 bg-[#F4F5F7]">
              <div className="">
                <button
                  onClick={goBack}
                  className="flex justify-between items-center p-2 rounded-full bg-white"
                >
                  <IoIosArrowBack className="text-xl" />
                </button>
              </div>
              <div className="text-center mt-[-1.9rem] text-[18px] font-bold">
                <h1>Detail Produk</h1>
              </div>
              <div className="mt-8 flex justify-center">
                <img
                  src={toolsData.imgDetail[2]}
                  className="w-[237px] h-[237px]"
                />
              </div>
              <div className="mt-8 flex gap-2 justify-center">
                <div className="w-2 h-2 bg-[#F09024] rounded-full" />
                <div className="w-2 h-2 bg-[#D9D9D9] rounded-full" />
                <div className="w-2 h-2 bg-[#D9D9D9] rounded-full" />
              </div>
            </section>

            <section className="bg-white z-10 relative bottom-7 h-[10rem]">
              <div className="flex items-center gap-2 px-5 pt-5">
                <p className="text-[12px] text-black/30">
                  {toolsData.tools[0]?.TotalRent} kali disewa
                </p>
                <p className="font-bold text-[12px] flex items-center gap-1 mt-[2px]">
                  <FaStar className="mb-[2px] text-[#F09024]" />
                  {toolsData.tools[0]?.AvgReview}
                </p>
              </div>
              <h1 className="px-5 font-bold text-[18px] mt-1">
                {toolsData.tools[0]?.ToolName}
              </h1>
              <div className="px-5 mt-1">
                <p className="text-[14px] text-[#F09024] font-bold">
                  Rp {toolsData.tools[0]?.ToolPrice.toLocaleString("id-ID")}{" "}
                  <span className="text-[12px] text-black/60">/Perhari</span>
                </p>
              </div>

              <div className="px-5">
                <div className="mt-5">
                  <ExpandableText
                    text={toolsData.tools[0]?.ToolDescription}
                    maxLength={150}
                  />
                </div>
                <div className="mt-5">
                  <h3 className="font-bold text-[14px]">Spesifikasi</h3>
                  <ul className="list-disc pl-5 space-y-1 text-[13px] mt-1 text-black/50">
                    <li>Kapasitas: {toolsData.tools[0]?.Capacity} liter</li>
                    <li>Material: {toolsData.tools[0]?.MaterialType}</li>
                    <li>Berat: {toolsData.tools[0]?.Weight} kg</li>
                    <li>Dimensi: {toolsData.tools[0]?.Dimension}</li>
                    <li>
                      Fitur:
                      <ul className="list-disc pl-5 space-y-1">
                        {toolsData.featureTools.map((feature, index) => (
                          <li>{feature.FeatureName}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5">
                <h1 className="font-bold mb-3 px-5 text-[14px]">
                  Rating dan Review
                </h1>
                <div className="flex gap-6 overflow-x-scroll scrollbar-hide w-full">
                  <div className="flex w-max gap-4 px-5 pb-4">
                    {toolsData.ratingTools.map((review, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 bg-[#F3F5F7] justify-between p-4 w-[20rem] rounded-2xl drop-shadow-xl"
                      >
                        <span className="flex gap-2">
                          {Array.from(
                            { length: review.RatingScore },
                            (_, index) => (
                              <FaStar key={index} className="text-[#F09024]" />
                            )
                          )}
                        </span>
                        <p className="text-[12px] text-black/60 mb-5">
                          {review.ReviewText}
                        </p>
                        <span className="flex items-center gap-2">
                          <img className="h-8 w-8 rounded-full bg-black" />
                          <span>
                            <p className="text-[12px] font-bold">
                              {review.Username}
                            </p>
                            <p className="text-[10px] text-black/60">
                              {getRelativeTime(review.DateRelease)}
                            </p>
                          </span>
                        </span>
                      </div>
                    ))}
                    {/* <div className="flex flex-col gap-4 bg-[#F3F5F7] p-4 w-[20rem] rounded-2xl drop-shadow-xl justify-between">
                      <span className="flex gap-2">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>
                      <p className="text-[12px] text-black/60">
                        “Pengalaman yang tidak terlupakan! Pemandangan dari
                        puncak luar biasa, tapi pendakian cukup menantang.
                        Persiapkan fisik dan mental!”
                      </p>
                      <span className="flex items-center gap-2">
                        <img className="h-8 w-8 rounded-full bg-black" />
                        <span>
                          <p className="text-[12px] font-bold">John Adove</p>
                          <p className="text-[10px] text-black/60">
                            12 jam yang lalu
                          </p>
                        </span>
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="px-5 mt-5 pb-[7rem]">
                <h3 className="text-[14px] font-bold">Kebijakan Sewa</h3>
                <ul className="list-disc pl-5 space-y-1 text-[13px] mt-2 text-black/50">
                  <li>
                    Pengembalian dilakukan maksimal jam 23.59 di hari terakhir
                    sewa.
                  </li>
                  <li>Denda keterlambatan: Rp 20.000/hari.</li>
                  <li>
                    Produk yang rusak akan dikenakan biaya perbaikan sesuai
                    tingkat kerusakan.
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <footer className="flex gap-4 justify-between max-w-[440px] items-center p-5 fixed bottom-0 w-full bg-white border-t-[1px] z-50">
            <button className="border-2 border-[#274753] w-full p-3 text-[#274753] rounded-xl text-[14px] gap-2 text-center">
              Masukkan Keranjang
            </button>
            <button
              onClick={handleClickRentNow}
              className="bg-[#274753] w-full p-3 text-white rounded-xl text-[14px]"
            >
              Sewa Sekarang
            </button>
          </footer>

          {/* <div className="bg-white z-50 fixed bottom-0 w-full p-2">
            <div className="flex justify-between">
              <div className="bg-[#F4F5F7]">
                <img src={alat2.src} className="w-[10rem] h-[10rem]" />
              </div>
              <div className="flex justify-between">
                <span className="flex flex-col gap-10">
                  <h1 className="font-bold text-[18px]">30L Carrier Bag</h1>
                  <p className="text-[14px] text-[#F09024] font-bold">
                    Rp 35.000
                    <span className="text-[12px] text-black/60 font-normal">
                      {" "}
                      /Perhari
                    </span>
                  </p>
                  <p>Stok: 5</p>
                </span>
              </div>
              <p>X</p>
            </div>
          </div> */}
        </div>
      )}
    </main>
  );
}
