import NavbarComponent from '@/components/Navbar'
import { useRouter } from 'next/router'
import React from 'react'

function DetailMedical() {

    const router = useRouter()

  return (
    <div className='min-h-screen'>
        <div className='relative'>
            <div className=''>
                <img className='w-full' src='/rent-img.png' />
                <div className='absolute top-0 w-full'>
                    <NavbarComponent />
                </div>
                <div className='absolute top-[10rem] mx-5 text-white text-[30px] font-bold'>
                    <p>Take your medical care with HikingBuddy</p>
                </div>
            </div>
        </div>
        <div className='my-[5rem]'>
            <div className='flex justify-center rounded mx-[10rem] hover:shadow-inner shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] py-1'>
                <div className='mx-3'>
                    <img className='h-[20rem] rounded' src='/ambulance.jpeg' />
                </div>
                <div className='mx-3'>
                    <div className='my-1 font-bold text-[20px]'>
                        <p>{router.query.ambulanceName}</p>
                    </div>
                    <div className='my-1 text-[15px]'>
                        <p>{router.query.ownerMedical}</p>
                    </div>
                    <div className='my-1'>
                        <p>{`Rp${router.query.priceMedical}/Km`}</p>
                    </div>
                    <div className='my-1 flex flex-wrap'>
                        <p>{router.query.ambulanceDescription}</p>
                    </div>
                    <div className='my-1'>
                        <p>{router.query.ratingMedical}</p>
                    </div>
                    <div>
                        <input
                        placeholder='Masukkan lokasi tujuan anda'
                        className='border border-black rounded my-1 p-1 w-[50%]' />
                    </div>
                    <div className='my-1 flex'>
                        <div>
                            <p>Total jarak:</p>
                        </div>
                        <div className='mx-1'>
                            <p>5 km</p>
                        </div>
                    </div>
                    <div className='my-1 flex'>
                        <div>
                            <p>Total pembayaran: </p>
                        </div>
                        <div className='mx-1 text-[#FF8F00] font-bold'>
                            <p>Rp50000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailMedical