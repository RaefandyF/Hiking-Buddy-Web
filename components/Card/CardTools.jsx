import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

export default function CardTools(props) {
  return (
    <div className="mt-3 flex flex-col gap-1 bg-white max-w-[12rem] rounded-xl shadow-lg">
      <div className="relative bg-[#F4F5F7] w-[10.5rem] max-[400px]:w-[9.5rem] max-[368px]:w-[8.5rem] max-[304px]:w-[10.5rem] max-[336px]:w-[7.5rem] h-[8rem] rounded-xl m-1 flex items-center justify-center">
        <img src={props.image} className="w-[9rem] h-[5.7rem]" />
        <span className="absolute top-2 right-2 bg-white p-2 rounded-full">
          <FaRegBookmark className="text-sm" />
        </span>
      </div>
      <div className="mx-2 flex flex-col gap-1">
        <h3 className="text-[10px]">{props.name}</h3>
        <h1 className="text-[14px] font-bold">
          Rp {props.price?.toLocaleString("id-ID")}
          <span className="text-[10px] font-normal">/Perhari</span>
        </h1>
        <p className="text-[10px] text-[#b6b1ac] mb-3 flex items-center gap-[2px]">
          {props.rentMount} kali disewa | <FaStar className="text-[#F09024] opacity-100" />
          {props.rating}
        </p>
      </div>
    </div>
  );
}
