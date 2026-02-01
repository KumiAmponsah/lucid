import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Su_slide1 from '../assets/carpentry.jpg';         
import Su_slide2 from '../assets/roommates-cleaning.jpg';
import Su_slide3 from '../assets/manufacturing.jpg';     
import Su_slide4 from '../assets/team.jpg';              
import Su_slide5 from '../assets/electricianguy.jpg';    
import Su_slide6 from '../assets/carmechanic.jpg';       
import Su_slide7 from '../assets/construction.jpg';      
export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const exploreServices = [
    { image: Su_slide1, name: 'Carpentry', category1:'/category' },
    { image: Su_slide2, name: 'Home Cleaning', category1:'/category' },
    { image: Su_slide3, name: 'Manufacturing', category1:'/category' },
    { image: Su_slide4, name: 'Team Services', category1:'/category' },
    { image: Su_slide5, name: 'Electrical Work', category1:'/category' },
    { image: Su_slide6, name: 'Auto Repair', category1:'/category' },
    { image: Su_slide7, name: 'Construction', category1:'/category' }
  ];

  const getVisibleCards = () => {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  React.useEffect(() => {
    const handleResize = () => setVisibleCards(getVisibleCards());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, exploreServices.length - visibleCards);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getImageUrl = (filename) => {
    return `https://images.unsplash.com/photo-${
      filename === Su_slide1 ? '1504253163759-c23fccaebb55' :
      filename === Su_slide2 ? '1581578731548-c64695cc6952' :
      filename === Su_slide3 ? '1565043589221-1a6fd9ae45c7' :
      filename === Su_slide4 ? '1522071820081-009f0129c71c' :
      filename === Su_slide5 ? '1621905251918-48416bd8575a' :
      filename === Su_slide6 ? '1486262715619-e3fc9c15c3cd' :
      '1503387762-592deb58ef4e'
    }?w=400&h=300&fit=crop`;
  };

  return (
    <div className="p-8 lg:mx-10">
      <div className="py-8">
      <div className="text-left mb-8">
        <h2 className="text-3xl font-bold">
          <span className="text-black">Services you might </span>
          <span className="text-primary">also like</span>
        </h2>
      </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
              }}
            >
              {exploreServices.map((service, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                    <Link to={service.category1}>
                  <div className="card my-6 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                    <figure className="relative overflow-hidden h-48">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </figure>
                    <div className="card-body p-6">
                      <h3 className="card-title text-xl font-semibold text-black justify-center">
                        {service.name}
                      </h3>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute bg-white -left-4 top-1/2 -translate-y-1/2 -translate-x-4 btn btn-circle btn-primary shadow-lg hover:scale-110 transition-transform"
            aria-label="Previous"
          >
            <ChevronLeft  color="black" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute bg-white -right-4 top-1/2 -translate-y-1/2 translate-x-4 btn btn-circle btn-primary shadow-lg hover:scale-110 transition-transform"
            aria-label="Next"
          >
            <ChevronRight color="black" size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8 md:mt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-primary w-8' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}