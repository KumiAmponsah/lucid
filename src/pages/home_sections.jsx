import React, { memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle2 } from 'lucide-react';
import Search from '../assets/search_options.png';
import Review from '../assets/Ratings.png';
import Book from '../assets/book.png';
import InstantQuotes from '../assets/instant qoutes.jpg';

// Lazy load heavy components
const Carousel = lazy(() => import('../components/carousal_slider.jsx'));

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Memoized Icon Wrapper Component
const IconWrapper = memo(({ children }) => (
  <motion.div 
    className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full p-1"
    whileHover={{ rotate: 360, scale: 1.1 }}
    transition={{ duration: 0.6 }}
  >
    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
      <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-2 rounded-full">
        {children}
      </div>
    </div>
  </motion.div>
));

// Memoized Feature Card Component
const FeatureCard = memo(({ icon: Icon, title, description, index }) => (
  <motion.div 
    className="card rounded-3xl w-full bg-white card-md shadow-2xl"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
  >
    <div className="card-body items-center text-center">
      <IconWrapper>
        <Icon size={32} className="text-white" strokeWidth={2} />
      </IconWrapper>
      <h2 className="text-xl font-semibold text-black mt-4">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
));

// Memoized Platform Feature Card
const PlatformFeatureCard = memo(({ title, description, index }) => (
  <motion.div 
    className="card w-full bg-white card-md shadow-2xl rounded-3xl hover:shadow-xl transition-shadow"
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
  >
    <div className="card-body">
      <h2 className="card-title text-black mb-2 pb-2 font-semibold text-xl">
        {title}
      </h2>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
));

// Memoized How It Works Step
const HowItWorksStep = memo(({ step, index }) => (
  <motion.div 
    className="flex flex-col items-center justify-start text-center h-full"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
  >
    <motion.div 
      className="w-full h-44 mt-2 bg-blue-700 rounded-2xl transition-all duration-300 overflow-hidden flex items-center justify-center flex-shrink-0"
      whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={step.imageUrl}
        alt={step.alt}
        className="object-cover w-full h-full"
        loading="lazy"
      />
    </motion.div>
    <motion.div 
      className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-500 text-white font-bold text-2xl mt-4 flex-shrink-0"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
    >
      {step.num}
    </motion.div>
    <h2 className="text-lg font-semibold text-black mt-2 min-h-[28px]">
      {step.title}
    </h2>
    <p className="text-gray-600 max-w-xs m-1 flex-grow">
      {step.description}
    </p>
  </motion.div>
));

// Memoized FAQ Item
const FAQItem = memo(({ index, question, answer }) => (
  <motion.div 
    tabIndex={index} 
    className="collapse collapse-arrow bg-white border-b-2 rounded-none border-gray-100"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{ backgroundColor: "#f9fafb" }}
  >
    <div className="collapse-title font-semibold text-black text-left">
      {question}
    </div>
    <div className="collapse-content text-sm text-gray-600 text-left">
      {answer}
    </div>
  </motion.div>
));

// Memoized Section Header
const SectionHeader = memo(({ title, description }) => (
  <motion.div 
    className="items-center text-center my-8 px-2 py-6 bg-white"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="text-black font-semibold text-3xl">{title}</h1>
    {description && (
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{description}</p>
    )}
  </motion.div>
));

// Constants
const FEATURE_CARDS_DATA = [
  {
    id: 1,
    icon: Shield,
    title: "Secure & Trusted",
    description: "All workers are verified and background-checked to ensure your safety and peace of mind"
  },
  {
    id: 2,
    icon: Clock,
    title: "Quick Response",
    description: "Get instant matches with available workers in your area. Fast response times guaranteed"
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "Quality Guaranteed",
    description: "All services come with our satisfaction guarantee. Rate and review every experience"
  }
];

