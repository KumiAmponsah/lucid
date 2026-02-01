import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaBroom, FaWrench, FaTshirt, FaPaintRoller, FaBoxes, FaScrewdriver, FaEllipsisH } from 'react-icons/fa';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section1 from "./home_sections.jsx";
import BackgroundImage from "../assets/background.png";
import BackToTop from '../components/back_the_top_btn';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
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

// Service Icon Component with animation
const ServiceIcon = memo(
  ({ icon: IconComponent, name, to, isMore = false, index }) => (
    <motion.div
      className="flex flex-col items-center gap-2 flex-shrink-0"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
    >
      <Link to={to} className="relative w-16 h-16">
        <motion.div
          className={`absolute top-0 left-6 right-2 w-12 h-12 rounded-lg ${
            isMore ? 'bg-blue-300' : 'bg-blue-300'
          }`}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        />

        <motion.div
          className={`absolute btn btn-square top-3 left-3 w-12 h-12 rounded-lg flex items-center justify-center ${
            isMore ? 'bg-blue-700 hover:bg-blue-300' : 'bg-blue-700 hover:bg-blue-300'
          }`}
          whileHover={{ rotate: 5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconComponent size={20} className="text-white" />
        </motion.div>
      </Link>

      <p
        className={`text-center text-xs mt-1 whitespace-nowrap ${
          isMore ? 'text-black' : 'text-blue-700'
        }`}
      >
        {name}
      </p>
    </motion.div>
  )
);


// Search Bar Component with animation
const SearchBar = () => (
  <motion.div 
    className="mt-8 sm:mt-12 flex justify-center px-4"
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <motion.div 
      className="flex w-full max-w-2xl rounded-full shadow-lg overflow-hidden bg-white border-2 border-blue-700"
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <input
        type="text"
        placeholder="What service do you need?"
        className="flex-grow px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-black bg-white placeholder-gray-500 focus:outline-none"
      />
      <motion.button 
        className="bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-r-full flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </motion.button>
    </motion.div>
  </motion.div>
);

// Service Icons Grid Component with animation
const ServiceIconsGrid = memo(({ services = [], className = "" }) => (
  <motion.div
    className={className}
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
  >
    {services.map((service, index) => (
      <ServiceIcon
        key={service.id}
        icon={service.icon}
        name={service.name}
        to={service.to}
        index={index}
      />
    ))}

    <ServiceIcon
      icon={FaEllipsisH}
      name="More"
      isMore
      to="/services"
      index={services.length}
    />
  </motion.div>
));


function Home() {
  const serviceIcons = [
    { id: 1, to: "/selected_service", name: 'Moving', icon: FaTruck },
    { id: 2, to: "/selected_service", name: 'Cleaning', icon: FaBroom },
    { id: 3, to: "/selected_service", name: 'Repair', icon: FaWrench },
    { id: 4, to: "/selected_service", name: 'Painting', icon: FaPaintRoller },
    { id: 5, to: "/selected_service", name: 'Laundry', icon: FaTshirt },
    { id: 6, to: "/selected_service", name: 'Delivery', icon: FaBoxes },
    { id: 7, to: "/selected_service", name: 'Assembly', icon: FaScrewdriver },
  ];

  return (
    <>
      <div className="flex flex-col lg:min-h-screen bg-white">
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
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-black leading-tight mb-4 sm:mb-6"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6 }}
              >
                Trusted help,<br />
                <span className="block">when and how you need it.</span>
              </motion.h1>

              {/* Paragraph */}
              <motion.p 
                className="text-base sm:text-base md:text-lg text-black leading-relaxed mb-8 px-4"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-orange-600 font-semibold">Connect</span> with{" "}
                <span className="text-orange-600 font-semibold">trusted workers</span> in
                your neighbourhood for home repairs, cleaning, moving, and more. Get
                started instantly.
              </motion.p>

              {/* Search Bar */}
              <SearchBar />

              {/* Desktop Category Grid */}
              <div className="hidden lg:block mt-12 lg:mt-14 pb-6 w-full">
                <ServiceIconsGrid 
                  services={serviceIcons} 
                  className="grid grid-cols-4 gap-4 lg:grid-cols-8 justify-items-center"
                />
                <motion.div 
                  className="divider max-w-7xl mx-auto mb-10 max-h-px bg-gray-300"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Category Scroll */}
        <motion.div 
          className="block lg:hidden w-full bg-white py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-x-auto scrollbar-hide">
            <ServiceIconsGrid 
              services={serviceIcons} 
              className="flex gap-4 px-4 pb-2"
            />
          </div>
          <motion.div 
            className="divider max-w-7xl mx-auto mb-10 max-h-px bg-gray-300"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </div>
      
      <Section1 />
      <BackToTop />
    </>
  );
}

export default Home;