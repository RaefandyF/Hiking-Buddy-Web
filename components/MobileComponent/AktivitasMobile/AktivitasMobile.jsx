import React from "react";
import { FaRegCompass } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import FooterMobile from "../FooterMobile/FooterMobile";

export default function AktivitasMobile() {
  return (
    <main className="font-poppins">
      <header className="flex justify-between p-5 items-center shadow-sm">
        <h1 className="font-bold">Aktivitas</h1>
        <div className="flex gap-3">
          <FaRegCompass className="text-2xl" />
          <IoIosNotifications className="text-2xl" />
        </div>
      </header>

      <section className="p-5">
        <div className="flex justify-center">
          <span className="bg-[#F09024] p-2 rounded-full w-[15rem] text-sm text-center relative left-5 text-white">
            Riwayat Transaksi
          </span>
          <span className="bg-[#F9F9F9] p-2 rounded-full w-[15rem] text-sm text-center text-black/40">
            Yang di Simpan
          </span>
        </div>
      </section>

      <FooterMobile
        home={"py-7"}
        komunitas={"py-7"}
        aktivitas={"py-7 border-t-[4px] border-[#F09024] text-[#F09024]"}
        profile={"py-8"}
      />
    </main>
  );
}
