import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import LogoAplikasi from "@/public/logo.png";
import { FaExclamationCircle } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import axios from "axios";
import QRCode from "react-qr-code";
import LoadingFull from "@/components/Loading/LoadingFull";

export default function DetailTicket() {
  const router = useRouter();
  const { id } = router.query;
  const [transactionData, setTransactionData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hikingPersonsData, setHikingPersonsData] = useState([]);
  const [toolData, setToolData] = useState([]);
  const [ticketData, setTicketData] = useState();
  const [toolPrice, setToolPrice] = useState(0);
  const qrData = JSON.stringify({
    transactionId: id,
    ticketId: transactionData?.TicketId,
  });

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
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
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tools/transactions/${id}`
        )
        .then((response) => {
          setTransactionData(response.data.data);
          axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tools/get-detail-tools?ToolId=${response.data.data.ToolId}`
            )
            .then((response) => {
              setToolData(response.data);
              setToolPrice(response.data.tools[0].ToolPrice);
            })
            .catch((error) => {
              setIsLoading(false);
              console.error("Error fetching tool data", error);
            });
          axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-detail-ticket?TicketId=${response.data.data.TicketId}`
            )
            .then((response) => {
              setTicketData(response.data);
            })
            .catch((error) => {
              setIsLoading(false);
              console.error("Error fetching ticket data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (transactionData && toolData && ticketData) {
      setIsLoading(false);
    }
  }, [transactionData, toolData, ticketData]);

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
                Anda wajib menunjukkan qr code dan memberikan jaminan kartu
                identitas pada saat pengambilan alat
              </p>
            </div>
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9]" />
          <section className="px-5 mt-3">
            <h1 className="text-[14px] font-bold">Detail Pemesanan</h1>
            <div className="flex items-center mt-2 gap-5 rounded-2xl">
              <div className="bg-[#F4F5F7] w-[11rem] h-[7.5rem] flex items-center justify-center rounded-2xl">
                <img
                  className="w-[5rem] h-[5.5rem]"
                  src={toolData.imgDetail[1]}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-[12px] font-bold">
                  {toolData.tools[0]?.ToolName}
                </h1>
                <p className="text-[10px] text-black/40">
                  {ticketData.averageScore[0]?.TicketName} -{" "}
                  {ticketData.averageScore[0]?.TicketCity}
                </p>
                <p className="text-[10px] text-black/40">
                  {formatIndonesianTimeAuto(transactionData.EntryDate, "date")}{" "}
                  - {formatIndonesianTimeAuto(transactionData.ExitDate, "date")}
                </p>
                <p className="text-[10px] text-black/40 text-right">
                  {transactionData.ToolAmount} pcs
                </p>
                <p className="text-[14px] text-[#F09024] font-bold text-right">
                  Rp {toolData.tools[0]?.ToolPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9] mt-3" />
          <section className="px-5 text-[14px]">
            <h1 className="font-bold mt-2">QR Code</h1>
            <div className="my-8 flex justify-center">
              <QRCode value={qrData} size={150} />
            </div>
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9] mt-3" />
          <section className="px-5 text-[14px]">
            <h1 className="font-bold mt-2">Nama Penyewa</h1>
            <div className="p-5 bg-[#F9F9F9] rounded-2xl mt-2">
              <h1 className="font-bold text-[12px]">
                {transactionData.PersonName?.toUpperCase()}
              </h1>
              <p className="text-black/50 text-[10px]">
                {transactionData.PersonPhone}
              </p>
            </div>
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9] mt-3" />
          <section className="px-5 text-[14px]">
            <h1 className="font-bold mt-2">Syarat dan Ketentuan Penyewaan</h1>
            <p className="text-[12px] mt-2">
              Pengambilan dan Pengembalian Alat
            </p>
            <p className="text-[12px] leading-5 mt-2">
              1. Pengguna wajib menyerahkan jaminan berupa kartu identitas
              (KTP/Paspor) saat pengambilan alat.
              <br />
              2. Pengguna wajib mengambil alat sesuai dengan jadwal dan lokasi
              yang telah disepakati.
              <br />
              3. Pengembalian alat harus dilakukan tepat waktu dalam kondisi
              yang sama seperti saat diterima.
              <br />
              4. Keterlambatan pengembalian dikenakan denda sebesar 10% dari
              total biaya sewa per hari keterlambatan.
              <br />
              5. Jika alat dikembalikan dalam keadaan rusak atau hilang,
              pengguna wajib mengganti sesuai dengan biaya perbaikan atau harga
              alat.
            </p>
            <p className="text-[12px] my-2">Tanggung Jawab Pengguna</p>
            <p className="text-[12px] leading-5 mt-2">
              1. Pengguna bertanggung jawab penuh atas alat yang disewa selama
              masa pemakaian. <br /> 2. Hiking Buddy tidak bertanggung jawab
              atas kecelakaan atau cedera yang terjadi akibat penggunaan alat.{" "}
              <br />
              3. Pengguna tidak diperbolehkan menyewakan kembali alat kepada
              pihak lain tanpa izin tertulis dari Hiking Buddy.
            </p>
            <p className="text-[12px] my-2">Ketentuan Lain</p>
            <p className="text-[12px] leading-5 mt-2">
              1. Hiking Buddy berhak menolak penyewaan jika ditemukan indikasi
              penyalahgunaan. <br /> 2. Hiking Buddy berhak mengubah syarat dan
              ketentuan sewaktu-waktu dengan pemberitahuan sebelumnya. <br /> 3.
              Dengan melakukan pemesanan, pengguna dianggap telah membaca dan
              menyetujui semua syarat dan ketentuan ini.
            </p>
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
                Rp {transactionData.TotalPrice?.toLocaleString("id-ID")}
              </h1>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
