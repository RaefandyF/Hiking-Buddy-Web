import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineScan } from "react-icons/ai";
import QRCode from "@/components/QRCode/QRCode";
import Link from "next/link";
import jwt from "jsonwebtoken";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";
import { formatIndonesianTimeAuto } from "@/utils/timeUtils";

export default function Dashboard() {
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionCounts, setTransactionCounts] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("HikingBuddyToken");
    if (!token) {
      // Jika token tidak ada, arahkan ke halaman login
      router.push("/login");
    } else {
      const decoded = jwt.decode(token);
      const currentTime = Date.now() / 1000;
      // Extract user information from the token payload
      if (decoded.exp < currentTime) {
        console.log("Token has expired");
        localStorage.removeItem("HikingBuddyToken");
        window.location.reload();
      } else {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/users/get-user?userid=${decoded.result[0].UserId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setUserData(response.data.data);
            if (response.data.data.UserRole === "Partner") {
              axios
                .get(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/ticket-id/${response.data.data.UserTicketId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((response) => {
                  setTransactionData(response.data.data);
                  const transactionCounts = response.data.data.reduce(
                    (counts, item) => {
                      if (item.TransactionStatus === "paid") counts.paid += 1;
                      if (item.TransactionStatus === "on going")
                        counts.onGoing += 1;
                      if (item.TransactionStatus === "done") counts.done += 1;
                      return counts;
                    },
                    { paid: 0, onGoing: 0, done: 0 }
                  );
                  setTransactionCounts(transactionCounts);
                  setIsLoading(false);
                })
                .catch((error) => {
                  console.error("Error fetching transaction data:", error);
                  setIsLoading(false);
                });
            } else {
              router.push("/profile");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setIsLoading(false);
          });
      }
    }
  }, []);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  const handleScan = (data) => {
    // console.log(data);
    // Parse the JSON string to an object
    const parsedData = JSON.parse(data);
    // Ambil transactionId
    console.log("ini parsed data", parsedData);

    console.log("ini transaksi id", parsedData.transactionId);

    // setScannedData(parsedData);
    router.push({
      pathname: `/partner/ticket-confirmation`,
      query: parsedData,
    });
    // setIsScanning(false); // Berhenti scanning setelah berhasil
  };

  const handleError = (err) => {
    console.error("Scan error:", err);
  };

  //   navigator.mediaDevices.enumerateDevices().then((devices) => {
  //     devices.forEach((device) => {
  //       console.log(`${device.kind}: ${device.label} (ID: ${device.deviceId})`);
  //     });
  //   });

  const toggleScanning = () => {
    setIsScanning((prev) => !prev);
  };

  return (
    <main className="font-poppins flex justify-center h-full">
      {isLoading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px]">
          {isScanning ? (
            <div className="h-full pb-[5.5rem] bg-gradient-to-left p-5">
              <button
                onClick={() => setIsScanning(false)}
                className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
              >
                <IoIosArrowBack className="text-xl" />
              </button>
              <div className="flex justify-center mt-[-1.7rem]">
                <h1 className="text-[18px] text-white font-bold">
                  Scan QR Code
                </h1>
              </div>
              <div className="h-screen pt-[7rem]">
                <QRCode handleScan={handleScan} />
              </div>
            </div>
          ) : (
            <section className="h-[17rem] pb-[5.5rem] bg-gradient-to-left p-5">
              <Link href="/profile">
                <button className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]">
                  <IoIosArrowBack className="text-xl" />
                </button>
              </Link>
              <div className="flex justify-center mt-[-1.7rem]">
                <h1 className="text-[18px] text-white font-bold">
                  Pendapatan Saya
                </h1>
              </div>
              <div className="flex mt-[3rem] justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={userData?.profileImage}
                    className="h-[3rem] w-[3rem] rounded-full bg-white"
                  />
                  <span>
                    <h1 className="text-[14px] font-bold text-white mt-2">
                      {userData.UserFullName}
                    </h1>
                    <p className="text-white/50 text-[12px]">
                      Pengelola {transactionData[0]?.TicketName}
                    </p>
                  </span>
                </div>
                <div
                  onClick={toggleScanning}
                  className="bg-white w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center cursor-pointer"
                >
                  <AiOutlineScan className="text-xl" />
                </div>
              </div>
              <div className="relative mt-[10rem]">
                {scannedData && (
                  <p className="mt-4 text-green-500">
                    Data QR Code: {scannedData.transactionId}
                  </p>
                )}
              </div>
            </section>
          )}

          <section className="bg-white p-5 mt-[-6rem] rounded-2xl mx-5 drop-shadow-md">
            <h1 className="font-bold text-[14px] text-black/40">
              PENDAPATAN SAYA
            </h1>
            <h1 className="font-bold mt-3 text-[22px]">RP 1.050.000</h1>
            <button className="bg-[#F09024] mt-5 w-full text-white text-[14px] px-7 py-4 rounded-full">
              Tarik Pendapatan
            </button>
          </section>

          <section className="p-5 bg-[#f1f0f0] mt-5">
            <h1>Status Pemesanan</h1>
            <div className="flex mt-5 gap-3">
              <div className="bg-[#274753] w-full py-6 rounded-2xl text-center">
                <h1 className="font-bold text-[18px] text-white">
                  {transactionCounts?.paid}
                </h1>
                <p className="text-[10px] text-white mt-3">Dibayar</p>
              </div>
              <div className="bg-[#3699FF] w-full py-6 rounded-2xl text-center">
                <h1 className="font-bold text-[18px] text-white">
                  {transactionCounts?.onGoing}
                </h1>
                <p className="text-[10px] text-white mt-3">Sedang Berlangung</p>
              </div>
              <div className="bg-[#4CAF50] w-full py-6 rounded-2xl text-center">
                <h1 className="font-bold text-[18px] text-white">
                  {transactionCounts?.done}
                </h1>
                <p className="text-[10px] text-white mt-3">Selesai</p>
              </div>
            </div>
          </section>

          <section className="">
            <span className="flex justify-between items-center mt-5 px-5">
              <h1 className="text-[16px] text-black">Transaksi Terakhir</h1>
              <p className="text-[12px] text-[#F09024]">Lihat Semua</p>
            </span>

            {transactionData
              .filter(
                (item) =>
                  item.TransactionStatus !== "unpaid" &&
                  item.TransactionStatus !== "pending"
              )
              .sort((a, b) => {
                const dateA = a.TransactionDate
                  ? new Date(a.TransactionDate)
                  : new Date(a.CreatedAt);
                const dateB = b.TransactionDate
                  ? new Date(b.TransactionDate)
                  : new Date(b.CreatedAt);
                return dateB - dateA; // Urutkan dari yang terbaru
              })
              .slice(0, 10)
              .map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mt-5 px-5">
                    <span>
                      <h2 className="text-[14px]">{item?.TransactionId}</h2>
                      <p className="text-[14px] text-black/60">
                        {item?.HikingAmount} Tiket
                      </p>
                    </span>
                    <span className="text-right">
                      <h2 className="text-[14px]">
                        Rp {item.TotalPrice?.toLocaleString("id-ID")}
                      </h2>
                      <p className="text-[14px] text-black/60">
                        {formatIndonesianTimeAuto(item.TransactionDate, "date")}
                      </p>
                    </span>
                  </div>
                  <hr className="mt-2" />
                </div>
              ))}
          </section>
        </div>
      )}
    </main>
  );
}
