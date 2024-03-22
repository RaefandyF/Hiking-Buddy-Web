import ListProductHome from '@/components/ListProductHome'
import NavbarComponent from '@/components/Navbar'
import React from 'react'

function index() {
  return (
    <div className='min-h-screen'>
        <div className='w-full relative'>
            <img src='./rent-img.png' className='w-full h-1/3' />
            <div className='absolute top-0 w-full'>
                <NavbarComponent />
                <div className='w-4/6 mx-[20px] text-white text-[50px] font-bold '>
                    <h3>Peak Provisions: Rent Top-Quality Gear for Your Ultimate Mountain Adventures</h3>
                </div>
                <div className='w-4/6 mx-[20px] mt-[60px] text-white text-[20px]'>
                    <h3>Save your adventure with Hiking Buddy !</h3>
                </div>
            </div>
        </div>
        <div className='w-full flex justify-between mx-[10px] my-[50px]'>
            <div className='w-1/2 text-center text-[20px] font-bold'>
                <p>Explore the tools you need and rent them !</p>
            </div>
            <div className='w-1/2 flex justify-center items-end'>
                <input className='border-solid border-2 border-gray-500 w-3/4 rounded px-2 py-1' placeholder='search' />
            </div>
        </div>
        <ListProductHome />
    </div>
  )
}

export default index