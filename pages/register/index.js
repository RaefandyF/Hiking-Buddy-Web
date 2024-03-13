import React from 'react'

function RegisterPage() {
  return (
    <div className='h-screen w-full flex flex-row'>
            <img 
            src='/register-img.png'
            className='absolute left-0 h-screen z-0 w-[700px]'
            />
        <div>
            <img 
            src='/elipse-register.png'
            className='h-screen absolute right-0 w-2/3 z-20'
            />
            <div className='absolute top-[10%] right-[20%] w-[400px] z-30'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-[#274753]'>Register</h1>
                </div>
                <div className='flex justify-center'>
                    <img
                    src='/rec-blur.png'
                    className='w-[300px] my-5'
                    />
                </div>
                <div className='my-5'>
                    <input 
                    type='text'
                    placeholder='Username'
                    className='w-full border-2 p-3 rounded-md border-[#CDCDCD]'
                    />
                </div>
                <div className='my-5'>
                    <input
                    type='email'
                    placeholder='Email'
                    className='w-full border-2 p-3 rounded-md border-[#CDCDCD]'
                    />
                </div>
                <div className='my-5'>
                    <input
                    type='password'
                    placeholder='Password'
                    className='w-full border-2 p-3 rounded-md border-[#CDCDCD]'
                    />
                </div>
                <div className='my-5'>
                    <input
                    type='password'
                    placeholder='Confirm Password'
                    className='w-full border-2 p-3 rounded-md border-[#CDCDCD]'
                    />
                </div>
                <div className='my-5'>
                    <button className='w-full rounded-lg bg-[#F09024] text-white p-3'>
                        Masuk
                    </button>
                </div>
                <div className='my-5 w-full flex flex-row items-center justify-center'>
                    <img
                    src='/rec-blur.png'
                    className='w-5/12'
                    />
                    <p>atau</p>
                    <img
                    src='/rec-blur.png'
                    className='w-5/12'
                    />
                </div>
                <div className='my-3'>
                    <button className='w-full bg-black p-4 rounded-[25px] flex flex-row justify-center'>
                        <img
                        src='/google-icon.png'
                        className='mx-2'
                        />
                        <p className='text-white mx-2'>Lanjutkan dengan Google</p>
                    </button>
                </div>
                <div className='my-3 w-full flex justify-center'>
                    <div className='mx-1'>
                        <p>Sudah memiliki akun?</p>
                    </div>
                    <div className='mx-1 text-[#F09024]'>
                        <p>Login</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage