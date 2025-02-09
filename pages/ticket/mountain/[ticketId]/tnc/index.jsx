import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Tnc() {
  const router = useRouter();
  const { ticketId } = router.query;
  const [checked, setChecked] = useState(false);
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  const handleCheckBox = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px]">
        <button
          onClick={goBack}
          className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5] mt-5 ml-5"
        >
          <IoIosArrowBack className="text-xl" />
        </button>
        <section className="px-5 flex flex-col justify-center items-center">
          <h1 className="text-[18px] font-bold text-[#274753] text-center">
            ATURAN PENDAKIAN
          </h1>
          <div className="flex gap-2 items-center mt-5 bg-[#FFF3E5] max-w-[15rem] justify-center p-5 py-3 rounded-xl">
            <FaExclamationCircle className="text-[#F09024]" />
            <p className="text-[#F09024] text-[10px]">Baca Terlebih Dahulu</p>
          </div>
        </section>

        <section className="p-5">
          <p className="text-[12px]">
            1. Dilarang mengisi data palsu pada akun
            <br />
            2. Pendaki wajib mengisi form registrasi
            <br />
            3. Pendaki wajib lapor pada petugas saat check in/out
            <br />
            4. Dilarang check in/out pada jalur lain
            <br />
            5. Tidak boleh melewati batas waktu mendaki dan tidak melapor
            <br />
            6. Wajib meninggalkan identitas dan di ambil waktu turun 7. Dilarang
            merusak atau mengambil apapun milik petani di sepanjang jalur
            pendakian
            <br />
            8. Sampah wajib di bawa turun sesuai dengan list yang dibawa naik
            <br />
            9. Dilarang membunuh hewan apapun di sepanjang jalur
            <br />
            10. Dilarang membuat keributan yang bisa mengganggu ketertiban umum
            <br />
            11. Dilarang foto di tempat yang berbahaya
            <br />
            12. Dilarang membuang sisa makanan sembarangan (sisa makanan wajib
            di kubur)
            <br />
            13. Pendaki wajib mengikuti peraturan yang berlaku di base camp atau
            masyarakat sekitar
          </p>
        </section>

        <section className="px-5 mt-2 mb-7">
          <h3 className="text-[12px] font-bold">
            Jam Buka/Tutup Pos Perizinan
          </h3>
          <li className="text-[12px] mt-3 ml-5">Pos Perizinan Buka 24 Jam</li>

          <div className="flex gap-2 items-center mt-5 bg-[#FFF3E5] justify-center p-5 py-3 rounded-xl border border-[#F09024]">
            <input onClick={handleCheckBox} type="checkbox" />
            <p className="text-[#F09024] text-[10px]">
              Saya telah membaca, menyetujui, dan bersedia mengikuti semua
              peraturan SOP yang berlaku
            </p>
          </div>
          {checked ? (
            <Link href={`/ticket/mountain/${ticketId}/buy-ticket`}>
              <button className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-[#F09024]">
                Selanjutnya
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="mt-5 text-center w-full text-[14px] text-white rounded-lg p-3 py-4 bg-gray-500/50"
            >
              Selanjutnya
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
