import React, { useState, useEffect } from 'react';
import ServicesCarousel from '../components/servicePage_carousel.jsx';
import { Link } from 'react-router-dom';
import BackgroundImage0 from "../assets/head.jpg"
import BackgroundImage1 from "../assets/143147.jpg"
import BackgroundImage2 from "../assets/delivery.jpg"
import BackgroundImage3 from "../assets/leftdown.jpg"
import BackgroundImage4 from "../assets/carpentry.jpg"
import homerepair from "../assets/cleaners.jpg"
import moving from "../assets/delivery.jpg"
import autorepair from "../assets/carmechanic.jpg"
import construction from "../assets/carpenterlady.jpg"
import galleryBanner1 from "../assets/left.jpg"      
import galleryBanner2 from "../assets/lefttop.jpg"   
import galleryBanner3 from "../assets/leftbottom.jpg"
import galleryBanner4 from "../assets/leftdown.jpg"  
import downloadBtn_1 from "../assets/download.png";
import downloadBtn_2 from "../assets/web-189884714.jpg";
import DownloadappImage from "../assets/app.jpg"
import BackToTop from '../components/back_the_top_btn.jsx';
import BusinessCategorySection from '../components/suggested_category.jsx';
import { Hammer, House, Zap, BrushCleaning, Truck, Trash2, PaintRoller, Wrench, Settings, Cake } from 'lucide-react';

