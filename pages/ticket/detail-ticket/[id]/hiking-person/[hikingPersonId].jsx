import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import axios from "axios";
import QRCode from "react-qr-code";
import LoadingFull from "@/components/Loading/LoadingFull";
import { FaMountain } from "react-icons/fa6";

export default function DetailHikingPerson() {
  const router = useRouter();
  const { id, hikingPersonId } = router.query;
  const [transactionData, setTransactionData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const [hikingData, setHikingData] = useState([]);
  
  const qrData = JSON.stringify({
    transactionId: id,
    ticketId: transactionData?.TicketId,
    hikingPersonId: hikingPersonId
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
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/${id}`
        )
        .then((response) => {
          setTransactionData(response.data.data);
          axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/hiking-persons/id/${hikingPersonId}`
            )
            .then((response) => {
              setHikingData(response.data.data);
            })
            .catch((error) => {
              setIsLoading(false);
              console.error("Error fetching tool data", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (transactionData && hikingData) {
      setIsLoading(false);
    }
  }, [transactionData, hikingData]);

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
              <h1 className="text-[16px] font-bold">Tiket Pendaki</h1>
            </div>
            <div />
          </section>
          <section className="mt-5 px-5 text-[10px]">
            <div className="bg-gradient-to-left py-5 text-white rounded-2xl">
              <h1 className="font-bold px-5 text-[14px] flex gap-1 items-center">
                <FaMountain className="text-[15px]" />{" "}
                {transactionData?.TicketName} - {transactionData?.TicketCity}
              </h1>
              <span className="flex px-5 gap-12 mt-3">
                <p className="text-[12px]">Tanggal Masuk</p>
                <p className="text-[12px]">
                  {formatIndonesianTimeAuto(transactionData?.EntryDate, "date")}
                </p>
              </span>
              <span className="flex px-5 gap-12 mt-2">
                <p className="text-[12px]">Tanggal Keluar</p>
                <p className="text-[12px]">
                  {formatIndonesianTimeAuto(transactionData?.ExitDate, "date")}
                </p>
              </span>
              <span className="flex px-5 gap-5 mt-2">
                <p className="text-[12px]">Pos Perizinan Masuk</p>
                <p className="text-[12px]">{transactionData?.EntryPost}</p>
              </span>
              <span className="flex px-5 gap-5 mt-2">
                <p className="text-[12px]">Pos Perizinan Keluar</p>
                <p className="text-[12px]">{transactionData?.ExitPost}</p>
              </span>
              <hr className="my-3" />
              <div className="px-5">
                <h3 className="text-[12px] text-white/50">Pendaki</h3>
                <p className="text-[12px] font-bold mt-2">
                  {hikingData[0]?.HikingPersonFullName?.toUpperCase()}
                </p>
                <p className="text-[12px] font-bold mt-1">
                  NIK - {hikingData[0]?.HikingPersonKTP}
                </p>
              </div>
            </div>
            <div className="flex items-center px-2 gap-4 bg-[#FFF2E5] border-[1px] border-[#F09024] py-2 rounded-xl mt-6 my-4">
              <FaExclamationCircle className="text-[2.2rem] text-[#F09024]" />
              <p className="text-[10px]">
                Anda wajib menunjukkan qr code untuk akses masuk dan keluar
                pendakian.
              </p>
            </div>
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9] mt-3" />
          <section className="px-5 text-[14px]">
            <div className="flex justify-between mt-2">
              <h1 className="font-bold mt-2 text-[14px]">QR Code</h1>
              <span>
                <h1 className="font-bold mt-2 text-[12px] text-black/40 text-right">
                  No Pesanan
                </h1>
                <p className="text-black text-[10px]">
                  {transactionData.TransactionId}
                </p>
              </span>
            </div>
            <div className="my-8 flex justify-center">
              <QRCode value={qrData} size={150} />
            </div>
          </section>
          <div className="h-[0.5rem] bg-[#F9F9F9] mt-3" />
          <section className="px-5 text-[14px]">
            <h1 className="font-bold mt-2">Syarat dan Ketentuan Tiket</h1>
            <p className="text-[12px] mt-2">Persyaratan Pendakian</p>
            <p className="text-[12px] leading-5 mt-2">
              1. Tiket tidak dapat dipindahtangankan
              <br />
              2. Pendaki wajib membawa kartu identitas resmi yang sesuai dengan
              data pendaftaran.
              <br />
              3. Pendaki wajib memiliki perlengkapan standar pendakian yang
              sesuai dengan ketentuan jalur pendakian.
              <br />
              4. Setiap pendaki wajib mengikuti pemeriksaan kesehatan jika
              diwajibkan oleh pengelola jalur pendakian.
              <br />
              5. Pendaki dilarang membawa barang terlarang seperti narkotika,
              senjata tajam, dan bahan peledak.
            </p>
            <p className="text-[12px] my-2">Tanggung Jawab dan Keamanan</p>
            <p className="text-[12px] leading-5 mt-2">
              1. Pendaki bertanggung jawab penuh atas keselamatan diri sendiri
              selama perjalanan. <br /> 2. Pihak pengelola tidak bertanggung
              jawab atas kecelakaan atau kehilangan barang pribadi selama
              pendakian. <br />
              3. Pendaki wajib mengikuti arahan dan peraturan dari petugas di
              jalur pendakian.
            </p>
            <p className="text-[12px] my-2">Ketentuan Lain</p>
            <p className="text-[12px] leading-5 mt-2">
              1. Pengelola jalur pendakian berhak membatalkan atau menunda
              pendakian jika terjadi kondisi darurat seperti cuaca ekstrem atau
              bencana alam. <br /> 2. Pengelola berhak mengubah syarat dan
              ketentuan ini sewaktu-waktu dengan pemberitahuan sebelumnya.{" "}
              <br /> 3. Dengan membeli tiket, pendaki dianggap telah membaca dan
              menyetujui semua syarat dan ketentuan ini.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
