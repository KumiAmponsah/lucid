import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNavigateBack } from "../hooks/useNavigateBack.js";
import EarningsChart from '../components/earnings_chart.jsx';
import { 
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard,
  Download,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Wallet,
  Building,
  Smartphone,
  Briefcase,
  Target
} from 'lucide-react';


     <EarningsChart />

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const EarningsPayments = () => {
  const handleBackClick = useNavigateBack('/provider_dashboard', 600);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAddPayment, setShowAddPayment] = useState(false);
  
  
  // UPDATED: Enhanced data structure matching chart requirements
  const earningsData = useMemo(() => ({
    thisWeek: 1250,
    lastWeek: 980,
    thisMonth: 4820,
    lastMonth: 4200,
    thisYear: 52000,
    lastYear: 45000,
    pending: 650,
    available: 4170,
    
    // NEW: Weekly breakdown (for chart)
    weeklyData: [
      { name: 'Mon', earnings: 180, jobs: 2, date: '2025-12-15' },
      { name: 'Tue', earnings: 250, jobs: 3, date: '2025-12-16' },
      { name: 'Wed', earnings: 320, jobs: 4, date: '2025-12-17' },
      { name: 'Thu', earnings: 200, jobs: 2, date: '2025-12-18' },
      { name: 'Fri', earnings: 280, jobs: 3, date: '2025-12-19' },
      { name: 'Sat', earnings: 150, jobs: 1, date: '2025-12-20' },
      { name: 'Sun', earnings: 220, jobs: 2, date: '2025-12-21' }
    ],
    
    // NEW: Monthly breakdown (for chart)
    monthlyData: [
      { name: 'Week 1', earnings: 950, jobs: 8, period: 'Dec 1-7' },
      { name: 'Week 2', earnings: 1200, jobs: 12, period: 'Dec 8-14' },
      { name: 'Week 3', earnings: 1350, jobs: 14, period: 'Dec 15-21' },
      { name: 'Week 4', earnings: 1320, jobs: 13, period: 'Dec 22-28' }
    ],
    
    // NEW: Yearly breakdown (for chart)
    yearlyData: [
      { name: 'Jan', earnings: 3200, jobs: 28 },
      { name: 'Feb', earnings: 3500, jobs: 32 },
      { name: 'Mar', earnings: 4100, jobs: 38 },
      { name: 'Apr', earnings: 3800, jobs: 35 },
      { name: 'May', earnings: 4200, jobs: 40 },
      { name: 'Jun', earnings: 4500, jobs: 42 },
      { name: 'Jul', earnings: 4800, jobs: 45 },
      { name: 'Aug', earnings: 4600, jobs: 43 },
      { name: 'Sep', earnings: 4900, jobs: 46 },
      { name: 'Oct', earnings: 5200, jobs: 48 },
      { name: 'Nov', earnings: 4820, jobs: 45 },
      { name: 'Dec', earnings: 5100, jobs: 47 }
    ],
    
    // NEW: Job statistics
    totalJobs: {
      thisWeek: 17,
      thisMonth: 45,
      thisYear: 487
    },
    
    // NEW: Goals
    goals: {
      monthly: 5000,
      yearly: 60000
    }
  }), []);

  const transactions = useMemo(() => [
    {
      id: 1,
      date: '2025-12-18',
      description: 'Payment from Kwame Asante',
      amount: 380,
      status: 'completed',
      method: 'Mobile Money',
      jobType: 'Carpentry Work'
    },
    {
      id: 2,
      date: '2025-12-17',
      description: 'Withdrawal to Bank',
      amount: -1000,
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      date: '2025-12-16',
      description: 'Payment from Ama Frimpong',
      amount: 150,
      status: 'completed',
      method: 'Cash',
      jobType: 'Plumbing Repair'
    },
    {
      id: 4,
      date: '2025-12-15',
      description: 'Payment from John Doe',
      amount: 300,
      status: 'pending',
      method: 'Mobile Money',
      jobType: 'Electrical Work'
    },
    {
      id: 5,
      date: '2025-12-14',
      description: 'Payment from Mary Ansah',
      amount: 550,
      status: 'completed',
      method: 'Bank Transfer',
      jobType: 'Installation Service'
    }
  ], []);

  const paymentMethods = useMemo(() => [
    {
      id: 1,
      type: 'mobile-money',
      name: 'MTN Mobile Money',
      number: '024 123 4567',
      isPrimary: true
    },
    {
      id: 2,
      type: 'bank',
      name: 'GCB Bank',
      accountNumber: '1234567890',
      isPrimary: false
    }
  ], []);

  const weekChange = ((earningsData.thisWeek - earningsData.lastWeek) / earningsData.lastWeek * 100).toFixed(1);
  const monthChange = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth * 100).toFixed(1);
  const yearChange = ((earningsData.thisYear - earningsData.lastYear) / earningsData.lastYear * 100).toFixed(1);

  const StatCard = ({ icon: Icon, title, amount, change, trend, subtitle }) => (
    <motion.div
      variants={fadeIn}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          trend === 'up' ? 'bg-green-50' : trend === 'down' ? 'bg-red-50' : 'bg-blue-50'
        }`}>
          <Icon className={`w-6 h-6 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
          }`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {parseFloat(change) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">GH₵{amount.toLocaleString()}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </motion.div>
  );

  const TransactionItem = ({ transaction }) => {
    const isWithdrawal = transaction.amount < 0;
    const statusConfig = {
      completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
      pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      failed: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' }
    }[transaction.status];

    const StatusIcon = statusConfig.icon;

    return (
      <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
        <div className="flex gap-4 flex-1">
          <div className={`p-2 rounded-lg ${isWithdrawal ? 'bg-red-50' : 'bg-green-50'} h-fit`}>
            <DollarSign className={`w-5 h-5 ${isWithdrawal ? 'text-red-600' : 'text-green-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.color}`}>
                <StatusIcon className="w-3 h-3" />
                {transaction.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {transaction.date}
              </span>
              <span>{transaction.method}</span>
              {transaction.jobType && <span>• {transaction.jobType}</span>}
            </div>
          </div>
        </div>
        <div className={`text-lg font-bold ${
          isWithdrawal ? 'text-red-600' : 'text-green-600'
        }`}>
          {isWithdrawal ? '-' : '+'}GH₵{Math.abs(transaction.amount)}
        </div>
      </div>
    );
  };

  const PaymentMethodCard = ({ method }) => {
    const icons = {
      'mobile-money': Smartphone,
      'bank': Building,
      'card': CreditCard
    };
    const Icon = icons[method.type] || Wallet;

    return (
      <div className="bg-white rounded-xl p-4 shadow-md relative">
        {method.isPrimary && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
              Primary
            </span>
          </div>
        )}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
            <p className="text-gray-600">{method.number || method.accountNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </button>
          {!method.isPrimary && (
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
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
              <h1 className="text-3xl font-bold text-gray-900">Earnings & Payments</h1>
              <p className="text-gray-600 mt-1">Manage your earnings and payment methods</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            icon={DollarSign}
            title="This Week"
            amount={earningsData.thisWeek}
            change={weekChange}
            trend={weekChange >= 0 ? 'up' : 'down'}
            subtitle={`${earningsData.totalJobs.thisWeek} jobs completed`}
          />
          <StatCard
            icon={DollarSign}
            title="This Month"
            amount={earningsData.thisMonth}
            change={monthChange}
            trend={monthChange >= 0 ? 'up' : 'down'}
            subtitle={`${earningsData.totalJobs.thisMonth} jobs completed`}
          />
          <StatCard
            icon={Clock}
            title="Pending"
            amount={earningsData.pending}
            subtitle="Awaiting payment"
          />
          <StatCard
            icon={Wallet}
            title="Available"
            amount={earningsData.available}
            trend="neutral"
            subtitle="Ready to withdraw"
          />
        </motion.div>

        {/* NEW: Earnings Chart */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white rounded-xl p-6 shadow-md mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Earnings Overview</h2>
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-colors">
              View Detailed Report
            </button>
          </div>
          <EarningsChart />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
                <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
              <div>
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>

            {/* Withdraw Section */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-2">Ready to withdraw?</h3>
              <p className="text-blue-100 mb-6">
                You have GH₵{earningsData.available.toLocaleString()} available for withdrawal
              </p>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Withdraw Funds
              </button>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                <button
                  onClick={() => setShowAddPayment(!showAddPayment)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">This Month Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Earned</span>
                  <span className="font-bold text-gray-900">GH₵{earningsData.thisMonth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Withdrawn</span>
                  <span className="font-bold text-gray-900">GH₵1,000</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">Net Balance</span>
                  <span className="font-bold text-green-600">GH₵3,820</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EarningsPayments;