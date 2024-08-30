import axios from 'axios';
import { useEffect, useState } from 'react';
import CardHorizontal from './CardHorizontal';

function MyModal({isOpen, onClose}) {``

  const [cartDatas, setCartDatas] = useState([])

  // get cart data 
  const getCartDatas = () => {
    axios.get("http://localhost:8080/cart/get-business-products-cart")
    .then((res)=>{
      setCartDatas(res.data.data)
      console.log(cartDatas)
    })
  }

  useEffect(()=>{
    getCartDatas()
  }, [])

  return (
    <>

      {/* Modal */}
      {isOpen ? (
        <div className="fixed inset-y-0 right-0 flex items-center justify-end z-999">
          <div className="bg-white opacity-100 rounded-lg p-8 w-[400px] h-full scroll-smooth">
            <div className='flex justify-between'>
                <h2 className="text-xl font-bold mb-4">Cart</h2>
                <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    x
                </button>
            </div>
            <div className='my-3 h-3/4'>
              {
                cartDatas.map((ca, idx)=>(
                  <CardHorizontal
                    businessunitproductname={ca.businessunitproductname}
                    businessunitproductprice={ca.businessunitproductprice}
                    quantity={ca.quantity}
                  />
                ))
              }
            </div>
            <div className='w-full flex justify-center'>
              <button className='w-3/4 rounded p-2 text-white font-bold bg-teal-700'>Buy</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MyModal;