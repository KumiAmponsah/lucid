import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, DollarSign, AlertCircle, CheckCircle, 
  TrendingUp, FileText, Edit2, Lock, CreditCard,
  Receipt, Info
} from 'lucide-react';

// ============================================
// 1. PROVIDER: QUOTE PRICE MODAL
// Shows when provider clicks "Accept Booking"
// ============================================
export const QuotePriceModal = ({ 
  booking, 
  isOpen, 
  onClose, 
  onSubmitQuote 
}) => {
  const [quotedPrice, setQuotedPrice] = useState(booking?.price || '');
  const [priceBreakdown, setPriceBreakdown] = useState({
    laborCost: '',
    materialsCost: '',
    additionalFees: ''
  });
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const calculateTotal = () => {
    const labor = parseFloat(priceBreakdown.laborCost) || 0;
    const materials = parseFloat(priceBreakdown.materialsCost) || 0;
    const additional = parseFloat(priceBreakdown.additionalFees) || 0;
    return (labor + materials + additional).toFixed(2);
  };

  const handleSubmit = async () => {
    const total = parseFloat(calculateTotal());
    if (total <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitQuote({
        bookingId: booking.id,
        quotedPrice: total,
        breakdown: priceBreakdown,
        notes: notes,
        timestamp: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Failed to submit quote:', error);
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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quote Price</h2>
              <p className="text-sm text-gray-600 mt-1">
                Provide a detailed price breakdown for this job
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Job Summary */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">{booking.title}</p>
                  <p className="text-sm text-blue-800 mt-1">{booking.description}</p>
                  {booking.budget?.min && (
                    <p className="text-sm text-blue-700 mt-2">
                      Client's budget: GH₵{booking.budget.min} - GH₵{booking.budget.max}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Price Breakdown
              </h3>

              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Labor Cost <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      GH₵
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={priceBreakdown.laborCost}
                      onChange={(e) => setPriceBreakdown(prev => ({
                        ...prev,
                        laborCost: e.target.value
                      }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Materials/Parts Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      GH₵
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={priceBreakdown.materialsCost}
                      onChange={(e) => setPriceBreakdown(prev => ({
                        ...prev,
                        materialsCost: e.target.value
                      }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Fees (Transport, etc.)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      GH₵
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={priceBreakdown.additionalFees}
                      onChange={(e) => setPriceBreakdown(prev => ({
                        ...prev,
                        additionalFees: e.target.value
                      }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Total Quote:</span>
                  <span className="text-3xl font-bold text-green-600">
                    GH₵ {calculateTotal()}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quote Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Add any details about the quote (e.g., warranty info, timeline, payment terms)..."
              />
            </div>

            {/* Info Box */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Important:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>This quote can be adjusted later if needed</li>
                    <li>Client will review and must approve before work begins</li>
                    <li>Final payment amount will be confirmed at completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || parseFloat(calculateTotal()) <= 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote & Accept Booking'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================
// 2. PROVIDER: ADJUST PRICE MODAL
// Shows when provider needs to update price during work
// ============================================
export const AdjustPriceModal = ({ 
  booking, 
  isOpen, 
  onClose, 
  onSubmitAdjustment 
}) => {
  const [newPrice, setNewPrice] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const currentPrice = booking.agreedPrice || booking.price || 0;
  const priceDifference = (parseFloat(newPrice) || 0) - currentPrice;
  const isIncrease = priceDifference > 0;

  const handleSubmit = async () => {
    if (!newPrice || parseFloat(newPrice) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    if (!reason.trim()) {
      alert('Please provide a reason for the price adjustment');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitAdjustment({
        bookingId: booking.id,
        originalPrice: currentPrice,
        newPrice: parseFloat(newPrice),
        reason: reason,
        timestamp: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Failed to submit adjustment:', error);
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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-full">
                <Edit2 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Adjust Price</h2>
                <p className="text-sm text-gray-600">Request price change from client</p>
              </div>
            </div>

            {/* Current Price */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Current Agreed Price</p>
              <p className="text-2xl font-bold text-gray-900">GH₵ {currentPrice.toFixed(2)}</p>
            </div>

            {/* New Price */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  GH₵
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg font-semibold"
                  placeholder="0.00"
                />
              </div>

              {newPrice && (
                <div className={`mt-2 flex items-center gap-2 text-sm font-semibold ${
                  isIncrease ? 'text-red-600' : 'text-green-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${isIncrease ? '' : 'rotate-180'}`} />
                  {isIncrease ? '+' : ''}{priceDifference.toFixed(2)} GH₵ 
                  ({isIncrease ? 'increase' : 'decrease'})
                </div>
              )}
            </div>

            {/* Reason */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for Adjustment <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                placeholder="Explain why the price needs to be adjusted (e.g., unexpected damage found, additional materials needed)..."
                required
              />
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Client Approval Required</p>
                  <p>The client must approve this price adjustment before the booking can be completed.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !newPrice || !reason.trim()}
                className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Request Adjustment'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================
// 3. CLIENT: PAYMENT INTERFACE MODAL
// Shows when client clicks "Mark Complete"
// ============================================
export const PaymentModal = ({ 
  booking, 
  isOpen, 
  onClose, 
  onProcessPayment 
}) => {
  const [confirmedPrice, setConfirmedPrice] = useState(
    booking?.agreedPrice || booking?.price || ''
  );
  const [paymentMethod, setPaymentMethod] = useState('mobile_money');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen || !booking) return null;

  // ✅ CORRECTED: Platform fee is deducted from provider, not added to client
  const baseAmount = parseFloat(confirmedPrice) || 0;
  const platformFee = (baseAmount * 0.18).toFixed(2); // 18% deducted from provider
  const providerReceives = (baseAmount - parseFloat(platformFee)).toFixed(2);
  const totalAmount = baseAmount.toFixed(2); // Client pays the full agreed price

  const handlePayment = async () => {
    if (!confirmedPrice || parseFloat(confirmedPrice) <= 0) {
      alert('Please confirm the final price');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (paymentMethod === 'mobile_money' && !phoneNumber) {
      alert('Please enter your mobile money number');
      return;
    }

    setIsProcessing(true);
    try {
      // This is where you'd integrate with your payment gateway
      await onProcessPayment({
        bookingId: booking.id,
        amount: parseFloat(confirmedPrice),
        platformFee: parseFloat(platformFee),
        totalAmount: parseFloat(totalAmount),
        paymentMethod: paymentMethod,
        phoneNumber: paymentMethod === 'mobile_money' ? phoneNumber : null,
        timestamp: new Date().toISOString()
      });
      // onClose(); // Don't close - let parent handle success flow
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={isProcessing ? undefined : onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
              <p className="text-sm text-gray-600 mt-1">
                Confirm final price and make payment
              </p>
            </div>
            <button 
              onClick={onClose} 
              disabled={isProcessing}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Service Summary */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-blue-900">{booking.title}</p>
                  <p className="text-sm text-blue-800 mt-1">
                    Provider: {booking.provider?.name}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    {booking.date} at {booking.time}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Adjustment Notice (if applicable) */}
            {booking.priceAdjustment && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-orange-900 mb-1">
                      Price was adjusted from GH₵{booking.originalPrice} to GH₵{booking.agreedPrice}
                    </p>
                    <p className="text-orange-800">
                      Reason: {booking.priceAdjustment.reason}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Final Price Confirmation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Final Agreed Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  GH₵
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={confirmedPrice}
                  onChange={(e) => setConfirmedPrice(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-2xl font-bold"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <Lock className="w-3 h-3 inline mr-1" />
                This is the amount the provider will receive
              </p>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-bold text-gray-900">Payment Breakdown</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Amount (You Pay)</span>
                  <span className="font-semibold">GH₵ {baseAmount.toFixed(2)}</span>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded p-2 flex justify-between">
                  <span className="text-orange-700 text-xs">
                    Platform Fee (18% - deducted from provider)
                  </span>
                  <span className="font-semibold text-orange-700 text-xs">GH₵ {platformFee}</span>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded p-2 flex justify-between">
                  <span className="text-green-700 text-xs">Provider Receives (82%)</span>
                  <span className="font-semibold text-green-700 text-xs">GH₵ {providerReceives}</span>
                </div>
                
                <div className="border-t-2 border-gray-300 pt-2 flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Your Total Payment</span>
                  <span className="font-bold text-blue-600">GH₵ {totalAmount}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-3">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> You pay GH₵ {totalAmount}. The provider receives GH₵ {providerReceives} after the 18% platform service fee.
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Payment Method <span className="text-red-500">*</span>
              </label>

              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'mobile_money' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    value="mobile_money"
                    checked={paymentMethod === 'mobile_money'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Mobile Money</p>
                    <p className="text-sm text-gray-600">MTN, Vodafone, AirtelTigo</p>
                  </div>
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </label>

                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Debit/Credit Card</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard</p>
                  </div>
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </label>
              </div>

              {/* Mobile Money Number */}
              {paymentMethod === 'mobile_money' && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Money Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="024 XXX XXXX"
                  />
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-5 h-5"
              />
              <span className="text-sm text-gray-700">
                I confirm that the work has been completed satisfactorily and I agree to the 
                <a href="#" className="text-blue-600 hover:underline ml-1">
                  payment terms and conditions
                </a>
              </span>
            </label>

            {/* Security Notice */}
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
              <div className="flex gap-3">
                <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-semibold mb-1">Secure Payment</p>
                  <p>Your payment is protected. Funds are held securely until both you and the provider confirm completion.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing || !confirmedPrice || !agreedToTerms || parseFloat(confirmedPrice) <= 0}
              className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pay GH₵ {totalAmount}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================
// 4. PRICE ADJUSTMENT APPROVAL BANNER
// Shows in BookingDetailsModal when there's a pending adjustment
// ============================================
export const PriceAdjustmentBanner = ({ 
  booking, 
  userType,
  onApprove,
  onReject 
}) => {
  if (!booking?.priceAdjustment || booking.priceAdjustment.status !== 'pending') {
    return null;
  }

  const adjustment = booking.priceAdjustment;
  const isRequestor = adjustment.requestedBy === userType;
  const priceDifference = adjustment.newPrice - adjustment.originalPrice;
  const isIncrease = priceDifference > 0;

  return (
    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Edit2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-orange-900">
              {isRequestor ? 'Price Adjustment Requested' : 'Price Adjustment Request'}
            </p>
            <p className="text-sm text-orange-800 mt-1">
              {isRequestor 
                ? 'You requested to adjust the price. Awaiting client approval.'
                : 'The provider has requested to adjust the price.'
              }
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-orange-200">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Original Price</p>
              <p className="text-lg font-bold text-gray-900">
                GH₵ {adjustment.originalPrice.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">New Price</p>
              <p className={`text-lg font-bold ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
                GH₵ {adjustment.newPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 text-sm font-semibold mb-3 ${
            isIncrease ? 'text-red-600' : 'text-green-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${isIncrease ? '' : 'rotate-180'}`} />
            {isIncrease ? '+' : ''}{priceDifference.toFixed(2)} GH₵ 
            ({isIncrease ? 'increase' : 'decrease'})
          </div>

          <div className="border-t border-gray-200 pt-3">
            <p className="text-xs text-gray-600 mb-1 font-semibold">Reason:</p>
            <p className="text-sm text-gray-900">{adjustment.reason}</p>
            <p className="text-xs text-gray-500 mt-2">
              Requested on: {new Date(adjustment.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        {!isRequestor && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onApprove(booking)}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
            >
              Approve New Price
            </button>
            <button
              onClick={() => onReject(booking)}
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