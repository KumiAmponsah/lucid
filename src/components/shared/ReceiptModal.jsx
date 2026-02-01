import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Printer, Share2, Mail, CheckCircle,
  Calendar, Clock, MapPin, Phone, User, Star, DollarSign
} from 'lucide-react';

/**
 * Receipt Modal Component - CORRECTED VERSION
 * Platform fee is DEDUCTED from provider payment, NOT added to client payment
 */
const ReceiptModal = ({ booking, onClose, userType = 'provider' }) => {
  const receiptRef = useRef();

  if (!booking) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const receiptNumber = `${booking.bookingReference}-RCP-${new Date().getFullYear()}`;
  
  const provider = booking.provider || {};
  const client = booking.client || {};
  const location = booking.location || {};

  // ✅ CORRECTED CALCULATION
  // Client pays the full agreed price
  const serviceCharge = booking.agreedPrice || booking.price || 0;
  
  // Platform takes 18% of the service charge
  const platformFee = (serviceCharge * 0.18).toFixed(2);
  
  // Provider receives the remaining 82%
  const providerReceives = (serviceCharge - parseFloat(platformFee)).toFixed(2);
  
  // Client's total payment (just the service charge, no additional fees)
  const totalPaid = serviceCharge.toFixed(2);

  // Handle download PDF
  const handleDownload = () => {
    alert('PDF download would trigger here. Integrate html2pdf.js library.');
    console.log('Downloading receipt as PDF...');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Receipt - ${booking.title}`,
          text: `Service receipt for ${booking.title}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      alert('Share feature not supported on this browser');
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Receipt - ${booking.title}`);
    const body = encodeURIComponent(
      `Please find attached your service receipt.\n\n` +
      `Receipt #: ${receiptNumber}\n` +
      `Service: ${booking.title}\n` +
      `Date: ${booking.date}\n` +
      `Amount Paid: GH₵${totalPaid}\n\n` +
      `Thank you for using Lucid Services!`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
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
          {/* Action Bar - Hidden when printing */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10 print:hidden">
            <h2 className="text-xl font-bold text-gray-900">Service Receipt</h2>
            <div className="flex items-center gap-2">
              <button onClick={handleDownload} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download PDF">
                <Download className="w-5 h-5 text-gray-700" />
              </button>
              <button onClick={handlePrint} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
                <Printer className="w-5 h-5 text-gray-700" />
              </button>
              <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Share">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button onClick={handleEmail} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Email">
                <Mail className="w-5 h-5 text-gray-700" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Receipt Content */}
          <div ref={receiptRef} className="p-8 print:p-12">
            {/* Header */}
            <div className="text-center mb-8 pb-8 border-b-2 border-gray-300">
              <h1 className="text-4xl font-bold text-blue-600 mb-2">LUCID SERVICES</h1>
              <p className="text-lg text-gray-600 font-semibold">Professional Service Receipt</p>
            </div>

            {/* Receipt Details */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <p className="text-gray-600 font-semibold">Receipt Number</p>
                <p className="text-gray-900 font-bold">{receiptNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-semibold">Issue Date</p>
                <p className="text-gray-900 font-bold">{formatDate(new Date())}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Booking Reference</p>
                <p className="text-gray-900">{booking.bookingReference}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-semibold">Status</p>
                <div className="flex items-center justify-end gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-bold">PAID</span>
                </div>
              </div>
            </div>

            {/* Parties Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
              {/* Service Provider */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Service Provider</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{provider.name}</p>
                      <p className="text-gray-600">{provider.profession}</p>
                    </div>
                  </div>
                  {provider.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <p className="text-gray-700">{provider.phone}</p>
                    </div>
                  )}
                  {provider.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <p className="text-gray-700">{provider.email}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Client */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Billed To</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{client.name}</p>
                    </div>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <p className="text-gray-700">{client.phone}</p>
                    </div>
                  )}
                  {client.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <p className="text-gray-700">{client.email}</p>
                    </div>
                  )}
                  {location.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-gray-700">{location.address}</p>
                        <p className="text-gray-700">{location.area}, {location.city}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Service Details</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Service</p>
                  <p className="text-gray-900 font-bold text-lg">{booking.title}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Description</p>
                  <p className="text-gray-700">{booking.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-gray-600 text-xs">Date</p>
                      <p className="text-gray-900 font-semibold">{booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-gray-600 text-xs">Time</p>
                      <p className="text-gray-900 font-semibold">{booking.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-gray-600 text-xs">Duration</p>
                      <p className="text-gray-900 font-semibold">{booking.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ CORRECTED Payment Breakdown */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Payment Details</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    {/* Client's Payment */}
                    <tr>
                      <td className="py-3 text-gray-700 font-semibold">Service Charge (Client Paid)</td>
                      <td className="py-3 text-right font-bold text-gray-900 text-lg">
                        GH₵ {totalPaid}
                      </td>
                    </tr>
                    
                    {/* Platform Fee Deduction */}
                    <tr className="bg-orange-50">
                      <td className="py-3 text-orange-700">
                        <span className="flex items-center gap-2">
                          Platform Service Fee (18%)
                          <span className="text-xs bg-orange-100 px-2 py-0.5 rounded">Deducted</span>
                        </span>
                      </td>
                      <td className="py-3 text-right font-semibold text-orange-700">
                        - GH₵ {platformFee}
                      </td>
                    </tr>
                    
                    {/* Provider Receives */}
                    <tr className="border-t-2 border-gray-300 bg-green-50">
                      <td className="py-4 text-green-900 font-bold text-base">
                        Provider Receives (82%)
                      </td>
                      <td className="py-4 text-right font-bold text-green-600 text-xl">
                        GH₵ {providerReceives}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Payment Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-semibold mb-1">Payment Method</p>
                    <p className="text-gray-900">
                      {booking.paymentData?.paymentMethod || booking.paymentMethod || 'Mobile Money'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold mb-1">Payment Date</p>
                    <p className="text-gray-900">
                      {booking.paymentData?.paidAt 
                        ? formatDate(booking.paymentData.paidAt) 
                        : booking.date}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 font-semibold mb-1">Transaction ID</p>
                    <p className="text-gray-900 font-mono text-xs">
                      {booking.paymentData?.transactionId || 
                       `TXN-${booking.bookingReference}-${new Date().getTime().toString().slice(-6)}`}
                    </p>
                  </div>
                </div>

                {/* ✅ NEW: Payment Distribution Note */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p className="text-xs text-blue-900 font-semibold mb-2">Payment Distribution:</p>
                    <div className="grid grid-cols-2 gap-3 text-xs text-blue-800">
                      <div>
                        <p className="text-blue-600 mb-1">Client Paid:</p>
                        <p className="font-bold">GH₵ {totalPaid}</p>
                      </div>
                      <div>
                        <p className="text-blue-600 mb-1">Provider Receives:</p>
                        <p className="font-bold">GH₵ {providerReceives}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating & Review (if available) */}
            {booking.rating && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Client Feedback</h3>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-700 font-semibold">Rating:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < booking.rating
                              ? 'fill-blue-600 text-blue-600'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">({booking.rating}.0)</span>
                  </div>
                  {booking.review && (
                    <div>
                      <p className="text-gray-700 italic">"{booking.review}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {booking.additionalNotes && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Notes</h3>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-gray-700 text-sm">{booking.additionalNotes}</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-8 border-t-2 border-gray-300">
              <p className="text-gray-600 mb-2">Thank you for using Lucid Services</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Questions? Contact us at support@lucidservices.com</p>
                <p className="font-semibold">www.lucidservices.com</p>
                <p className="text-xs mt-4 pt-4 border-t border-gray-200">
                  This is an official receipt generated by Lucid Services platform
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReceiptModal;