import React from 'react'
import Image from 'next/image'
import widget from "../public/PiyushXmishra-github-business-card.png"
const GuidesToUse = () => {
  return (
    <div>
        <div className='text-2xl mt-20 text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text'>
            Under Construction!
        </div>
        <ul className='text-lg p-10'>
            <li>As of now, use it for songs only!</li>
            <li>Please avoid selecting resolutions above 1080p, as it may require a longer conversion time.</li>
            <li>Approximate time for a 1080p song is around ~40 seconds.</li>
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