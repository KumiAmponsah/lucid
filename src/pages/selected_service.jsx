// URL: /services/cleaning
// Shows all cleaning professionals

// URL: /services/plumbing?area=Accra
// Shows plumbers in Accra

// URL: /services/carpentry?skill=furniture
// Shows carpenters skilled in furniture

import React, { useState, useMemo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Hammer, House, Truck, Settings, ChevronRight, Filter, MapPin, Star } from 'lucide-react';
import { FaBroom } from 'react-icons/fa';
import BusinessCategorySection from '../components/suggested_category.jsx';
import { DownloadSection } from '../components/download_ad.jsx';

// Lazy load heavy components
const BackToTop = lazy(() => import('../components/back_the_top_btn'));

// Import ProfileCard directly (not lazy) since it's needed immediately
import ProfileCard from '../components/user_card';

// ============================================
// IMPORT MOCK DATA
// ============================================
import { 
  mockProviders, 
  getProvidersBySkill, 
  getProvidersByArea,
  getTopRatedProviders,
  getAvailableProviders 
} from '../data/mockProfiles';

// Image imports (these will be bundled)
import BackgroundImage from "../assets/roommates-cleaning.jpg";
import BackgroundImage1 from "../assets/143147.jpg";
import BackgroundImage2 from "../assets/delivery.jpg";
import BackgroundImage3 from "../assets/leftdown.jpg";
import BackgroundImage4 from "../assets/carpentry.jpg";
import homerepair from "../assets/cleaners.jpg";
import moving from "../assets/delivery.jpg";
import autorepair from "../assets/carmechanic.jpg";
import construction from "../assets/carpenterlady.jpg";

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
const HeroSection = React.memo(({ backgroundImage, icon: Icon, title, subtitle }) => (
  <div className='h-1/2'>
    <div
      className="hero w-full h-96"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-40"></div>
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
    </div>
  </div>
));

