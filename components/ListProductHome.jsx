import React from 'react'

function ListProductHome() {
  return (
    <div className='w-screen min-h-32 flex justify-center items-center'>
        <div className='w-3/4 min-h-40 flex flex-wrap'>
            {/* lakukan looping dr api */}
            {/* kotak utama */}
            <div className='min-h-[300px] w-[200px] shadow-xl drop-shadow-md m-2'>
                <div className='w-full'>
                    <img className='p-2' src='/product.png' />
                </div>
                <div className='w-full my-2'>
                    <div className='text-center font-bold'>
                        <div className='text-sm'>
                            <p>Compass</p>
                        </div>
                        <div className='text-[#F09024]'>
                            <p>Rp50.000,-</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-[44px]'>
                    <div className='absolute w-full top-3 flex justify-center items-center'>
                        <button className='w-[57px] h-[44px] bg-[#F09024] mx-2 flex justify-center items-center rounded'>
                            <img src='/cart-shop.png' />
                        </button>
                        <button className='min-w-[10px] bg-black text-white h-[44px] mx-2 rounded px-1 font-bold'>
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='min-h-[300px] w-[200px] shadow-xl drop-shadow-md m-2'>
                <div className='w-full'>
                    <img className='p-2' src='/product.png' />
                </div>
                <div className='w-full my-2'>
                    <div className='text-center font-bold'>
                        <div className='text-sm'>
                            <p>Compass</p>
                        </div>
                        <div className='text-[#F09024]'>
                            <p>Rp50.000,-</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-[44px]'>
                    <div className='absolute w-full top-3 flex justify-center items-center'>
                        <button className='w-[57px] h-[44px] bg-[#F09024] mx-2 flex justify-center items-center rounded'>
                            <img src='/cart-shop.png' />
                        </button>
                        <button className='min-w-[10px] bg-black text-white h-[44px] mx-2 rounded px-1 font-bold'>
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='min-h-[300px] w-[200px] shadow-xl drop-shadow-md m-2'>
                <div className='w-full'>
                    <img className='p-2' src='/product.png' />
                </div>
                <div className='w-full my-2'>
                    <div className='text-center font-bold'>
                        <div className='text-sm'>
                            <p>Compass</p>
                        </div>
                        <div className='text-[#F09024]'>
                            <p>Rp50.000,-</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-[44px]'>
                    <div className='absolute w-full top-3 flex justify-center items-center'>
                        <button className='w-[57px] h-[44px] bg-[#F09024] mx-2 flex justify-center items-center rounded'>
                            <img src='/cart-shop.png' />
                        </button>
                        <button className='min-w-[10px] bg-black text-white h-[44px] mx-2 rounded px-1 font-bold'>
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='min-h-[300px] w-[200px] shadow-xl drop-shadow-md m-2'>
                <div className='w-full'>
                    <img className='p-2' src='/product.png' />
                </div>
                <div className='w-full my-2'>
                    <div className='text-center font-bold'>
                        <div className='text-sm'>
                            <p>Compass</p>
                        </div>
                        <div className='text-[#F09024]'>
                            <p>Rp50.000,-</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-[44px]'>
                    <div className='absolute w-full top-3 flex justify-center items-center'>
                        <button className='w-[57px] h-[44px] bg-[#F09024] mx-2 flex justify-center items-center rounded'>
                            <img src='/cart-shop.png' />
                        </button>
                        <button className='min-w-[10px] bg-black text-white h-[44px] mx-2 rounded px-1 font-bold'>
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='min-h-[300px] w-[200px] shadow-xl drop-shadow-md m-2'>
                <div className='w-full'>
                    <img className='p-2' src='/product.png' />
                </div>
                <div className='w-full my-2'>
                    <div className='text-center font-bold'>
                        <div className='text-sm'>
                            <p>Compass</p>
                        </div>
                        <div className='text-[#F09024]'>
                            <p>Rp50.000,-</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-full h-[44px]'>
                    <div className='absolute w-full top-3 flex justify-center items-center'>
                        <button className='w-[57px] h-[44px] bg-[#F09024] mx-2 flex justify-center items-center rounded'>
                            <img src='/cart-shop.png' />
                        </button>
                        <button className='min-w-[10px] bg-black text-white h-[44px] mx-2 rounded px-1 font-bold'>
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListProductHome