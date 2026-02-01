import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Hammer, House, Zap, Truck, Trash2, PaintRoller, Wrench, Settings, Cake } from 'lucide-react';
import ServicesCarousel from '../components/servicePage_carousel.jsx';
import BackToTop from '../components/back_the_top_btn.jsx';
import BusinessCategorySection from '../components/suggested_category.jsx';
import { DownloadSection } from '../components/download_ad.jsx';

// Images
import BackgroundImage0 from "../assets/head.jpg";
import BackgroundImage1 from "../assets/143147.jpg";
import BackgroundImage2 from "../assets/delivery.jpg";
import BackgroundImage3 from "../assets/leftdown.jpg";
import BackgroundImage4 from "../assets/carpentry.jpg";
import homerepair from "../assets/cleaners.jpg";
import moving from "../assets/delivery.jpg";
import autorepair from "../assets/carmechanic.jpg";
import construction from "../assets/carpenterlady.jpg";
import galleryBanner1 from "../assets/left.jpg";
import galleryBanner2 from "../assets/lefttop.jpg";
import galleryBanner3 from "../assets/leftbottom.jpg";
import galleryBanner4 from "../assets/leftdown.jpg";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};



// Memoized Components
const ServiceCard = memo(({ service, index }) => {
  const IconComponent = service.icon;
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to="/category">
        <motion.div 
          className="bg-white border-2 border-blue-700 rounded-xl p-10 md:py-10 md:px-5 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer max-w-60 min-h-28 max-h-36 group"
          whileHover={{ 
            y: -8, 
            boxShadow: "0 20px 25px -5px rgba(29, 78, 216, 0.2)",
            borderColor: "rgb(37, 99, 235)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="mb-6 flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent size={30} className="text-blue-700" />
          </motion.div>
          <span className="text-blue-700 text-xl font-normal text-center leading-relaxed transition-colors duration-300 group-hover:text-blue-600">
            {service.name}
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
});

const GalleryImage = memo(({ src, alt, className, delay = 0 }) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05, rotate: 2 }}
    loading="lazy"
  />
));

// Data Constants
const SERVICES = [
  { icon: Zap, name: 'Electrician' },
  { icon: Cake, name: 'Cleaners' },
  { icon: Truck, name: 'Moving' },
  { icon: Trash2, name: 'Trash Collector' },
  { icon: PaintRoller, name: 'Painting' },
  { icon: Wrench, name: 'Plumber' },
  { icon: Settings, name: 'Mechanic' },
  { icon: Cake, name: 'Event setup' }
];

const SERVICE_ICONS = [
  { id: 1, icon: House, name: 'Home repairs' },
  { id: 2, icon: Truck, name: 'Moving' },
  { id: 3, icon: Settings, name: 'Auto repairs' },
  { id: 4, icon: Hammer, name: 'Construction' }
];

const BUSINESS_CARDS = {
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

const BUSINESS_SERVICES = [
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
  { cat: 'Construction', image: construction, title: 'Roofing', subtitle: 'See workers near you', icon: 'map.png' }
];

const Services = () => {
  return (
    <div className="w-full min-h-screen relative">
      {/* Header Section */}
      <header className="w-full relative overflow-visible">
        <div className="relative w-full h-[50vh] overflow-visible">
          {/* Main background with overlay */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url(${BackgroundImage0})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Overlay */}
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-20 z-[1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Main title and search */}
            <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-center pt-0 md:pt-8 z-[2]">
              <motion.h1
                className="text-orange-500 text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-8 whitespace-normal md:whitespace-nowrap px-5"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Lucid is here for you
              </motion.h1>

              {/* Search Bar */}
              <motion.div
                className="w-[95%] md:w-[80%] max-w-[672px] flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div 
                  className="flex w-full max-w-[672px] rounded-full overflow-hidden bg-white border-2 border-blue-700 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="flex-grow border-none outline-none px-6 py-3 bg-white text-black text-base placeholder:text-gray-500"
                  />
                  <motion.button 
                    className="bg-blue-600 px-6 py-3 border-none cursor-pointer flex items-center justify-center transition-colors hover:bg-blue-700 rounded-r-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="w-6 h-6 text-white" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Left image stack */}
          <div className="absolute top-0 left-0 w-[200px] h-full z-[3] hidden md:block">
            <GalleryImage 
              src={galleryBanner1} 
              alt="Left" 
              className="absolute top-5 left-5 w-[200px] h-[280px] object-cover z-[4] rounded-sm"
              delay={0.3}
            />
            <GalleryImage 
              src={galleryBanner2} 
              alt="Left Top" 
              className="absolute top-2.5 left-[170px] w-[150px] h-[90px] object-cover z-[5] rounded-sm shadow-lg"
              delay={0.5}
            />
            <GalleryImage 
              src={galleryBanner3} 
              alt="Left Bottom" 
              className="absolute top-[230px] left-1.5 w-[130px] h-[90px] object-cover z-[9] rounded-sm translate-y-10 shadow-lg"
              delay={0.7}
            />
            <GalleryImage 
              src={galleryBanner4} 
              alt="Left Down" 
              className="absolute top-[310px] left-[170px] w-[150px] h-[90px] object-cover z-[6] rounded-sm shadow-lg"
              delay={0.9}
            />
          </div>
        </div>
      </header>

      {/* Popular Services Section */}
      <section className="bg-white py-20 relative z-0">
        <motion.div 
          className="max-w-[1200px] mx-auto px-5 mb-12 text-left"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-black">Popular services</span>
            <span className="text-blue-700"> near you</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 max-w-[1200px] mx-auto px-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>

        {/* Services Carousel */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ServicesCarousel />
        </motion.div>

        {/* Download Section */}
      <DownloadSection />

        {/* Second Services Carousel */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ServicesCarousel />
        </motion.div>

        {/* Business Category Section */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <BusinessCategorySection
            serviceIcons={SERVICE_ICONS}
            businessCards={BUSINESS_CARDS}
            businessServices={BUSINESS_SERVICES}
          />
        </motion.div>
      </section>

      <BackToTop />
    </div>
  );
};

export default memo(Services);