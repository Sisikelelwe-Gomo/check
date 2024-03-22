import React from 'react'
import Image from 'next/image'
const Header = () => {

    const headerMenu = [
        {
            id:1,
            name: 'Ride',
            icon: 'taxi.png'
        },
        {
            id:2,
            name: 'package',
            icon: 'box.png'
        }
    ]


  return (
    <div>
      <div>
        <Image src ='/logo.png' width={70} height={70} alt='logo'/>
      </div>
    </div>
  )
}

export default Header
