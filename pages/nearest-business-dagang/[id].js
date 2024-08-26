import Card from '@/components/Card'
import FloatingCart from '@/components/FloatingCart'
import NavbarComponent from '@/components/Navbar'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function NearestBusinessDagang() {

  const [loggedIn, setLoggedIn] = useState('')
  const [getDatas, setDatas] = useState([])
  const router = useRouter()

  // get current login 
  const getCurrentLogin = () => {
    axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid") || 'empty'}`)
    .then((res)=>{
        if(res.data.data){
            setLoggedIn(res.data.data[0]['Userfullname'])
        }
    })
  }

  // get product umkm 
  const getProductUmkm = () => {
    axios.get(`http://localhost:8080/umkm-product/get-product-umkm/${router.query.businessunitid}`)
    .then((res)=>{
      setDatas(res.data.data)
    })
  }

  useEffect(()=>{
    getCurrentLogin()
    getProductUmkm()
  }, [router.query.businessunitid])

  return (
    <div className='min-h-screen bg-[#F5F7F8]'>
      <div className='relative bg-lime-700'>
        <NavbarComponent log={loggedIn} />
      </div>
      <div className='my-5 text-center'>
        <h3 className='font-bold text-xl'>Our Products</h3>
      </div>
      <div className='flex flex-row justify-around flex-wrap'>
        {
          getDatas.map((gd, idx)=>(
           <Card
            image={'/risol.jpeg'}
            businessunitid = {router.query.businessunitid}
            businessunitproductprice={gd.BusinessUnitProductPrice}
            title={gd.BusinessUnitProductName}
            buttonText = {'Add to Cart'}
           />
          ))
        }
      </div>
        <FloatingCart />
    </div>
  )
}

export default NearestBusinessDagang