import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Search,
  MapPin,
  DollarSign,
  User,
  MoreVertical,
  Eye,
  MessageCircle,
  Star,
  X,
  Phone,
  Mail,
  FileText,
  Image as ImageIcon,
  ThumbsUp,
  Navigation,
  Download,
  Edit2,
  Trash2
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ClientBookings = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(null);

  const handleBackClick = useCallback(() => {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      window.location.href = '/dashboard';
    }
  }, []);

  // Mock booking data
  const bookings = useMemo(() => [
    {
      id: 1,
      title: 'Web Development',
      provider: 'Gabriel A. Gordon-Mensah',
      providerProfession: 'Full Stack Developer',
      providerRating: 4.8,
      status: 'confirmed',
      date: '2025-12-21',
      time: '10:00 AM',
      location: 'Home Service - Online',
      price: 450,
      description: 'Build a responsive e-commerce website with React and Node.js backend. Include payment integration and admin dashboard.',
      duration: '4-5 days',
      urgency: 'normal',
      providerPhone: '+233 24 123 4567',
      providerEmail: 'gabriel@email.com',
      serviceType: 'Web Development',
      address: 'Remote/Online Service',
      area: 'Virtual',
      city: 'Accra',
      budgetMin: 400,
      budgetMax: 500,
      alternateDate: '2025-12-22',
      alternateTime: '2:00 PM',
      estimatedDuration: '4-5 days',
      additionalNotes: 'Need mobile responsive design. Please include SEO optimization.',
      images: [],
      bookingDate: '2025-12-15',
      bookingReference: 'BK12345678'
    },
    {
      id: 2,
      title: 'Plumbing Repair',
      provider: 'John Mensah',
      providerProfession: 'Master Plumber',
      providerRating: 4.7,
      status: 'pending',
      date: '2025-12-22',
      time: '2:00 PM',
      location: 'Spintex, Accra',
      price: 250,
      description: 'Fix leaking kitchen sink and check bathroom water pressure. Also need to inspect pipes for any damage.',
      duration: '2-3 hours',
      urgency: 'urgent',
      providerPhone: '+233 20 987 6543',
      providerEmail: 'john.mensah@email.com',
      serviceType: 'Plumbing Repair',
      address: '123 Main Street, House 45',
      area: 'Spintex',
      city: 'Accra',
      landmark: 'Near Total Gas Station',
      postalCode: 'GA-123-4567',
      budgetMin: 200,
      budgetMax: 300,
      estimatedDuration: '2-3 hours',
      additionalNotes: 'Leak has been getting worse. Need urgent attention.',
      images: [],
      bookingDate: '2025-12-18',
      bookingReference: 'BK87654321'
    },
    {
      id: 3,
      title: 'Electrical Installation',
      provider: 'Mary Osei',
      providerProfession: 'Licensed Electrician',
      providerRating: 4.9,
      status: 'in-progress',
      date: '2025-12-20',
      time: '9:00 AM',
      location: 'East Legon, Accra',
      price: 380,
      description: 'Install new ceiling fan and lights in living room and bedroom. Wire checking and safety inspection included.',
      duration: '4 hours',
      urgency: 'normal',
      providerPhone: '+233 27 555 1234',
      providerEmail: 'mary.osei@email.com',
      serviceType: 'Electrical Work',
      address: '456 Oak Avenue, Apartment 2B',
      area: 'East Legon',
      city: 'Accra',
      landmark: 'Behind East Legon Mall',
      postalCode: 'GA-456-7890',
      budgetMin: 350,
      budgetMax: 400,
      estimatedDuration: '4-5 hours',
      additionalNotes: 'Ceiling fan already purchased. Just need installation.',
      images: [],
      bookingDate: '2025-12-17',
      bookingReference: 'BK11223344'
    },
    {
      id: 4,
      title: 'House Painting',
      provider: 'Kwame Asante',
      providerProfession: 'Professional Painter',
      providerRating: 4.6,
      status: 'completed',
      date: '2025-12-10',
      time: '8:00 AM',
      location: 'Madina, Accra',
      price: 800,
      description: 'Paint entire 3-bedroom apartment - walls and ceilings with fresh coat.',
      duration: '2 days',
      urgency: 'normal',
      providerPhone: '+233 24 777 8888',
      providerEmail: 'kwame.asante@email.com',
      serviceType: 'Painting',
      address: '789 Elm Street',
      area: 'Madina',
      city: 'Accra',
      landmark: 'Near Madina Market',
      budgetMin: 700,
      budgetMax: 900,
      estimatedDuration: '2-3 days',
      additionalNotes: 'Paint colors selected. Need primer coat first.',
      images: [],
      bookingDate: '2025-12-05',
      bookingReference: 'BK55667788',
      rating: 5,
      review: 'Excellent work! Very professional and finished on time.'
    },
    {
      id: 5,
      title: 'AC Maintenance',
      provider: 'Sarah Johnson',
      providerProfession: 'HVAC Technician',
      providerRating: 4.5,
      status: 'cancelled',
      date: '2025-12-17',
      time: '3:00 PM',
      location: 'Osu, Accra',
      price: 200,
      description: 'Annual AC servicing for 3 units in home',
      duration: '2 hours',
      urgency: 'normal',
      providerPhone: '+233 26 333 4444',
      providerEmail: 'sarah.johnson@email.com',
      serviceType: 'AC Service',
      address: '321 Beach Road',
      area: 'Osu',
      city: 'Accra',
      budgetMin: 150,
      budgetMax: 250,
      estimatedDuration: '2 hours',
      additionalNotes: 'Service cancelled due to schedule conflict.',
      images: [],
      bookingDate: '2025-12-12',
      bookingReference: 'BK99887766',
      cancellationReason: 'Schedule conflict - will reschedule'
    },
    {
      id: 6,
      title: 'Carpentry Work',
      provider: 'Michael Owusu',
      providerProfession: 'Master Carpenter',
      providerRating: 4.8,
      status: 'completed',
      date: '2025-12-08',
      time: '11:00 AM',
      location: 'Achimota, Accra',
      price: 350,
      description: 'Build custom bookshelf with 5 shelves to fit specific wall space',
      duration: '1 day',
      urgency: 'normal',
      providerPhone: '+233 55 999 0000',
      providerEmail: 'michael.owusu@email.com',
      serviceType: 'Carpentry',
      address: '890 Achimota Road',
      area: 'Achimota',
      city: 'Accra',
      budgetMin: 300,
      budgetMax: 400,
      estimatedDuration: '1 day',
      additionalNotes: 'Oak wood, dark finish. Measurements provided.',
      images: [],
      bookingDate: '2025-12-03',
      bookingReference: 'BK44556677',
      rating: 4,
      review: 'Good quality work. Delivered on time.'
    }
  ], []);

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
      const matchesSearch = booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           booking.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           booking.location.toLowerCase().includes(searchQuery.toLowerCase());
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

  const getUrgencyConfig = (urgency) => {
    const configs = {
      normal: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Normal' },
      urgent: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Urgent' },
      emergency: { bg: 'bg-red-100', text: 'text-red-700', label: 'Emergency' }
    };
    return configs[urgency] || configs.normal;
  };

  const handleCancelBooking = (bookingId) => {
    console.log('Cancelling booking:', bookingId);
    setShowCancelModal(null);
    // Show success notification
  };

  const BookingCard = ({ booking }) => {
    const statusConfig = getStatusConfig(booking.status);
    const StatusIcon = statusConfig.icon;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.title}</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">{booking.provider}</span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span className="text-sm font-semibold">{booking.providerRating}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{booking.providerProfession}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
              <StatusIcon className="w-3 h-3" />
              {statusConfig.label}
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
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
            <span className="truncate">{booking.location}</span>
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
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{booking.rating}.0</span>
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
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Booking Details Modal
  const BookingDetailsModal = ({ booking, onClose }) => {
    if (!booking) return null;

    const statusConfig = getStatusConfig(booking.status);
    const urgencyConfig = getUrgencyConfig(booking.urgency);
    const StatusIcon = statusConfig.icon;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{booking.title}</h2>
                  <span className="text-sm text-gray-500">#{booking.bookingReference}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyConfig.bg} ${urgencyConfig.text}`}>
                    {urgencyConfig.label}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Service Provider Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Service Provider
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{booking.provider}</p>
                      <p className="text-gray-600">{booking.providerProfession}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                        <span className="font-semibold text-gray-900">{booking.providerRating}</span>
                        <span className="text-gray-600 text-sm">(Based on reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <a href={`tel:${booking.providerPhone}`} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {booking.providerPhone}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a href={`mailto:${booking.providerEmail}`} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {booking.providerEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Booking Details
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Service Type</p>
                    <p className="font-semibold text-gray-900">{booking.serviceType}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{booking.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Duration</p>
                      <p className="font-semibold text-gray-900">{booking.estimatedDuration || booking.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Budget Range</p>
                      <p className="font-semibold text-gray-900">
                        GH₵{booking.budgetMin} - GH₵{booking.budgetMax}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Agreed Price</p>
                      <p className="font-semibold text-green-600 text-lg">GH₵{booking.price}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Booking Date</p>
                    <p className="font-semibold text-gray-900">{booking.bookingDate}</p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Schedule
                </h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Service Date & Time</p>
                    <p className="font-semibold text-gray-900 text-lg">{booking.date} at {booking.time}</p>
                  </div>
                  {booking.alternateDate && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Alternate Date & Time</p>
                      <p className="font-semibold text-gray-900">{booking.alternateDate} at {booking.alternateTime}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Service Location
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="font-semibold text-gray-900">{booking.address}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Area</p>
                      <p className="font-semibold text-gray-900">{booking.area}, {booking.city}</p>
                    </div>
                    {booking.landmark && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Landmark</p>
                        <p className="font-semibold text-gray-900">{booking.landmark}</p>
                      </div>
                    )}
                  </div>
                  {booking.postalCode && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Postal Code</p>
                      <p className="font-semibold text-gray-900">{booking.postalCode}</p>
                    </div>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.address + ', ' + booking.area + ', ' + booking.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <Navigation className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Additional Notes */}
              {booking.additionalNotes && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Notes</h3>
                  <p className="text-gray-900 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                    {booking.additionalNotes}
                  </p>
                </div>
              )}

              {/* Review Section (for completed bookings) */}
              {booking.status === 'completed' && booking.review && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Review</h3>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < booking.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">{booking.rating}.0</span>
                    </div>
                    <p className="text-gray-900">{booking.review}</p>
                  </div>
                </div>
              )}

              {/* Cancellation Reason (for cancelled bookings) */}
              {booking.status === 'cancelled' && booking.cancellationReason && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Cancellation Reason</h3>
                  <p className="text-gray-900 bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                    {booking.cancellationReason}
                  </p>
                </div>
              )}

              {/* Images */}
              {booking.images && booking.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    Attached Images
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {booking.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Attachment ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              {booking.status === 'pending' && (
                <div className="flex gap-4">
                  <button className="flex-1 px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Edit2 className="w-5 h-5" />
                    Edit Booking
                  </button>
                  <button 
                    onClick={() => setShowCancelModal(booking)}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Cancel Booking
                  </button>
                </div>
              )}
              {booking.status === 'confirmed' && (
                <div className="flex gap-4">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Message Provider
                  </button>
                  <button 
                    onClick={() => setShowCancelModal(booking)}
                    className="px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold flex items-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              )}
              {booking.status === 'in-progress' && (
                <div className="flex gap-4">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Message Provider
                  </button>
                  <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call
                  </button>
                </div>
              )}
              {booking.status === 'completed' && !booking.review && (
                <div className="flex gap-4">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Star className="w-5 h-5" />
                    Leave Review
                  </button>
                  <button className="flex-1 px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Receipt
                  </button>
                </div>
              )}
              {booking.status === 'completed' && booking.review && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Service Completed</span>
                  </div>
                  <button className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2 mx-auto">
                    <Download className="w-5 h-5" />
                    Download Receipt
                  </button>
                </div>
              )}
              {booking.status === 'cancelled' && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-red-600 mb-3">
                    <XCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Booking Cancelled</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    This booking was cancelled on {booking.bookingDate}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Cancel Confirmation Modal
  const CancelModal = ({ booking, onClose, onConfirm }) => {
    if (!booking) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Cancel Booking?</h2>
              </div>
              
              <p className="text-gray-600 mb-2">Are you sure you want to cancel this booking?</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">{booking.title}</p>
                <p className="text-sm text-gray-600 mb-1">Provider: {booking.provider}</p>
                <p className="text-sm text-gray-600">Date: {booking.date} at {booking.time}</p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Cancellation policies may apply. The provider will be notified immediately.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => onConfirm(booking.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
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
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none text-base"
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
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Book a Service
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
        />
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <CancelModal
          booking={showCancelModal}
          onClose={() => setShowCancelModal(null)}
          onConfirm={handleCancelBooking}
        />
      )}
    </div>
  );
};

export default ClientBookings;