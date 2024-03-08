import Image from 'next/image'
import React from 'react'

function HeaderNavigation() {
  return (
    <div className='w-full h-[300px] mt-[150px] mt-[30px] flex justify-center items-center'>
        <div className='w-[200px]'>
            <div className='w-full flex justify-center items-center'>
                <Image width={100} height={100} src={'/navigationimage.png'} />
            </div>
            <div className='text-center font-bold text-xl'>
                <p>Explore Destination & Popular Article</p>
            </div>
        </div>
    </div>
  )
}

export default HeaderNavigation