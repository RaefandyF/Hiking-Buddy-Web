import React, { useEffect, useState } from "react";
import ellipse from "@/public/ellipse-buyticket.png";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import alat1 from "@/public/alat1.png";
import { FaStar } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import FormDataPendaki from "@/components/Form/FormDataPendaki";
import { FaExclamationCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import { format, set } from "date-fns";
import { id } from "date-fns/locale";
import LoadingFull from "@/components/Loading/LoadingFull";

export default function Info() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const { transactionId } = router.query;
  const [transactionData, setTransactionData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [taxAndFee, setTaxAndFee] = useState(0);
  const [Appfee, setAppFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hikingPersonsData, setHikingPersonsData] = useState([]);
  const [changeData, setChangeData] = useState(false);
  const [hikingDataEdit, setHikingDataEdit] = useState();

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  useEffect(() => {
    if (transactionId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/${transactionId}`
        )
        .then((response) => {
          setTransactionData(response.data.data);
          setTaxAndFee(
            response.data.data.TicketPrice *
              response.data.data.HikingAmount *
              0.11
          );
          setAppFee(5000 * response.data.data.HikingAmount);
          setTotalPrice(
            response.data.data.TicketPrice * response.data.data.HikingAmount +
              +response.data.data.TicketPrice *
                response.data.data.HikingAmount *
                0.11 +
              5000 * response.data.data.HikingAmount
          );
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
        });
    }
  }, [transactionId]);

  useEffect(() => {
    setIsLoading(true);
    if (transactionData) {
      axios
        .get(
          `https://app.hikingbuddy.my.id/api/v3/tickets/hiking-persons/${transactionId}`
        )
        .then((response) => {
          setHikingPersonsData(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
          setIsLoading(false);
        });
    }
  }, [transactionData, changeData]);

  const handleSubmit = async (value) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/insert-hiking-person`,
        value
      );

      if (response.status === 200) {
        setShowForm(false);
        setChangeData(!changeData);
      } else {
        console.error("Gagal menambahkan hiking person!");
      }
    } catch (error) {
      console.error("Error inserting hiking person:", error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const indonesiaTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    );
    indonesiaTime.setHours(indonesiaTime.getHours() + 7);
    const createdAt = indonesiaTime.toISOString().slice(0, 19);
    console.log(createdAt);

    try {
      const updatedData = {
        TotalPrice: totalPrice,
        TransactionStatus: "unpaid",
        CreatedAt: createdAt,
      };

      // Send the request to update the transaction
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/${transactionId}`,
        updatedData
      );

      if (response.status === 200) {
        router.push(`/ticket/${transactionId}/payment`);
      } else {
        alert("Failed to update the transaction.");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("There was an error updating the transaction.");
    }
  };

  const handleClickDetail = async (value) => {
    await setHikingDataEdit(value);
    setShowForm(true);
  };

  function formatDate(date) {
    return format(new Date(date), "EEEE, dd MMMM yyyy", {
      locale: id,
    });
  }

  const closeForm = (value) => {
    setShowForm(value);
  };

  const openForm = async () => {
    await setHikingDataEdit(null);
    setShowForm(true);
  };

  return (
    <main className="font-poppins flex justify-center">
      {!isLoading ? (
        <>
          {showForm ? (
            <div className="w-full max-w-[440px]">
              <FormDataPendaki
                showForm={closeForm}
                transactionId={transactionId}
                userId={transactionData.UserId}
                submitForm={handleSubmit}
                hikingDataEdit={hikingDataEdit}
              />
            </div>
          ) : (
            <div className="w-full max-w-[440px] bg-[#F1F2F4] h-full">
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
                  <h1 className="text-[18px] text-white font-bold">
                    Masukkan Info Pendaki
                  </h1>
                </div>

                <div className="flex justify-end mt-8 items-center gap-2 relative right-5">
                  <div className="flex items-center gap-1 opacity-30">
                    <span className="text-white border border-white text-xs w-[20px] h-[20px] rounded-full flex justify-center items-center">
                      1
                    </span>
                    <p className="text-[12px] text-white">Pesan</p>
                  </div>
                  <hr className="w-7" />
                  <div className="flex items-center gap-1">
                    <span className="bg-white border border-white text-xs w-[20px] h-[20px] rounded-full flex justify-center items-center">
                      2
                    </span>
                    <p className="text-[12px] text-white w-[2.8rem]">
                      Isi Data
                    </p>
                  </div>
                  <hr className="w-7 opacity-40" />
                  <div className="flex items-center gap-1 opacity-50">
                    <span className="border border-white text-white text-xs w-[20px] h-[20px] rounded-full flex justify-center items-center">
                      3
                    </span>
                    <p className="text-[12px] text-white">Pembayaran</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl mt-8 py-5 shadow-lg">
                  <div className="px-5 pb-5 pt-1">
                    <h1 className="text-[14px] font-bold flex gap-2">
                      <FaMountainSun className="items-center text-lg text-[#274753]" />{" "}
                      {transactionData?.TicketName} -{" "}
                      {transactionData?.TicketCity}
                    </h1>
                    <span className="flex gap-12 mt-3">
                      <p className="text-[12px]">Tanggal Masuk</p>
                      <p className="text-[12px]">
                        {formatDate(transactionData?.EntryDate)}
                      </p>
                    </span>
                    <span className="flex gap-12 mt-2">
                      <p className="text-[12px]">Tanggal Keluar</p>
                      <p className="text-[12px]">
                        {formatDate(transactionData?.ExitDate)}
                      </p>
                    </span>
                    <span className="flex gap-5 mt-2">
                      <p className="text-[12px]">Pos Perizinan Masuk</p>
                      <p className="text-[12px]">
                        {transactionData?.EntryPost}
                      </p>
                    </span>
                    <span className="flex gap-5 mt-2">
                      <p className="text-[12px]">Pos Perizinan Keluar</p>
                      <p className="text-[12px]">{transactionData?.ExitPost}</p>
                    </span>
                  </div>
                  <hr />
                  <div className="p-5 flex flex-col gap-2">
                    <p className="text-[12px]">
                      ({transactionData?.HikingAmount}x) Tiket Masuk
                    </p>
                    <p className="text-[10px] text-black/50">
                      {transactionData?.HikingAmount} Orang Pendaki
                    </p>
                    <p className="text-[10px] text-black/50">
                      Tidak termasuk sewa porter
                    </p>
                  </div>
                  <hr />
                  <div className="px-5 pb-1 pt-5 flex flex-col gap-2">
                    <p className="text-[10px] text-[#F09024] flex items-center gap-2">
                      <FaCheck />
                      Tidak Bisa Refund
                    </p>
                    <p className="text-[10px] text-[#F09024] flex items-center gap-2">
                      <FaCheck />
                      Tidak Bisa Reschedule
                    </p>
                  </div>
                </div>
              </section>

              <section className="">
                <div className="px-5 mb-7">
                  <h1 className="text-[14px] font-bold">Data Pendaki</h1>
                  {!(
                    hikingPersonsData.length >= transactionData?.HikingAmount
                  ) && (
                    <div className="p-4 flex justify-between mt-3 bg-white rounded-xl items-center">
                      <p className="text-[12px]">Isi Data Pendaki</p>
                      <button
                        onClick={openForm}
                        className="text-[20px] w-[25px] h-[25px] rounded-full text-white flex justify-center items-center bg-[#274753]"
                      >
                        +
                      </button>
                    </div>
                  )}
                  {hikingPersonsData.length !== 0 && (
                    <div className="rounded-xl bg-white p-3 py-5 pb-7 mt-3">
                      <h3 className="text-[12px]">Data Pendaki</h3>
                      {hikingPersonsData
                        ?.slice()
                        .reverse()
                        .map((hikingPerson, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-[#F5F5F5] px-4 py-3 rounded-xl mt-3"
                          >
                            <span>
                              <p className="text-[12px]">
                                {hikingPerson?.HikingPersonFullName}
                              </p>
                              <p className="text-[10px] text-black/60">
                                {hikingPerson?.HikingPersonKTP}
                              </p>
                            </span>
                            <button
                              onClick={() => handleClickDetail(hikingPerson)}
                              className="text-[10px] text-[#F09024] bg-[#FFF3E5] p-1 px-3 rounded-lg"
                            >
                              Lihat Detail
                            </button>
                          </div>
                        ))}

                      {/* <div className="flex items-center justify-between bg-[#F5F5F5] px-4 py-3 rounded-xl mt-3">
                      <span>
                        <p className="text-[12px]">Zaky Yusuf Pahlevi</p>
                        <p className="text-[10px] text-black/60">
                          1376123456780001
                        </p>
                      </span>
                      <button className="text-[10px] text-[#F09024] bg-[#FFF3E5] p-1 px-3 rounded-lg">
                        Lihat Detail
                      </button>
                    </div> */}
                    </div>
                  )}
                </div>

                {/* <div className="mt-5">
                  <div className="flex justify-between items-center text-[12px]">
                    <h1 className="text-[14px] font-bold px-5">
                      Add-on Sewa Alat (Optional)
                    </h1>
                    <p className="text-[#F09024] mr-5">Lihat Semua</p>
                  </div>

                  <div className="flex items-center px-5 gap-4 bg-[#D9D9D9] mx-5 py-2 rounded-xl my-2">
                    <FaExclamationCircle className="text-xl" />
                    <p className="text-[10px]">
                      Lokasi pengambilaan penyewaan alat disesuaikan dengan
                      lokasi sekitar pendakian
                    </p>
                  </div>

                  <div className="flex gap-6 overflow-x-scroll scrollbar-hide w-full px-5">
                    <div className="flex w-max gap-4 mb-5">
                      <div className="mt-3 flex flex-col gap-1 bg-white max-w-[10rem] rounded-xl shadow-lg">
                        <div className="bg-[#F4F5F7] w-[9.5rem] h-[6.8rem] rounded-xl m-1 flex items-center justify-center">
                          <img
                            src={alat1.src}
                            className="w-[8rem] h-[5.7rem]"
                          />
                        </div>
                        <div className="mx-2 flex flex-col gap-1">
                          <h3 className="text-[10px]">Trekking pole</h3>
                          <h1 className="text-[14px] font-bold">
                            Rp 50.000
                            <span className="text-[10px] font-normal">
                              /Perhari
                            </span>
                          </h1>
                          <p className="text-[10px] text-[#b6b1ac] mb-3 flex items-center gap-[2px]">
                            33 kali disewa |{" "}
                            <FaStar className="text-[#F09024] opacity-100" />
                            4.8
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col gap-1 bg-white max-w-[10rem] rounded-xl shadow-lg">
                        <div className="bg-[#F4F5F7] w-[9.5rem] h-[6.8rem] rounded-xl m-1 flex items-center justify-center">
                          <img
                            src={alat1.src}
                            className="w-[8rem] h-[5.7rem]"
                          />
                        </div>
                        <div className="mx-2 flex flex-col gap-1">
                          <h3 className="text-[10px]">Trekking pole</h3>
                          <h1 className="text-[14px] font-bold">
                            Rp 50.000
                            <span className="text-[10px] font-normal">
                              /Perhari
                            </span>
                          </h1>
                          <p className="text-[10px] text-[#b6b1ac] mb-3 flex items-center gap-[2px]">
                            33 kali disewa |{" "}
                            <FaStar className="text-[#F09024] opacity-100" />
                            4.8
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col gap-1 bg-white max-w-[10rem] rounded-xl shadow-lg">
                        <div className="bg-[#F4F5F7] w-[9.5rem] h-[6.8rem] rounded-xl m-1 flex items-center justify-center">
                          <img
                            src={alat1.src}
                            className="w-[8rem] h-[5.7rem]"
                          />
                        </div>
                        <div className="mx-2 flex flex-col gap-1">
                          <h3 className="text-[10px]">Trekking pole</h3>
                          <h1 className="text-[14px] font-bold">
                            Rp 50.000
                            <span className="text-[10px] font-normal">
                              /Perhari
                            </span>
                          </h1>
                          <p className="text-[10px] text-[#b6b1ac] mb-3 flex items-center gap-[2px]">
                            33 kali disewa |{" "}
                            <FaStar className="text-[#F09024] opacity-100" />
                            4.8
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="mt-5 mx-5 py-5 bg-white rounded-3xl">
                  <div className="flex flex-col gap-3 px-5 mb-3">
                    <h1 className="text-[14px]">Rincian Harga</h1>
                    <span className="flex justify-between">
                      <h3 className="text-[12px]">Harga Total</h3>
                      <h3 className="text-[12px] font-bold">
                        Rp {totalPrice.toLocaleString("id-ID")}
                      </h3>
                    </span>
                  </div>
                  <hr />
                  <div className="mt-3 text-[10px] px-5 flex flex-col gap-2">
                    <span className="opacity-60 flex justify-between">
                      <p>
                        ({transactionData.HikingAmount}x) Tiket Pendakian Gunung
                        Rinjani
                      </p>
                      <p>
                        Rp{" "}
                        {(
                          transactionData.TicketPrice *
                          transactionData.HikingAmount
                        ).toLocaleString("id-ID")}
                      </p>
                    </span>
                    {/* <span className="opacity-60 flex justify-between">
                      <p>(2 hari) Sewa Tracking Pole</p>
                      <p>Rp 70.000</p>
                    </span> */}
                    <span className="opacity-60 flex justify-between">
                      <p>Pajak (11%)</p>
                      <p>Rp {taxAndFee.toLocaleString("id-ID")}</p>
                    </span>
                    <span className="opacity-60 flex justify-between">
                      <p>Biaya Aplikasi (Rp 5.000 X Jumlah Orang)</p>
                      <p>Rp {Appfee.toLocaleString("id-ID")}</p>
                    </span>
                  </div>
                </div>

                <div className="px-5 mt-8 mb-10">
                  {!(
                    hikingPersonsData.length >= transactionData?.HikingAmount
                  ) ? (
                    <button
                      disabled
                      className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]/50"
                    >
                      Lanjut Pembayaran
                    </button>
                  ) : (
                    <button
                      onClick={handlePayment}
                      className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]"
                    >
                      Lanjut Pembayaran
                    </button>
                  )}
                </div>
              </section>
            </div>
          )}
        </>
      ) : (
        <LoadingFull />
      )}
    </main>
  );
}
