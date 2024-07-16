import React from 'react'
import Image from 'next/image'
import widget from "../public/PiyushXmishra-github-business-card.png"
const GuidesToUse = () => {
  return (
    <div>
        <div className='text-2xl  md:mt-20 text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text'>
            Under Construction!
        </div>
        <ul className='text-lg p-10'>
            <li>- As of now, use it for songs only!</li><br/>
            <li>- Please avoid selecting resolutions above 1080p, as it may require a longer conversion time.</li><br/>
            <li>- Approximate time for a 1080p song is around ~15 seconds.</li><br/>
             <li>- As of now, supports only 30/60fps videos.</li><br/>
        </ul>
        <div className='flex justify-center items-center ' >
        <Image
      src={widget}
      width={500}
      height={500}
      alt="Piyush Mishra"
    />

        </div>
    </div>
  )
}

export default GuidesToUse