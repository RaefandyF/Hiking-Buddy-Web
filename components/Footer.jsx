import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <div className='relative w-full mt-3 min-h-[150px]'>
        <Image className='w-full h-full max-[1200px]:h-[400px]' width={200} height={200} src={'/footerimage.png'} />
        <div className='absolute top-0 mx-[30px] w-[500px]'>
            <div className='my-[50px]'>
                <div className='text-4xl font-bold text-white'>
                    <p>Hiking Buddy</p>
                </div>
            </div>
            <div className='absolute flex text-xl max-[1300px]:right-[-400px] right-[-950px] max-[1200px]:right-[-500px]'>
                <div className='w-full'>
                    <div className='my-2 flex justify-end text-white'>
                        <div className='mx-5 w-[150px]'>
                            <p>About us</p>
                        </div>
                        <div className='mx-5 w-[150px]'>
                            <p>How it works</p>
                        </div>
                        <div className='mx-5 w-[150px]'>
                            <p>Our team</p>
                        </div>
                    </div>
                </div>
                <div className='min-w-[150px] bg-[#F09024] text-center leading-[40px] rounded-[20px] text-white font-bold mx-[10px]'>
                    <button>Contact us</button>
                </div>
            </div>
            <div className='absolute top-[200px] flex text-xl max-[1300px]:right-[-400px] right-[-780px] max-[1200px]:right-[-500px]'>
                <div className='w-full'>
                    <div className='my-2 flex justify-end text-white'>
                        <div className='mx-5 w-[150px]'>
                            <p>Privacy policy</p>
                        </div>
                        <div className='mx-5 w-[150px]'>
                            <p>Feedback</p>
                        </div>
                        <div className='mx-5 w-[150px]'>
                            <p>FAQ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-[870px] absolute flex bottom-[120px] left-[130px] mx-[130px] max-[1200px]:w-1/2 max-[1200px]:bottom-[5px]'>
            <div>
                <Image src={'/logo.png'} width={100} height={100} />
            </div>
            <div className='w-1/2 ml-[250px]'>
                <div className='border justify-end'></div>
            </div>
        </div>
        <div className='absolute bottom-[80px] left-[250px] flex items-center justify-center'>
            <div className='w-full justify-between flex'>
                <div className='text-white'>
                    <p>Copyright ©2024</p>
                </div>
                <div className='flex'>
                    <Image className='mx-2' width={20} height={20} src={'/logos_tiktok-icon.png'} />  
                    <Image className='mx-2' width={20} height={20} src={'/logos_facebook.png'} />
                    <Image className='mx-2' width={20} height={20} src={'/skill-icons_instagram.png'} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer