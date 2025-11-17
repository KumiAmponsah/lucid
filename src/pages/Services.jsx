import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import '../styles/services.css';

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

  const recommendedServices = [
    { image: 'work.jpg', name: 'Professional Work' },
    { image: 'cleaners.jpg', name: 'Home Cleaning' },
    { image: 'coder.jpg', name: 'Tech Services' },
    { image: 'carpenterlady.jpg', name: 'Carpentry' },
    { image: 'delivery.jpg', name: 'Fast Delivery' }
  ];

  const exploreServices = [
    { image: 'carpentry.jpg', name: 'Carpentry' },
    { image: 'roommates-cleaning.jpg', name: 'Home Cleaning' },
    { image: 'manufacturing.jpg', name: 'Manufacturing' },
    { image: 'team.jpg', name: 'Team Services' },
    { image: 'electricianguy.jpg', name: 'Electrical Work' },
    { image: 'carmechanic.jpg', name: 'Auto Repair' },
    { image: 'construction.jpg', name: 'Construction' }
  ];

  // New icons data
  const serviceIcons = [
    { icon: 'home-repair.png', name: 'Home repairs' },
    { icon: 'car.png', name: 'Moving' },
    { icon: 'mechanic.png', name: 'Auto repairs' },
    { icon: 'constructionicon.png', name: 'Construction' },
    { icon: 'more.png', name: 'More' }
  ];

  // New business section data
  const businessServices = [
    { 
      image: 'glasses.jpg', 
      title: 'House Cleaning', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { 
      image: 'handy.jpg', 
      title: 'Handy Man', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    },
    { 
      image: 'painter.jpg', 
      title: 'Interior painting', 
      subtitle: 'See workers near you',
      icon: 'map.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [exploreIndex, setExploreIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 480) {
        setSlidesToShow(1);
      } else if (width < 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === recommendedServices.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? recommendedServices.length - slidesToShow : prevIndex - 1
    );
  };

  const nextExploreSlide = () => {
    setExploreIndex((prevIndex) => 
      prevIndex === exploreServices.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  const prevExploreSlide = () => {
    setExploreIndex((prevIndex) => 
      prevIndex === 0 ? exploreServices.length - slidesToShow : prevIndex - 1
    );
  };

  const goToSlide = (index, type) => {
    if (type === 'recommended') {
      setCurrentIndex(index);
    } else {
      setExploreIndex(index);
    }
  };

  return (
    <div className="services-page">
      <Navbar />
      
      {/* Header Section with complex image layout */}
      <div className="services-header">
        <div className="background-container">
          {/* Main background */}
          <div className="head-background"></div>
          
          {/* Left image stack */}
          <div className="left-image-stack">
            <img src="/src/assets/left.jpg" alt="Left" className="left-img" />
            <img src="/src/assets/lefttop.jpg" alt="Left Top" className="lefttop-img" />
            <img src="/src/assets/leftbottom.jpg" alt="Left Bottom" className="leftbottom-img" />
            <img src="/src/assets/leftdown.jpg" alt="Left Down" className="leftdown-img" />
          </div>
          
          {/* Main title */}
          <div className="title-search-container">
            <h1 className="main-title">Lucid is here for you</h1>
            
            {/* Search Bar */}
            <div className="search-container">
              <div className="search-bar-wrapper">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="search-input"
                  />
                  <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#fff" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Services Section */}
      <div className="our-services-section">
        <div className="services-heading-container">
          <h2 className="services-heading">
            <span className="popular-services-text">Popular services</span>
            <span className="near-you-text"> near you</span>
          </h2>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-container">
              <div className="service-icon">
                <img 
                  src={`/src/assets/${service.icon}`} 
                  alt={service.name}
                  className="service-icon-img"
                />
              </div>
              <span className="service-name">{service.name}</span>
            </div>
          ))}
        </div>

        {/* Services you might also like Section */}
        <div className="recommended-services-section">
          <div className="services-heading-container">
            <h2 className="recommended-heading">
              <span className="services-you-might-text">Services you might </span>
              <span className="also-like-text">also like</span>
            </h2>
          </div>
          
          <div className="carousel-container">
            <button className="carousel-button carousel-button-prev" onClick={prevSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="carousel-track">
              <div 
                className="carousel-slide" 
                style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
              >
                {recommendedServices.map((service, index) => (
                  <div key={index} className="service-card">
                    <img 
                      src={`/src/assets/${service.image}`} 
                      alt={service.name}
                      className="service-image"
                    />
                    <span className="service-card-name">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="carousel-button carousel-button-next" onClick={nextSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="carousel-dots">
            {Array.from({ length: recommendedServices.length - slidesToShow + 1 }).map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index, 'recommended')}
              />
            ))}
          </div>
        </div>

        {/* App Section */}
        <div className="app-section">
          <div className="app-background">
            <div className="app-content">
              <div className="app-text-content">
                <h2 className="app-main-heading">
                  <span className="app-heading-part1">The only app you need to</span>
                  <span className="app-heading-part2">get things done</span>
                </h2>
                <div className="app-subtext">
                  <p>From custom guides made just for you effortless</p>
                  <p>project planning. It's all here — in one free app.</p>
                </div>
                <div className="app-download-buttons">
                  <img src="/src/assets/download.png" alt="Download on App Store" className="download-button" />
                  <img src="/src/assets/googleplay.jpg" alt="Get on Google Play" className="download-button" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore more services Section */}
        <div className="explore-services-section">
          <div className="services-heading-container">
            <h2 className="explore-heading">
              <span className="explore-more-text">Explore more </span>
              <span className="explore-services-text">services</span>
            </h2>
          </div>
          
          <div className="carousel-container">
            <button className="carousel-button carousel-button-prev" onClick={prevExploreSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="carousel-track">
              <div 
                className="carousel-slide" 
                style={{ transform: `translateX(-${exploreIndex * (100 / slidesToShow)}%)` }}
              >
                {exploreServices.map((service, index) => (
                  <div key={index} className="service-card">
                    <img 
                      src={`/src/assets/${service.image}`} 
                      alt={service.name}
                      className="service-image"
                    />
                    <span className="service-card-name">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="carousel-button carousel-button-next" onClick={nextExploreSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="carousel-dots">
            {Array.from({ length: exploreServices.length - slidesToShow + 1 }).map((_, index) => (
              <button
                key={index}
                className={`dot ${index === exploreIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index, 'explore')}
              />
            ))}
          </div>

          {/* New Icon Section - Moved below the carousel */}
          <div className="icon-section">
            <div className="icon-container-wrapper">
              {serviceIcons.map((item, index) => (
                <div key={index} className="icon-item">
                  <div className="icon-outer-container">
                    <div className="icon-inner-container">
                      <div className="icon-background">
                        <img 
                          src={`/src/assets/${item.icon}`} 
                          alt={item.name}
                          className="service-icon-image"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="icon-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="section-divider"></div>

          {/* New Business Section */}
          <div className="business-section">
            <div className="business-main-card">
              <img src="/src/assets/chair.jpg" alt="Maintenance Business" className="business-main-image" />
              <div className="business-main-content">
                <div className="business-icon-text">
                  <img src="/src/assets/home.png" alt="Home" className="business-icon" />
                  <div className="business-text-content">
                    <h3 className="business-main-title">Maintenance and painting business</h3>
                    <p className="business-subtitle">We are here for you</p>
                    <p className="business-link">See all maintenance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="business-services-grid">
              {businessServices.map((service, index) => (
                <div key={index} className="business-service-card">
                  <img 
                    src={`/src/assets/${service.image}`} 
                    alt={service.title}
                    className="business-service-image"
                  />
                  <div className="business-service-content">
                    <h4 className="business-service-title">{service.title}</h4>
                    <div className="business-service-subtitle">
                      <img src="/src/assets/map.png" alt="Map" className="map-icon" />
                      <span>{service.subtitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;