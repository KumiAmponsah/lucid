import React, { useState } from 'react';
import Section1 from "./home_sections.jsx";
import BackgroundImage from "../assets/background.png"
import BackToTop from '../components/back_the_top_btn';
import { FaTruck, FaBroom, FaWrench, FaTshirt, FaPaintRoller, FaBoxes, FaScrewdriver, FaEllipsisH } from 'react-icons/fa';

function Home() {

  const serviceIcons = [
    { id: 1, name: 'Moving', icon: FaTruck },
    { id: 2, name: 'Cleaning', icon: FaBroom },
    { id: 3, name: 'Repair', icon: FaWrench },
    { id: 4, name: 'Painting', icon: FaPaintRoller },
    { id: 5, name: 'Laundry', icon: FaTshirt },
    { id: 6, name: 'Delivery', icon: FaBoxes },
    { id: 7, name: 'Assembly', icon: FaScrewdriver },
  ];

  return (
    <>
      <div className="flex flex-col lg:min-h-screen bg-gray-300">
        <div
          className="hero flex-1 w-full min-h-[29rem]"
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-transparent"></div>
          <div className="hero-content w-full text-neutral-content text-center px-4 sm:px-6">
            <div className="w-full max-w-4xl">
              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-black leading-tight mb-4 sm:mb-6">
                Trusted help,<br />
                <span className="block">when and how you need it.</span>
              </h1>

              {/* Paragraph */}
              <p className="text-base sm:text-base md:text-lg text-black leading-relaxed mb-8 px-4">
                <span className="text-orange-600 font-semibold">Connect</span> with{" "}
                <span className="text-orange-600 font-semibold">trusted workers</span> in
                your neighbourhood for home repairs, cleaning, moving, and more. Get
                started instantly.
              </p>

              {/* Search Bar */}
              <div className="mt-8 sm:mt-12 flex justify-center px-4">
                <div className="flex w-full max-w-2xl rounded-full shadow-lg overflow-hidden bg-white border-2 border-blue-700">
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="flex-grow px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-black bg-white placeholder-gray-500 focus:outline-none"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-r-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="sm:w-6 sm:h-6">
                      <path fill="#fff" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Category Buttons - Desktop Grid */}
              <div className="hidden lg:block mt-12 lg:mt-14 pb-6 w-full">
                <div className="grid grid-cols-4 gap-4 lg:grid-cols-8 justify-items-center">
                  {serviceIcons.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div key={category.id} className="flex flex-col items-center gap-2">
                        <div className="relative w-16 h-16">
                          <div className="absolute top-0 left-6 right-2 w-12 h-12 rounded-lg bg-blue-300 transition-colors duration-300"></div>
                          
                          <button 
                            className="absolute btn btn-square top-3 left-3 w-12 h-12 rounded-lg bg-blue-700 hover:bg-blue-300 flex items-center justify-center transition-colors duration-300"
                          >
                            <IconComponent size={20} className="text-white" />
                          </button>
                        </div>
                        <p className="text-center text-xs mt-1 text-blue-700 transition-colors duration-300">{category.name}</p>
                      </div>
                    );
                  })}
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-16 h-16">
                      <div className="absolute top-0 left-6 right-2 w-12 h-12 bg-gray-300 rounded-lg"></div>
                      <button className="absolute btn btn-square top-3 left-3 w-12 h-12 bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center justify-center transition-colors duration-300">
                        <FaEllipsisH size={20} className="text-white" />
                      </button>
                    </div>
                    <p className="text-center text-xs mt-1 text-black">More</p>
                  </div>
                </div>
                {/* Divider */}
      <div className="divider max-w-7xl mx-auto mb-10 max-h-px bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Buttons - Mobile Scroll */}
        <div className="block lg:hidden w-full bg-white py-6">
          <div className="overflow-x-auto scrollbar-hide md:justify-items-center">
            <div className="flex gap-4 px-4 pb-2">
              {serviceIcons.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div 
                    key={category.id} 
                    className="flex flex-col items-center gap-2 flex-shrink-0"
                  >
                    <div className="relative w-16 h-16">
                      <div className="absolute top-0 left-6 right-2 w-12 h-12 rounded-lg bg-blue-300 transition-colors duration-300"></div>
                      
                      <button 
                        className="absolute btn btn-square top-3 left-3 w-12 h-12 rounded-lg bg-blue-700 hover:bg-blue-300 flex items-center justify-center transition-colors duration-300"
                      >
                        <IconComponent size={20} className="text-white" />
                      </button>
                    </div>
                    <p className="text-center text-xs transition-colors text-black duration-300 whitespace-nowrap">{category.name}</p>
                  </div>
                );
              })}
              
              {/* Static more button */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-6 right-2 w-12 h-12  bg-blue-300   rounded-lg"></div>
                  <button className="absolute btn btn-square top-3 left-3 w-12 h-12  rounded-lg bg-blue-700 hover:bg-blue-300 flex items-center justify-center transition-colors duration-300">
                    <FaEllipsisH size={20} className="text-white" />
                  </button>
                </div>
                <p className="text-center text-xs text-black whitespace-nowrap">More</p>
              </div>
            </div>
          </div>
          {/* Divider */}
      <div className="divider max-w-7xl mx-auto mb-10 max-h-px bg-gray-300"></div>
        </div>
      </div>
      <Section1/>
      <BackToTop/>
    </>
  );
}

export default Home;