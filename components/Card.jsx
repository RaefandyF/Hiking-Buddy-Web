import { useRouter } from "next/router";
import React from "react";

export default function Card(props) {

  const router = useRouter()
  console.log(props.id)

  return (
    <div className="w-[230.4px] h-auto overflow-hidden border-2 bg-[#f5f5f5] mb-[80px] rounded-[28.8px] hover:shadow-md">
      <img src={props.image} className="w-[244.8px]" />
      <h1 className="font-bold mx-[11.52px] mt-[7.2px] text-[14.4px]">
        {props.title}
      </h1>
      <p className="mx-[11.52px] mt-[7.2px]">
        {`Rp${props.businessunitproductprice}`}
      </p>
      <div className="flex justify-end m-[14.4px]">
        <button onClick={()=>{
          router.push({
            pathname: (props.id) ? `/community/${props.id}` : ``, 
            query: {
              id: props.id
            }
          })
        }} className="bg-[#f2bd83] w-[129.6px] py-[7.2px] text-[14.4px] px-[14.4px] rounded-[72px] text-white font-bold hover:bg-[#e8881e]">
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}
