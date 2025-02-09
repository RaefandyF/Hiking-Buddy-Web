import React from "react";
import Select from "react-select";

export default function Wishlist(props) {
  const options = [
    { value: "Artikel", label: "Artikel" },
    { value: "Sewa Alat", label: "Sewa Alat" },
    { value: "Thread", label: "Thread" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      height: "2.3rem", // Contoh tinggi (sesuai Tailwind h-12)
      minHeight: "2.3rem",
      borderRadius: "0.6rem",
    }),
  };
  const handleTransactionToogle = (e) => {
    props.transactionToogle();
  };

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };

  return (
    <div>
      <section className="py-5">
        <div className="flex justify-center px-5">
          <span
            onClick={handleTransactionToogle}
            className="bg-[#F9F9F9] text-[12px] p-2 rounded-full w-[16rem] text-center text-black/40"
          >
            Riwayat Transaksi
          </span>
          <span className="bg-[#F09024] text-[12px] p-2 rounded-full w-[15rem] z-10 ml-[-1rem] text-center text-white">
            Yang di Simpan
          </span>
        </div>
        <div className="px-5 mt-3">
          <Select
            options={options}
            onChange={handleChange}
            styles={customStyles}
            placeholder="Pilih Kategori Yang Di simpan"
            className="text-[10px]"
          />
        </div>
      </section>
    </div>
  );
}
