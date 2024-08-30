import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Card(props) {

  const router = useRouter()
  console.log(props.id)

   // get current user login data
   const getCurrentUserLogin = () => {
    axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid") || 'empty'}`)
    .then((res)=>{
      if(!res.data.data[0]){
        console.log(res.data.data[0]["Userfullname"])
        setCurrLogin(res.data.data[0]["Userfullname"])
      }
    })
  }

  // add to cart button 
  const addToCartButton = (businessunitproductid) => {
    console.log({
      userid: sessionStorage.getItem("userid"), 
      BusinessProductId: businessunitproductid, 
      quantity: 1
    })

    axios.post(`http://localhost:8080/cart/add-new-product-to-cart`,{
      UserId: sessionStorage.getItem("userid"), 
      BusinessProductId: businessunitproductid, 
      quantity: 1
    }).then((res)=>{
      console.log(res.data)
    })
  }

  useEffect(()=>{
    getCurrentUserLogin()
  }, [])

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
          // melakukan validasi pada button card 
          (props.businessunitid == undefined) ? (
            router.push({
              pathname: (props.id) ? `/community/${props.id}` : ``, 
              query: {
                id: props.id
              }
            }) 
          ): ( addToCartButton(props.BusinessUnitProductId) )
        }} className="bg-[#f2bd83] w-[129.6px] py-[7.2px] text-[14.4px] px-[14.4px] rounded-[72px] text-white font-bold hover:bg-[#e8881e]">
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}
