import React from 'react';
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import RoadMapSection from '../components/RoadMapSection'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
    <div className='w-screen min-h-screen fixed z-0 flex justify-center px-6 py-40 pointer-events-none'>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-15"></div>
      <img src='/mesh.svg' className='opacity-25 absolute bottom-1 h-[600px] z-10'></img>
      <div className='bg-gradient-to-c from-transparent via-transparent to-white absolute inset-0 z-20'></div>
    </div>
    <div className='relative z-20'>
      <NavBar />
      <div className='container mx-auto'>
      <HeroSection />
      <FeaturesSection />
      <RoadMapSection />
      <Footer />
      </div>
      </div>
    </div>
  );
}
