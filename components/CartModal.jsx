import { useState } from 'react';

function MyModal({isOpen, onClose}) {

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
            <div>

            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MyModal;