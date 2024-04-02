import Footer from '@/components/Footer'
import NavbarComponent from '@/components/Navbar'
import React from 'react'

function StatusGunung() {
  return (
    <div className='min-h-screen'>
        <div className='w-full relative'>
            <img src='./rute.png' className='w-full h-full' />
            <div className='absolute top-0 w-full'>
                <NavbarComponent />
            </div>
            <div className='absolute bottom-[200px] left-[50px] text-[50px] w-3/4 font-bold text-white'>
                <h1>Welcome to Mountain Trail: Begin Your Journey to the Summit !</h1>
            </div>
        </div>
        <div className='w-full h-12 font-bold text-2xl text-center my-5'>
            <h3>Find Mountain status</h3>
        </div>
        <div className='w-full px-5 flex justify-between'>
            <div className='font-bold text-lg flex'>
                <p>Explore your route!</p>
            </div>
            <div className='w-[550px]'>
                <input className='w-3/5 border border-black rounded p-1' placeholder='Search favourite mountain...' />
                <select className='rounded mx-2 p-1.5 bg-slate-300'>
                    <option>Jawa Timur</option>
                    <option>Jawa Barat</option>
                    <option>Nusa Tenggara Barat</option>
                </select>
            </div>
        </div>
        <div className='w-full min-h-svh px-5 my-2 flex flex-wrap'>
            {/* box  */}
            <div className='relative w-[275px] h-[320px]'>
                <img className='w-[275px] h-[320px]' src='./rinjani.png' />
                <div className='absolute bottom-[50px] text-white mx-3'>
                    <p className='font-bold'>Gunung Rinjani</p>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <img className='w-[10px] h-[15px]' src='./carbon_location-filled.png' />
                        </div>
                        <p className='mx-2'>Jarak 5,5 km</p>
                    </div>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <img className='w-[10px] h-[15px]' src='./mingcute_time-fill.png' />
                        </div>
                        <p className='mx-2'>4 jam</p>
                    </div>
                </div>
            </div>
            <div className='relative w-[275px] h-[320px]'>
                <img className='w-[275px] h-[320px]' src='./rinjani.png' />
                <div className='absolute bottom-[50px] text-white mx-3'>
                    <p className='font-bold'>Gunung Rinjani</p>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <img className='w-[10px] h-[15px]' src='./carbon_location-filled.png' />
                        </div>
                        <p className='mx-2'>Jarak 5,5 km</p>
                    </div>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <img className='w-[10px] h-[15px]' src='./mingcute_time-fill.png' />
                        </div>
                        <p className='mx-2'>4 jam</p>
                    </div>
                </div>
            </div>
            <div className='relative w-[275px] h-[320px]'>
                <img className='w-[275px] h-[320px]' src='./rinjani.png' />
                <div className='absolute bottom-[50px] text-white mx-3'>
                    <p className='font-bold'>Gunung Rinjani</p>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <img className='w-[10px] h-[15px]' src='./carbon_location-filled.png' />
                        </div>
                        <p className='mx-2'>Jarak 5,5 km</p>
                    </div>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <img className='w-[10px] h-[15px]' src='./mingcute_time-fill.png' />
                        </div>
                        <p className='mx-2'>4 jam</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default StatusGunung