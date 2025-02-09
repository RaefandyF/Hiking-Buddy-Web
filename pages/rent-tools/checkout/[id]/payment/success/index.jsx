import React, { useState, useEffect } from "react";
import successBg from "@/public/success-bg.png";
import successTicket from "@/public/success-ticket.png";
import successChecklist from "@/public/success-checklist.png";
import { FaShareAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
export default function Success() {
  const router = useRouter();
  const { id } = router.query;
  const [transactionData, setTransactionData] = useState();
  useEffect(() => {
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tools/transactions/${id}`
        )
        .then((response) => {
          setTransactionData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
        });
    }
  }, [id]);

  return (
    <main className="font-poppins flex justify-center h-full">
      <div className="w-full max-w-[440px]">
        <section className="h-full pb-[12.5rem] bg-custom-gradient">
          <img src={successBg.src} className="w-full" />
          <div className="relative mx-5 py-5 mt-[-3rem] text-center bg-white rounded-2xl">
            <div className="flex flex-col justify-center gap-3 items-center px-5">
              <img src={successChecklist.src} className="w-[4rem] mt-5" />
              <h1 className="text-[18px] font-bold">Pembayaran Berhasil</h1>
              <p className="text-[12px]">
                Transaksi pembayaran kamu telah berhasil!
              </p>
              <h4 className="text-[#979797] text-[14px] mt-5">Total</h4>
              <h1 className="text-[18px] font-bold">
                Rp. {transactionData?.TotalPrice.toLocaleString("id-ID")}
              </h1>
            </div>
            <div className="border-b-2 border-dashed border-[#DBDBDB] mt-5"></div>
            <div className="flex justify-center items-center mt-5 gap-4 px-5">
              <Link href={`/ticket/detail-ticket/${id}`}>
                <button className="border-2 border-[#D9D9D9] rounded-full px-9 py-3 text-[14px]">
                  Lihat Tiket Pendakian
                </button>
              </Link>
              <button className="border-2 border-[#D9D9D9] rounded-full px-3 py-3 text-[14px]">
                <FaShareAlt />
              </button>
            </div>
          </div>
          <div className="px-5 flex flex-col gap-3 mt-7">
            <button className="border-[1px] border-white text-white rounded-xl px-9 py-[0.85rem] text-[14px]">
              Unduh Invoice Pembayaran
            </button>
            <Link
              className="bg-[#F09024] text-center text-white rounded-xl px-9 py-[0.85rem] text-[14px]"
              href="/"
            >
              <button>Kembali</button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
