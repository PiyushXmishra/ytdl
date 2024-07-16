import React from 'react'
import { Component } from './ui/searchBar'
import GuidesToUse from './guidesToUse'

const Hero = () => {
  return (
    <>
    <div className='  text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-center pt-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text'>
        Not Your Another Youtube Downloader !!
    </div>
    <div className=''>
        <Component/>
    </div> 
    <GuidesToUse/>
    </>
  )
}

export default Hero