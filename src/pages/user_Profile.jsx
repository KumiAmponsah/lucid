import React, { memo, lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext.jsx';
import ReviewThread from '../components/shared/ReviewThread.jsx';
import { 
  Star, 
  Camera, 
  Trophy, 
  CheckCircle, 
  Users, 
  User, 
  Clock, 
  Pencil, 
  Phone, 
  BriefcaseBusiness,
  Award,
  TrendingUp,
  MapPin,
  ChevronDown,
  ArrowLeft,
  MessageSquare,
  Calendar,
  DollarSign
} from 'lucide-react';
import profileImg from "../assets/profile.svg";
import { Link } from 'react-router-dom';
import slide1 from "../assets/leftbottom.jpg";
import slide2 from "../assets/delivery.jpg";
import slide3 from "../assets/handy.jpg";
import slide4 from "../assets/2150721533.jpg";
import ImageUploadModal from "../components/ImageUploadModal.jsx";
import { useImageUpload } from "../hooks/useImageUpload.js";

// Lazy load heavy components
const ProjectCarousel = lazy(() => import("../components/project_Carousel.jsx"));
const BackToTop = lazy(() => import('../components/back_the_top_btn.jsx'));

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
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

// ============================================
// DATA CONSTANTS (From Database)
// ============================================
const PROFILE_DATA = {
  id: '1',
  name: "Gabriel A. Gordon-Mensah",
  role: "Web Developer",
  rating: 5, // CALCULATED - Not editable
  reviewCount: 1, // FROM DATABASE - Not editable
  hiredCount: 156, // FROM DATABASE - Not editable
  employees: 14, // EDITABLE
  experience: 8, // EDITABLE
  hourlyRate: 80, // EDITABLE
  responseTime: '2 hours', // CALCULATED - Not editable
  availability: 'Available', // EDITABLE
  location: 'Achimota, Accra', // EDITABLE
  bio: "Professional web developer with over 8 years of experience building responsive web applications using React, Vue, and JavaScript/TypeScript. I create accessible, high-performance interfaces with clean code. Specialized in frontend development, UI/UX design, and modern JavaScript frameworks.", // EDITABLE
  skills: ["UI/UX Design", "React Development", "TypeScript", "JavaScript", "Vue.js", "Responsive Design"], // EDITABLE
  certifications: [ // EDITABLE
    "Certified React Developer",
    "AWS Cloud Practitioner",
    "Google UX Design Certificate"
  ],
  languages: ["English", "Twi", "Ga"], // EDITABLE
  paymentMethods: "Cash, Mobile Money, Bank transfer", // EDITABLE
  workingHours: { // EDITABLE
    weekdays: "9am - 5pm",
    weekends: "N/A"
  },
  successRate: 98 // CALCULATED - Not editable
};

const RATING_DISTRIBUTION = [
  { stars: 5, percentage: 100 },
  { stars: 4, percentage: 0 },
  { stars: 3, percentage: 0 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
];

const REVIEWS = [
  {
    name: "John Mensah",
    rating: 5,
    date: "2025-12-15",
    text: "Excellent work! Very professional and completed the project on time.",
    jobType: "Website Development"
  },
  {
    name: "Mary Osei",
    rating: 5,
    date: "2025-12-10",
    text: "Great developer! Fixed my web application issues quickly.",
    jobType: "Bug Fixes"
  },
  {
    name: "Kwame Asante",
    rating: 4,
    date: "2025-12-05",
    text: "Good service, delivered quality work.",
    jobType: "UI/UX Design"
  }
];

const PROJECTS = [slide1, slide2, slide3, slide4];

// ============================================
// MEMOIZED COMPONENTS
// ============================================

// Hero Section with Edit Overlay
const HeroSection = memo(({ bannerImage, onEditClick }) => (
  <motion.div 
    className="relative max-h-64 lg:min-h-72 bg-gradient-to-br from-blue-600 to-blue-400 h-60 overflow-hidden group"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <motion.img
      src={bannerImage}
      alt="banner cover"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.2 }}
    />
    <motion.div 
      onClick={onEditClick}
      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center cursor-pointer"
      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <motion.button 
        className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Camera className="w-6 h-6 text-blue-600" />
      </motion.button>
    </motion.div>
  </motion.div>
));

