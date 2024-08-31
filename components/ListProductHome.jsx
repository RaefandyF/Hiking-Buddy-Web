import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ListProductHome() {

    const [databags, setDataBags] = useState([])

     // get data bags 
    const getDataBags = () => {
        axios.get(`http://localhost:8080/bag/list-bag-carrier`)
        .then((res)=>{
            console.log(res.data.data)
            setDataBags(res.data.data)
        })
    }

    useEffect(()=>{
        getDataBags()
    }, [])

  return (
    <div className='mb-[80px] min-h-32 flex justify-center items-center'>
        <div className='w-3/4 min-h-40 flex flex-wrap'>
            {/* lakukan looping dr api */}
            {/* kotak utama */}
            {
                databags.map((da, idx)=>(
                <div key={idx} className='min-h-[300px] w-[200px] shadow-xl drop-shadow-md mx-[30px]'>
                    <div className='w-full'>
                        <img className='p-2' src='/product.png' />
                    </div>
                    <div className='w-full my-2'>
                        <div className='text-center font-bold'>
                            <div className='text-sm'>
                                <p>{da.Bagcariername}</p>
                            </div>
                            <div className='text-[#F09024]'>
                                <p>{`Rp${da.bagcarierprice}`}</p>
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
                ))
            }
            
        </div>
    </div>
  )
}

export default ListProductHome