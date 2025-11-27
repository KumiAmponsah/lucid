import React, { useState } from 'react'
import BackgroundImage from "../assets/roommates-cleaning.jpg"
import DownloadappImage from "../assets/app.jpg"
import downloadBtn_1 from "../assets/download.png";
import downloadBtn_2 from "../assets/web-189884714.jpg";
import iconHome from "/src/assets/home.png"
import iconHomeRepair from "../assets/home-repair.png";
import iconCar from "../assets/car.png";
import iconMechanic from "../assets/mechanic.png";
import iconConstruction from "../assets/constructionicon.png";
import iconMore from "../assets/more.png";
import iconMap from "../assets/map.png";
import BackToTop from '../components/back_the_top_btn';

import { Link } from 'react-router-dom';

const Selected_service = () => {
  // State to track the active category
  const [activeCategory, setActiveCategory] = useState('Home repairs');

  const categories_1 = [
    {
      id: 1,
      title: "House Cleaning",
      image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 2,
      title: "Interior Painting",
      image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 3,
      title: "Handy Man",
      image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 4,
      title: "House Cleaning",
      image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 5,
      title: "Interior Painting",
      image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 6,
      title: "Handy Man",
      image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
  ];

  const serviceIcons = [
    { id: 1, icon: iconHomeRepair, name: 'Home repairs' },
    { id: 2, icon: iconCar, name: 'Moving' },
    { id: 3, icon: iconMechanic, name: 'Auto repairs' },
    { id: 4, icon: iconConstruction, name: 'Construction' }
  ];
  
  // Business cards object with category as key
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
    { cat:'Home repairs',
      image: 'glasses.jpg', 
      title: 'House Cleaning', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Home repairs',
      image: 'handy.jpg', 
      title: 'Handy Man', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Home repairs',
      image: 'painter.jpg', 
      title: 'Interior painting', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Moving',
      image: 'glasses.jpg', 
      title: 'Packing Services', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Moving',
      image: 'handy.jpg', 
      title: 'Furniture Moving', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Moving',
      image: 'painter.jpg', 
      title: 'Storage Solutions', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Auto repairs',
      image: 'glasses.jpg', 
      title: 'Engine Repair', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Auto repairs',
      image: 'handy.jpg', 
      title: 'Brake Service', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Auto repairs',
      image: 'painter.jpg', 
      title: 'Oil Change', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Construction',
      image: 'glasses.jpg', 
      title: 'Building Construction', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Construction',
      image: 'handy.jpg', 
      title: 'Renovation', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { cat:'Construction',
      image: 'painter.jpg', 
      title: 'Roofing', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
  ];

  // Get current business card and filtered services based on active category
  const currentBusinessCard = businessCards[activeCategory];
  const filteredServices = businessServices.filter(service => service.cat === activeCategory);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Category theme background */}
      <div className='h-1/2'>
        <div
        className="hero w-full h-96"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-40"></div>
        <div className="hero-content justify-start items-start w-full">
          <div className="max-w-3xl px-6 text-left">
            {/* Icon */}
            <div className="mb-4">
              <img 
                alt="Home" 
                className="w-12 h-12 drop-shadow-lg" 
                src="/src/assets/home.png"
              />
            </div>
            
            {/* Heading */}
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              Trusted help, when and how you need it.
            </h1>
            <p className="text-white text-lg md:text-xl drop-shadow-md">
              Connect with verified professionals for all your service needs
            </p>
          </div>
        </div>
      </div>

      </div>
      {/* Breadcrumbs */}
      <div className="container my-4 mx-auto px-6 py-6">
        <div className="breadcrumbs text-sm">
         <ul>
                     <li><Link to="/Service" className="text-black font-semibold hover:text-blue-600 mr-2">Services</Link><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 5l6 7l-6 7"></path>
                     </svg></li>
                     <li><Link to="/category" className="text-black font-semibold hover:text-blue-600 mr-2">Home</Link><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 5l6 7l-6 7"></path>
                     </svg></li>
                     <li><Link to="#" className="text-black">House Cleaning</Link></li>
                   </ul>
        </div>
      </div>

      {/* 1st Cards Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            House Cleaning Services Near You
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the perfect service for you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {categories_1.map((category) => (
            <Link to="#" key={category.id}><div className="card w-full max-w-sm">
            <figure className='rounded-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
              <img
                src={category.image}
                alt="Shoes" 
                className="w-full h-48 object-cover"/>
            </figure>
            <div className="py-6">
                <h2 className="text-black hover:text-blue-700 text-lg font-semibold text-center">{category.title}</h2>
              </div>
            </div></Link> 
        ))}
        </div>
      </div>

      {/* Download the app banner */}
      <div className='h-1/2 py-5'>
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
                    </Link></button>
                <button className="btn border-2 bg-black border-white lg:w-28 m-t-4 mb-4 mr-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-orange-600">
                    <Link to="/">
                       <img
                         src={downloadBtn_2}
                         alt="playstore download button"
                         className="h-20 w-24 object-contain"
                       />
                     </Link></button>
             </div>

          </div>
        </div>
      </div>
      </div>


 <div className="w-full">
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
     {/*static more button*/}
    <div className="flex flex-col items-center gap-2">
        
        <div className="relative w-14 h-14 flex items-center justify-center">
          {/* Light gray shadow layer */}
          <div className="absolute top-0 left-5 right-2 w-12 h-12 bg-gray-300 rounded-lg"></div>

          {/* Dark button layer */}
          <button className="relative top-2 left-1 w-12 h-12 bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center justify-center transition-all duration-300">
            <img 
              src={iconMore}
              alt= 'more'
              className="w-7 h-7 brightness-0 invert"
            />
          </button>
        </div>

        <p className="text-center text-sm mt-3 text-black">More</p>

      </div>
      {/*static more button end*/}
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
          {/* Light gray shadow layer - changes to orange when active */}
          <div className={`absolute top-0 left-6 right-2 w-12 h-12 rounded-lg transition-colors duration-300 ${
            activeCategory === category.name ? 'bg-orange-300' : 'bg-gray-300'
          }`}></div>
          
          {/* Dark gray button on top - changes to orange when active */}
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
        {/* Text - changes color and weight when active */}
        <p className={`text-center text-xs mt-2 transition-colors duration-300 ${
          activeCategory === category.name ? 'text-orange-600 font-semibold duration-300' : 'text-black'
        }`}>{category.name}</p>
      </div>
    ))}
    {/*static more button*/}
    <div className="flex flex-col items-center gap-2 snap-center"
      >
        <div className="relative w-16 h-16">
          {/* Light gray shadow layer */}
          <div className="absolute top-0 left-6 right-2 w-12 h-12 bg-gray-300 rounded-lg"></div>
          
          {/* Dark gray button on top */}
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
 {/*static more button end*/}
{/* Divider */}
      <div className="divider max-w-7xl mx-auto mb-10 max-h-px bg-gray-300"></div>
      
      {/* Business Section */}
      <div className="max-w-6xl mx-auto mt-4 px-5">
        {/* Main Business Card with smooth transition */}
        <div className="transition-opacity duration-800 ease-in-out">
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

        {/* Business Services Grid with smooth transition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 transition-opacity duration-500 ease-in-out">
          {filteredServices.map((service, index) => (
            <Link to="/category" key={index}>
              <div className={`card bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-none overflow-hidden 
              ${
                      index === 0 ? 'md:rounded-bl-xl' : 
                      index === 2 ? 'md:rounded-br-xl' : ''
                    }`}>
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
    </div>

<BackToTop/>
    </div>
  )
}

export default Selected_service