// Profile Avatar with Edit
const ProfileAvatar = memo(({ hasImage }) => (
  <motion.div 
    className="relative -top-14 left-2 transform -translate-x-1/2 group"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 0.5, type: "spring" }}
  >
    <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-blue-600 bg-gray-200 flex items-center justify-center overflow-hidden relative">
      {hasImage ? (
        <img
          src={profileImg}
          alt="profile picture"
          className="w-full h-full object-cover"
        />
      ) : (
        <User size={48} className="text-gray-400" />
      )}
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-full cursor-pointer"
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Link to="/editprofile">
          <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </motion.div>
    </div>
  </motion.div>
));

// Edit Button Component
const EditButton = memo(() => (
  <Link to="/editprofile">
    <motion.button 
      className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.95 }}
    >
      <Pencil className="w-5 h-5 text-blue-600" />
    </motion.button>
  </Link>
));

// Skill Badge
const SkillBadge = memo(({ skill, index }) => (
  <motion.span
    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
  >
    {skill}
  </motion.span>
));

// Info Card with CONDITIONAL Edit Button
const InfoCard = memo(({ title, children, icon: Icon, delay = 0, editable = true }) => (
  <motion.div 
    className="bg-white rounded-lg shadow p-6 relative group"
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
        <h2 className="text-xl text-black font-bold">{title}</h2>
      </div>
      {editable && <EditButton />}
    </div>
    {children}
  </motion.div>
));

// Stats Card (NO EDIT BUTTON)
const StatsCard = memo(({ icon: Icon, value, label, delay = 0 }) => (
  <motion.div 
    className="bg-white rounded-lg shadow p-6"
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
  >
    <div className="text-center">
      <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </motion.div>
));

// Info Item
const InfoItem = memo(({ icon: Icon, text }) => (
  <motion.div 
    className="flex items-center space-x-3"
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    <Icon className="w-6 h-6 text-blue-600" />
    <span className="text-gray-700">{text}</span>
  </motion.div>
));

// Rating Bar
const RatingBar = memo(({ rating, index }) => (
  <motion.div 
    className="flex items-center space-x-3"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <span className="w-8 text-right">{rating.stars}</span>
    <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
      <motion.div
        className="bg-blue-600 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${rating.percentage}%` }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      />
    </div>
    <span className="w-12 text-right text-sm text-gray-600">
      {rating.percentage}%
    </span>
  </motion.div>
));

// Review Item
const ReviewItem = memo(({ review, index }) => (
  <motion.div 
    className="border-t pt-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
        <User size={32} className="text-gray-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="font-semibold text-gray-900">{review.name}</div>
            <p className="text-sm text-gray-600">{review.jobType}</p>
          </div>
          <span className="text-sm text-gray-500">{review.date}</span>
        </div>
        <div className="flex space-x-1 my-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'fill-blue-600 text-blue-600'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 mt-2">{review.text}</p>
      </div>
    </div>
  </motion.div>
));

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-64" />
);

