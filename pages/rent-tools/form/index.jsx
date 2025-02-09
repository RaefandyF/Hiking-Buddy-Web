import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ellipse from "@/public/ellipse-buyticket.png";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Select from "react-select";
import { FaExclamationCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormRentTools() {
  const router = useRouter();
  const [basecampData, setBasecampData] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingBasecamp, setLoadingBasecamp] = useState(false);
  const [options, setOptions] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [formData, setFormData] = useState({
    ticketId: "",
    ticketName: "",
    entryPost: "",
    exitPost: "",
    rentDate: "",
  });
  console.log(formData);
  useEffect(() => {
    const allFieldsFilled =
      formData.ticketId.trim() !== "" &&
      formData.ticketName.trim() !== "" &&
      formData.entryPost.trim() !== "" &&
      formData.exitPost.trim() !== "" &&
      formData.rentDate.trim() !== "";
    setIsButtonEnabled(allFieldsFilled);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevTicketData) => ({
      ...prevTicketData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-list-ticket`)
      .then((res) => {
        const mappedOptions = res.data.data.map((item) => ({
          value: item.TicketId,
          label: item.TicketName,
        }));
        setOptions(mappedOptions);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleNextButton = () => {
    router.push({
      pathname: `/rent-tools/mountain/${formData.ticketId}`,
      query: formData,
    });
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  const handleChange = (selectedOption) => {
    setLoadingBasecamp(true);
    setFormData((prevTicketData) => ({
      ...prevTicketData,
      ticketId: selectedOption.value,
      ticketName: selectedOption.label,
    }));
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-detail-ticket?TicketId=${selectedOption.value}`
      )
      .then((res) => {
        setBasecampData(res.data.basecamp);
        setLoadingBasecamp(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingBasecamp(false);
      });
  };

  return (
    <main className="font-poppins flex justify-center bg-[#F1F2F4] h-screen">
      {loading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px]">
          <img className="absolute w-full top-[-1rem]" src={ellipse.src} />
          <section className="relative z-50 p-5">
            <div className="flex justify-between">
              <button
                onClick={goBack}
                className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
              >
                <IoIosArrowBack className="text-xl" />
              </button>
              <div className="flex justify-center mt-1">
                <h1 className="text-[18px] text-white font-bold">Sewa Alat</h1>
              </div>
              <button
                onClick={goBack}
                className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
              >
                <span className="absolute bg-[#F09024] text-white right-5 top-5 rounded-full w-4 h-3 items-center text-[8px]">
                  2
                </span>
                <FaShoppingCart className="text-xl" />
              </button>
            </div>
            <div className="w-full bg-white p-5 rounded-xl mt-8">
              <div className="">
                <div className="flex flex-col gap-1">
                  <h5 className="text-[12px] text-black/60">Lokasi Gunung</h5>
                  <span>
                    <Select
                      options={options}
                      onChange={handleChange}
                      placeholder="Pilih Gunung"
                      className="text-[14px]"
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-5">
                  <h5 className="text-[12px] text-black/60">
                    Pos Perizinan Masuk
                  </h5>
                  <span>
                    <select
                      className="text-[14px]"
                      id="entryPost"
                      name="entryPost"
                      onChange={handleInputChange}
                      value={formData.entryPost}
                    >
                      <option disabled value="">
                        Pilih Pos Masuk
                      </option>
                      {!loadingBasecamp &&
                        basecampData?.map((item, index) => (
                          <option key={index} value={item.BasecampName}>
                            {item.BasecampName}
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
                      className="text-[14px]"
                      id="exitPost"
                      name="exitPost"
                      onChange={handleInputChange}
                      value={formData.exitPost}
                    >
                      <option disabled value="">
                        Pilih Pos Keluar
                      </option>
                      {!loadingBasecamp &&
                        basecampData?.map((item, index) => (
                          <option key={index} value={item.BasecampName}>
                            {item.BasecampName}
                          </option>
                        ))}
                    </select>
                  </span>
                  <hr />
                </div>
                <div className="flex flex-col gap-1 mt-5">
                  <h5 className="text-[12px] text-black/60">
                    Tanggal Penyewaan
                  </h5>
                  <span>
                    <DatePicker
                      id="rentDate"
                      name="rentDate"
                      selected={
                        formData.rentDate ? new Date(formData.rentDate) : null
                      } // Pastikan tanggal yang ada sudah dalam format Date
                      onChange={(date) =>
                        setFormData((prevTicketData) => ({
                          ...prevTicketData,
                          rentDate: new Date(date.setHours(20, 0, 0, 0))
                            .toISOString()
                            .split("T")[0], // Mengonversi kembali menjadi format YYYY-MM-DD
                        }))
                      }
                      className="text-[14px] outline-none w-[10rem] p-2 border rounded"
                      dateFormat="yyyy-MM-dd"
                      placeholderText="YYYY-MM-DD"
                      autoComplete="off"
                      minDate={new Date()}
                    />
                  </span>
                  <hr />
                </div>
                <div className="flex items-center px-2 gap-4 bg-[#FFF2E5] border-[1px] border-[#F09024] py-2 rounded-xl mt-6 my-4">
                  <FaExclamationCircle className="text-[2.2rem] text-[#F09024]" />
                  <p className="text-[10px]">
                    Barang yang disewa oleh pendaki diwajibkan di jaga dengan
                    baik, kerusakan merupakan tanggung jawab pendaki.
                  </p>
                </div>
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
                disabled
                className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]/50"
              >
                Selanjutnya
              </button>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
