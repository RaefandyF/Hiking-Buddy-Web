import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import NavbarComponent from '@/components/Navbar'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function NearestBusinessData() {

    const router = useRouter()
    const {MountainName, MountainId} = router.query
    const [loggedIn, setLoggedIn] = useState('')
    const [businessUnits, setBusinessUnits] = useState([])
    const [isModalClick, setIsModalClick] = useState(false)


    // get all data business unit with specific mountain
    const getAllBusinessUnit = () => {
        axios.get(`http://localhost:8080/business-unit/get-business-unit/${MountainId}`)
        .then((res)=>{
            if(res.data.data){
                setBusinessUnits(res.data.data)
            }
        })
    }

    // get current login 
    const getCurrentLogin = () => {
        axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid") || 'empty'}`)
        .then((res)=>{
            if(res.data.data){
                setLoggedIn(res.data.data[0]['Userfullname'])
            }
        })
    }

    useEffect(()=>{
        getCurrentLogin()
        getAllBusinessUnit()
    }, [loggedIn])


  return (
    <div className='min-h-screen bg-[#F5F7F8]'>
        <div className='relative'>
            <img src='/rent-img.png' className='w-full h-1/3' />
            <div className='absolute top-0 w-full'>
                <NavbarComponent log={loggedIn} />
                <div className='w-4/6 mx-[20px] text-white text-[50px] font-bold '>
                    <h3>Jelajahi UMKM di sekitarmu !</h3>
                </div>
                <div className='w-4/6 mx-[20px] mt-[60px] text-white text-[20px]'>
                    <h3>Nikmatilah wisata mu dengan mengunjungi toko lokal</h3>
                </div>
            </div>
        </div>
        <div className='flex w-full h-20 px-7 my-[15px] justify-between'>
            <div className='flex text-xl'>
                <p>Kunjungi Umkm di lokasi</p>
                <p className='font-bold mx-1'>{`${MountainName}`}</p>
            </div>
            <div>
                <input
                placeholder='search the business unit...'
                 className='w-80 p-1 border-solid border-2 border-gray-200 rounded' />
            </div>
        </div>
        <div className='w-full min-h-96 px-3 flex flex-wrap'>
            {
                businessUnits.map((bu, idx)=>(
                   <div key={idx} className='w-64 h-80 mx-2 rounded overflow-hidden shadow-lg bg-white'>
                    <img className='w-full object-cover h-48 rounded' src='/rinjani.png' />
                    <div className='px-6 py-4'>
                        <div className='font-bold text-xl mb-2'>
                            {bu.BusinessUnitName}
                        </div>
                        <div className='w-full flex flex-col items-center'>
                            <button
                            onClick={()=>{
                                setIsModalClick(true)
                            }}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                Lihat dagang
                            </button>
                        </div>

                        {
                            isModalClick && (
                                <Modal />
                            )
                        }
                    </div>
                   </div> 
                ))
            }
        </div>
        <Footer />
    </div>
  )
}

export default NearestBusinessData