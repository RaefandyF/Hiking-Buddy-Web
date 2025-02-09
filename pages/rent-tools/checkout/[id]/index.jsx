import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ellipse from "@/public/ellipse-buyticket.png";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";

export default function CheckoutRentTools() {
  const router = useRouter();
  const { id } = router.query;
  const [rentalDay, setRentalDay] = useState(1);
  const [toolAmount, setToolAmount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState(null);
  const [toolData, setToolData] = useState(null);
  const [taxAndFee, setTaxAndFee] = useState(0);
  const [toolPrice, setToolPrice] = useState(0);
  const [totalPriceWithoutTax, setTotalPriceWithoutTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketData, setTicketData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userChecked, setUserChecked] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [updateTransaction, setUpdateTransaction] = useState({
    ExitDate: "",
    RentDay: null,
    ToolAmount: null,
    PersonName: "",
    PersonPhone: "",
    Note: "",
    TotalPrice: null,
    TransactionStatus: "unpaid",
  });

  useEffect(() => {
    const allFieldsFilled =
      updateTransaction.ExitDate.trim() !== "" &&
      updateTransaction.RentDay !== null &&
      updateTransaction.ToolAmount !== null &&
      updateTransaction.PersonName.trim() !== "" &&
      updateTransaction.PersonPhone.trim() !== "";
    updateTransaction.TotalPrice !== null;
    setIsButtonEnabled(allFieldsFilled);
  }, [updateTransaction]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateTransaction((prevUpdateTransaction) => ({
      ...prevUpdateTransaction,
      [name]: value,
    }));
  };

  function calculateExitDate(entryDate, rentalDay) {
    const entryDateObj = new Date(entryDate); // Konversi string ISO menjadi objek Date
    entryDateObj.setDate(entryDateObj.getDate() + rentalDay + 1); // Tambahkan hari
    const exitDate = entryDateObj.toISOString(); // Kembalikan ke format ISO
    return exitDate;
  }

  useEffect(() => {
    setTaxAndFee(toolPrice * rentalDay * toolAmount * 0.11);
    setTotalPrice(
      toolPrice * toolAmount * rentalDay +
        toolPrice * rentalDay * toolAmount * 0.11
    );
    setTotalPriceWithoutTax(toolPrice * toolAmount * rentalDay);

    setUpdateTransaction((prevUpdateTransaction) => ({
      ...prevUpdateTransaction,
      RentDay: rentalDay,
      ToolAmount: toolAmount,
      TotalPrice: totalPrice,
    }));

    if (transactionData) {
      setUpdateTransaction((prevUpdateTransaction) => ({
        ...prevUpdateTransaction,
        ExitDate: calculateExitDate(transactionData.EntryDate, rentalDay),
      }));
    }
  }, [toolPrice, toolAmount, rentalDay, taxAndFee]);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tools/transactions/${id}`
        )
        .then((response) => {
          setTransactionData(response.data.data);
          // setTaxAndFee(
          //   response.data.data.TicketPrice *
          //     response.data.data.HikingAmount *
          //     0.11
          // );
          // setTotalPrice(
          //   response.data.data.TicketPrice * response.data.data.HikingAmount +
          //     +response.data.data.TicketPrice *
          //       response.data.data.HikingAmount *
          //       0.11 +
          //     5000 * response.data.data.HikingAmount
          // );
          axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tools/get-detail-tools?ToolId=${response.data.data.ToolId}`
            )
            .then((response) => {
              setToolData(response.data);
              setToolPrice(response.data.tools[0].ToolPrice);
            })
            .catch((error) => {
              setLoading(false);
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
              setLoading(false);
              console.error("Error fetching ticket data:", error);
            });
          const token = localStorage.getItem("HikingBuddyToken");
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
              setUserData(response.data);
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error fetching user data:", error);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching transaction data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (transactionData && toolData && ticketData && userData) {
      setLoading(false);
    }
  }, [transactionData, toolData, ticketData, userData]);

  const handleNextButton = async () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tools/transactions/${id}`,
        updateTransaction
      )
      .then((response) => {
        if (response.status === 200) {
          router.push(`/rent-tools/checkout/${id}/payment`);
          // alert("Transaksi alat berhasil ditambahkan!");
        } else {
          console.error("Gagal menambahkan transaksi alat!");
        }
      })
      .catch((error) => {
        console.error("Error inserting tool transaction:", error);
        // setMessage("Terjadi kesalahan saat menambahkan tiket.");
      });
    console.log(updateTransaction);
  };

  const handleCheckBox = (e) => {
    setUserChecked(e.target.checked);
    setUpdateTransaction((prevUpdateTransaction) => ({
      ...prevUpdateTransaction,
      PersonName: e.target.checked
        ? userData.message.result[0]?.UserFullname
        : "",
      PersonPhone: e.target.checked
        ? userData.message.result[0]?.UserPhone
        : "",
    }));
    console.log(updateTransaction);
  };

  function formatDate(dateString) {
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

  return (
    <main className="font-poppins flex justify-center bg-[#F1F2F4] h-full">
      {loading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px]">
          <img
            className="absolute w-full top-[-1rem] max-w-[440px]"
            src={ellipse.src}
          />
          <section className="relative z-50 p-5">
            <div className="">
              <button
                onClick={goBack}
                className="flex justify-between items-center p-2 rounded-full bg-white"
              >
                <IoIosArrowBack className="text-xl" />
              </button>
            </div>
            <div className="text-center mt-[-1.9rem] text-[18px] font-bold">
              <h1 className="text-white">Pemesanan</h1>
            </div>
            <div className="w-full bg-white py-5 rounded-xl mt-8">
              <div className="flex gap-2 px-5">
                <img
                  className="w-[5rem] h-[5rem]"
                  src={toolData?.imgDetail[0]}
                />
                <div className="w-full">
                  <h1 className="text-[14px] font-bold">
                    {toolData.tools[0].ToolName}
                  </h1>
                  <p className="text-[12px] text-black/50">Sewa Harian</p>
                  <span className="flex justify-between mt-4 items-center">
                    <h2 className="text-[18px] font-bold">
                      Rp {toolPrice.toLocaleString("id-ID")}
                    </h2>
                    <span className="flex items-center justify-between gap-5">
                      <button
                        onClick={() =>
                          toolAmount > 1 && setToolAmount(toolAmount - 1)
                        }
                        className="bg-[#F09024] rounded-full px-[0.38rem] py-[0.045rem] text-white text-[12px]"
                      >
                        -
                      </button>
                      <p className="text-[14px] text-black/50 w-[3.3rem] text-center">
                        {toolAmount} pcs
                      </p>
                      <button
                        onClick={() => setToolAmount(toolAmount + 1)}
                        className="bg-[#F09024] rounded-full px-[0.3rem] py-[0.04rem] text-white text-[12px]"
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              <hr className="my-4" />
              <div className="px-5">
                <h1 className="text-[14px] font-bold">
                  {ticketData.averageScore[0]?.TicketName} -{" "}
                  {ticketData.averageScore[0]?.TicketProvince}
                </h1>
                <span className="flex gap-10 mt-3">
                  <p className="text-[12px]">Tanggal Pengambilan</p>
                  <p className="text-[12px]">
                    {formatDate(transactionData?.EntryDate)}
                  </p>
                </span>
                <span className="flex gap-[3.35rem] mt-2">
                  <p className="text-[12px]">Pos Perizinan Masuk</p>
                  <p className="text-[12px]">{transactionData?.EntryPost}</p>
                </span>
                <span className="flex gap-[3.35rem] mt-2">
                  <p className="text-[12px]">Pos Perizinan Keluar</p>
                  <p className="text-[12px]">{transactionData?.ExitPost}</p>
                </span>
              </div>
            </div>

            <div className="mt-5">
              <div>
                <label className="text-[14px]">Nama Penyewa</label>
                <input
                  disabled={userChecked}
                  name="PersonName"
                  onChange={handleInputChange}
                  value={updateTransaction.PersonName}
                  className="w-full border text-[14px] rounded-lg p-2 pl-4 mt-2"
                  type="text"
                  placeholder="Nama Pendaki"
                />
              </div>
              <div className="mt-4">
                <label className="text-[14px]">No Telepon</label>
                <input
                  disabled={userChecked}
                  name="PersonPhone"
                  onChange={handleInputChange}
                  value={updateTransaction.PersonPhone}
                  className="w-full border text-[14px] rounded-lg p-2 pl-4 mt-2"
                  type="text"
                  placeholder="08123456xxxx"
                />
              </div>
              <div className="flex gap-2 items-center mt-4">
                <input onClick={handleCheckBox} type="checkbox" />
                <label className="text-[12px] text-black/60">
                  Isi dengan data login user
                </label>
              </div>
              <div className="mt-4">
                <label className="text-[14px]">Lama Sewa</label>
                <div className="flex justify-between items-center mt-3 py-3 px-4 border-[1.5px] border-black/20 rounded-xl">
                  <button
                    onClick={() => rentalDay > 1 && setRentalDay(rentalDay - 1)}
                    className="bg-[#F09024] rounded-full px-[0.74rem] py-1 text-white text-[16px]"
                  >
                    -
                  </button>
                  <p className="text-[14px]">{rentalDay} Hari</p>
                  <button
                    onClick={() => setRentalDay(rentalDay + 1)}
                    className="bg-[#F09024] rounded-full px-[0.74rem] py-[0.28rem] text-white text-[16px]"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <h3 className="text-[14px]">Catatan:</h3>
                <input
                  name="Note"
                  onChange={handleInputChange}
                  value={updateTransaction.Note}
                  className="bg-[#F1F2F4] border-none text-right text-[14px] pl-2 w-full outline-none"
                  placeholder="Tuliskan Pesan.."
                  type="text"
                />
              </div>
              <div className="py-5 bg-white rounded-2xl mt-4">
                <h3 className="text-[14px] font-bold px-5">Rincian Harga</h3>
                <div className="mt-3 flex flex-col gap-2 px-5">
                  <span className="flex justify-between items-center">
                    <p className="text-[12px]">
                      ({rentalDay} hari) Sewa {toolAmount} pcs{" "}
                      {toolData.tools[0].ToolName}
                    </p>
                    <p className="text-[12px] text-black/50 text-left">
                      Rp {totalPriceWithoutTax.toLocaleString("id-ID")}
                    </p>
                  </span>
                  <span className="flex justify-between items-center">
                    <p className="text-[12px]">Pajak (11%)</p>
                    <p className="text-[12px] text-black/50 text-left">
                      Rp {taxAndFee.toLocaleString("id-ID")}
                    </p>
                  </span>
                </div>
                <hr className="my-4" />
                <div className="px-5 flex justify-between">
                  <p className="text-[12px] font-bold">Total</p>
                  <p className="text-[12px] font-bold">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
            {isButtonEnabled ? (
              <button
                onClick={handleNextButton}
                className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]"
              >
                Lanjutkan Pembayaran
              </button>
            ) : (
              <button
                disabled
                className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]/50"
              >
                Lanjutkan Pembayaran
              </button>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
