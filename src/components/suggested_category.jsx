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

import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from "lucide-react";
import { FaEllipsisH } from 'react-icons/fa';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
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

// Memoized Category Button Component
const CategoryButton = memo(({ category, isActive, onClick, index }) => {
  const IconComponent = category.icon;
  
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        <motion.div
          className={`absolute top-0 left-5 right-2 w-12 h-12 rounded-lg transition-colors duration-300 ${
            isActive ? 'bg-orange-300' : 'bg-blue-300'
          }`}
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />

        <motion.button
          onClick={onClick}
          className={`relative top-2 left-1 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isActive
              ? 'bg-orange-600 hover:bg-orange-700'
              : 'bg-blue-700 hover:bg-blue-300'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.1 }}
        >
          <IconComponent size={20} className="text-white" />
        </motion.button>
      </div>

      <p
        className={`text-center text-xs mt-3 transition-colors duration-300 ${
          isActive ? 'text-orange-600 font-semibold' : 'text-black'
        }`}
      >
        {category.name}
      </p>
    </motion.div>
  );
});

// Memoized Mobile Category Button Component
const MobileCategoryButton = memo(({ category, isActive, onClick }) => {
  const IconComponent = category.icon;
  
  return (
    <div className="flex flex-col items-center gap-2 snap-center">
      <div className="relative w-16 h-16">
        <motion.div
          className={`absolute top-0 left-6 right-2 w-12 h-12 rounded-lg transition-colors duration-300 ${
            isActive ? 'bg-orange-300' : 'bg-blue-300'
          }`}
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        />

        <motion.button
          onClick={onClick}
          className={`absolute btn btn-square top-3 left-3 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            isActive
              ? 'bg-orange-600 hover:bg-orange-700'
              : 'bg-blue-700 hover:bg-blue-300'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <IconComponent size={20} className="text-white" />
        </motion.button>
      </div>
      <p
        className={`text-center text-xs mt-2 transition-colors duration-300 ${
          isActive ? 'text-orange-600 font-semibold' : 'text-black'
        }`}
      >
        {category.name}
      </p>
    </div>
  );
});

// Memoized More Button Component
const MoreButton = memo(({ isMobile = false }) => (
  <div className="flex flex-col items-center gap-2 snap-center">
    <div className={`relative ${isMobile ? 'w-16 h-16' : 'w-14 h-14'} flex items-center justify-center`}>
      <div className={`absolute top-0 ${isMobile ? 'left-6' : 'left-5'} right-2 w-12 h-12 bg-blue-300 rounded-lg`} />
      <motion.button
        className={`${isMobile ? 'absolute btn btn-square top-3 left-3' : 'relative top-2 left-1'} w-12 h-12 bg-blue-700 rounded-lg hover:bg-blue-300 flex items-center justify-center transition-all duration-300`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaEllipsisH size={20} className="text-white" />
      </motion.button>
    </div>
    <p className={`text-center ${isMobile ? 'text-xs mt-2' : 'text-sm mt-3'} text-black`}>More</p>
  </div>
));

// Memoized Service Card Component
const ServiceCard = memo(({ service, index }) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Link to="/category">
      <motion.div
        className={`card bg-white transition-all duration-300 rounded-none overflow-hidden 
          ${index === 0 ? 'md:rounded-bl-xl' : index === 2 ? 'md:rounded-br-xl' : ''}`}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <figure>
          <motion.img
            src={service.image}
            alt={service.title}
            className="w-full h-48 object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
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
      </motion.div>
    </Link>
  </motion.div>
));

const BusinessCategorySection = ({
  serviceIcons,
  businessCards,
  businessServices,
}) => {
  const [activeCategory, setActiveCategory] = useState(serviceIcons[0]?.name || 'Home repairs');

  const currentBusinessCard = businessCards[activeCategory];
  const filteredServices = businessServices.filter(service => service.cat === activeCategory);

  const CurrentIconComponent = currentBusinessCard?.cardIcon;

  return (
    <>
      {/* Category Buttons - Large screens */}
      <motion.div
        className="hidden md:block mt-16 pb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="flex justify-center items-center gap-16 max-w-3xl mx-auto px-16">
          {serviceIcons.map((category, index) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
              index={index}
            />
          ))}
          <MoreButton />
        </div>
      </motion.div>

      {/* Category Buttons - Small screens (Carousel) */}
      <div className="block md:hidden mt-10 pb-4 overflow-x-auto">
        <div className="flex gap-6 px-4 min-w-max snap-x snap-mandatory scroll-smooth">
          {serviceIcons.map((category) => (
            <MobileCategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
            />
          ))}
          <MoreButton isMobile />
        </div>
      </div>

      {/* Divider */}
      <motion.div
        className="divider max-w-7xl mx-auto mb-10 max-h-px bg-gray-300"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Business Section */}
      <div className="max-w-6xl mx-auto mt-4 px-5">
        {/* Main Business Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/category">
              <motion.div
                className="card relative w-full mb-8 overflow-hidden rounded-t-xl rounded-b-none"
                whileHover={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
                }}
              >
                <motion.div
                  className="relative h-56"
                  style={{
                    backgroundImage: `url(${currentBusinessCard.mainCardBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Content */}
                  <div className="absolute inset-0 flex justify-start items-start w-full">
                    <motion.div
                      className="max-w-3xl px-6 text-left mt-6"
                      variants={slideIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                    >
                      {/* Icon */}
                      {CurrentIconComponent && (
                        <motion.div
                          className="my-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <CurrentIconComponent size={28} className="text-white" />
                        </motion.div>
                      )}

                      {/* Heading */}
                      <motion.h1
                        className="text-lg md:text-2xl font-bold text-white leading-tight drop-shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {currentBusinessCard.heading}
                      </motion.h1>

                      <motion.p
                        className="text-white text-base md:text-lg drop-shadow-md"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        We are here for you
                      </motion.p>

                      <motion.p
                        className="text-orange-600 text-base md:text-base hover:text-blue-700 mt-6 drop-shadow-md"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ x: 5 }}
                      >
                        {currentBusinessCard.seeAll}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Business Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-services`}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default memo(BusinessCategorySection);