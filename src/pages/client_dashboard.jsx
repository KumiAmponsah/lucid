import React, { useState, useMemo } from 'react';
import ServicesMap from '../components/ServicesMap.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import { useNotification } from '../contexts/NotificationContext';
import { Avatar } from '../components/ui/Avatar.jsx';
import BookingDetailsModal from '../components/shared/BookingDetailsModal.jsx';
import CancelBookingModal from '../components/shared/CancelBookingModal.jsx';
import { getBookingsByClient, calculateBookingStats, getActionRequiredBookings } from '../data/mockDataUtils';
import { mockProviders } from '../data/mockProfiles.js';
import { ArrowLeft, Search, Calendar, DollarSign, Star, Clock, CheckCircle, Heart, MapPin, MessageSquare, Bell, ChevronRight, TrendingUp, Filter, Package, User } from 'lucide-react';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, change, trend, color }) => {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const bgColor = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600'
  }[color];

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      initial="rest"
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
            <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {change}
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </motion.div>
  );
};

// Active Booking Card
const BookingCard = ({ booking, onViewDetails }) => {
  const providerName = booking.provider?.name ?? 'Service Provider';
  const locationLabel = [
    booking.location?.area,
    booking.location?.city
  ].filter(Boolean).join(', ');

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar name={providerName} size="md" />
          <div>
            <h4 className="font-semibold text-gray-900">{providerName}</h4>
            <p className="text-sm text-gray-600">{booking.title}</p>
          </div>
        </div>

        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full capitalize">
          {booking.status}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{booking.date} at {booking.time}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{locationLabel}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <span className="text-lg font-bold text-gray-900">
          GH₵{booking.price}
        </span>

        <button
          onClick={() => onViewDetails(booking)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

// Service Provider Card
const ProviderCard = ({ name, profession, rating, jobs, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all relative"
    >
      <button 
        onClick={() => setFavorite(!favorite)}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>
      
      <div className="flex flex-col items-center text-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-3">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <h3 className="font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{profession}</p>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
            <span className="font-semibold text-gray-900">{rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{jobs} jobs</span>
        </div>
      </div>
      
      <Link to="/generalProfile">
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          View Profile
        </button>
      </Link>
    </motion.div>
  );
};

// Quick Action Button
const QuickAction = ({ icon: Icon, label, to, badgeCount }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
      >
        <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl relative">
          <Icon className="w-6 h-6 text-white" />
          {badgeCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs text-white font-bold px-1 border-2 border-white">
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          )}
        </div>
        <span className="text-sm font-semibold text-gray-900">{label}</span>
      </Link>
    </motion.div>
  );
};

// Recent Activity Item
const ActivityItem = ({ icon: Icon, title, description, time, actionLabel, to }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 5 }}
      className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <Link to={to} className="flex gap-4 flex-1">
        <div className="w-9 h-9 p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </p>
            {actionLabel && (
              <button className="text-xs text-blue-600 font-semibold hover:text-blue-700">
                {actionLabel}
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Main Client Dashboard Component
const ClientDashboard = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadBookings, setUnreadbookings] = useState(5);

  const handleBackClick = useNavigateBack('/lucid', 600);
  const { showNotification } = useNotification();

  // ✅ FIXED: Action handlers for modal
  const handleCancel = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
    setSelectedBooking(null);
  };

  const confirmCancel = (booking) => {
    console.log('Cancelling booking:', booking.id);
    showNotification('Booking cancelled successfully', 'success');
    setShowCancelModal(false);
    setBookingToCancel(null);
  };

  const handleEdit = (booking) => {
    console.log('Editing booking:', booking.id);
    showNotification('Edit feature coming soon', 'info');
    setSelectedBooking(null);
  };

  const allBookings = useMemo(() => {
  return getBookingsByClient('CLT001'); // Your actual client ID
}, []);

const bookingStats = useMemo(() => {
  return calculateBookingStats(allBookings);
}, [allBookings]);

