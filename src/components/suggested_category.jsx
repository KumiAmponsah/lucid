// -------------------------------------------------------------
// BusinessCategorySection Component
// -------------------------------------------------------------
// This component renders a dynamic category selector (icons),
// a dynamic hero card, and a grid of services based on
// the selected category.
//
// PROPS REQUIRED:
//
// 1. serviceIcons:
//    - Array of objects representing the categories displayed as icons
//    - Each object MUST have: id, name, icon (React component)
//      Example:
//      const serviceIcons = [
//      { id: 1, icon: FaScrewdriver, name: 'Home repairs' },
//     { id: 2, icon: FaTruck, name: 'Moving' },
//      { id: 3, icon: FaPaintRoller, name: 'Auto repairs' },
//      { id: 4, icon: FaWrench, name: 'Construction' }
//    ];
//
// 2. businessCards:
//    - Object containing hero-card data for each category
//    - Keys MUST match the `name` values used in serviceIcons
//      Example:
//      const businessCards = {
//      'Home repairs': {
//        cat: 'Home repairs',
//        mainCardBackground: BackgroundImage,
//        cardIcon: FaScrewdriver,
//        heading: 'Maintenance and painting business',
//        seeAll: 'See all maintenance'
//      }};
//
// 3. businessServices:
//    - Array of services displayed in the grid below
//    - Each object MUST include a `cat` field that matches a category name
//      Example:
//      const businessServices = [
//    { cat:'Home repairs',
//      image: 'glasses.jpg', 
//      title: 'House Cleaning', 
//      subtitle: 'See workers near you',
//      icon: 'map.png'
//    }];
//
// DYNAMIC BEHAVIOR:
// - Clicking a category icon updates `activeCategory`
// - Hero card updates based on selected category
// - The list of services filters automatically by category
// -------------------------------------------------------------

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {MapPin} from "lucide-react";
import { FaEllipsisH } from 'react-icons/fa';


const BusinessCategorySection = ({ 
  serviceIcons, 
  businessCards, 
  businessServices,
}) => {
  const [activeCategory, setActiveCategory] = useState(serviceIcons[0]?.name || 'Home repairs');
  
  const currentBusinessCard = businessCards[activeCategory];
  const filteredServices = businessServices.filter(service => service.cat === activeCategory);
  
  // Get the icon component for the current category
  const CurrentIconComponent = currentBusinessCard?.cardIcon;

  return (
    <>
      {/* Category Buttons - Large screens */}
      <div className="hidden md:block mt-16 pb-6">
        <div className="flex justify-center items-center gap-16 max-w-3xl mx-auto px-16">
           {serviceIcons.map((category) => {
            const IconComponent = category.icon;
            return (
            <div key={category.id} className="flex flex-col items-center gap-2">
              <div className="relative w-14 h-14 flex items-center justify-center">
                {/* Light gray shadow layer - changes to orange when active */}
                <div className={`absolute top-0 left-5 right-2 w-12 h-12 rounded-lg transition-colors duration-300 ${
                  activeCategory === category.name ? 'bg-orange-300' : 'bg-blue-300'
                }`}></div>

                {/* Dark button layer - changes to orange when active */}
                <button 
                  onClick={() => setActiveCategory(category.name)}
                  className={`relative top-2 left-1 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeCategory === category.name 
                      ? 'bg-orange-600 hover:bg-orange-700' 
                      : 'bg-blue-700 hover:bg-blue-300'
                  }`}
                >
                  <IconComponent size={20} className="text-white" />
                </button>
              </div>

              {/* Text - changes color and weight when active */}
              <p className={`text-center text-xs mt-3 transition-colors duration-300 ${
                activeCategory === category.name ? 'text-orange-600 font-semibold' : 'text-black'
              }`}>{category.name}</p>
            </div>);
           })}
          
          {/* Static more button */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute top-0 left-5 right-2 w-12 h-12 bg-blue-300 rounded-lg"></div>
              <button className="relative top-2 left-1 w-12 h-12 bg-blue-700 rounded-lg hover:bg-blue-300 flex items-center justify-center transition-all duration-300">
                <FaEllipsisH size={20} className="text-white" />
              </button>
            </div>
            <p className="text-center text-sm mt-3 text-black">More</p>
          </div>
        </div>
      </div>

      {/* Category Buttons - Small screens (Carousel) */}
      <div className="block md:hidden mt-10 pb-4 overflow-x-auto">
        <div className="flex gap-6 px-4 min-w-max snap-x snap-mandatory scroll-smooth">
          {serviceIcons.map((category) => {
            const IconComponent = category.icon;
            return (<div 
              key={category.id} 
              className="flex flex-col items-center gap-2 snap-center"
            >
              <div className="relative w-16 h-16">
                <div className={`absolute top-0 left-6 right-2 w-12 h-12 rounded-lg transition-colors duration-300 ${
                  activeCategory === category.name ? 'bg-orange-300' : 'bg-blue-300'
                }`}></div>
                
                <button 
                  onClick={() => setActiveCategory(category.name)}
                  className={`absolute btn btn-square top-3 left-3 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    activeCategory === category.name 
                      ? 'bg-orange-600 hover:bg-orange-700' 
                      : 'bg-blue-700 hover:bg-blue-300'
                  }`}
                >
                 <IconComponent size={20} className="text-white" />
                </button>
              </div>
              <p className={`text-center text-xs mt-2 transition-colors duration-300 ${
                activeCategory === category.name ? 'text-orange-600 font-semibold duration-300' : 'text-black'
              }`}>{category.name}</p>
            </div>);
          })}
          
          {/* Static more button */}
          <div className="flex flex-col items-center gap-2 snap-center">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-6 right-2 w-12 h-12 bg-blue-300 rounded-lg"></div>
              <button className="absolute btn btn-square top-3 left-3 w-12 h-12 bg-blue-700 rounded-lg hover:bg-blue-300 flex items-center justify-center transition-colors duration-300">
                <FaEllipsisH size={20} className="text-white" />
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
                    {CurrentIconComponent && (
                      <div className="my-4">
                        <CurrentIconComponent size={28} className="text-white" />
                      </div>
                    )}

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
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h4 className="card-title text-lg font-semibold text-black">
                    {service.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-black">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{service.subtitle}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BusinessCategorySection;