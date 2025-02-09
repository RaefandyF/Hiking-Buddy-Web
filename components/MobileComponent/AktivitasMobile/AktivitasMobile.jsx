import React, { useState, useEffect } from "react";
import { FaRegCompass } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import FooterMobile from "../FooterMobile/FooterMobile";
import { FaFilter } from "react-icons/fa";
import gunungRiwayat from "@/public/gunung-riwayat.png";
import Wishlist from "@/components/Wishlist";
import axios from "axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function AktivitasMobile() {
  const [toogleWishlist, setToogleWishlist] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transactionToolsHistory, setTransactionToolsHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleWishlistToogle = (e) => {
    e.preventDefault();
    setToogleWishlist(true);
  };

  const handleTransactionToogle = () => {
    setToogleWishlist(false);
  };

  function formatIndonesianTimeAuto(isoDate, type) {
    // Konversi ISO string ke Date
    const date = new Date(isoDate);

    // Tentukan offset untuk zona waktu Indonesia
    const jakartaOffset = 0; // WIB (GMT+7)
    const baliOffset = 1; // WITA (GMT+8)
    const papuaOffset = 2; // WIT (GMT+9)

    // Offset saat ini berdasarkan zona waktu lokal browser
    const localOffset = date.getTimezoneOffset() / -60; // Negatif karena getTimezoneOffset dalam menit ke UTC

    // Menentukan zona waktu berdasarkan offset
    let offset = jakartaOffset;
    let timezoneLabel = "WIB";

    if (localOffset === baliOffset) {
      offset = baliOffset;
      timezoneLabel = "WITA";
    } else if (localOffset === papuaOffset) {
      offset = papuaOffset;
      timezoneLabel = "WIT";
    }

    // Konversikan ke waktu lokal Indonesia
    const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);

    // Format tanggal dan waktu
    const day = localTime.getDate();
    const monthNames = [
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
    const month = monthNames[localTime.getMonth()];
    const year = localTime.getFullYear();

    const hours = String(localTime.getHours()).padStart(2, "0");
    const minutes = String(localTime.getMinutes()).padStart(2, "0");

    if (type === "date") {
      return `${day} ${month} ${year}`;
    } else {
      return `${day} ${month} ${year}, ${hours}:${minutes} ${timezoneLabel}`;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("HikingBuddyToken");
    if (token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/users/get-current-login`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            axios
              .get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/user/${response.data.message.result?.[0].UserId}`
              )
              .then((response) => {
                setTransactionHistory(response.data.data);
                setIsLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching transaction data:", error);
                setIsLoading(false);
              });

            axios
              .get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tools/transactions/user/${response.data.message.result?.[0].UserId}`
              )
              .then((response) => {
                setTransactionToolsHistory(response.data.data);
              })
              .catch((error) => {
                console.error("Error fetching transaction data:", error);
              });
          } else {
            console.log("Error:", response.data.message);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
    }
  }, []);

  const [filterType, setFilterType] = useState("all"); // Filter jenis transaksi
  const [filterStatus, setFilterStatus] = useState("all"); // Filter status transaksi

  // Fungsi untuk memfilter berdasarkan tipe transaksi
  const getCombinedData = () => {
    const toolsData = transactionToolsHistory.map((item) => ({
      ...item,
      type: "tools",
    }));
    const ticketData = transactionHistory.map((item) => ({
      ...item,
      type: "ticket",
    }));

    const baseData = [...ticketData, ...toolsData];

    // Filter berdasarkan status
    const filteredData =
      filterStatus === "all"
        ? baseData
        : baseData.filter((item) =>
            filterStatus === "active"
              ? ["pending", "paid"].includes(item.TransactionStatus)
              : item.TransactionStatus === filterStatus
          );

    // Urutkan berdasarkan tanggal terbaru
    return filteredData.sort((a, b) => {
      const dateA = a.TransactionDate
        ? new Date(a.TransactionDate)
        : new Date(a.CreatedAt);
      const dateB = b.TransactionDate
        ? new Date(b.TransactionDate)
        : new Date(b.CreatedAt);
      return dateB - dateA; // Urutkan dari yang terbaru
    });
  };

  const combinedHistory = getCombinedData();
  console.log(combinedHistory);

  return (
    <main className="font-poppins pb-[9rem]">
      <header className="flex justify-between p-5 items-center shadow-sm">
        <h1 className="font-bold">Aktivitas</h1>
        <div className="flex gap-3">
          <FaRegCompass className="text-2xl" />
          <IoIosNotifications className="text-2xl" />
        </div>
      </header>

      {toogleWishlist ? (
        <Wishlist transactionToogle={handleTransactionToogle} />
      ) : (
        <div>
          <section className="py-5">
            <div className="flex justify-center px-5">
              <span
                onClick={handleTransactionToogle}
                className="bg-[#F09024] text-[12px] p-2 rounded-full w-[16rem] z-10 text-center text-white"
              >
                Riwayat Transaksi
              </span>
              <span
                onClick={handleWishlistToogle}
                className="bg-[#F9F9F9] text-[12px] p-2 rounded-full w-[15rem] ml-[-1rem] text-center text-black/40"
              >
                Yang di Simpan
              </span>
            </div>

            <div className="mt-4 px-5 flex gap-4 items-center justify-center text-center max-[305px]:gap-2">
              <div className="text-[10px] border-2 p-2 px-3 rounded-full text-black/60">
                Belum Bayar
              </div>
              <div className="text-[10px] border-2 rounded-full p-2 px-3 text-black/60">
                Sedang Berlangsung
              </div>
              <div
                onClick={() => setFilterType("tickets")}
                className="text-[10px] border-2 rounded-full p-2 px-3 text-black/60"
              >
                Selesai
              </div>
              <div
                onClick={() => setFilterType("tools")}
                className="bg-[#F09024] text-[14px] p-2 px-3 rounded-full text-white"
              >
                <FaFilter />
              </div>
            </div>

            <div className="bg-[#F9F9F9] py-2 px-5 mt-3 text-[12px] text-black/60">
              Semua
            </div>
          </section>

          {isLoading ? (
            <section className="flex flex-col gap-2 mx-5">
              <Skeleton className="w-full" height={170} />
              <Skeleton className="w-full" height={170} />
              <Skeleton className="w-full" height={170} />
            </section>
          ) : (
            <section className="px-5 flex flex-col gap-4">
              {combinedHistory.map((item, index) =>
                item.type === "tools" ? (
                  <Link
                    key={index}
                    href={
                      item.TransactionStatus === "pending"
                        ? `/ticket/${item.TransactionId}/info`
                        : item.TransactionStatus === "unpaid"
                        ? "" // Link kosong untuk "unpaid"
                        : `/rent-tools/detail-rent-tools/${item.TransactionId}` // Default link untuk status lain
                    }
                  >
                    <div className="bg-[#F9F9F9] pt-4 rounded-xl">
                      <div className="flex px-4 justify-between text-[10px] items-center">
                        <span>
                          <p className="text-black/60">No Pemesanan</p>
                          <p>{item.TransactionId}</p>
                        </span>
                        <span
                          className={`p-1 rounded-full px-3 ${
                            item.TransactionStatus === "unpaid"
                              ? "bg-[#FFE8E8] text-[#F44336]" // Merah untuk Belum Dibayar
                              : item.TransactionStatus === "paid"
                              ? "bg-[#E8FFE8] text-[#4CAF50]" // Hijau untuk Dibayar
                              : item.TransactionStatus === "pending"
                              ? "bg-[#FFFFE0] text-[#FFC107]" // Kuning untuk Pending
                              : item.TransactionStatus === "on going"
                              ? "bg-blue-200 text-blue-700" // biru untuk On Going
                              : "bg-gray-200 text-gray-700" // Default jika status tidak diketahui
                          }`}
                        >
                          {item.TransactionStatus === "unpaid"
                            ? "Belum Dibayar"
                            : item.TransactionStatus === "paid"
                            ? "Berhasil"
                            : item.TransactionStatus === "on going"
                            ? "Sedang Berlangsung"
                            : item.TransactionStatus === "pending"
                            ? "Pending"
                            : item.TransactionStatus === "canceled"
                            ? "Dibatalkan"
                            : item.TransactionStatus === "completed"
                            ? "Selesai"
                            : "Status Tidak Diketahui"}
                        </span>
                      </div>

                      <div className="py-5 px-4 border-[1px] bg-white rounded-xl mt-2">
                        <div className="flex gap-4">
                          <div className="bg-[#F4F5F7] w-[7rem] h-[5.5rem]">
                            <img
                              className="w-[5rem] h-[5.5rem]"
                              src={item.imageUrl}
                            />
                          </div>
                          <div className="flex flex-col gap-2 w-full">
                            <h1 className="text-[12px] font-bold">
                              {item.ToolName}
                            </h1>
                            <p className="text-[10px] text-black/40">
                              {item.TicketName} - {item.TicketCity}
                            </p>
                            <p className="text-[10px] text-black/40">
                              {formatIndonesianTimeAuto(item.EntryDate, "date")}{" "}
                              -{" "}
                              {formatIndonesianTimeAuto(item.ExitDate, "date")}
                            </p>
                            <p className="text-[10px] text-black/40 text-right">
                              {item.ToolAmount} pcs
                            </p>
                            <p className="text-[8px] text-black/60 text-right">
                              Total Transaksi
                            </p>
                            <p className="text-[12px] text-[#F09024] font-bold text-right">
                              Rp{" "}
                              {item.TotalPrice
                                ? item.TotalPrice?.toLocaleString("id-ID")
                                : (
                                    item.TicketPrice * item.HikingAmount
                                  ).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={
                      item.TransactionStatus === "pending"
                        ? `/ticket/${item.TransactionId}/info`
                        : item.TransactionStatus === "unpaid"
                        ? "" // Link kosong untuk "unpaid"
                        : `/ticket/detail-ticket/${item.TransactionId}` // Default link untuk status lain
                    }
                  >
                    <div className="bg-[#F9F9F9] pt-4 rounded-xl">
                      <div className="flex px-4 justify-between text-[10px] items-center">
                        <span>
                          <p className="text-black/60">No Pemesanan</p>
                          <p>{item.TransactionId}</p>
                        </span>
                        <span
                          className={`p-1 rounded-full px-3 ${
                            item.TransactionStatus === "unpaid"
                              ? "bg-[#FFE8E8] text-[#F44336]" // Merah untuk Belum Dibayar
                              : item.TransactionStatus === "paid"
                              ? "bg-[#E8FFE8] text-[#4CAF50]" // Hijau untuk Dibayar
                              : item.TransactionStatus === "pending"
                              ? "bg-[#FFFFE0] text-[#FFC107]" // Kuning untuk Pending
                              : item.TransactionStatus === "on going"
                              ? "bg-blue-200 text-blue-800" // biru untuk On Going
                              : "bg-gray-200 text-gray-700" // Default jika status tidak diketahui
                          }`}
                        >
                          {item.TransactionStatus === "unpaid"
                            ? "Belum Dibayar"
                            : item.TransactionStatus === "paid"
                            ? "Berhasil"
                            : item.TransactionStatus === "on going"
                            ? "Sedang Berlangsung"
                            : item.TransactionStatus === "pending"
                            ? "Pending"
                            : item.TransactionStatus === "canceled"
                            ? "Dibatalkan"
                            : item.TransactionStatus === "completed"
                            ? "Selesai"
                            : "Status Tidak Diketahui"}
                        </span>
                      </div>

                      <div className="py-5 px-4 border-[1px] bg-white rounded-xl mt-2">
                        <img
                          className="w-full h-[5.5rem] rounded-xl object-cover"
                          src={item.mountainImageUrl}
                        />
                        <h1 className="text-[12px] font-bold mt-2">
                          {item.TicketName} - {item.TicketCity}
                        </h1>
                        <div className="mt-1 flex justify-between items-center">
                          <p className="text-[10px] text-black/80">
                            {item.TransactionDate
                              ? formatIndonesianTimeAuto(item.TransactionDate)
                              : formatIndonesianTimeAuto(item.CreatedAt)}
                            , {item.HikingAmount} TIKET PENDAKIAN
                          </p>
                          <p className="text-[8px] text-black/60">
                            Total Harga
                          </p>
                        </div>
                        <div className="mt-1 flex justify-between items-center">
                          <p className="text-[10px] text-black/60">Add On: -</p>
                          <p className="text-[12px] text-[#F09024] font-bold">
                            Rp{" "}
                            {item.TotalPrice
                              ? item.TotalPrice?.toLocaleString("id-ID")
                              : (
                                  item.TicketPrice * item.HikingAmount
                                ).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </section>
          )}
        </div>
      )}

      <FooterMobile
        home={"py-7"}
        komunitas={"py-7"}
        aktivitas={"py-7 border-t-[4px] border-[#F09024] text-[#F09024]"}
        profile={"py-8"}
      />
    </main>
  );
}