const activeBookings = useMemo(() => {
  return allBookings.filter(b => 
    ['pending', 'confirmed', 'in-progress'].includes(b.status)
  );
}, [allBookings]);



const stats = useMemo(() => [
  { icon: Calendar, title: 'Active Bookings', value: bookingStats.active.toString(), change: '+1', trend: 'up', color: 'blue' },
  { icon: CheckCircle, title: 'Completed Jobs', value: bookingStats.completed.toString(), change: '+3', trend: 'up', color: 'green' },
  { icon: DollarSign, title: 'Total Spent', value: `GH₵${bookingStats.totalRevenue}`, change: '+15%', trend: 'up', color: 'purple' },
  { icon: Heart, title: 'Favorites', value: '8', change: '+2', trend: 'up', color: 'orange' }

], [bookingStats]);

  const bookings = useMemo(() => {
  return activeBookings.slice(0, 3); // Show first 3 active bookings
}, [activeBookings]);


  const recentActivities = useMemo(() => [
    {
      icon: CheckCircle,
      title: 'Service Completed',
      description: 'Plumbing repair at Osu completed successfully',
      time: '2 hours ago',
      actionLabel: 'Leave Review',
      to: '/client_bookings'
    },
    {
      icon: MessageSquare,
      title: 'New Message',
      description: 'Gabriel replied to your inquiry',
      time: '4 hours ago',
      actionLabel: 'View Message',
      to: '/allmessages'
    },
    {
      icon: Calendar,
      title: 'Booking Confirmed',
      description: 'Electrical installation scheduled for tomorrow',
      time: '1 day ago',
      actionLabel: null,
      to: '/client_bookings'
    },
    {
      icon: Star,
      title: 'Review Posted',
      description: 'Your review for John Mensah has been published',
      time: '2 days ago',
      actionLabel: null,
      to: '/generalProfile'
    }
  ], []);

  const quickActions = [
    { icon: Search, label: 'Find Services', to: "/Service" },
    { icon: Calendar, label: 'My Bookings', to: "/client_bookings", badgeCount: unreadBookings },
    { icon: User, label: 'Account', to: "/client_account" },
    { icon: MessageSquare, label: 'Messages', to: "/allmessages", badgeCount: unreadMessages }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl text-center font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-center mt-1">Welcome back, Gabriel!</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/notification" onClick={() => setNotificationCount(0)}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs text-white font-bold px-1 border-2 border-white">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </motion.button>
              </Link>
              <Link to='/account'>
                <Avatar name='Gabriel Gordon-Mensah' size='md' />
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Stats Grid */}
          <section>
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-auto text-gray-700 bg-white px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-6">
              Quick Actions
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <QuickAction key={index} {...action} />
              ))}
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Bookings */}
            <section className="lg:col-span-2">
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Bookings</h2>
                <Link to='/client_bookings' className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
              
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking}
                    onViewDetails={setSelectedBooking}
                  />
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md divide-y divide-gray-100"
              >
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </motion.div>

              {/* PROMOTIONAL OFFER - COMMENTED OUT 
              <motion.div
                variants={itemVariants}
                className="mt-6 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Special Offer!</h3>
                </div>
                <p className="text-orange-50 mb-4">
                  Get 20% off your next booking with verified professionals
                </p>
                <button className="w-full py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Claim Offer
                </button>
              </motion.div>*/}
            </section>
          </div>


          {/* Services Near You */}
          <motion.section variants={itemVariants}>
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Services Near You</h2>
        <p className="text-gray-600 mt-1">Showing providers within 5km radius</p>
      </div>
      <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-colors flex items-center gap-2">
        <Filter className="w-4 h-4" />
        Filter
      </button>
    </div>
    
    <ServicesMap providers={mockProviders} />
  </div>
</motion.section>
        </motion.div>
      </main>

      {/* Shared Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          userType="client"
          onCancel={handleCancel}
          onEdit={handleEdit}
        />
      )}

      {/* Cancel Confirmation Modal */}
      <CancelBookingModal
        booking={bookingToCancel}
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
      />
    </div>
  );
};

export default ClientDashboard;