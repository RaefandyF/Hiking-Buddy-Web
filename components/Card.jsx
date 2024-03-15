import React from "react";

export default function Card(props) {
  return (
    <div className="w-[230.4px] h-[273.6px] bg-[#f5f5f5] rounded-[28.8px]">
      <img src={props.image} className="w-[244.8px]" />
      <h1 className="font-bold mx-[11.52px] mt-[7.2px] text-[14.4px]">
        {props.title}
      </h1>
      <div className="flex justify-end m-[14.4px]">
        <button className="bg-[#f2bd83] w-[129.6px] py-[7.2px] text-[14.4px] px-[14.4px] rounded-[72px] text-white font-bold">
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}
