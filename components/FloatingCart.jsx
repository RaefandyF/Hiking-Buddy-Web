import Link from 'next/link'
import React, { useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import MyModal from './CartModal'

function FloatingCart(sendDataToParent) {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='fixed border rounded-full justify w-[60px] h-[60px] right-4 bottom-4 bg-orange-500 content-center'>
        <Link onClick={()=>setShowModal(true)} className='flex justify-center' href={'#'}>
            <MdShoppingCart size={30} className='text-white' />
        </Link>
        <MyModal isOpen={showModal} onClose={()=>setShowModal(false)} />
    </div>
  )
}

export default FloatingCart