// ============================================
// MAIN COMPONENT
// ============================================
const UserProfile = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const upload = useImageUpload();
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyText, setReplyText] = useState("");
  
  
  const insertReply = (items, parentId, reply) => {
    return items.map(item => {
      if (item.id === parentId) {
        return { ...item, replies: [...item.replies, reply] };
      }
      if (item.replies?.length) {
        return {
          ...item,
          replies: insertReply(item.replies, parentId, reply)
        };
      }
      return item;
    });
  };
  
  
  const [REVIEWS, setREVIEWS] = useState([
    {
      id: "REV-001",
      parentId: null,
      bookingId: "BK-REVIEW-001",
      author: {
        id: "CLIENT-301",
        name: "Ama Boateng",
        role: "client"
      },
      rating: 5,
      reviewText: "Excellent service. Very professional and punctual.",
      createdAt: "2025-02-09T18:40:00Z",
      verified: true,
      replies: [
        {
          id: "REP-001",
          parentId: "REV-001",
          author: {
            id: "PROV-101",
            name: "Gabriel A. Gordon-Mensah",
            role: "provider"
          },
          reviewText: "Thank you so much, Ama. It was a pleasure working with you.",
          createdAt: "2025-02-09T20:10:00Z",
          replies: []
        }
      ]
    }
  ]);
  
  
  
  const handlePostReply = () => {
    if (!replyTarget || !replyText.trim()) return;
  
    const reply = {
    id: crypto.randomUUID(),
    parentId: replyTarget.id,
    author: {
      id: "PROV-101",
      name: "Kwame Mensah",
      role: "provider"
    },
    reviewText: replyText.trim(), // ✅ FIX HERE
    createdAt: new Date().toISOString(),
    replies: []
  };
  
  
    setREVIEWS(prev =>
      insertReply(prev, replyTarget.id, reply)
    );
  
    setReplyText("");
    setReplyTarget(null);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="text-sm text-gray-600">
              Viewing as: <span className="font-semibold text-blue-600">Service Provider</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Edit Overlay */}
      <HeroSection 
        bannerImage={slide1} 
        onEditClick={upload.openModal}
      />

      {/* Profile Card */}
      <div className="relative max-w-7xl mx-auto px-4 -mt-14 z-10">
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Avatar */}
          <ProfileAvatar hasImage={false} />

          {/* Profile Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start justify-start space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{PROFILE_DATA.name}</h1>
              {PROFILE_DATA.availability === 'Available' && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Available
                </span>
              )}
              <EditButton />
            </div>
            <div className="flex items-center space-x-2">
              <BriefcaseBusiness className="w-6 h-6 text-blue-600" />
            <span className="text-lg text-gray-700 mb-3">{PROFILE_DATA.role}</span>
            </div>
            <div className="flex items-center space-x-4 mb-4 flex-wrap gap-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span className="font-semibold text-blue-600">{PROFILE_DATA.rating}</span>
                <span className="text-gray-500 text-sm">({PROFILE_DATA.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{PROFILE_DATA.experience} years experience</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{PROFILE_DATA.location}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-blue-600 mb-4">
              GH₵{PROFILE_DATA.hourlyRate}/hour
            </div>

            <p className="text-gray-700 mb-4">{PROFILE_DATA.bio}</p>

            <div className="flex flex-wrap gap-3">
              {PROFILE_DATA.skills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards - NO EDIT BUTTONS (Data from Database) */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <StatsCard 
            icon={CheckCircle}
            value={PROFILE_DATA.hiredCount}
            label="Jobs Completed"
            delay={0}
          />
          <StatsCard 
            icon={Award}
            value={PROFILE_DATA.rating}
            label="Average Rating"
            delay={0.1}
          />
          <StatsCard 
            icon={TrendingUp}
            value={`${PROFILE_DATA.successRate}%`}
            label="Success Rate"
            delay={0.2}
          />
        </motion.div>

        {/* Info Cards Grid - WITH EDIT BUTTONS (Editable Data) */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Overview Section - EDITABLE */}
          <InfoCard title="Overview" icon={Trophy} editable={true}>
            <div className="space-y-4">
              <InfoItem icon={Trophy} text={`Hired ${PROFILE_DATA.hiredCount} Times`} />
              <InfoItem icon={CheckCircle} text="User has been verified" />
              <InfoItem icon={Users} text={`${PROFILE_DATA.employees} employees`} />
              <InfoItem icon={Clock} text={`${PROFILE_DATA.experience} years experience`} />
            </div>
          </InfoCard>

          {/* Payment Methods - EDITABLE */}
          <InfoCard title="Payment Methods" delay={0.1} editable={true}>
            <p className="text-gray-700">
              This user accepts {PROFILE_DATA.paymentMethods}
            </p>
          </InfoCard>

          {/* Working Hours - EDITABLE */}
          <InfoCard title="Working Hours" icon={Clock} delay={0.2} editable={true}>
            <div className="space-y-2 text-gray-700">
              <p>Weekdays: {PROFILE_DATA.workingHours.weekdays}</p>
              <p>Weekends: {PROFILE_DATA.workingHours.weekends}</p>
            </div>
          </InfoCard>
        </motion.div>

        {/* Certifications - EDITABLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <InfoCard title="Certifications" editable={true}>
            <div className="space-y-2">
              {PROFILE_DATA.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          </InfoCard>
        </motion.div>

        {/* Languages - EDITABLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <InfoCard title="Languages" editable={true}>
            <div className="flex flex-wrap gap-2">
              {PROFILE_DATA.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </InfoCard>
        </motion.div>

        {/* Quick Actions for Service Provider */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link to="/provider_bookings">
            <motion.button
              className="w-full bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5" />
              <span>View My Bookings</span>
            </motion.button>
          </Link>

          <Link to="/earnings">
            <motion.button
              className="w-full bg-white text-blue-600 border-2 border-blue-600 py-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <DollarSign className="w-5 h-5" />
              <span>View Earnings</span>
            </motion.button>
          </Link>

          <Link to="/editprofile">
            <motion.button
              className="w-full bg-white text-blue-600 border-2 border-blue-600 py-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Pencil className="w-5 h-5" />
              <span>Edit Profile</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Projects Section - EDITABLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Suspense fallback={<LoadingSkeleton />}>
            <ProjectCarousel projects={PROJECTS} />
          </Suspense>
        </motion.div>

        {/* Reviews Section - NOT EDITABLE (From Database) */}
        <motion.div 
          className="bg-white rounded-lg shadow mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => setReviewsOpen(!reviewsOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            whileHover={{ backgroundColor: "#f9fafb" }}
          >
            <h2 className="text-xl font-bold text-gray-900">
              Reviews ({PROFILE_DATA.reviewCount})
            </h2>
            <motion.div
              animate={{ rotate: reviewsOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-6 h-6 text-gray-600" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {reviewsOpen && (
              <motion.div 
                className="px-6 pb-6"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Rating Summary */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold text-gray-900">
                        Great {PROFILE_DATA.rating}
                      </div>
                      <div className="flex justify-center space-x-1 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.floor(PROFILE_DATA.rating)
                                ? 'fill-blue-600 text-blue-600'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-gray-600">
                        {PROFILE_DATA.reviewCount} reviews
                      </div>
                    </div>
                  </motion.div>

                  {/* Rating Distribution */}
                  <div className="space-y-2">
                    {RATING_DISTRIBUTION.map((rating, index) => (
                      <RatingBar key={rating.stars} rating={rating} index={index} />
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                                <div className="mt-8 space-y-6">
                  {REVIEWS.map(review => (
                    <ReviewThread
                      key={review.id}
                      item={review}
                      onReply={setReplyTarget}
                    />
                  ))}
                </div>
                
                {replyTarget && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-2">
                      Replying to <strong>{replyTarget.author.name}</strong>:
                <span className="italic text-gray-500 ml-1">
                  “{replyTarget.reviewText.slice(0, 40)}…”
                </span>
                
                    </p>
                
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full bg-white text-gray-900 border rounded-lg p-3 focus:border-blue-600 focus:outline-none focus:border-2"
                      rows={3}
                      placeholder="Write your reply..."
                    />
                
                    <div className="flex justify-end mt-3 gap-3">
                      <button
                        onClick={() => setReplyTarget(null)}
                        className="px-6 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold flex items-center gap-2"
                      >
                      Cancel
                      </button>
                      <button
                        onClick={handlePostReply}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Post Reply
                      </button>
                    </div>
                  </div>
                )}
                
                              </motion.div>
                            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Upload Modal */}
      <ImageUploadModal
        open={upload.open}
        onClose={upload.closeModal}
        dragActive={upload.dragActive}
        onDrag={upload.onDrag}
        onDrop={upload.onDrop}
        onFileChange={upload.onFileChange}
        selectedFile={upload.selectedFile}
        isUploading={upload.isUploading}
        uploadProgress={upload.uploadProgress}
        onSave={upload.onSave}
        title="Upload Image"
      />

      {/* Back to Top */}
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </div>
  );
};

export default memo(UserProfile);