import Image from 'next/image'
import React from 'react'
import NavbarComponent from './Navbar'

function HeaderComponent() {
  return (
    <div>
        <div>
            <div className='relative'>
                <NavbarComponent />
                <div>
                    <img src='imagepage.png' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderComponent