import React, { useState, useMemo,useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNotification } from '../contexts/NotificationContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const History = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'stats'

const handleBackClick = useCallback(() => {
    showNotification('Going Back', 'info');
    setTimeout(() => {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/dashboard');
      }
    }, 800);
  }, [showNotification, navigate]);

  // Mock history data
  const historyData = useMemo(() => [
    {
      id: 1,
      date: '2025-12-18',
      title: 'Carpentry Work',
      client: 'Kwame Asante',
      location: 'Madina, Accra',
      amount: 380,
      status: 'completed',
      rating: 5,
      duration: '6 hours',
      paymentMethod: 'Mobile Money'
    },
    {
      id: 2,
      date: '2025-12-17',
      title: 'AC Maintenance',
      client: 'Sarah Johnson',
      location: 'Osu, Accra',
      amount: 200,
      status: 'cancelled',
      duration: '1.5 hours'
    },
    {
      id: 3,
      date: '2025-12-16',
      title: 'Door Lock Replacement',
      client: 'Ama Frimpong',
      location: 'Achimota, Accra',
      amount: 150,
      status: 'completed',
      rating: 4,
      duration: '1 hour',
      paymentMethod: 'Cash'
    },
    {
      id: 4,
      date: '2025-12-15',
      title: 'Plumbing Repair',
      client: 'John Doe',
      location: 'Spintex, Accra',
      amount: 300,
      status: 'completed',
      rating: 5,
      duration: '3 hours',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 5,
      date: '2025-12-14',
      title: 'Electrical Installation',
      client: 'Mary Ansah',
      location: 'Tema, Greater Accra',
      amount: 550,
      status: 'completed',
      rating: 5,
      duration: '5 hours',
      paymentMethod: 'Mobile Money'
    },
    {
      id: 6,
      date: '2025-12-10',
      title: 'Painting Job',
      client: 'Peter Mensah',
      location: 'Labadi, Accra',
      amount: 700,
      status: 'completed',
      rating: 4,
      duration: '2 days',
      paymentMethod: 'Cash'
    }
  ], []);

  const periods = [
    { id: 'all', label: 'All Time' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  const filteredHistory = useMemo(() => {
    // In production, filter by actual dates
    return historyData;
  }, [historyData, selectedPeriod]);

  const stats = useMemo(() => {
    const completed = filteredHistory.filter(h => h.status === 'completed');
    const totalEarnings = completed.reduce((sum, h) => sum + h.amount, 0);
    const avgRating = completed.filter(h => h.rating).reduce((sum, h) => sum + h.rating, 0) / completed.filter(h => h.rating).length;
    
    return {
      totalJobs: filteredHistory.length,
      completedJobs: completed.length,
      cancelledJobs: filteredHistory.filter(h => h.status === 'cancelled').length,
      totalEarnings,
      avgRating: avgRating.toFixed(1),
      completionRate: ((completed.length / filteredHistory.length) * 100).toFixed(0)
    };
  }, [filteredHistory]);

  const HistoryItem = ({ item }) => (
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
              <span>{item.client}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">GH₵{item.amount}</div>
            {item.rating && (
              <div className="flex items-center gap-1 justify-end mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{item.rating}.0</span>
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
            <span>{item.location}</span>
          </div>
          {item.paymentMethod && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>{item.paymentMethod}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
          <Button size="sm" variant="outline" className="flex-1">
            <FileText className="w-4 h-4" />
            View Receipt
          </Button>
          {item.status === 'completed' && (
            <Button size="sm" variant="outline" className="flex-1">
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );

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
            className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
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
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {stats.avgRating}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.completionRate}%
              </div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                GH₵{stats.totalEarnings}
              </div>
              <div className="text-sm text-gray-600">Total Earned</div>
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
    </div>
  );
};

export default History;