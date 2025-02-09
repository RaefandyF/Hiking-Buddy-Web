import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import LogoAplikasi from "@/public/logo.png";
import { FaExclamationCircle } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";

export default function DetailTicket() {
  const router = useRouter();
  const { id } = router.query;
  const [transactionData, setTransactionData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hikingPersonsData, setHikingPersonsData] = useState([]);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  function formatIndonesianTimeAuto(isoDate) {
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

    return `${day} ${month} ${year}, ${hours}:${minutes} ${timezoneLabel}`;
  }

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/${id}`
        )
        .then((response) => {
          setTransactionData(response.data.data);
          axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/hiking-persons/${id}`
            )
            .then((response) => {
              setHikingPersonsData(response.data.data);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching transaction data:", error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <main className="font-poppins flex justify-center">
      {isLoading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px] pb-[3rem]">
          <section className="flex justify-between p-5 border-b-2">
            <button
              onClick={goBack}
              className="flex justify-between items-center p-3 rounded-full bg-[#F5F5F5]"
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            <div className="flex justify-center mt-1 flex-col text-center">
              <h1 className="text-[16px] font-bold">Detail Tiket</h1>
            </div>
            <div />
          </section>
          <section className="mt-5 px-5 text-[10px]">
            <div className="flex justify-between gap-2">
              <img src={LogoAplikasi.src} className="w-[5rem]" />
              <span>
                <h4 className="text-[10px] text-black/60 text-right">
                  No Pesanan
                </h4>
                <h2 className="text-[12px] font-bold">
                  {transactionData?.TransactionId}
                </h2>
              </span>
            </div>
            <div className="mt-5 flex justify-between items-center">
              <h4 className="text-black/60">Status</h4>
              <div
                className={`p-1 rounded-full px-3 ${
                  transactionData?.TransactionStatus === "unpaid"
                    ? "bg-[#FFE8E8] text-[#F44336]" // Merah untuk Belum Dibayar
                    : transactionData?.TransactionStatus === "paid"
                    ? "bg-[#E8FFE8] text-[#4CAF50]" // Hijau untuk Dibayar
                    : transactionData?.TransactionStatus === "on going"
                    ? "bg-blue-200 text-blue-700" // Hijau untuk Dibayar
                    : transactionData?.TransactionStatus === "pending"
                    ? "bg-[#FFFFE0] text-[#FFC107]" // Kuning untuk Pending
                    : "bg-gray-200 text-gray-700" // Default jika status tidak diketahui
                }`}
              >
                {transactionData?.TransactionStatus === "unpaid"
                  ? "Belum Dibayar"
                  : transactionData?.TransactionStatus === "paid"
                  ? "Berhasil"
                  : transactionData?.TransactionStatus === "pending"
                  ? "Pending"
                  : transactionData?.TransactionStatus === "on going"
                  ? "Sedang Berlangsung"
                  : transactionData?.TransactionStatus === "canceled"
                  ? "Dibatalkan"
                  : transactionData?.TransactionStatus === "completed"
                  ? "Selesai"
                  : "Status Tidak Diketahui"}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <h4 className="text-black/60">Tanggal Transaksi</h4>
              <p>
                {formatIndonesianTimeAuto(transactionData?.TransactionDate)}
              </p>
            </div>
            <div className="flex items-center px-2 gap-4 bg-[#FFF2E5] border-[1px] border-[#F09024] py-2 rounded-xl mt-6 my-4">
              <FaExclamationCircle className="text-[2.2rem] text-[#F09024]" />
              <p className="text-[10px]">
                Anda wajib menunjukkan tiket pada saat registrasi dan
                pemeriksaan sebelum melakukan pendakian
              </p>
            </div>
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9]" />
          <section className="px-5 mt-3">
            <h1 className="text-[14px] font-bold">Detail Pemesanan</h1>
            <div className="flex items-center mt-2 gap-5 border-2 px-5 rounded-2xl">
              <div className="">
                <FaMountainSun className="text-[1.2rem] text-[#274753]" />
              </div>
              <div className="flex flex-col gap-2 border-l-2 border-dashed border-black/60 pl-5">
                <h1 className="text-[12px] font-bold mt-5">
                  {transactionData?.TicketName} - {transactionData?.TicketCity}
                </h1>
                <p className="text-[10px]">
                  <span className="font-bold">Masuk:</span>{" "}
                  {
                    formatIndonesianTimeAuto(transactionData?.EntryDate).split(
                      ","
                    )[0]
                  }
                </p>
                <p className="text-[10px]">
                  <span className="font-bold">Keluar:</span>{" "}
                  {
                    formatIndonesianTimeAuto(transactionData?.ExitDate).split(
                      ","
                    )[0]
                  }
                </p>
                <p className="text-[10px] mb-5">Tiket Pendakian(2x)</p>
              </div>
            </div>
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9] mt-3" />
          <section className="px-5 text-[14px] mt-3">
            <h1 className="font-bold">Pendaki</h1>

            {hikingPersonsData?.map((person, index) => (
              <div
                key={index}
                className="px-5 py-3 flex flex-col gap-1 bg-[#f6f4f4] rounded-2xl mt-4"
              >
                <h1 className="text-[12px]">
                  {person.HikingPersonFullName.toUpperCase()}
                </h1>
                <span className="flex justify-between text-[10px]">
                  <p className="text-black/50">
                    NIK - {person.HikingPersonKTP}
                  </p>
                  <Link href={`/ticket/detail-ticket/${id}/hiking-person/${person.HikingPersonId}`}>
                    <p className="text-[#F09024] font-bold">
                      Lihat Tiket {">"}
                    </p>
                  </Link>
                </span>
              </div>
            ))}
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9] mt-3" />
          <section className="px-5 mt-3">
            <h1 className="font-bold text-[14px]">Ringkasan Pembayaran</h1>
            <span className="flex justify-between mt-3">
              <h4 className="text-[12px] text-black/50">Metode Pembayaran</h4>
              <p className="text-[12px] font-bold">
                {" "}
                {transactionData?.PaymentMethod === "bank_transfer"
                  ? "Bank Transfer"
                  : transactionData?.PaymentMethod === "qris"
                  ? "QRIS"
                  : transactionData?.PaymentMethod === "echannel"
                  ? "Mandiri Virtual Account"
                  : transactionData?.PaymentMethod}
              </p>
            </span>
            <div className="flex justify-between mt-5 px-5 py-3 border-2 rounded-xl">
              <h4 className="text-[12px] text-black/50">Total</h4>
              <h1 className="text-[14px] font-bold">
                Rp {transactionData?.TotalPrice.toLocaleString("id-ID")}
              </h1>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