const Services = () => {
  const services = [
    { icon: Zap, name: 'Electrician' },
    { icon: BrushCleaning, name: 'Cleaners' },
    { icon: Truck, name: 'Moving' },
    { icon: Trash2, name: 'Trash Collector' },
    { icon: PaintRoller, name: 'Painting' },
    { icon: Wrench, name: 'Plumber' },
    { icon: Settings, name: 'Mechanic' },
    { icon: Cake, name: 'Event setup' }
  ];

  const serviceIcons = [
    { id: 1, icon: House, name: 'Home repairs' },
    { id: 2, icon: Truck, name: 'Moving' },
    { id: 3, icon: Settings, name: 'Auto repairs' },
    { id: 4, icon: Hammer, name: 'Construction' }
  ];
  
  const businessCards = {
    'Home repairs': {
      cat: 'Home repairs',
      mainCardBackground: BackgroundImage1,
      cardIcon: House,  
      heading: 'Maintenance and painting business',
      seeAll: 'See all maintenance'
    },
    'Moving': {
      cat: 'Moving',
      mainCardBackground: BackgroundImage2,
      cardIcon: Truck,  
      heading: 'Moving and relocation services',
      seeAll: 'See all moving services'
    },
    'Auto repairs': {
      cat: 'Auto repairs',
      mainCardBackground: BackgroundImage3,
      cardIcon: Settings,  
      heading: 'Professional auto repair services',
      seeAll: 'See all auto services'
    },
    'Construction': {
      cat: 'Construction',
      mainCardBackground: BackgroundImage4,
      cardIcon: Hammer,  
      heading: 'Construction and renovation',
      seeAll: 'See all construction services'
    }
  };

  const businessServices = [
    { cat: 'Home repairs', image: homerepair, title: 'House Cleaning', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Home repairs', image: homerepair, title: 'Handy Man', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Home repairs', image: homerepair, title: 'Interior painting', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Moving', image: moving, title: 'Packing Services', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Moving', image: moving, title: 'Furniture Moving', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Moving', image: moving, title: 'Storage Solutions', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Auto repairs', image: autorepair, title: 'Engine Repair', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Auto repairs', image: autorepair, title: 'Brake Service', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Auto repairs', image: autorepair, title: 'Oil Change', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Construction', image: construction, title: 'Building Construction', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Construction', image: construction, title: 'Renovation', subtitle: 'See workers near you', icon: 'map.png' },
    { cat: 'Construction', image: construction, title: 'Roofing', subtitle: 'See workers near you', icon: 'map.png' },
  ];


  return (
    <div className="w-full min-h-screen relative">      
      {/* Header Section with complex image layout */}
      <header className="w-full relative overflow-visible">
        <div className="relative w-full h-[50vh] overflow-visible">
          {/* Main background with overlay and content */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url(${BackgroundImage0})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 z-[1]"></div>
            
            {/* Main title and search - positioned on top of background */}
            <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-center pt-0 md:pt-8 z-[2]">
              <h1 className="text-orange-500 text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-8 whitespace-normal md:whitespace-nowrap px-5">
                Lucid is here for you
              </h1>
              
              {/* Search Bar */}
              <div className="w-[95%] md:w-[80%] max-w-[672px] flex flex-col items-center">
                <div className="w-full flex justify-center">
                  <div className="flex w-full max-w-[672px] rounded-full overflow-hidden bg-white border-2 border-blue-700 shadow-lg">
                    <input
                      type="text"
                      placeholder="What service do you need?"
                      className="flex-grow border-none outline-none px-6 py-3 bg-white text-black text-base placeholder:text-gray-500"
                    />
                    <button className="bg-blue-600 px-6 py-3 border-none cursor-pointer flex items-center justify-center transition-colors hover:bg-blue-700 rounded-r-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#fff" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Left image stack - on top of everything */}
          <div className="absolute top-0 left-0 w-[200px] h-full z-[3] hidden md:block">
            <img src={galleryBanner1} alt="Left" className="absolute top-5 left-5 w-[200px] h-[280px] object-cover z-[4] rounded-sm" />
            <img src={galleryBanner2} alt="Left Top" className="absolute top-2.5 left-[170px] w-[150px] h-[90px] object-cover z-[5] rounded-sm shadow-lg drop-shadow-lg" />
            <img src={galleryBanner3} alt="Left Bottom" className="absolute top-[230px] left-1.5 w-[130px] h-[90px] object-cover z-[9] rounded-sm translate-y-10 shadow-lg drop-shadow-lg" />
            <img src={galleryBanner4} alt="Left Down" className="absolute top-[310px] left-[170px] w-[150px] h-[90px] object-cover z-[6] rounded-sm shadow-lg drop-shadow-lg" />
          </div>
        </div>
      </header>
      
      {/* Our Services Section */}
      <section className="bg-white py-20 relative z-0">
        <div className="max-w-[1200px] mx-auto px-5 mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-black">Popular services</span>
            <span className="text-blue-700"> near you</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 max-w-[1200px] mx-auto px-5">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
            <Link to="/category" key={index}>
              <div className="bg-white border-2 border-blue-700 rounded-xl p-10 md:py-10 md:px-5 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer max-w-60 min-h-28 max-h-36 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/20 hover:border-blue-600 group">
                <div className="mb-6 flex items-center justify-center">
                  <IconComponent size={30} className="text-blue-700 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-blue-700 text-xl font-normal text-center leading-relaxed transition-colors duration-300 group-hover:text-blue-600">
                  {service.name}
                </span>
              </div>
            </Link>
          );
                  })}
        </div>

        {/* Services you might also like Section*/}
        <div className="mt-20">
          <ServicesCarousel/>
        </div>

        {/* Download the app banner */}
        <div className='h-1/2 py-5 mt-20'>
          <div
            className="hero w-full h-96"
            style={{
              backgroundImage: `url(${DownloadappImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-40"></div>
            <div className="hero-content justify-start items-start w-full">
              <div className="max-w-3xl px-6 text-left">         
                {/* Heading */}
                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
                  <span>The only app you need to</span>
                </h1>
                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                  <span>get things done</span>
                </h1>
                <div className="py-6 my-2">
                  <p>From custom guides made just for you effortless</p>
                  <p>project planning. It's all here — in one free app.</p>
                </div>

                {/* Icon */}
                <div className="">
                  <button className="btn border-2 bg-black border-white lg:w-28 m-t-4 mb-4 mr-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-orange-600">
                    <Link to="/lucid_website_test">
                      <img
                        src={downloadBtn_1}
                        alt="app store download button"
                        className="h-20 w-24 object-contain"
                      />
                    </Link>
                  </button>
                  <button className="btn border-2 bg-black border-white lg:w-28 m-t-4 mb-4 mr-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-orange-600">
                    <Link to="/lucid_website_test">
                      <img
                        src={downloadBtn_2}
                        alt="playstore download button"
                        className="h-20 w-24 object-contain"
                      />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services you might also like Section*/}
        <div className="mt-20">
          <ServicesCarousel/>
        </div>

        <div className="w-full">
          <BusinessCategorySection 
            serviceIcons={serviceIcons}
            businessCards={businessCards}
            businessServices={businessServices}
          />
        </div>

      </section>
      <BackToTop/>
    </div>
  );
};

export default Services;