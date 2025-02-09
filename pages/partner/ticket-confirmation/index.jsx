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
import { PiSealCheckFill } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function TicketConfirmation() {
  const router = useRouter();
  //   const { id } = router.query;
  const [transactionData, setTransactionData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hikingPersonsData, setHikingPersonsData] = useState([]);
  const { hikingPersonId, transactionId, ticketId } = router.query;
  const [buttonLoading, setButtonLoading] = useState(false);
  //   const id = "TKBD-250109-1736406990213";
  //   const hikingId = "7du6jcopqmafy1y64z4zo7spx3llzb5st7sv";

  useEffect(() => {
    if (!transactionId && !hikingPersonId) {
      return (
        <div className="flex justify-center items-center p-5 text-center">
          Data Tidak Ditemukan, silahkan scan qr terlebih dahulu
        </div>
      );
    }
  }, []);

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
    if (transactionId && hikingPersonId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/${transactionId}`
        )
        .then((response) => {
          setTransactionData(response.data.data);
          axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/hiking-persons/${transactionId}`
            )
            .then((response) => {
              setHikingPersonsData(response.data.data);
              const person = response.data.data.find(
                (item) => item.HikingPersonId === hikingPersonId
              );

              if (person && person.HikingPersonStatus !== null) {
                // Jika HikingPersonStatus tidak null, arahkan ke halaman /gagal

                console.log("gagall");
              } else {
                // Lakukan aksi lainnya jika kondisi tidak terpenuhi
                console.log("Status valid atau data ditemukan");
                setIsLoading(false);
              }
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
  }, [transactionId, hikingPersonId]);

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    const allNull = hikingPersonsData.every(
      (person) => person.HikingPersonStatus === null
    );
    const indonesiaTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    );
    indonesiaTime.setHours(indonesiaTime.getHours() + 7);
    const createdAt = indonesiaTime.toISOString().slice(0, 19);

    if (allNull) {
      try {
        const updatedData = {
          TransactionStatus: "on going",
          CreatedAt: createdAt,
        };

        // Send the request to update the transaction
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/${transactionId}`,
          updatedData
        );
      } catch (error) {
        console.error("Error updating transaction:", error);
        setButtonLoading(false);
      }
    }
    try {
      const updatedHikingData = {
        HikingPersonStatus: "on going",
        CreatedAt: createdAt,
      };

      // Send the request to update the transaction
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/hiking-person/${hikingPersonId}`,
        updatedHikingData
      );

      if (response.status === 200) {
        router.push(`/partner/ticket-confirmation/success`);
        setButtonLoading(false);
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      setButtonLoading(false);
    }
  };

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
                    ? "bg-blue-300 text-blue-800" // Kuning untuk On Going
                    : transactionData?.TransactionStatus === "pending"
                    ? "bg-[#FFFFE0] text-[#FFC107]" // Kuning untuk Pending
                    : "bg-gray-200 text-gray-700" // Default jika status tidak diketahui
                }`}
              >
                {transactionData?.TransactionStatus === "unpaid"
                  ? "Belum Dibayar"
                  : transactionData?.TransactionStatus === "paid"
                  ? "Berhasil"
                  : transactionData?.TransactionStatus === "on going"
                  ? "Sedang Berlangsung"
                  : transactionData?.TransactionStatus === "pending"
                  ? "Pending"
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
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9] mt-3" />
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

            {hikingPersonsData?.map((person, index) => {
              if (person.HikingPersonId === hikingPersonId) {
                return (
                  <div className="px-5 py-3 flex flex-col gap-1 rounded-2xl mt-4 bg-[#F09024] text-white">
                    <div className="flex items-center justify-between">
                      <div className="">
                        <h1 className="text-[12px]">
                          {person.HikingPersonFullName.toUpperCase()}
                        </h1>
                        <span className="flex justify-between text-[10px]">
                          <p className="text-white">
                            NIK - {person.HikingPersonKTP}
                          </p>
                        </span>
                      </div>
                      <div className="bg-[#FFF2E5] rounded-full p-1 px-3 text-center">
                        <p className="text-[9px] text-[#F44336]">
                          Pengguna yang dikonfirmasi
                        </p>
                      </div>
                    </div>
                  </div>
                );
              } else if (person.HikingPersonStatus !== null) {
                return (
                  <div className="px-5 py-3 flex flex-col gap-1 rounded-2xl mt-4 bg-[#D9D9D9] text-white">
                    <div className="flex items-center justify-between">
                      <div className="">
                        <h1 className="text-[12px]">
                          {person.HikingPersonFullName.toUpperCase()}
                        </h1>
                        <span className="flex justify-between text-[10px]">
                          <p className="text-white">
                            NIK - {person.HikingPersonKTP}
                          </p>
                        </span>
                      </div>
                      <PiSealCheckFill className="text-[2rem]" />
                    </div>
                  </div>
                );
              } else {
                return (
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
                    </span>
                  </div>
                );
              }
              return null; // Menghindari error jika tidak ada elemen yang dirender
            })}
            {/* <div className="px-5 py-3 flex flex-col gap-1 rounded-2xl mt-4 bg-[#F09024] text-white">
              <div className="flex items-center justify-between">
                <div className="">
                  <h1 className="text-[12px]">RAEFANDY FADILA</h1>
                  <span className="flex justify-between text-[10px]">
                    <p className="text-white">NIK - 59303434004343</p>
                  </span>
                </div>
                <div className="bg-[#FFF2E5] rounded-full p-1 px-3 text-center">
                  <p className="text-[9px] text-[#F44336]">
                    Pengguna yang dikonfirmasi
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 flex flex-col gap-1 rounded-2xl mt-4 bg-[#D9D9D9] text-white">
              <div className="flex items-center justify-between">
                <div className="">
                  <h1 className="text-[12px]">RAEFANDY FADILA</h1>
                  <span className="flex justify-between text-[10px]">
                    <p className="text-white">NIK - 59303434004343</p>
                  </span>
                </div>
                <PiSealCheckFill className="text-[2rem]" />
              </div>
            </div> */}
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
          <section className="px-5 mt-7">
            {buttonLoading ? (
              <button className="w-full flex justify-center bg-[#F09024] text-[15px] py-4 rounded-lg text-white">
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              </button>
            ) : (
              <button
                onClick={handleConfirmation}
                className="w-full bg-[#F09024] text-[15px] py-4 rounded-lg text-white"
              >
                Konfirmasi
              </button>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
