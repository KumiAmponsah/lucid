import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LeaveReviewModal from './ReviewModal.jsx';
import { QuotePriceModal, AdjustPriceModal, PaymentModal, PriceAdjustmentBanner } from './PaymentModals.jsx';

import { 
  X, Star, Clock, CheckCircle, AlertCircle, User, Phone, Mail,
  FileText, Calendar, MapPin, Navigation, MessageCircle,
  ThumbsUp, ThumbsDown, Edit2, Trash2, Play, AlertTriangle,
  Info, XCircle, DollarSign
} from 'lucide-react';


const BookingDetailsModal = ({ 
  booking, 
  onClose, 
  userType = 'provider',
  onAccept,
  onDecline,
  onCancel,
  onEdit,
  onStartJob,
  onMarkComplete,
  onRequestCancellation,
  onApproveCancellation,
  onRejectCancellation,
  onRequestCompletion,        // NEW
  onApproveCompletion,        // NEW
  onRejectCompletion,
  onSubmitReview,          // NEW
  // NEW: Payment flow handlers
  onSubmitQuote,
  onSubmitPriceAdjustment,
  onApprovePriceAdjustment,
  onRejectPriceAdjustment,
  onProcessPayment

}) => {
  const [showCancelRequestModal, setShowCancelRequestModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [showCompleteRequestModal, setShowCompleteRequestModal] = useState(false); // NEW
  const [completionNotes, setCompletionNotes] = useState('');                      // NEW
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  // NEW: Payment flow state
  const [showQuotePriceModal, setShowQuotePriceModal] = useState(false);
  const [showAdjustPriceModal, setShowAdjustPriceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);


  if (!booking) return null;

  // Normalized helpers
  const provider = booking.provider || {};
  const client = booking.client || {};
  const location = booking.location || {};
  const budget = booking.budget || {};
  const normalizedStatus = booking.status?.toLowerCase();
  const hasPriceAdjustment = booking.priceAdjustment?.status === 'pending' || booking.priceAdjustment?.status === 'approved';

  

  // Contact info based on user type
  const contactLabel = userType === 'provider' ? 'Client' : 'Service Provider';
  const contactName = userType === 'provider' ? client.name : provider.name;
  const contactPhone = userType === 'provider' ? client.phone : provider.phone;
  const contactEmail = userType === 'provider' ? client.email : provider.email;

  // Check if there's a pending cancellation request
  const hasCancellationRequest = booking.cancellationRequest?.status === 'pending';
  const isRequestor = booking.cancellationRequest?.requestedBy === userType;
  const canApproveCancellation = hasCancellationRequest && !isRequestor;

  // NEW: Check if there's a pending completion request
  const hasCompletionRequest = booking.completionRequest?.status === 'pending';
  const isCompletionRequestor = booking.completionRequest?.requestedBy === userType;
  const canApproveCompletion = hasCompletionRequest && !isCompletionRequestor;

  // Status configuration
  const getStatusConfig = (status = 'pending') => {
    const configs = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle, label: 'Confirmed' },
      'in-progress': { bg: 'bg-purple-100', text: 'text-purple-700', icon: AlertCircle, label: 'In Progress' },
      completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Cancelled' }
    };
    return configs[status.toLowerCase()] || configs.pending;
  };

  const getUrgencyConfig = (urgency) => {
    const configs = {
      normal: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Normal' },
      urgent: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Urgent' },
      emergency: { bg: 'bg-red-100', text: 'text-red-700', label: 'Emergency' }
    };
    return configs[urgency] || configs.normal;
  };

  const statusConfig = getStatusConfig(booking.status);
  const urgencyConfig = getUrgencyConfig(booking.urgency);
  const StatusIcon = statusConfig.icon;

  const mapQuery = [location.address, location.area, location.city].filter(Boolean).join(', ');

  // NEW: Handler for provider accepting booking with quote
  const handleAcceptWithQuote = () => {
    setShowQuotePriceModal(true);
  };

  // NEW: Handler for submitting quote
  const handleQuoteSubmit = async (quoteData) => {
    await onSubmitQuote?.(quoteData);
    setShowQuotePriceModal(false);
    onClose(); // Close main modal after successful quote
  };

  // NEW: Handler for price adjustment approval
  const handleApprovePriceAdjustment = async (booking) => {
    await onApprovePriceAdjustment?.(booking);
  };

  const handleRejectPriceAdjustment = async (booking) => {
    await onRejectPriceAdjustment?.(booking);
  };

  // NEW: Handler for client marking complete (triggers payment)
  const handleClientMarkComplete = () => {
    setShowPaymentModal(true);
  };

  // NEW: Handler for successful payment
  const handlePaymentSuccess = async (paymentData) => {
    await onProcessPayment?.(paymentData);
    setShowPaymentModal(false);
    
    // Now mark as complete
    await onMarkComplete?.(booking);
    onClose();
  };


  // NEW: Handle completion request submission
  const handleSubmitCompletionRequest = async () => {
    if (!completionNotes.trim()) {
      alert('Please provide completion notes');
      return;
    }

    setIsSubmitting(true);
    try {
      await onRequestCompletion?.({
        bookingId: booking.id,
        requestedBy: userType,
        notes: completionNotes,
        timestamp: new Date().toISOString()
      });
      setShowCompleteRequestModal(false);
      setCompletionNotes('');
    } catch (error) {
      console.error('Failed to submit completion request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancellation request submission
  const handleSubmitCancellationRequest = async () => {
    if (!cancellationReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }

    setIsSubmitting(true);
    try {
      await onRequestCancellation?.({
        bookingId: booking.id,
        requestedBy: userType,
        reason: cancellationReason,
        timestamp: new Date().toISOString()
      });
      setShowCancelRequestModal(false);
      setCancellationReason('');
    } catch (error) {
      console.error('Failed to submit cancellation request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Status Banner Component
  const StatusBanner = () => {
    if (normalizedStatus === 'pending' && userType === 'client') {
      return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-yellow-900">Awaiting Provider Response</p>
              <p className="text-sm text-yellow-800">
                The provider will review and respond to your booking request soon.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (normalizedStatus === 'confirmed') {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-blue-900">Booking Confirmed!</p>
              <p className="text-sm text-blue-800">
                Scheduled for {booking.date} at {booking.time}
                {userType === 'provider' && " - Don't forget to start the job when you begin work."}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (normalizedStatus === 'in-progress') {
      return (
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Play className="w-5 h-5 text-purple-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-purple-900">Work in Progress</p>
              <p className="text-sm text-purple-800">
                {userType === 'provider' 
                  ? "Mark as complete when finished. To cancel, you'll need client approval."
                  : "The provider is currently working on your request. To cancel, you'll need provider approval."
                }
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // NEW: Completion Request Banner
  const CompletionRequestBanner = () => {
    if (!hasCompletionRequest) return null;

    const request = booking.completionRequest;
    const requestorName = request.requestedBy === 'provider' ? provider.name : client.name;

    return (
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-green-900">
                {isCompletionRequestor ? 'Completion Request Sent' : 'Completion Request Received'}
              </p>
              <p className="text-sm text-green-800 mt-1">
                {isCompletionRequestor 
                  ? `You marked this job as complete. Awaiting ${contactLabel.toLowerCase()} confirmation.`
                  : `${requestorName} has marked this job as complete and is requesting your confirmation.`
                }
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-green-200">
            <p className="text-xs text-gray-600 mb-1 font-semibold">Completion notes:</p>
            <p className="text-sm text-gray-900">{request.notes}</p>
            <p className="text-xs text-gray-500 mt-2">
              Marked complete on: {new Date(request.timestamp).toLocaleString()}
            </p>
          </div>

          {canApproveCompletion && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onApproveCompletion?.(booking)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
              >
                Confirm Completion
              </button>
              <button
                onClick={() => onRejectCompletion?.(booking)}
                className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
              >
                Request Changes
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Cancellation Request Banner
  const CancellationRequestBanner = () => {
    if (!hasCancellationRequest) return null;

    const request = booking.cancellationRequest;
    const requestorName = request.requestedBy === 'provider' ? provider.name : client.name;

    return (
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-orange-900">
                {isRequestor ? 'Cancellation Request Sent' : 'Cancellation Request Received'}
              </p>
              <p className="text-sm text-orange-800 mt-1">
                {isRequestor 
                  ? `You requested to cancel this booking. Awaiting ${contactLabel.toLowerCase()} approval.`
                  : `${requestorName} has requested to cancel this booking.`
                }
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-orange-200">
            <p className="text-xs text-gray-600 mb-1 font-semibold">Reason for cancellation:</p>
            <p className="text-sm text-gray-900">{request.reason}</p>
            <p className="text-xs text-gray-500 mt-2">
              Requested on: {new Date(request.timestamp).toLocaleString()}
            </p>
          </div>

          {canApproveCancellation && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onApproveCancellation?.(booking)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
              >
                Approve Cancellation
              </button>
              <button
                onClick={() => onRejectCancellation?.(booking)}
                className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
              >
                Reject Request
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{booking.title}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </span>
                {booking.urgency && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyConfig.bg} ${urgencyConfig.text}`}>
                    {urgencyConfig.label}
                  </span>
                )}
                {booking.bookingReference && (
                  <span className="text-sm text-gray-500">#{booking.bookingReference}</span>
                )}
                {/* NEW: Show agreed price */}
                {booking.agreedPrice && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    GH₵ {booking.agreedPrice}
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Status Banner */}
            <StatusBanner />

            {/* NEW: Price Adjustment Banner */}
            <PriceAdjustmentBanner
              booking={booking}
              userType={userType}
              onApprove={handleApprovePriceAdjustment}
              onReject={handleRejectPriceAdjustment}
            />

            {/* Cancellation Request Banner */}
            <CancellationRequestBanner />

            {/* NEW: Completion Request Banner */}
            <CompletionRequestBanner />

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                {contactLabel} Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="font-semibold text-gray-900">{contactName}</p>
                </div>
                {contactPhone && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <a href={`tel:${contactPhone}`} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {contactPhone}
                    </a>
                  </div>
                )}
                {contactEmail && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <a href={`mailto:${contactEmail}`} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {contactEmail}
                    </a>
                  </div>
                )}
                {userType === 'client' && provider.profession && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Profession</p>
                    <p className="font-semibold text-gray-900">{provider.profession}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {userType === 'provider' ? 'Job' : 'Service'} Details
              </h3>
              <div className="space-y-4">
                {booking.serviceType && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Service Type</p>
                    <p className="font-semibold text-gray-900">{booking.serviceType}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{booking.description}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Duration</p>
                    <p className="font-semibold text-gray-900">{booking.duration}</p>
                  </div>
                  {budget.min && budget.max && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Budget Range</p>
                      <p className="font-semibold text-gray-900">GH₵{budget.min} - GH₵{budget.max}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {userType === 'provider' ? 'Quoted Price' : 'Price'}
                    </p>
                    <p className="font-semibold text-green-600 text-lg">GH₵{booking.price}</p>
                  </div>
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
                  <p className="text-sm text-gray-600 mb-1">
                    {userType === 'client' ? 'Service' : 'Scheduled'} Date & Time
                  </p>
                  <p className="font-semibold text-gray-900 text-lg">{booking.date} at {booking.time}</p>
                </div>
                {booking.alternateDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Alternate Option</p>
                    <p className="font-semibold text-gray-900">{booking.alternateDate} at {booking.alternateTime}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                {userType === 'provider' ? 'Service' : ''} Location
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="font-semibold text-gray-900">{location.address}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Area</p>
                    <p className="font-semibold text-gray-900">{location.area}, {location.city}</p>
                  </div>
                  {location.landmark && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Landmark</p>
                      <p className="font-semibold text-gray-900">{location.landmark}</p>
                    </div>
                  )}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
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
            {(booking.notes || booking.additionalNotes) && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {userType === 'client' ? 'Your' : 'Additional'} Notes
                </h3>
                <p className="text-gray-900 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  {booking.notes || booking.additionalNotes}
                </p>
              </div>
            )}

            {/* Attached Images */}
            {booking.images && booking.images.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Attached Images</h3>
                <div className="grid grid-cols-3 gap-4">
                  {booking.images.map((img, index) => (
                    <img key={index} src={img} alt={`Attachment ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            {/* Review Section */}
            {normalizedStatus === 'completed' && booking.review && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {userType === 'client' ? 'Your Review' : 'Client Review'}
                </h3>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  {booking.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < booking.rating ? 'fill-blue-600 text-blue-600' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">{booking.rating}.0</span>
                    </div>
                  )}
                  <p className="text-gray-900">{booking.review}</p>
                </div>
              </div>
            )}

            {/* Cancellation Reason */}
            {normalizedStatus === 'cancelled' && booking.cancellationReason && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cancellation Reason</h3>
                <p className="text-gray-900 bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  {booking.cancellationReason}
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer - Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            {/* Provider Actions */}
            {userType === 'provider' && (
              <>
                {/* UPDATED: Pending status - show quote modal */}
                {normalizedStatus === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleAcceptWithQuote}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      Accept & Quote Price
                    </button>
                    <button
                      onClick={() => onDecline?.(booking)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      <ThumbsDown className="w-5 h-5" />
                      Decline
                    </button>
                  </div>
                )}

                {normalizedStatus === 'confirmed' && (
                  <div className="space-y-3">
                    <button
                      onClick={() => onStartJob?.(booking)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    >
                      <Play className="w-5 h-5" />
                      Start Job
                    </button>
                    <div className="flex gap-3">
                      <Link to="/messagePage" className="flex-1">
                      <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Message Provider
                      </button>
                    </Link>
                      <button
                      onClick={() => onCancel?.(booking)}
                      className="px-6 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold flex items-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Cancel
                    </button>
                    </div>
                  </div>
                )}

                {/* UPDATED: In-progress - add adjust price button */}
                {normalizedStatus === 'in-progress' && (
                  <div className="space-y-3">
                    {!hasCompletionRequest ? (
                      <button
                        onClick={() => setShowCompleteRequestModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Mark as Complete
                      </button>
                    ) : (
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                        <p className="text-green-800 font-semibold">
                          ✓ Completion request sent. Awaiting client confirmation.
                        </p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      {/* NEW: Adjust Price button */}
                      {!hasPriceAdjustment && (
                        <button
                          onClick={() => setShowAdjustPriceModal(true)}
                          className="flex-1 px-4 py-2 bg-white border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-semibold flex items-center justify-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Adjust Price
                        </button>
                      )}
                      <Link to="/messagePage" className="flex-1">
                        <button className="w-full px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                          <MessageCircle className="w-4 h-4 inline mr-2" />
                          Message Client
                        </button>
                      </Link>
                      {!hasCancellationRequest && (
                        <button
                          onClick={() => setShowCancelRequestModal(true)}
                          className="px-6 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
                        >
                          Request Cancellation
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {normalizedStatus === 'completed' && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold text-lg">Job Completed</span>
                    </div>
                    {booking.rating && (
                      <p className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                        Client rated: {booking.rating}.0
                        <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Client Actions */}
            {userType === 'client' && (
              <>
                {normalizedStatus === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => onEdit?.(booking)}
                      className="flex-1 px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-5 h-5" />
                      Edit Booking
                    </button>
                    <button
                      onClick={() => onCancel?.(booking)}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Cancel Booking
                    </button>
                  </div>
                )}

                {normalizedStatus === 'confirmed' && (
                  <div className="flex gap-4">
                    <Link to="/messagePage" className="flex-1">
                      <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Message Provider
                      </button>
                    </Link>
                    <button
                      onClick={() => onCancel?.(booking)}
                      className="px-6 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold flex items-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                )}

                 {/* UPDATED: Client in-progress - mark complete triggers payment */}
                {normalizedStatus === 'in-progress' && (
                  <div className="space-y-3">
                    {!hasCompletionRequest ? (
                      <button
                        onClick={handleClientMarkComplete}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Complete & Pay
                      </button>
                    ) : (
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                        <p className="text-green-800 font-semibold">
                          ✓ Completion request sent. Awaiting provider confirmation.
                        </p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Link to="/messagePage" className="flex-1">
                        <button className="w-full px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                          <MessageCircle className="w-4 h-4 inline mr-2" />
                          Message Provider
                        </button>
                      </Link>
                      {!hasCancellationRequest && (
                        <button
                          onClick={() => setShowCancelRequestModal(true)}
                          className="px-6 py-2 bg-white border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
                        >
                          Request Cancellation
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {normalizedStatus === 'completed' && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold text-lg">Service Completed</span>
                    </div>
                    {!booking.review && (
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Leave a Review
                      </button>
                    )}
                  </div>
                )}

                {normalizedStatus === 'cancelled' && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-red-600 mb-3">
                      <AlertCircle className="w-6 h-6" />
                      <span className="font-semibold text-lg">Booking Cancelled</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      This booking was cancelled on {booking.bookingDate}
                    </p>
                  </div>
                )}
              </>
            )}</div>
        </motion.div>

        {/* Cancellation Request Modal */}
        {showCancelRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
            onClick={() => setShowCancelRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Request Cancellation</h3>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  You are requesting to cancel this in-progress booking. The {contactLabel.toLowerCase()} must approve your request before the cancellation is finalized.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Important:</span> Work will continue until the request is approved. Be sure to communicate with the {contactLabel.toLowerCase()}.
                  </p>
                </div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Cancellation <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                  placeholder="Please provide a detailed reason for requesting cancellation..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCancelRequestModal(false);
                    setCancellationReason('');
                  }}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitCancellationRequest}
                  disabled={isSubmitting || !cancellationReason.trim()}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* NEW: Completion Request Modal */}
        {showCompleteRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
            onClick={() => setShowCompleteRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Mark as Complete</h3>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  You're marking this job as complete. The {contactLabel.toLowerCase()} will need to confirm before the booking status changes to completed.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Note:</span> This helps ensure both parties agree the work is satisfactory before finalizing.
                  </p>
                </div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Completion Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                  placeholder={userType === 'provider' 
                    ? "Describe what was completed (e.g., 'Installed new pipes, tested for leaks, cleaned work area')"
                    : "Confirm the work completed meets your expectations..."
                  }
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCompleteRequestModal(false);
                    setCompletionNotes('');
                  }}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitCompletionRequest}
                  disabled={isSubmitting || !completionNotes.trim()}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* NEW: Quote Price Modal */}
        <QuotePriceModal
          booking={booking}
          isOpen={showQuotePriceModal}
          onClose={() => setShowQuotePriceModal(false)}
          onSubmitQuote={handleQuoteSubmit}
        />

        {/* NEW: Adjust Price Modal */}
        <AdjustPriceModal
          booking={booking}
          isOpen={showAdjustPriceModal}
          onClose={() => setShowAdjustPriceModal(false)}
          onSubmitAdjustment={onSubmitPriceAdjustment}
        />

        {/* NEW: Payment Modal */}
        <PaymentModal
          booking={booking}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onProcessPayment={handlePaymentSuccess}
        />

        <LeaveReviewModal
          booking={booking}
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSubmit={async (reviewData) => {
            await onSubmitReview?.(reviewData);
setShowReviewModal(false);
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDetailsModal;