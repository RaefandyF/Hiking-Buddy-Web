import NavbarComponent from '@/components/Navbar'
import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

function index() {
  return (
    <div className='min-h-screen'>
        <div className='relative'>
            <img src='/route_image.png' className='w-full' />
            <div className='absolute top-0 w-full'>
                <NavbarComponent />
                <div className='w-1/2 my-[30px] ml-[30px] text-[40px] text-white font-bold'>
                    <h1>Welcome to Mountain Trail: "Begin Your Journey to the Summit !</h1>
                </div>
                <div className='ml-[30px] text-white text-[25px]'>
                    <p>There are list of routes that available</p>
                </div>
            </div>
        </div>
        <div className='p-[50px] flex justify-between'>
            <div className='font-bold text-[20px]'>
                <p>Explore your route!</p>
            </div>
            <div className='flex'>
                <div>
                    <input className='border border-grey-400 w-[400px] rounded-lg p-1 mx-2' placeholder='search' />
                </div>
                <div>
                    {/* get data from api */}
                    <select className='border border-grey-400 p-1 rounded-lg w-[150px] bg-gray-400'>
                        <option>-</option>
                        <option>Lombok</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='min-h-[500px] flex flex-wrap'>
            {/* api in this */}
            <div className='h-[320px] min-w-[250px] relative mt-[5px] mx-3'>
                <div className='absolute w-full h-full'>
                    <img src='/route_card_image.png' className='w-full h-full' />
                    <div className='w-[200px] flex justify-between absolute top-3 m-3 mx-5'>
                        <div className='text-white text-center rounded-lg w-[80px] backdrop-blur-sm bg-white/30'>
                            <p>Lombok</p>
                        </div>
                        <div>
                            <img src='/save_icon.png' />
                        </div>
                    </div>
                    <div className='absolute rounded-[20px] py-2 bg-black bg-opacity-50 translate-x-[10px] text-center text-white bottom-[40px]'>
                        <div className='w-[230px] h-[100px]'>
                            <div className='font-bold'>
                                <p>Gunung Rinjani</p>
                            </div>
                            <div className='flex justify-left items-center mx-3'>
                                <IoLocationSharp />
                                <div className='mx-1'>
                                    <p>Jarak 5,5km</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mx-3'>
                                <div className='flex items-center'>
                                    <MdAccessTimeFilled />
                                    <div className='mx-1'>
                                        <p>4 jam</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <FaStar color='#FFC94A' className='mx-2' />
                                    <div className=''>
                                        <p>4.9</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default index