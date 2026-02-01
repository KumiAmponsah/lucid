import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import BookingDetailsModal from '../components/shared/BookingDetailsModal.jsx';
import ReceiptModal from '../components/shared/ReceiptModal.jsx';
import {  getBookingsByClient, getBookingsByStatuses, filterBookingsByPeriod, calculateBookingStats } from '../data/mockDataUtils.js';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Filter,
  Download,
  FileText,
  Star,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  BarChart3,
  Eye
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ClientHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const handleBackClick = useNavigateBack('/client_dashboard', 400); // ✅ FIXED
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptBooking, setReceiptBooking] = useState(null);

  // ✅ Get current client's bookings
  const CURRENT_CLIENT_ID = 'CLT003'; // TODO: Get from auth context

  const allClientBookings = useMemo(() => {
    return getBookingsByClient(CURRENT_CLIENT_ID);
  }, [CURRENT_CLIENT_ID]);

  // ✅ Filter to only historical bookings
  const historyData = useMemo(() => {
    return allClientBookings.filter(b => 
      ['completed', 'cancelled'].includes(b.status)
    );
  }, [allClientBookings]);

  const periods = [
    { id: 'all', label: 'All Time' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  // ✅ Apply period filter
  const filteredHistory = useMemo(() => {
    return filterBookingsByPeriod(historyData, selectedPeriod);
  }, [historyData, selectedPeriod]);

  // ✅ Calculate stats using utility function
  const stats = useMemo(() => {
    const calculated = calculateBookingStats(filteredHistory);
    
    return {
      totalJobs: calculated.total,
      completedJobs: calculated.completed,
      cancelledJobs: calculated.cancelled,
      completionRate: calculated.completionRate,
      totalSpent: calculated.totalRevenue,
      avgRating: calculated.avgRating
    };
  }, [filteredHistory]);

  const HistoryItem = ({ item }) => {
    const clientName = item.client?.name ?? 'Client';
    const locationLabel = [item.location?.area, item.location?.city]
      .filter(Boolean)
      .join(', ');

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                {item.status === 'completed' ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Completed
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Cancelled
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{clientName}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">GH₵{item.price}</div>
              {item.rating && (
                <div className="flex items-center gap-1 justify-end mt-1">
                  <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                  <span className="text-sm text-blue-600 font-semibold">{item.rating}.0</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{item.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{locationLabel}</span>
            </div>
            {item.paymentMethod && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span>{item.paymentMethod}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => setSelectedBooking(item)}
            >
              <Eye className="w-4 h-4" />
              View Details
            </Button>
            {item.status === 'completed' && (
              <>
                <Button size="sm" 
              variant="outline" 
              className="flex-1" onClick={() => {
  setReceiptBooking(item);
  setShowReceipt(true);
}}>
  <FileText className="w-4 h-4" />
  View Receipt
</Button>
              </>
            )}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">History</h1>
                <p className="text-gray-600 mt-1">View your past jobs and earnings</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('stats')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'stats'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Filter */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Filter by period:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Overview */}
        {viewMode === 'stats' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Card className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalJobs}
              </div>
              <div className="text-sm text-gray-600">Total Jobs</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.completedJobs}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {stats.cancelledJobs}
              </div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.completionRate}%
              </div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </Card>
            <Card className="text-center">
  <div className="text-3xl font-bold text-orange-600 mb-2">
    GH₵{stats.totalSpent}
  </div>
  <div className="text-sm text-gray-600">Total Spent</div>
</Card>

<Card className="text-center">
  <div className="text-3xl font-bold text-yellow-600 mb-2">
    {stats.avgRating}
  </div>
  <div className="text-sm text-gray-600">Avg Rating Given</div>
</Card>
          </motion.div>
        )}

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>

        {/* Export Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-8 text-center"
        >
          <Button variant="outline" size="lg">
            <Download className="w-5 h-5" />
            Export History Report
          </Button>
        </motion.div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          userType="client"
          onAccept={() => {}} 
          onDecline={() => {}} 
          onMarkComplete={() => {}} 
        />
      )}

      {/*Render modal*/}
        {showReceipt && (
          <ReceiptModal
            booking={receiptBooking}
            onClose={() => setShowReceipt(false)}
            userType="client"
          />
        )}
    </div>
  );
};

export default ClientHistory;