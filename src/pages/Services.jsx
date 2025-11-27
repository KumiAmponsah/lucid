import React, { useState, useEffect } from 'react';
import ServicesCarousel from '../components/servicePage_carousel.jsx';
import { Link } from 'react-router-dom';
import DownloadappImage from "../assets/app.jpg";
import downloadBtn_1 from "../assets/download.png";
import downloadBtn_2 from "../assets/web-189884714.jpg";
import BackgroundImage from "../assets/home_section.jpg";
import iconHome from "/src/assets/home.png"
import iconHomeRepair from "../assets/home-repair.png";
import iconCar from "../assets/car.png";
import iconMechanic from "../assets/mechanic.png";
import iconConstruction from "../assets/constructionicon.png";
import iconMore from "../assets/more.png";
import iconMap from "../assets/map.png";
import BackToTop from '../components/back_the_top_btn.jsx';


const Services = () => {
  const services = [
    { icon: 'electric.png', name: 'Electrician' },
    { icon: 'clean.png', name: 'Cleaners' },
    { icon: 'car.png', name: 'Moving' },
    { icon: 'bin.png', name: 'Trash Collector' },
    { icon: 'paint.png', name: 'Painting' },
    { icon: 'plumb.png', name: 'Plumber' },
    { icon: 'mechanic.png', name: 'Mechanic' },
    { icon: 'event.png', name: 'Event setup' }
  ];

  const serviceIcons = [
    { id: 1, icon: iconHomeRepair, name: 'Home repairs' },
    { id: 2, icon: iconCar, name: 'Moving' },
    { id: 3, icon: iconMechanic, name: 'Auto repairs' },
    { id: 4, icon: iconConstruction, name: 'Construction' }
  ];
  
  const businessCards = {
    'Home repairs': {
      cat: 'Home repairs',
      mainCardBackground: BackgroundImage,
      cardIcon: iconHome,
      heading: 'Maintenance and painting business',
      seeAll: 'See all maintenance'
    },
    'Moving': {
      cat: 'Moving',
      mainCardBackground: BackgroundImage,
      cardIcon: iconCar,
      heading: 'Moving and relocation services',
      seeAll: 'See all moving services'
    },
    'Auto repairs': {
      cat: 'Auto repairs',
      mainCardBackground: BackgroundImage,
      cardIcon: iconMechanic,
      heading: 'Professional auto repair services',
      seeAll: 'See all auto services'
    },
    'Construction': {
      cat: 'Construction',
      mainCardBackground: BackgroundImage,
      cardIcon: iconConstruction,
      heading: 'Construction and renovation',
      seeAll: 'See all construction services'
    }
  };

  const businessServices = [
    { cat:'Home repairs', image: 'glasses.jpg', title: 'House Cleaning', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Home repairs', image: 'handy.jpg', title: 'Handy Man', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Home repairs', image: 'painter.jpg', title: 'Interior painting', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Moving', image: 'glasses.jpg', title: 'Packing Services', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Moving', image: 'handy.jpg', title: 'Furniture Moving', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Moving', image: 'painter.jpg', title: 'Storage Solutions', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Auto repairs', image: 'glasses.jpg', title: 'Engine Repair', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Auto repairs', image: 'handy.jpg', title: 'Brake Service', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Auto repairs', image: 'painter.jpg', title: 'Oil Change', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Construction', image: 'glasses.jpg', title: 'Building Construction', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Construction', image: 'handy.jpg', title: 'Renovation', subtitle: 'See workers near you', icon: 'map.png' },
    { cat:'Construction', image: 'painter.jpg', title: 'Roofing', subtitle: 'See workers near you', icon: 'map.png' },
  ];

  const [activeCategory, setActiveCategory] = useState('Home repairs');
  
  const currentBusinessCard = businessCards[activeCategory];
  const filteredServices = businessServices.filter(service => service.cat === activeCategory);

  return (
    <div className="w-full min-h-screen relative">      
      {/* Header Section with complex image layout */}
      <header className="w-full relative overflow-visible">
        <div className="relative w-full h-[50vh] overflow-visible">
          {/* Main background */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[1]"
            style={{ backgroundImage: "url('/src/assets/head.jpg')" }}
          ></div>
          
          {/* Left image stack */}
          <div className="absolute top-0 left-0 w-[200px] h-full z-[2] hidden md:block">
            <img src="/src/assets/left.jpg" alt="Left" className="absolute top-5 left-5 w-[200px] h-[280px] object-cover z-[3] rounded-sm" />
            <img src="/src/assets/lefttop.jpg" alt="Left Top" className="absolute top-2.5 left-[170px] w-[150px] h-[90px] object-cover z-[4] rounded-sm shadow-lg drop-shadow-lg" />
            <img src="/src/assets/leftbottom.jpg" alt="Left Bottom" className="absolute top-[230px] left-1.5 w-[130px] h-[90px] object-cover z-[10] rounded-sm translate-y-10 shadow-lg drop-shadow-lg" />
            <img src="/src/assets/leftdown.jpg" alt="Left Down" className="absolute top-[310px] left-[170px] w-[150px] h-[90px] object-cover z-[5] rounded-sm shadow-lg drop-shadow-lg" />
          </div>
          
          {/* Main title and search */}
          <div className="relative w-full h-full flex flex-col items-center justify-center md:justify-center pt-0 md:pt-8 z-[3]">
            <h1 className="text-orange-500 text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-8 whitespace-normal md:whitespace-nowrap px-5">
              Lucid is here for you
            </h1>
            
            {/* Search Bar */}
            <div className="w-[95%] md:w-[80%] max-w-[672px] z-[3] flex flex-col items-center">
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
      </header>
      
      {/* Our Services Section */}
      <section className="bg-white py-20 relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-5 mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-black">Popular services</span>
            <span className="text-blue-700"> near you</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 max-w-[1200px] mx-auto px-5">
          {services.map((service, index) => (
            <Link to="/category" key={index}>
              <div className="bg-white border-2 border-blue-700 rounded-xl p-10 md:py-10 md:px-5 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer min-h-[150px] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/20 hover:border-blue-600 group">
                <div className="w-20 h-20 mb-6 flex items-center justify-center">
                  <img 
                    src={`/src/assets/${service.icon}`} 
                    alt={service.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-blue-700 text-xl font-semibold text-center leading-relaxed transition-colors duration-300 group-hover:text-blue-600">
                  {service.name}
                </span>
              </div>
            </Link>
          ))}
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
                    <Link to="/">
                      <img
                        src={downloadBtn_1}
                        alt="app store download button"
                        className="h-20 w-24 object-contain"
                      />
                    </Link>
                  </button>
                  <button className="btn border-2 bg-black border-white lg:w-28 m-t-4 mb-4 mr-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-orange-600">
                    <Link to="/">
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

        {/* Category Buttons - Large screens */}
        <div className="hidden md:block mt-16 pb-6">
          <div className="flex justify-center items-center gap-16 max-w-3xl mx-auto px-16">
            {serviceIcons.map((category) => (
              <div key={category.id} className="flex flex-col items-center gap-2">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  {/* Light gray shadow layer - changes to orange when active */}
                  <div className={`absolute top-0 left-5 right-2 w-12 h-12 rounded-lg transition-colors duration-300 ${
                    activeCategory === category.name ? 'bg-orange-300' : 'bg-gray-300'
                  }`}></div>
        
                  {/* Dark button layer - changes to orange when active */}
                  <button 
                    onClick={() => setActiveCategory(category.name)}
                    className={`relative top-2 left-1 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      activeCategory === category.name 
                        ? 'bg-orange-600 hover:bg-orange-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <img 
                      src={category.icon}
                      alt={category.name}
                      className="w-7 h-7 brightness-0 invert"
                    />
                  </button>
                </div>
        
                {/* Text - changes color and weight when active */}
                <p className={`text-center text-sm mt-3 transition-colors duration-300 ${
                  activeCategory === category.name ? 'text-orange-600 font-semibold' : 'text-black'
                }`}>{category.name}</p>
              </div>
            ))}
            
            {/* Static more button */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <div className="absolute top-0 left-5 right-2 w-12 h-12 bg-gray-300 rounded-lg"></div>
                <button className="relative top-2 left-1 w-12 h-12 bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center justify-center transition-all duration-300">
                  <img 
                    src={iconMore}
                    alt='more'
                    className="w-7 h-7 brightness-0 invert"
                  />
                </button>
              </div>
              <p className="text-center text-sm mt-3 text-black">More</p>
            </div>
          </div>
        </div>
        
        {/* Category Buttons - Small screens (Carousel) */}
        <div className="block md:hidden mt-10 pb-4 overflow-x-auto">
          <div className="flex gap-6 px-4 min-w-max snap-x snap-mandatory scroll-smooth">
            {serviceIcons.map((category) => (
              <div 
                key={category.id} 
                className="flex flex-col items-center gap-2 snap-center"
              >
                <div className="relative w-16 h-16">
                  <div className={`absolute top-0 left-6 right-2 w-12 h-12 rounded-lg transition-colors duration-300 ${
                    activeCategory === category.name ? 'bg-orange-300' : 'bg-gray-300'
                  }`}></div>
                  
                  <button 
                    onClick={() => setActiveCategory(category.name)}
                    className={`absolute btn btn-square top-3 left-3 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      activeCategory === category.name 
                        ? 'bg-orange-600 hover:bg-orange-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <img 
                      src={category.icon}
                      alt={category.name}
                      className="w-6 h-6 brightness-0 invert"
                    />
                  </button>
                </div>
                <p className={`text-center text-xs mt-2 transition-colors duration-300 ${
                  activeCategory === category.name ? 'text-orange-600 font-semibold duration-300' : 'text-black'
                }`}>{category.name}</p>
              </div>
            ))}
            
            {/* Static more button */}
            <div className="flex flex-col items-center gap-2 snap-center">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-6 right-2 w-12 h-12 bg-gray-300 rounded-lg"></div>
                <button className="absolute btn btn-square top-3 left-3 w-12 h-12 bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center justify-center transition-colors duration-300">
                  <img 
                    src={iconMore}
                    alt='More'
                    className="w-7 h-7 brightness-0 invert"
                  />
                </button>
              </div>
              <p className="text-center text-xs mt-2 text-black">More</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider max-w-7xl mx-auto mb-10 max-h-px bg-gray-300"></div>
        
        {/* Business Section */}
        <div className="max-w-6xl mx-auto mt-4 px-5">
          {/* Main Business Card */}
          <div className="transition-opacity duration-[800ms] ease-in-out">
            <Link to="/category">
              <div className="card relative w-full mb-8 overflow-hidden hover:shadow-xl transition-shadow rounded-t-xl rounded-b-none">
                <div
                  className="relative h-56"
                  style={{
                    backgroundImage: `url(${currentBusinessCard.mainCardBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Content */}
                  <div className="absolute inset-0 flex justify-start items-start w-full">
                    <div className="max-w-3xl px-6 text-left mt-6">
                      {/* Icon */}
                      <div className="my-4">
                        <img 
                          alt="Category Icon"
                          className="w-10 h-10 drop-shadow-lg"
                          src={currentBusinessCard.cardIcon}
                        />
                      </div>

                      {/* Heading */}
                      <h1 className="text-lg md:text-2xl font-bold text-white leading-tight drop-shadow-lg">
                        {currentBusinessCard.heading}
                      </h1>

                      <p className="text-white text-base md:text-lg drop-shadow-md">
                        We are here for you
                      </p>
                      <p className="text-orange-600 text-base md:text-base hover:text-blue-700 mt-6 drop-shadow-md">
                        {currentBusinessCard.seeAll}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Business Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 transition-opacity duration-500 ease-in-out">
            {filteredServices.map((service, index) => (
              <Link to="/category" key={index}>
                <div className={`card bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-none overflow-hidden 
                  ${index === 0 ? 'md:rounded-bl-xl' : index === 2 ? 'md:rounded-br-xl' : ''}`}>
                  <figure>
                    <img 
                      src={`/src/assets/${service.image}`} 
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h4 className="card-title text-lg font-semibold text-black">
                      {service.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-black">
                      <img 
                        src={iconMap} 
                        alt="Map" 
                        className="w-5 h-5"
                      />
                      <span>{service.subtitle}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BackToTop/>
    </div>
  );
};

export default Services;