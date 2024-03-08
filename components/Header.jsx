import Image from 'next/image'
import React from 'react'
import NavbarComponent from './Navbar'
import FindSelf from './FindSelf'
import ListFeature from './ListFeature'

function HeaderComponent() {
  return (
    <div>
        <div>
            <div className='relative'>
                <NavbarComponent />
                <div>
                    <img style={{width: `100%`}} src='/imagepage.png' />
                </div>
                <FindSelf />
                <ListFeature />
            </div>
        </div>
    </div>
  )
}

export default HeaderComponent