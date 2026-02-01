import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

/**
 * Leave Review Modal Component
 * @param {Object} booking - The completed booking to review
 * @param {boolean} isOpen - Modal visibility state
 * @param {Function} onClose - Close modal handler
 * @param {Function} onSubmit - Submit review handler
 */
const LeaveReviewModal = ({ booking, isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [categories, setCategories] = useState({
    quality: 0,
    professionalism: 0,
    communication: 0,
    punctuality: 0,
    value: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const provider = booking.provider || {};

  // Rating labels
  const getRatingLabel = (stars) => {
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[stars] || 'Select Rating';
  };

  // Rating emoji
  const getRatingEmoji = (stars) => {
    if (stars <= 2) return <Frown className="w-8 h-8 text-red-500" />;
    if (stars === 3) return <Meh className="w-8 h-8 text-yellow-500" />;
    return <Smile className="w-8 h-8 text-green-500" />;
  };

  // Handle category rating
  const handleCategoryRating = (category, value) => {
    setCategories(prev => ({ ...prev, [category]: value }));
  };

  // Validate and submit
  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (reviewText.trim().length < 10) {
      alert('Please write at least 10 characters in your review');
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        bookingId: booking.id,
        providerId: provider.id,
        providerName: provider.name,
        clientName: booking.client?.name,
        rating,
        reviewText: reviewText.trim(),
        categories,
        serviceType: booking.serviceType || booking.title,
        timestamp: new Date().toISOString(),
        verified: true // Since it's from a completed booking
      };

      await onSubmit(reviewData);
      
      // Reset form
      setRating(0);
      setReviewText('');
      setCategories({
        quality: 0,
        professionalism: 0,
        communication: 0,
        punctuality: 0,
        value: 0
      });
      
      onClose();
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Leave a Review</h2>
              <p className="text-sm text-gray-600 mt-1">
                How was your experience with {provider.name}?
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Booking Info */}
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-sm text-blue-800">
                <strong>Service:</strong> {booking.title}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Date:</strong> {booking.date}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Price:</strong> GH₵{booking.price}
              </p>
            </div>

            {/* Overall Rating */}
            <div>
              <label className="block text-lg font-semibold text-blue-600 mb-3">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              
              <div className="flex flex-col items-center space-y-4">
                {/* Star Rating */}
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-blue-600 text-blue-600'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Rating Label and Emoji */}
                {(rating > 0 || hoveredRating > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3"
                  >
                    {getRatingEmoji(hoveredRating || rating)}
                    <span className="text-xl font-semibold text-gray-900">
                      {getRatingLabel(hoveredRating || rating)}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Category Ratings */}
            <div>
              <label className="block text-lg font-semibold text-blue-600 mb-3">
                Rate Specific Areas
              </label>
              
              <div className="space-y-4">
                {[
                  { key: 'quality', label: 'Quality of Work' },
                  { key: 'professionalism', label: 'Professionalism' },
                  { key: 'communication', label: 'Communication' },
                  { key: 'punctuality', label: 'Punctuality' },
                  { key: 'value', label: 'Value for Money' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{label}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleCategoryRating(key, star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= categories[key]
                                ? 'fill-blue-600 text-blue-600'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Written Review */}
            <div>
              <label className="block text-lg font-semibold text-blue-600 mb-3">
                Write Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
                placeholder="Share details about your experience with this service provider. What did they do well? What could be improved?"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                {reviewText.length} characters (minimum 10)
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Review Guidelines</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Be honest and fair in your review</li>
                <li>• Focus on your actual experience</li>
                <li>• Avoid offensive or inappropriate language</li>
                <li>• Don't include personal contact information</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            <div className="flex gap-4">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || rating === 0 || reviewText.trim().length < 10}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeaveReviewModal;