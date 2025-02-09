import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function FormDataPendaki(props) {
  const showForm = (e) => {
    e.preventDefault();
    props.showForm(false);
  };

  const [hikingPerson, setHikingPerson] = useState({
    UserId: props.userId,
    TransactionId: props.transactionId,
    HikingPersonFullName: props.hikingDataEdit?.HikingPersonFullName || "",
    HikingPersonKTP: props.hikingDataEdit?.HikingPersonKTP || "",
    HikingPersonPhone: props.hikingDataEdit?.HikingPersonPhone || "",
    HikingPersonPhoneEmergency1: props.hikingDataEdit?.HikingPersonPhoneEmergency1 || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHikingPerson((prevTicketData) => ({
      ...prevTicketData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitForm(hikingPerson);
  };

  return (
    <div className="p-5">
      <section>
        <button
          onClick={showForm}
          className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
        >
          <IoIosArrowBack className="text-xl" />
        </button>
        <div className="flex justify-center mt-[-1.7rem]">
          <h1 className="text-[18px] font-bold">Isi Data Pendaki 1</h1>
        </div>
      </section>

      <section>
        <div className="mt-7">
          <h3 className="bg-white w-[6.8rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[12px]">
            Nama Lengkap
          </h3>
          <input
            placeholder="Masukkan nama lengkap"
            type="text"
            name="HikingPersonFullName"
            onChange={handleInputChange}
            value={hikingPerson.HikingPersonFullName}
            className="w-[100%] border border-black/10 p-[0.85rem] rounded-lg text-[14px]"
          />
        </div>

        <div className="mt-3">
          <h3 className="bg-white w-[3.8rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[12px]">
            No KTP
          </h3>
          <input
            placeholder="Masukkan no KTP"
            type="text"
            name="HikingPersonKTP"
            onChange={handleInputChange}
            value={hikingPerson.HikingPersonKTP}
            className="w-[100%] border border-black/10 p-[0.85rem] rounded-lg text-[14px]"
          />
        </div>

        <div className="mt-3">
          <h3 className="bg-white w-[7rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[12px]">
            No. Handphone
          </h3>
          <input
            placeholder="Masukkan no handphone (62878xxxxx)"
            type="text"
            name="HikingPersonPhone"
            onChange={handleInputChange}
            value={hikingPerson.HikingPersonPhone}
            className="w-[100%] border border-black/10 p-[0.85rem] rounded-lg text-[14px]"
          />
        </div>

        <div className="mt-3">
          <h3 className="bg-white max-w-[20rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[12px]">
            No. Handphone Darurat{" "}
            <span className="text-[10px]">*Keluarga atau Orang Terdekat</span>
          </h3>
          <input
            placeholder="Masukkan no handphone darurat (62878xxxxx)"
            type="text"
            name="HikingPersonPhoneEmergency1"
            onChange={handleInputChange}
            value={hikingPerson.HikingPersonPhoneEmergency1}
            className="w-[100%] border border-black/10 p-[0.85rem] rounded-lg text-[14px]"
          />
        </div>

        <div className="mt-3">
          <button
            onClick={handleSubmit}
            className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]"
          >
            Simpan
          </button>
        </div>
      </section>
    </div>
  );
}
