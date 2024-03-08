import Image from 'next/image'
import React from 'react'

function ListFeature() {
  return (
    <div className='absolute bottom-[-100px] w-full flex justify-center max-[980px]:bottom-[-150px]'>
        <div className='w-[250px] min-h-[200px] bg-white rounded drop-shadow-md mx-[10px]'>
            <div className='w-full h-[100px] flex justify-center'>
                <Image width={70} height={50} src={'/firewood.png'} />
            </div>
            <div className='text-center font-bold my-3'>
                <p>Camping & Day Use</p>
            </div>
            <div className='my-5 text-center text-sm'>
                <p>Our service is renting camp and hiking tools</p>
            </div>
        </div>
        <div className='w-[250px] min-h-[200px] bg-white rounded drop-shadow-md mx-[10px]'>
            <div className='w-full h-[100px] flex justify-center'>
                <Image width={70} height={50} src={'/firewood.png'} />
            </div>
            <div className='text-center font-bold my-3'>
                <p>Tour & tickets</p>
            </div>
            <div className='my-5 text-center text-sm'>
                <p>Hiking buddy serve customer for rent a tour guide and buying ticket</p>
            </div>
        </div>
        <div className='w-[250px] min-h-[200px] bg-white rounded drop-shadow-md mx-[10px]'>
            <div className='w-full h-[100px] flex justify-center'>
                <Image width={70} height={50} src={'/firewood.png'} />
            </div>
            <div className='text-center font-bold my-3'>
                <p>Weather</p>
            </div>
            <div className='my-5 text-center text-sm'>
                <p>Hiking buddy serve hikers to check current weather for hikers to check currently condition</p>
            </div>
        </div>
        <div className='w-[250px] min-h-[200px] bg-white rounded drop-shadow-md mx-[10px]'>
            <div className='w-full h-[100px] flex justify-center'>
                <Image width={70} height={50} src={'/firewood.png'} />
            </div>
            <div className='text-center font-bold my-3'>
                <p>Montain status</p>
            </div>
            <div className='my-5 text-center text-sm'>
                <p>Hiking buddy serve hikers to check mountain status around Indonesia</p>
            </div>
        </div>
    </div>
  )
}

export default ListFeature