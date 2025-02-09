import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ellipse from "@/public/ellipse-buyticket.png";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import gunung1 from "@/public/gunung1.png";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import jwt from "jsonwebtoken";
import LoadingFull from "@/components/Loading/LoadingFull";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BuyTicket() {
  const router = useRouter();
  const { ticketId } = router.query;
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ticketApiData, setTicketApiData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const today = new Date();
  const [ticketData, setTicketData] = useState({
    UserId: "",
    TicketId: "",
    EntryPost: "",
    ExitPost: "",
    EntryDate: "",
    ExitDate: "",
    HikingAmount: null,
    TransactionStatus: "pending",
  });

  useEffect(() => {
    const token = localStorage.getItem("HikingBuddyToken"); // Sesuaikan nama token jika perlu
    if (!token) {
      // Jika token tidak ada, arahkan ke halaman login
      router.push("/login");
    } else {
      const decoded = jwt.decode(token);
      setUserId(decoded.result[0].UserId);
      setIsAuthenticated(true);
    }
  }, [router]);
  

  // console.log(getUserIdFromToken());
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevTicketData) => ({
      ...prevTicketData,
      UserId: userId,
      TicketId: ticketId,
      [name]: value,
    }));
  };

  useEffect(() => {
    const allFieldsFilled =
      ticketData.UserId.trim() !== "" &&
      ticketData.TicketId.trim() !== "" &&
      ticketData.EntryPost.trim() !== "" &&
      ticketData.ExitPost.trim() !== "" &&
      ticketData.EntryDate.trim() !== "" &&
      ticketData.ExitDate.trim() !== "" &&
      ticketData.HikingAmount !== "" &&
      ticketData.HikingAmount !== null &&
      ticketData.TransactionStatus.trim() !== "";

    setIsButtonEnabled(allFieldsFilled);
  }, [ticketData]);

  useEffect(() => {
    setLoading(true);
    if (ticketId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-detail-ticket?TicketId=${ticketId}`
        )
        .then((response) => {
          setTicketApiData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
          setLoading(false);
        });
    }
  }, [ticketId]);

  const handleNextButton = async () => {
    try {
      // Mengirim data ke backend menggunakan Axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/insert-transaction-ticket`,
        ticketData
      );

      console.log(response.data);

      if (response.status === 200) {
        router.push(`/ticket/${response.data.transactionId}/info`);
      } else {
        console.error("Gagal menambahkan tiket!");
      }
    } catch (error) {
      console.error("Error inserting ticket:", error);
      // setMessage("Terjadi kesalahan saat menambahkan tiket.");
    }
  };
  

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };
  return (
    <main className="font-poppins flex justify-center bg-[#F1F2F4] h-full">
      {loading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px]">
          <img
            className="absolute w-full max-w-[440px] top-[-1rem]"
            src={ellipse.src}
          />
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

            <div className="flex justify-end mt-8 items-center gap-2 relative left-5">
              <div className="flex items-center gap-1">
                <span className="bg-white text-xs w-[20px] h-[20px] rounded-full flex justify-center items-center">
                  1
                </span>
                <p className="text-[12px] text-white">Pesan</p>
              </div>
              <hr className="w-7" />
              <div className="flex items-center gap-1 opacity-60">
                <span className="border border-white text-white text-xs w-[20px] h-[20px] rounded-full flex justify-center items-center">
                  2
                </span>
                <p className="text-[12px] text-white">Isi Data</p>
              </div>
              <hr className="w-7 opacity-40" />
              <span className="opacity-20 border border-white text-white text-xs w-[20px] h-[20px] rounded-full flex justify-center items-center">
                3
              </span>
            </div>

            <div className="w-full bg-white p-5 rounded-xl mt-8">
              <div className="relative">
                <div>
                  <img
                    className="rounded-xl w-full h-[12rem]"
                    src={gunung1.src}
                  />
                  <div className="bg-white p-3 py-2 absolute top-[5.8rem] max-w-[20rem] left-[-0.5rem] m-5 rounded-2xl">
                    <h1 className="text-[14px] font-semibold">
                      {ticketApiData.averageScore[0].TicketName}
                    </h1>
                    <span className="flex items-center gap-1 mt-1">
                      <FiMapPin className="text-sm" />
                      <p className="text-[10px] text-[#274753] font-bold w-full">
                        {ticketApiData.averageScore[0].TicketCity},{" "}
                        {ticketApiData.averageScore[0].TicketProvince}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <div className=" mt-5">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[12px] text-black/60">
                    Pos Perizinan Masuk
                  </h5>
                  <span>
                    <select
                      id="EntryPost"
                      name="EntryPost"
                      value={ticketData.EntryPost}
                      onChange={handleInputChange}
                      className="text-[14px]"
                    >
                      <option disabled value="">
                        Pilih Pos Masuk
                      </option>
                      {ticketApiData.basecamp.map((basecamp, index) => (
                        <option key={index} value={basecamp.BasecampName}>
                          {basecamp.BasecampName}
                        </option>
                      ))}
                    </select>
                  </span>
                  <hr />
                </div>
                <div className="flex flex-col gap-1 mt-5">
                  <h5 className="text-[12px] text-black/60">
                    Pos Perizinan Keluar
                  </h5>
                  <span>
                    <select
                      id="ExitPost"
                      name="ExitPost"
                      value={ticketData.ExitPost}
                      onChange={handleInputChange}
                      className="text-[14px]"
                      minDate={
                        ticketData.EntryDate
                          ? new Date(ticketData.EntryDate)
                          : today
                      }
                    >
                      <option disabled value="">
                        Pilih Pos Keluar
                      </option>
                      {ticketApiData.basecamp.map((basecamp, index) => (
                        <option key={index} value={basecamp.BasecampName}>
                          {basecamp.BasecampName}
                        </option>
                      ))}
                    </select>
                  </span>
                  <hr />
                </div>
                <div className="flex flex-col gap-1 mt-5">
                  <h5 className="text-[12px] text-black/60">Tanggal Masuk</h5>
                  <span>
                    <DatePicker
                      id="EntryDate"
                      name="EntryDate"
                      selected={
                        ticketData.EntryDate
                          ? new Date(ticketData.EntryDate)
                          : null
                      } // Pastikan tanggal yang ada sudah dalam format Date
                      onChange={(date) =>
                        setTicketData((prevTicketData) => ({
                          ...prevTicketData,
                          EntryDate:  new Date(date.setHours(20, 0, 0, 0)).toISOString().split("T")[0], // Mengonversi kembali menjadi format YYYY-MM-DD
                        }))
                      }
                      className="text-[14px] outline-none w-[10rem] p-2 border rounded"
                      dateFormat="yyyy-MM-dd"
                      placeholderText="YYYY-MM-DD"
                      autoComplete="off"
                      minDate={today}
                    />
                  </span>
                  <hr />
                </div>
                <div className="flex flex-col gap-1 mt-5">
                  <h5 className="text-[12px] text-black/60">Tanggal Keluar</h5>
                  <span>
                    <DatePicker
                      id="ExitDate"
                      name="ExitDate"
                      selected={
                        ticketData.ExitDate
                          ? new Date(ticketData.ExitDate)
                          : null
                      } // Pastikan tanggal yang ada sudah dalam format Date // Pastikan tanggal yang ada sudah dalam format Date
                      onChange={(date) =>
                        setTicketData((prevTicketData) => ({
                          ...prevTicketData,
                          ExitDate: new Date(date.setHours(20, 0, 0, 0))
                            .toISOString()
                            .split("T")[0], // Mengatur waktu ke 00:00 agar tidak terpengaruh zona waktu
                        }))
                      }
                      className="text-[14px] outline-none w-[10rem] p-2 border rounded"
                      dateFormat="yyyy-MM-dd"
                      autoComplete="off"
                      minDate={
                        ticketData.EntryDate
                          ? new Date(ticketData.EntryDate + 'T20:00:00Z')
                          : today
                      }
                      placeholderText="YYYY-MM-DD"
                    />
                  </span>
                  <hr />
                </div>
                <div className="flex flex-col gap-1 mt-5">
                  <h5 className="text-[12px] text-black/60">Jumlah Pendaki</h5>
                  <span>
                    <span className="flex items-center">
                      <input
                        type="number"
                        id="HikingAmount"
                        name="HikingAmount"
                        // value={ticketData.HikingAmount}
                        onChange={handleInputChange}
                        placeholder="Jumlah Orang"
                        min="1"
                        max="8"
                        className="text-[12px] w-full px-1 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {/* <p className="text-[14px]">Orang</p> */}
                    </span>
                  </span>
                  <hr />
                  <p className="text-[10px] text-red-500 text-right mt-1">
                    * 1 kali transaksi maksimal 8 orang
                  </p>
                </div>
              </div>

              {isButtonEnabled ? (
                <button
                  onClick={handleNextButton}
                  className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]"
                >
                  Selanjutnya
                </button>
              ) : (
                <button
                  onClick={handleNextButton}
                  className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024] opacity-50"
                  disabled={!isButtonEnabled}
                >
                  Selanjutnya
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
