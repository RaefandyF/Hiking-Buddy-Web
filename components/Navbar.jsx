import Image from 'next/image'
import React from 'react'

function NavbarComponent() {
  return (
    <div className='absolute mx-[5px] top-0 navbar-0 text-[14px] flex w-full justify-between'>
      <div className='flex leading-[40px]'>
        <div>
          <Image 
          width={100}
          height={80}
          src={'/logo.png'} />
        </div>
        <div className='mx-2'>
            <p>Home</p>
        </div>
        <div className='mx-2'>
          <p>Rute</p>
        </div>
        <div className='mx-2'>
          <p>Komunitas</p>
        </div>
        <div className='mx-2'>
          <p>Cuaca</p>
        </div>
        <div className='mx-2'>
          <p>Beli tiket</p>
        </div>
      </div>
      <div className='w-[200px] flex'>
        <div className='w-[50px] mx-2'>
          <p className='leading-[40px] text-center'>Sign up</p>
        </div>
        <button className='w-[100px] border border-white p-3 rounded-[20px]'>
          Sign in
        </button>
      </div>
    </div>
  )
}

export default NavbarComponent