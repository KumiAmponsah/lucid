import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import { useNotification } from '../contexts/NotificationContext.jsx';
import BookingDetailsModal from '../components/shared/BookingDetailsModal.jsx';
import CancelBookingModal from '../components/shared/CancelBookingModal.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { getBookingsByProvider } from '../data/mockDataUtils';
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
  MoreVertical,
  Eye,
  MessageCircle,
  Star
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ProviderBookings = () => {
  const { showNotification } = useNotification();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const handleBackClick = useNavigateBack('/lucid', 400);

  const bookings = useMemo(() => {
  return getBookingsByProvider('PRV003'); // Your provider ID
}, []);


  const filterButtons = [
    { id: 'all', label: 'All bookings', count: bookings.length },
    { id: 'pending', label: 'Pending', count: bookings.filter(t => t.status === 'pending').length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter(t => t.status === 'confirmed').length },
    { id: 'in-progress', label: 'In Progress', count: bookings.filter(t => t.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(t => t.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(t => t.status === 'cancelled').length }
  ];

  const filteredbookings = useMemo(() => {
    return bookings.filter(task => {
      const matchesFilter = activeFilter === 'all' || task.status === activeFilter;
      const searchableText = [
        task.title,
        task.client?.name,
        task.location?.area,
        task.location?.city
      ].filter(Boolean).join(' ').toLowerCase();
      const matchesSearch = searchableText.includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [bookings, activeFilter, searchQuery]);

  const getStatusConfig = (status) => {
    const configs = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle, label: 'Confirmed' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', icon: AlertCircle, label: 'In Progress' },
      completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Cancelled' }
    };
    return configs[status];
  };

  // Action handlers for modal
  const handleAcceptTask = (task) => {
    console.log('Accepting task:', task.id);
    showNotification('Task accepted successfully!', 'success');
    setSelectedTask(null);
    // TODO: Add API call to update task status
  };

  const handleDeclineTask = (task) => {
    console.log('Declining task:', task.id);
    showNotification('Task declined', 'info');
    setSelectedTask(null);
    // TODO: Add API call to update task status
  };

  const handleMarkComplete = (task) => {
    console.log('Marking task complete:', task.id);
    showNotification('Job marked as complete!', 'success');
    setSelectedTask(null);
    // TODO: Add API call to update task status
  };

  // Cancel handler - opens the modal
const handleCancel = (booking) => {
  setBookingToCancel(booking);
  setShowCancelModal(true);
  setSelectedTask(null); 
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

// Confirm cancellation - actually cancels the booking
const confirmCancel = (booking) => {
  console.log('Cancelling booking:', booking.id);
  showNotification('Booking cancelled successfully', 'success');
  setShowCancelModal(false);
  setBookingToCancel(null);
  // TODO: Add API call to update booking status
};

  const TaskCard = ({ task }) => {
    const statusConfig = getStatusConfig(task.status);
    const StatusIcon = statusConfig.icon;
    const clientName = task.client?.name ?? 'Client';
    const locationLabel = [task.location?.area, task.location?.city]
      .filter(Boolean)
      .join(', ');

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        whileHover={{ scale: 1.01 }}
      >
        <Card hoverable className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{clientName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{task.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{task.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{locationLabel}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{task.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-xl font-bold text-gray-900">GH₵{task.price}</span>
            </div>
            <div className="flex gap-2">
              {task.status === 'completed' && task.rating && (
                <div className="flex items-center gap-1 mr-2">
                  <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                  <span className="text-sm text-black font-semibold">{task.rating}</span>
                </div>
              )}
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSelectedTask(task)}
              >
                <Eye className="w-4 h-4" />
                Details
              </Button>
              {task.status !== 'cancelled' && task.status !== 'completed' && (
                <Link to='/messagePage'>
                  <Button size="sm">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
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
              <h1 className="text-3xl font-bold text-gray-900">My bookings</h1>
              <p className="text-gray-600 mt-1">Manage all your bookings and appointments</p>
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
              placeholder="Search by title, client, or location..."
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
                  activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* bookings Grid */}
        {filteredbookings.length > 0 ? (
          <div className="grid gap-6">
            {filteredbookings.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Card className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "You don't have any bookings in this category"}
              </p>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Shared Booking Details Modal */}
      {selectedTask && (
        <BookingDetailsModal
          booking={selectedTask}
          onClose={() => setSelectedTask(null)}
          userType="provider"
          onAccept={handleAcceptTask}
          onDecline={handleDeclineTask}
          onCancel={handleCancel}
          onMarkComplete={handleMarkComplete}
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

export default ProviderBookings;