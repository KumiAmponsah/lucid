import React, { useState } from 'react'
import BackgroundImage from "../assets/roommates-cleaning.jpg"
import BackgroundImage1 from "../assets/143147.jpg"
import BackgroundImage2 from "../assets/delivery.jpg"
import BackgroundImage3 from "../assets/leftdown.jpg"
import BackgroundImage4 from "../assets/carpentry.jpg"
import homerepair from "../assets/cleaners.jpg"
import moving from "../assets/delivery.jpg"
import autorepair from "../assets/carmechanic.jpg"
import construction from "../assets/carpenterlady.jpg"
import DownloadappImage from "../assets/app.jpg"
import downloadBtn_1 from "../assets/download.png";
import downloadBtn_2 from "../assets/web-189884714.jpg";
import BackToTop from '../components/back_the_top_btn.jsx';
import ProfileCard from '../components/user_card.jsx';
import BusinessCategorySection from '../components/suggested_category.jsx';
import { Link } from 'react-router-dom';
import { Hammer, House, Truck, Settings } from 'lucide-react';
import { FaBroom } from 'react-icons/fa';

const Selected_service = () => {

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


  //profiles for display
  const profiles = [
    {
      name: "Sarah Johnson",
      role: "Cleaner",
      location: "East Legon, Accra",
      rating: 2.5,
      image: null
    },
    {
      name: "Michael Osei",
      role: "Cleaner",
      location: "Madina, Accra",
      rating: 2.0,
      image: null
    },
    {
      name: "Sarah Johnson",
      role: "Cleaner",
      location: "East Legon, Accra",
      rating: 4.5,
      image: null
    },
    {
      name: "Michael Osei",
      role: "Cleaner",
      location: "Madina, Accra",
      rating: 1.6,
      image: null
    },
    {
      name: "Sarah Johnson",
      role: "Cleaner",
      location: "East Legon, Accra",
      rating: 4.5,
      image: null
    },
    {
      name: "Michael Osei",
      role: "Cleaner",
      location: "Madina, Accra",
      rating: 5.0,
      image: null
    },
    {
      name: "Sarah Johnson",
      role: "Cleaner",
      location: "East Legon, Accra",
      rating: 4.5,
      image: null
    },
    {
      name: "Michael Osei",
      role: "Cleaner",
      location: "Madina, Accra",
      rating: 5.0,
      image: null
    },
    {
      name: "Sarah Johnson",
      role: "Cleaner",
      location: "East Legon, Accra",
      rating: 4.5,
      image: null
    },
    {
      name: "Michael Osei",
      role: "Cleaner",
      location: "Madina, Accra",
      rating: 4.2,
      image: null
    },
    {
      name: "Sarah Johnson",
      role: "Cleaner",
      location: "East Legon, Accra",
      rating: 2.6,
      image: null
    },
    {
      name: "Michael Osei",
      role: "Cleaner",
      location: "Madina, Accra",
      rating: 1.8,
      image: null
    },
    {
      name: "Sarah Johnson",
      role: "Cleaner",
      location: "East Legon, Accra",
      rating: 4.8,
      image: null
    },
    {
      name: "Michael Osei",
      role: "Cleaner",
      location: "Madina, Accra",
      rating: 2.7,
      image: null
    },
    {
      name: "Sarah Johnson",
      role: "Cleaner",
      location: "East Legon, Accra",
      rating: 4.5,
      image: null
    },
    {
      name: "Michael Osei",
      role: "Cleaner",
      location: "Madina, Accra",
      rating: 5.0,
      image: null
    },
  ];

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
              <FaBroom size={46} className="text-white" />
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

         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {profiles.map((profile, index) => (
            <ProfileCard 
              key={index} 
              {...profile}
              onViewProfile={() => console.log('View profile:', profile.name)}
            />
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
<BusinessCategorySection 
  serviceIcons={serviceIcons}
  businessCards={businessCards}
  businessServices={businessServices}
/>    </div>

<BackToTop/>
    </div>
  )
}

export default Selected_service