import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/Button.jsx';

/**
 * Shared Cancel Booking Confirmation Modal with Loading State
 * @param {Object} booking - Booking to cancel
 * @param {boolean} isOpen - Modal open state
 * @param {Function} onClose - Close modal handler
 * @param {Function} onConfirm - Confirm cancellation handler (can be async)
 */
const CancelBookingModal = ({ booking, isOpen, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !booking) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(booking);
      onClose();
    } catch (error) {
      console.error('Cancel failed:', error);
      // Error will be handled by parent component's notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="cancel-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={isLoading ? undefined : onClose}
      >
        <motion.div
          key="cancel-modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Cancel Booking?
            </h2>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-2">
            Are you sure you want to cancel <span className="font-semibold">{booking.title}</span>?
          </p>

          {/* Booking Preview */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {booking.title}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Provider: {booking.provider?.name || 'Service Provider'}
            </p>
            <p className="text-sm text-gray-600">
              Date: {booking.date} at {booking.time}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Price: <span className="font-semibold">GH₵{booking.price}</span>
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Note:</span> Cancellation policies may apply. 
              You may be charged a cancellation fee depending on the timing.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={onClose}
              disabled={isLoading}
            >
              Keep Booking
            </Button>
            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={handleConfirm}
              loading={isLoading}
            >
              {isLoading ? 'Cancelling...' : 'Cancel Booking'}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CancelBookingModal;