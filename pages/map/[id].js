import Modal from '@/components/Modal';
import React from 'react'
import { IoMdDownload } from "react-icons/io";
import { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from 'next/router';


function MapPage() {

    // router get last 
    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nameShop, setNameShop] = useState('')
    const [noPhone, setNoPhone] = useState('')

    const openModal = (e) => {
        setIsModalOpen(true)
        setNameShop('buk jai')
        setNoPhone('0811111111')
    }
    const closeModal = (e) => setIsModalOpen(false)

  return (
    <div className='min-h-[150vh] bg-[#639e41] px-[30rem] max-[1107px]:px-[10rem]'>
        <div className='text-center py-9'>
            <div className='text-[25px] text-white font-bold'>
                <h3>{`${router.query.MountainName} detail map`}</h3>
            </div>
        </div>
        <div className='flex justify-center'>
            <div className='mx-5'>
                <img className='rounded-[10px] w-[60rem]' src={(router.query.MountainName == 'Gunung Gede') ? '/mappangrango.png' : (router.query.MountainName == 'Gunung Semeru') ? '/mapsemeru.png' : (router.query.MountainName == 'Gunung Raung') ? '/mapgunungraung.png' : '/rinjanimap.jpeg'} />
            </div>
        </div>
        <div className='flex my-5 justify-center'>
            <button className='flex rounded-[10px] p-3 bg-[#FF8A08] text-white'>
                <div className='flex items-center justify-center h-full mx-1 cursor:pointer'>
                    <IoMdDownload />
                </div>
                Download
            </button>
        </div>
        <div className='my-2'>
            <div className='text-[20px] font-bold text-white mt-2 py-2'>
                <h3>Business Unit Recommendation</h3>
            </div>
            <div className='bg-white rounded px-1'>
                <div>
                    <h3>Food tenant partner</h3>
                </div>
                <div className='py-1'>
                    <div 
                    onClick={openModal}
                    value={'Warung buk jai'}
                    className='border-b-[1px] border-black hover:shadow-inner hover:cursor-pointer'>
                        <p>Warung buk jai</p>
                    </div>
                    <div
                    value={`Warung buk jai`}
                    className='border-b-[1px] border-black hover:shadow-inner hover:cursor-pointer'>
                        <p>Warung buk jai</p>
                    </div>  
                </div>
            </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className='text-center font-bold'>
                <p>{nameShop}</p>
            </div>
            <div className='my-2'>
                <div>
                    <p>No. Handphone: </p>
                </div>
                <div>
                    <p>{noPhone}</p>
                </div>
            </div>
            <div>
                <button className='p-2 bg-green-500 rounded flex'>
                    <div className='flex justify-center items-center h-full '>
                        <FaWhatsapp color='white' size={30} />
                    </div>
                    <div className='flex jusify-center items-center h-full mx-1 text-white'>
                        <p>Open in Whatsapp</p>
                    </div>
                </button>
            </div>
        </Modal>
    </div>
  )
}

export default MapPage