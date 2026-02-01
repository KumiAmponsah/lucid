import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hammer, House, Truck, ChevronRight, Settings } from 'lucide-react';
import BackgroundImage from "../assets/home_section.jpg";
import BackgroundImage1 from "../assets/143147.jpg";
import BackgroundImage2 from "../assets/delivery.jpg";
import BackgroundImage3 from "../assets/leftdown.jpg";
import BackgroundImage4 from "../assets/carpentry.jpg";
import homerepair from "../assets/cleaners.jpg";
import moving from "../assets/delivery.jpg";
import autorepair from "../assets/carmechanic.jpg";
import construction from "../assets/carpenterlady.jpg";
import categoryCard1 from "../assets/glasses.jpg";
import categoryCard2 from "../assets/painter.jpg";
import categoryCard3 from "../assets/handy.jpg";
import { DownloadSection } from '../components/download_ad.jsx';
import BackToTop from '../components/back_the_top_btn';
import BusinessCategorySection from '../components/suggested_category.jsx';

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

// ============================================
// MEMOIZED COMPONENTS
// ============================================

// Hero Section Component
const HeroSection = memo(({ backgroundImage, icon: Icon, title, subtitle }) => (
  <div className='h-1/2'>
    <motion.div
      className="hero w-full h-96"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="hero-overlay bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div 
        className="hero-content justify-start items-start w-full"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl px-6 text-left">
          {/* Icon */}
          <motion.div 
            className="mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Icon size={46} className="text-white" />
          </motion.div>
          
          {/* Heading */}
          <motion.h1 
            className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4 drop-shadow-lg"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-white text-lg md:text-xl drop-shadow-md"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  </div>
));

// Breadcrumb Component
const Breadcrumb = memo(({ items }) => (
  <motion.div 
    className="container my-4 mx-auto px-6 py-6"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="breadcrumbs text-sm">
      <ul className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link 
              to={item.path} 
              className="text-black text-base font-semibold hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <ChevronRight className="w-5 h-5 mx-2 text-gray-400" />
            )}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
));

// Category Card Component
const CategoryCard = memo(({ category, index }) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <Link to={category.category1}>
      <motion.div 
        className="card w-full max-w-sm"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <motion.figure 
          className='rounded-md overflow-hidden shadow-lg'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </motion.figure>
        <div className="py-6">
          <h2 className="text-black hover:text-blue-700 text-lg font-semibold text-center transition-colors">
            {category.title}
          </h2>
        </div>
      </motion.div>
    </Link>
  </motion.div>
));

// ============================================
// DATA CONSTANTS
// ============================================
const CATEGORIES = [
  {
    id: 1,
    title: "House Cleaning",
    image: categoryCard1,
    category1: "/selected_service",
  },
  {
    id: 2,
    title: "Interior Painting",
    image: categoryCard2,
    category1: "/selected_service",
  },
  {
    id: 3,
    title: "Handy Man",
    image: categoryCard3,
    category1: "/selected_service",
  },
  {
    id: 4,
    title: "House Cleaning",
    image: categoryCard1,
    category1: "/selected_service",
  },
  {
    id: 5,
    title: "Interior Painting",
    image: categoryCard2,
    category1: "/selected_service",
  },
  {
    id: 6,
    title: "Handy Man",
    image: categoryCard3,
    category1: "/selected_service",
  },
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

// ============================================
// MAIN COMPONENT
// ============================================
const Category = () => {
  const breadcrumbItems = useMemo(() => [
    { label: 'Services', path: '/Service' },
    { label: 'Home', path: '#' },
  ], []);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={BackgroundImage}
        icon={House}
        title="Trusted help, when and how you need it."
        subtitle="Connect with verified professionals for all your service needs"
      />

      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Categories Section */}
      <div className="container mx-auto px-6 pb-16">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the perfect service for your needs
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {CATEGORIES.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Download Section */}
      <DownloadSection />

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

      <BackToTop />
    </div>
  );
};

export default memo(Category);