const PLATFORM_FEATURES_DATA = [
  {
    id: 1,
    title: "Easy Booking",
    description: "Book services in just a few clicks. Choose your preferred time, worker, and service type with our intuitive interface"
  },
  {
    id: 2,
    title: "Transparent Pricing",
    description: "No hidden fees. See upfront pricing for all services before you book. Pay securely through our platform"
  },
  {
    id: 3,
    title: "Real-Time Tracking",
    description: "Track your worker's arrival in real-time. Get notifications and updates throughout the entire service"
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Our customer support team is available round the clock to assist you with any questions or concerns"
  },
  {
    id: 5,
    title: "Verified Reviews",
    description: "Read authentic reviews from real customers. Make informed decisions based on genuine experiences"
  },
  {
    id: 6,
    title: "Flexible Scheduling",
    description: "Book services at your convenience. Schedule for same-day or plan ahead for future dates"
  }
];

const STEPS_DATA = [
  {
    id: 1,
    alt: "pic",
    num: "1",
    title: "Search",
    description: "Search for your desired service or browse through our diverse categories.",
    imageUrl: Search
  },
  {
    id: 2,
    alt: "pic",
    num: "2",
    title: "Get Instant Quotes",
    description: "Receive offers from local workers within minutes. Compare prices, reviews, and availability.",
    imageUrl: InstantQuotes
  },
  {
    id: 3,
    alt: "pic",
    num: "3",
    title: "Choose & Book",
    description: "Select the best worker for your task based on reviews, ratings, and price. Book instantly through our secure platform.",
    imageUrl: Book
  },
  {
    id: 4,
    alt: "pic",
    num: "4",
    title: "Feedback & Review",
    description: "Leave feedback to help future customers and build our trusted community network.",
    imageUrl: Review
  }
];

const FAQ_DATA = [
  {
    id: 0,
    question: "How quickly can I get help through your neighbourhood services platform?",
    answer: "Most tasks receive responses within 15 minutes, and many workers offer same-day availability for urgent needs."
  },
  {
    id: 1,
    question: "Are all workers on the platform verified?",
    answer: "Yes, all workers undergo thorough background checks and verification processes to ensure your safety and peace of mind."
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and secure online payment methods through our platform."
  },
  {
    id: 3,
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time without any penalties."
  },
  {
    id: 4,
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a satisfaction guarantee. Contact our support team within 24 hours, and we'll work to resolve any issues or provide a refund."
  }
];

const Section1 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      {/* Top 3 Feature Cards */}
      <motion.div 
        className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 mt-16 px-6 mb-6 py-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {FEATURE_CARDS_DATA.map((card, index) => (
          <FeatureCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            index={index}
          />
        ))}
      </motion.div>

      {/* Platform Features Section */}
      <motion.div 
        className="items-center text-center my-4 px-2 py-6 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="my-2 px-2 py-2 bg-white">
          <motion.h1 
            className="text-black font-semibold text-3xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Platform Features
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-2 max-w-2xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Discover what makes our platform the best choice for connecting with trusted workers
          </motion.p>
        </div>
      </motion.div>

      {/* Platform Feature Cards Grid */}
      <motion.div 
        className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 px-6 mb-16 pb-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {PLATFORM_FEATURES_DATA.map((feature, index) => (
          <PlatformFeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </motion.div>

      {/* How It Works Section */}
      <div className="flex flex-col min-h-screen bg-white">
        <SectionHeader title="How it works" />

        <motion.div 
          className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-x-24 gap-y-8 px-6 mb-6 pb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STEPS_DATA.map((step, index) => (
            <HowItWorksStep key={step.id} step={step} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Carousel Section - Lazy Loaded */}
      <Suspense fallback={
        <motion.div 
          className="min-h-[400px] bg-gray-200 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      }>
        <Carousel />
      </Suspense>

      {/* FAQ Section */}
      <div className="flex flex-col min-h-screen bg-white">
        <motion.div 
          className="items-center text-center my-8 px-2 py-6 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="my-4 px-2 py-6 bg-white">
            <motion.h1 
              className="text-black font-semibold text-3xl"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-2 max-w-2xl mx-auto"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Find answers to common questions about our platform
            </motion.p>
          </div>

          {/* FAQ Items */}
          <motion.div 
            className="items-center text-center m-8 px-2 py-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {FAQ_DATA.map((faq) => (
              <FAQItem
                key={faq.id}
                index={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Section1;