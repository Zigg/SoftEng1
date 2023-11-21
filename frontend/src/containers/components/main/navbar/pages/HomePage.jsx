import React from 'react';
import { FeaturedItemsCarousel } from './components/FeaturedItemsCarousel';
import { AboutPage } from './AboutPage';
import { Footer } from './components/Footer';
import { FuturePlans } from './FuturePlans';
import { FAQ } from './FAQ';
import { TextBanner } from './TextBanner';
export const HomePage = () => {
  return (
    <div>
      <div className=' flex flex-col items-center bg-slate-50 mt-1.5'>
        <FeaturedItemsCarousel />
        <TextBanner />
        <FAQ />
        {/* <FuturePlans /> */}
      </div>
      <Footer />
    </div>
  )
};

