import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import { useNotification } from '../contexts/NotificationContext';
import { Avatar } from '../components/ui/Avatar.jsx';
import EarningsDashboard from '../components/earningsDashboard.jsx';
import BookingDetailsModal from '../components/shared/BookingDetailsModal.jsx';
import EarningsChart from '../components/earnings_chart.jsx';
import { getBookingsByProvider, calculateBookingStats, getActionRequiredBookings } from '../data/mockDataUtils';
import {
  ArrowLeft, 
  TrendingUp, 
  Calendar,
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Award,
  Briefcase,
  MapPin,
  MessageSquare,
  Bell,
  ChevronRight,
  Activity,
  Users,
  Eye,
  X,
  Phone,
  Mail,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Navigation,
  User
} from 'lucide-react';

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

// Recent Activity Item
const ActivityItem = ({ icon: Icon, title, description, time, status, to }) => {
  const statusColors = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
    new: 'bg-blue-100 text-blue-700'
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 5 }}
      className="flex items-start gap-4 p-4 hover:bg-gray-200 rounded-lg transition-colors"
    >
      <Link to={to}>
      <div className="w-9 p-2 bg-blue-50 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {status && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[status]}`}>
              {status}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {time}
        </p>
      </div>
      </Link>
    </motion.div>
  );
};

// Upcoming Booking Card
const BookingCard = ({ booking, onViewDetails }) => {
  const clientName = booking.client?.name ?? 'Client';
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
          <Avatar name={clientName} size="md" />
          <div>
            <h4 className="font-semibold text-gray-900">{clientName}</h4>
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


// Task Details Modal

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

// Main Dashboard Component
const ProviderDashboard = () => {
  const [timeframe, setTimeframe] = useState('week');
  const handleBackClick = useNavigateBack('/lucid', 200);
const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
    const [notificationCount, setNotificationCount] = useState(5);
    const [unreadMessages, setUnreadMessages] = useState(3);
    const [unreadBookings, setUnreadbookings] = useState(5);

    const [selectedBooking, setSelectedBooking] = useState(null);
  const { showNotification } = useNotification();

  const handleAccept = (booking) => {
    console.log('Accepting booking:', booking.id);
    showNotification('Booking accepted successfully!', 'success');
    setSelectedBooking(null);
    // TODO: Add API call here
  };

  const handleDecline = (booking) => {
    console.log('Declining booking:', booking.id);
    showNotification('Booking declined', 'info');
    setSelectedBooking(null);
    // TODO: Add API call here
  };

  const handleMarkComplete = (booking) => {
    console.log('Marking booking complete:', booking.id);
    showNotification('Job marked as complete!', 'success');
    setSelectedBooking(null);
    // TODO: Add API call here
  };
  
 const allBookings = useMemo(() => {
  return getBookingsByProvider('PRV001'); // Your actual provider ID
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
  { 
    icon: Briefcase, 
    title: 'Total Jobs', 
    value: bookingStats.total.toString(), 
    change: '+12%', 
    trend: 'up', 
    color: 'blue' 
  },
  { 
    icon: DollarSign, 
    title: 'Earnings', 
    value: `GH₵${bookingStats.totalEarnings}`, 
    change: '+8%', 
    trend: 'up', 
    color: 'green' 
  },
  { 
    icon: Star, 
    title: 'Rating', 
    value: bookingStats.avgRating, 
    change: '+0.2', 
    trend: 'up', 
    color: 'orange' 
  },
  { 
    icon: Users, 
    title: 'Clients', 
    value: '34', 
    change: '+5', 
    trend: 'up', 
    color: 'purple' 
  }
], [bookingStats]);

  const recentActivities = useMemo(() => [
    {
      icon: CheckCircle,
      title: 'Job Completed',
      description: 'Plumbing service at Osu',
      time: '2 hours ago',
      status: 'completed',
      to:'/provider_bookings'
    },
    {
      icon: MessageSquare,
      title: 'New Message',
      description: 'Client inquiry about electrical work',
      time: '4 hours ago',
      status: 'new',
      to:'/allmessages'
    },
    {
      icon: Star,
      title: 'New Review',
      description: 'Sarah Johnson left a 5-star review',
      time: '1 day ago',
      status: 'new',
      to:'/generalProfile'
    },
    {
      icon: Calendar,
      title: 'Booking Confirmed',
      description: 'Carpentry work scheduled for tomorrow',
      time: '2 days ago',
      status: 'pending',
      to:'/provider_bookings'
    }
  ], []);

 const bookings = useMemo(() => {
  return activeBookings.slice(0, 3); // Show first 3 active bookings
}, [activeBookings]);


  const quickActions = [
    { icon: Calendar, label: 'Schedule', to: "/provider_bookings", badgeCount: unreadBookings },
    {  icon: MessageSquare, label: 'Messages', to: "/allmessages", badgeCount: unreadMessages },
    { icon: User, label: 'Account', to: "/provider_account" },
    { icon: Activity, label: 'Analytics', to: "/earnings" }
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
              <Link to="/userProfile">
                <Avatar name='Gabriel Gordon-Mensah' size='md'/>
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
            {/* Upcoming Bookings */}
            <section className="lg:col-span-2">
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Bookings</h2>
                <Link to='/provider_bookings' className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
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

              {/* Performance Card */}
                <motion.div
                variants={itemVariants}
                className="mt-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Top Performer!</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  You're in the top 10% of service providers this month!
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">95%</p>
                    <p className="text-sm text-blue-100">Satisfaction Rate</p>
                  </div>
                  <Eye className="w-12 h-12 opacity-20" />
                </div>
              </motion.div>
            </section>
          </div>

          {/* Earnings Chart Preview */}
           <EarningsChart />
        </motion.div>
      </main>

      {/* Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          userType="provider"
          onAccept={handleAccept}
          onDecline={handleDecline}
          onMarkComplete={handleMarkComplete}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;