// ============================================
// BOOKING CONFIRMATION PAGE
// File: src/pages/booking_confirmation.jsx
// ============================================

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  MessageCircle,
  Home,
  FileText,
  Download
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(30);
  
  const { bookingData, provider } = location.state || {};

  // Add payment info to booking flow
const paymentInfo = {
  amount: bookingData.price,
  platformFee: (bookingData.price * 0.18).toFixed(2),
  providerReceives: (bookingData.price * 0.82).toFixed(2)
};

  // Generate booking reference
  const bookingRefRef = React.useRef(null);

if (!bookingRefRef.current) {
  bookingRefRef.current = `BK${Date.now().toString().slice(-8)}`;
}

const bookingRef = bookingRefRef.current;

  useEffect(() => {
    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/generalProfile');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  if (!bookingData || !provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <p className="text-gray-600 mb-4">No booking data found</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-8"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Request Sent!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your booking request has been successfully submitted to {provider.name}
          </p>
          <p className="text-gray-600">
            Booking Reference: <span className="font-bold text-blue-600">{bookingRef}</span>
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* What Happens Next */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Provider Reviews Request</h3>
                  <p className="text-gray-600">
                    {provider.name} will review your booking details and check availability.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Confirmation or Discussion</h3>
                  <p className="text-gray-600">
                    You'll receive a notification when the provider confirms or wants to discuss details.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Service Delivery</h3>
                  <p className="text-gray-600">
                    Once confirmed, the service provider will arrive at the scheduled time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Payment & Review</h3>
                  <p className="text-gray-600">
                    After completion, make payment and leave a review for the service.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Booking Details */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Service Provider</p>
                    <p className="font-semibold text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-600">{provider.profession}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Service Type</p>
                    <p className="font-semibold text-gray-900">
                      {bookingData.serviceType === 'Other (Specify)' 
                        ? bookingData.customService 
                        : bookingData.serviceType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Preferred Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {bookingData.preferredDate}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {bookingData.preferredTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{bookingData.address}</p>
                    <p className="text-gray-600">{bookingData.area}, {bookingData.city}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-semibold text-gray-900">{bookingData.contactName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-semibold text-gray-900">{bookingData.contactPhone}</p>
                  </div>
                </div>

                {bookingData.contactEmail && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{bookingData.contactEmail}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Urgency</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {bookingData.urgency}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {bookingData.description && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-900">{bookingData.description}</p>
              </div>
            )}
          </Card>

          {/* Important Information */}
          <Card className="bg-blue-50 border-2 border-blue-200">
            <div className="flex gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• You will receive notifications about your booking status</li>
                  <li>• The service provider typically responds within {provider.responseTime || '2 hours'}</li>
                  <li>• You can message the provider directly if you have questions</li>
                  <li>• A confirmation email has been sent to {bookingData.contactEmail || 'your email'}</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => navigate('/client_bookings')}
            >
              <FileText className="w-5 h-5" />
              View My Bookings
            </Button>
            
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => navigate('/messagePage')}
            >
              <MessageCircle className="w-5 h-5" />
              Message Provider
            </Button>
            
            <Button
              size="md"
              fullWidth
              onClick={() => navigate('/lucid')}
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </div>

          {/* Auto-redirect notice */}
          {countdown > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600"
            >
              <p>Redirecting to home page in {countdown} seconds...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;