// Breadcrumb Component
const Breadcrumb = React.memo(({ items }) => (
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

// Filter Section Component
const FilterSection = React.memo(({ onFilterChange, activeFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm p-4 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          {showFilters ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <select
              onChange={(e) => onFilterChange('rating', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="0">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (GHS/hour)
            </label>
            <select
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="0-50">Under 50</option>
              <option value="50-100">50 - 100</option>
              <option value="100-200">100 - 200</option>
              <option value="200+">200+</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              onChange={(e) => onFilterChange('availability', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Providers</option>
              <option value="available">Available Now</option>
              <option value="verified">Verified Only</option>
              <option value="premium">Premium Members</option>
            </select>
          </div>
        </div>
      )}
    </motion.div>
  );
});

// Stats Bar Component
const StatsBar = React.memo(({ totalProviders, averageRating, averagePrice }) => (
  <motion.div 
    className="bg-blue-50 rounded-lg p-4 mb-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-2xl font-bold text-blue-600">{totalProviders}</p>
        <p className="text-sm text-gray-600">Professionals</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-1">
          <Star className="w-5 h-5 fill-blue-600" />
          {averageRating}
        </p>
        <p className="text-sm text-gray-600">Avg Rating</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-blue-600">GHS {averagePrice}</p>
        <p className="text-sm text-gray-600">Avg Price/hr</p>
      </div>
    </div>
  </motion.div>
));

// Loading Skeleton for Profile Cards
const ProfileCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-3 bg-gray-300 rounded mb-2"></div>
    <div className="h-3 bg-gray-300 rounded mb-4"></div>
    <div className="h-8 bg-gray-300 rounded"></div>
  </div>
);

// ============================================
// STATIC DATA
// ============================================
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
const SelectedService = () => {
  // Get service and area from URL params or search params
  const { service } = useParams();
  const [searchParams] = useSearchParams();
  const area = searchParams.get('area');
  const skill = searchParams.get('skill') || service || 'plumbing';

  // State for filters
  const [filters, setFilters] = useState({
    rating: 0,
    priceRange: 'all',
    availability: 'all'
  });

  // ============================================
  // FETCH AND FILTER PROVIDERS
  // ============================================
  const providers = useMemo(() => {
    // Start with providers that match the skill
    let filteredProviders = getProvidersBySkill(skill);

    // If no providers found by skill, show all available providers
    if (filteredProviders.length === 0) {
      filteredProviders = getAvailableProviders();
    }

    // Further filter by area if specified
    if (area) {
      filteredProviders = filteredProviders.filter(p => 
        p.location.area.toLowerCase().includes(area.toLowerCase()) ||
        p.location.city.toLowerCase().includes(area.toLowerCase())
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filteredProviders = filteredProviders.filter(p => 
        p.rating.overall >= filters.rating
      );
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(v => 
        v === '+' ? Infinity : parseInt(v)
      );
      filteredProviders = filteredProviders.filter(p => {
        const rate = p.pricing.hourlyRate;
        return max ? (rate >= min && rate <= max) : rate >= min;
      });
    }

    // Apply availability filter
    if (filters.availability !== 'all') {
      switch (filters.availability) {
        case 'available':
          filteredProviders = filteredProviders.filter(p => 
            p.availability.status === 'available'
          );
          break;
        case 'verified':
          filteredProviders = filteredProviders.filter(p => p.verified);
          break;
        case 'premium':
          filteredProviders = filteredProviders.filter(p => p.premiumMember);
          break;
      }
    }

    return filteredProviders;
  }, [skill, area, filters]);

  // ============================================
  // TRANSFORM PROVIDERS TO PROFILE CARD FORMAT
  // ============================================
  const profiles = useMemo(() => {
    return providers.map(provider => ({
      id: provider.id,
      name: provider.fullName,
      role: provider.occupation,
      location: `${provider.location.area}, ${provider.location.city}`,
      rating: provider.rating.overall,
      image: provider.profileImage,
      // Additional data for ProfileCard if needed
      verified: provider.verified,
      premium: provider.premiumMember,
      hourlyRate: provider.pricing.hourlyRate,
      responseTime: provider.availability.responseTime,
      totalJobs: provider.workExperience.totalJobs
    }));
  }, [providers]);

  // ============================================
  // CALCULATE STATS
  // ============================================
  const stats = useMemo(() => {
    if (profiles.length === 0) {
      return { totalProviders: 0, averageRating: 0, averagePrice: 0 };
    }

    const totalRating = profiles.reduce((sum, p) => sum + p.rating, 0);
    const totalPrice = profiles.reduce((sum, p) => sum + p.hourlyRate, 0);

    return {
      totalProviders: profiles.length,
      averageRating: (totalRating / profiles.length).toFixed(1),
      averagePrice: Math.round(totalPrice / profiles.length)
    };
  }, [profiles]);

  // ============================================
  // BREADCRUMB ITEMS
  // ============================================
  const breadcrumbItems = useMemo(() => [
    { label: 'Services', path: '/Service' },
    { label: 'Home', path: '/category' },
    { label: skill.charAt(0).toUpperCase() + skill.slice(1), path: '#' }
  ], [skill]);

  // ============================================
  // FILTER CHANGE HANDLER
  // ============================================
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={BackgroundImage}
        icon={FaBroom}
        title="Trusted help, when and how you need it."
        subtitle="Connect with verified professionals for all your service needs"
      />

      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16">
        {/* Stats Bar */}
        <StatsBar {...stats} />

        {/* Filter Section */}
        <FilterSection 
          onFilterChange={handleFilterChange}
          activeFilters={filters}
        />

        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {skill.charAt(0).toUpperCase() + skill.slice(1)} Services Near You
          </h2>
          <p className="text-gray-600 text-lg">
            {area 
              ? `Showing ${profiles.length} professionals in ${area}` 
              : `Choose from ${profiles.length} verified professionals`}
          </p>
        </motion.div>

        {/* Profile Cards Grid */}
        {profiles.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {profiles.map((profile) => (
              <motion.div
                key={profile.id}
                variants={scaleIn}
                transition={{ duration: 0.3 }}
              >
                <ProfileCard 
                  {...profile}
                  onViewProfile={() => console.log('View profile:', profile.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // No Results Found
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No providers found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search in a different area
            </p>
            <button
              onClick={() => setFilters({ rating: 0, priceRange: 'all', availability: 'all' })}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
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

      {/* Back to Top Button */}
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </div>
  );
};

export default SelectedService;