import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingFull() {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <AiOutlineLoading3Quarters className="animate-spin text-[3rem] text-[#F09024]" />
    </div>
  );
}
