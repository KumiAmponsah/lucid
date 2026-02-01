import React, { useState, memo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import ReviewThread from '../components/shared/ReviewThread.jsx';

import { 
  Star, 
  CheckCircle, 
  Users, 
  User, 
  Clock, 
  MessageCircle, 
  Phone, 
  ChevronUp, 
  ChevronDown, 
  BriefcaseBusiness, 
  MapPin,
  Calendar,
  Share2,
  Heart,
  Award,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import slide1 from "../assets/2150721533.jpg";
import slide2 from "../assets/delivery.jpg";
import slide3 from "../assets/handy.jpg";
import slide4 from "../assets/2150721533.jpg";
import profileImg from "../assets/profile.svg";

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
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
// DATA CONSTANTS
// ============================================
const PROFILE_DATA = {
  id: '1',
  name: "Gabriel A. Gordon-Mensah",
  role: "Web Developer",
  rating: 5,
  reviewCount: 1,
  hiredCount: 156,
  employees: 14,
  experience: 8,
  hourlyRate: 80,
  location: 'Achimota, Accra',
  bio: "Professional web developer with over 8 years of experience building responsive web applications using React, Vue, and JavaScript/TypeScript. I create accessible, high-performance interfaces with clean code. Specialized in frontend development, UI/UX design, and modern JavaScript frameworks.",
  skills: ["UI/UX Design", "React Development", "TypeScript", "JavaScript", "Vue.js", "Responsive Design"],
  certifications: [
    "Certified React Developer",
    "AWS Cloud Practitioner",
    "Google UX Design Certificate"
  ],
  languages: ["English", "Twi", "Ga"],
  paymentMethods: "Cash, Mobile Money, Bank transfer",
  workingHours: {
    weekdays: "9am - 5pm",
    weekends: "N/A"
  }
};

const RATING_DISTRIBUTION = [
  { stars: 5, percentage: 100 },
  { stars: 4, percentage: 0 },
  { stars: 3, percentage: 0 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
];





const PROJECTS = [slide1, slide2, slide3, slide4];

// ============================================
// MEMOIZED COMPONENTS
// ============================================

// Hero Section
const HeroSection = memo(() => (
  <motion.div 
    className="bg-gradient-to-br from-blue-600 min-h-60 max-h-80 to-blue-400 py-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-7xl mx-auto px-4">
      <motion.div 
        className="flex items-center space-x-4 text-white"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      />
    </div>
  </motion.div>
));

// Profile Avatar
const ProfileAvatar = memo(({ hasImage }) => (
  <motion.div 
    className="relative -top-14 left-2 transform -translate-x-1/2 z-30"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 0.5, type: "spring" }}
  >
    <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-blue-600 bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
      {hasImage ? (
        <img
          src={profileImg}
          alt="profile picture"
          className="w-full h-full object-cover"
        />
      ) : (
        <User size={48} className="text-gray-400" />
      )}
    </div>
  </motion.div>
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

// Info Card
const InfoCard = memo(({ title, children, icon: Icon, delay = 0 }) => (
  <motion.div 
    className="bg-white rounded-lg shadow p-6"
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
  >
    <div className="flex items-center space-x-2 mb-4">
      {Icon && <Icon className="w-5 h-5 text-blue-600" />}
      <h2 className="text-xl text-black font-bold">{title}</h2>
    </div>
    {children}
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

// Action Button
const ActionButton = memo(({ icon: Icon, text, onClick, variant = 'primary' }) => (
  <motion.button
    className={`py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors font-semibold ${
      variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </motion.button>
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
const GeneralProfile = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { id } = useParams();
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [showCallModal, setShowCallModal] = useState(null);
  const [notification, setNotification] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
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


  const handleCall = (type = 'voice') => {
    setShowCallModal(type);
  };

  const endCall = () => {
    showNotification('Voice call ended');
    setShowCallModal(null);
  };

  const handleRequestBooking = () => {
    navigate('/booking_request');
  };

  const handleMessage = () => {
    showNotification('Opening chat...', 'info');
    navigate('/messagePage');
  };

  const handleShare = () => {
    showNotification('Profile link copied to clipboard!');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showNotification(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button and Actions */}
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
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={toggleFavorite}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <HeroSection />

      {/* Profile Card */}
      <div className="max-w-7xl mx-auto px-4 -mt-14">
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
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {PROFILE_DATA.name}
              </h1>
            </div>

            <div className="flex items-center space-x-2">
                          <BriefcaseBusiness className="mb-2 w-6 h-6 text-blue-600" />
                        <span className="text-lg text-gray-700 mb-3">{PROFILE_DATA.role}</span>
                        </div>

           <div className="flex items-center space-x-4 mb-4 flex-wrap gap-2">
                         <div className="flex items-center space-x-1">
                           <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                           <span className="font-semibold text-blue-600">{PROFILE_DATA.rating}</span>
                           <span className="text-gray-500 text-sm">({PROFILE_DATA.reviewCount} reviews)</span>
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
        {/* Stats Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <InfoCard title="" delay={0}>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{PROFILE_DATA.hiredCount}</div>
              <div className="text-sm text-gray-600">Jobs Completed</div>
            </div>
          </InfoCard>
          <InfoCard title="" delay={0.1}>
            <div className="text-center">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{PROFILE_DATA.rating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </InfoCard>
          <InfoCard title="" delay={0.2}>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </InfoCard>
        </motion.div>

        {/* Info Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Overview */}
          <InfoCard title="Overview" icon={Users}>
            <div className="space-y-4">
              <InfoItem icon={Users} text={`Hired ${PROFILE_DATA.hiredCount} Times`} />
              <InfoItem icon={CheckCircle} text="User has been verified" />
              <InfoItem icon={Users} text={`${PROFILE_DATA.employees} employees`} />
              <InfoItem icon={Clock} text={`${PROFILE_DATA.experience} years experience`} />
            </div>
          </InfoCard>

          {/* Payment Methods */}
          <InfoCard title="Payment Methods" delay={0.1}>
            <p className="text-gray-700">
              This user accepts {PROFILE_DATA.paymentMethods}
            </p>
          </InfoCard>

          {/* Working Hours */}
          <InfoCard title="Working Hours" icon={Clock} delay={0.2}>
            <div className="space-y-2 text-gray-700">
              <p>Weekdays: {PROFILE_DATA.workingHours.weekdays}</p>
              <p>Weekends: {PROFILE_DATA.workingHours.weekends}</p>
            </div>
          </InfoCard>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <InfoCard title="Certifications">
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

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <InfoCard title="Languages">
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

        {/* Action Buttons */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ActionButton 
            icon={Calendar} 
            text="Request Booking" 
            onClick={handleRequestBooking}
            variant="primary"
          />
          <ActionButton 
            icon={MessageCircle} 
            text="Send Message" 
            onClick={handleMessage}
            variant="secondary"
          />
          <ActionButton 
            icon={Phone} 
            text="Call Now" 
            onClick={() => handleCall('voice')}
            variant="secondary"
          />
        </motion.div>

        {/* Projects Section */}
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

        {/* Reviews Section */}
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
      className="w-full bg-white text-gray-900 border rounded-lg p-3 focus:border-2 focus:border-blue-600 focus:outline-none"
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
            className="fixed top-24 left-1/2 transform translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Modal */}
      <AnimatePresence>
        {showCallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center z-50"
          >
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-16 h-16 text-white" />
              </div>

              <h2 className="text-2xl font-semibold text-white mb-2">
                {PROFILE_DATA.name}
              </h2>

              <p className="text-gray-400">
                Voice calling...
              </p>
            </div>

            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full flex items-center space-x-2"
            >
              <Phone className="w-6 h-6 rotate-135" />
              <span>End Call</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </div>
  );
};

export default memo(GeneralProfile);