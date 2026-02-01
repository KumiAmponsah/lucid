import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import { useNotification } from '../contexts/NotificationContext';
import { Avatar } from '../components/ui/Avatar.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Link } from 'react-router-dom';
import BookingDetailsModal from '../components/shared/BookingDetailsModal.jsx';
import CancelBookingModal from '../components/shared/CancelBookingModal.jsx';
import { getBookingsByClient } from '../data/mockDataUtils';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  MapPin,
  DollarSign,
  User,
  Eye,
  MessageCircle,
  Star
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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

const ClientBookings = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  
  const handleBackClick = useNavigateBack('/client_dashboard', 600);
  const { showNotification } = useNotification();

  // ✅ FIXED: Action handlers
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

  const handleMarkComplete = (booking) => {
    console.log('Marking task complete:', booking.id);
    showNotification('Job marked as complete!', 'success');
    setSelectedTask(null);
  };

  const handleEdit = (booking) => {
    console.log('Editing booking:', booking.id);
    showNotification('Edit feature coming soon', 'info');
    setSelectedBooking(null);
  };

  const handleRequestCompletion = async (requestData) => {
  console.log('Completion Request:', requestData);
  
  const updatedBooking = {
    ...selectedBooking,
    completionRequest: {
      status: 'pending',
      requestedBy: requestData.requestedBy,
      notes: requestData.notes,
      timestamp: requestData.timestamp
    }
  };
  
  setSelectedBooking(updatedBooking);
  showNotification('Completion request sent! Awaiting confirmation.', 'success');
};

const handleApproveCompletion = async (booking) => {
  console.log('Approving completion for:', booking.id);
  
  const updatedBooking = {
    ...booking,
    status: 'completed',
    completionDate: new Date().toISOString()
  };
  
  setSelectedBooking(null);
  showNotification('Work confirmed as complete! 🎉', 'success');
};

const handleRejectCompletion = async (booking) => {
  console.log('Requesting changes for:', booking.id);
  
  const updatedBooking = {
    ...booking,
    completionRequest: null
  };
  
  setSelectedBooking(updatedBooking);
  showNotification('Completion rejected. Communicated changes needed.', 'info');
};

  // Comprehensive Mock Booking Data for Client Dashboard
// Covers all statuses: pending, confirmed, in-progress, completed, cancelled

const bookings = useMemo(() => {
  return getBookingsByClient('CLT004'); // Your client ID
}, []);

  const filterButtons = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'in-progress', label: 'In Progress', count: bookings.filter(b => b.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
      const searchableText = [
        booking.title,
        booking.provider?.name,
        booking.location?.area,
        booking.location?.city
      ].filter(Boolean).join(' ').toLowerCase();
      const matchesSearch = searchableText.includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [bookings, activeFilter, searchQuery]);

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: Clock,
        label: 'Pending Confirmation'
      },
      confirmed: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle,
        label: 'Confirmed'
      },
      'in-progress': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: AlertCircle,
        label: 'In Progress'
      },
      completed: {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        icon: CheckCircle,
        label: 'Completed'
      },
      cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: XCircle,
        label: 'Cancelled'
      }
    };
    return configs[status];
  };

  const BookingCard = ({ booking }) => {
    const statusConfig = getStatusConfig(booking.status);
    const StatusIcon = statusConfig.icon;
    const providerName = booking.provider?.name ?? 'Service Provider';
    const locationLabel = [
      booking.location?.area,
      booking.location?.city
    ].filter(Boolean).join(', ');

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <Avatar name={providerName} size="md" />
            <div>
              <h4 className="font-semibold text-gray-900">{providerName}</h4>
              <p className="text-sm text-gray-600">{booking.title}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
            <StatusIcon className="w-3 h-3" />
            {statusConfig.label}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{booking.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="truncate">{locationLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{booking.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-xl font-bold text-gray-900">GH₵{booking.price}</span>
          </div>
          <div className="flex gap-2">
            {booking.status === 'completed' && booking.rating && (
              <div className="flex items-center gap-1 mr-2">
                <span className="text-sm text-gray-600">Rated:</span>
                <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span className="text-sm text-black font-semibold">{booking.rating}</span>
              </div>
            )}
            <button
              onClick={() => setSelectedBooking(booking)}
              className="px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Details
            </button>
            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600 mt-1">Track and manage all your service bookings</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by service, provider, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none text-base"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filterButtons.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {filter.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id
                    ? 'bg-white/20'
                    : 'bg-gray-200'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bookings Grid */}
        {filteredBookings.length > 0 ? (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="bg-white rounded-xl p-12 shadow-md text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "You don't have any bookings in this category"}
              </p>
              <Link to='/Service'>
              <Button
                  variant="primary"
                  size="md"
                  fullWidth>
                Book a Service
              </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          userType="client"
          onCancel={handleCancel}
          onEdit={handleEdit}
          onMarkComplete={handleMarkComplete}
          onSubmitReview={(reviewData) => {
    console.log("Submitted review:", reviewData);

    // simulate persistence
    setSelectedBooking(prev => ({
      ...prev,
      rating: reviewData.rating,
      review: reviewData.reviewText
    }));
  }}
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

export default ClientBookings;