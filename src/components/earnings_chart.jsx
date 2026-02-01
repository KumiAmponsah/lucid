import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, Calendar, Eye, EyeOff } from 'lucide-react';

// Mock data for different time periods
const weeklyData = [
  { name: 'Mon', earnings: 180, jobs: 2 },
  { name: 'Tue', earnings: 250, jobs: 3 },
  { name: 'Wed', earnings: 320, jobs: 4 },
  { name: 'Thu', earnings: 200, jobs: 2 },
  { name: 'Fri', earnings: 280, jobs: 3 },
  { name: 'Sat', earnings: 150, jobs: 1 },
  { name: 'Sun', earnings: 220, jobs: 2 }
];

const monthlyData = [
  { name: 'Week 1', earnings: 950, jobs: 8 },
  { name: 'Week 2', earnings: 1200, jobs: 12 },
  { name: 'Week 3', earnings: 1350, jobs: 14 },
  { name: 'Week 4', earnings: 1320, jobs: 13 }
];

const yearlyData = [
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
];

const EarningsChart = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [chartType, setChartType] = useState('area');
  const [showJobs, setShowJobs] = useState(true);

  const getDataForTimeframe = () => {
    switch(timeframe) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'year':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const data = getDataForTimeframe();
  const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);
  const totalJobs = data.reduce((sum, item) => sum + item.jobs, 0);
  const avgEarnings = (totalEarnings / data.length).toFixed(0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-blue-600 rounded-lg p-3 shadow-xl">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-green-600 font-semibold">
              Earnings: GH₵{payload[0].value.toLocaleString()}
            </p>
            {showJobs && payload[1] && (
              <p className="text-sm text-blue-600 font-semibold">
                Jobs: {payload[1].value}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Timeframe Selector */}
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                timeframe === period
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
              }`}
            >
              {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'This Year'}
            </button>
          ))}
        </div>

        {/* Chart Type Selector */}
        <div className="flex gap-2">
          {['area', 'line', 'bar'].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all capitalize ${
                chartType === type
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Toggle Jobs Display */}
        <button
          onClick={() => setShowJobs(!showJobs)}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {showJobs ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-primary" />}
          <span className="text-sm font-semibold text-gray-700">
            {showJobs ? 'Hide' : 'Show'} Jobs
          </span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">Total Earnings</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">GH₵{totalEarnings.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Total Jobs</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-2 border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-secondary">Avg Per Period</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">GH₵{avgEarnings}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Earnings Trend - {timeframe === 'week' ? 'Weekly' : timeframe === 'month' ? 'Monthly' : 'Yearly'}
        </h3>
        
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: '600' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: '600' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
              {showJobs && (
                <Area
                  type="monotone"
                  dataKey="jobs"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorJobs)"
                />
              )}
            </AreaChart>
          ) : chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: '600' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: '600' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', r: 5 }}
                activeDot={{ r: 7 }}
              />
              {showJobs && (
                <Line
                  type="monotone"
                  dataKey="jobs"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: '600' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: '600' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="earnings" 
                fill="#2563eb" 
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
              {showJobs && (
                <Bar 
                  dataKey="jobs" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={60}
                />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Insight</h4>
          <p className="text-sm text-blue-800">
            Your earnings have increased by 14.8% compared to last {timeframe}. Keep up the great work!
          </p>
        </div>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Goal Progress</h4>
          <p className="text-sm text-green-800">
            You're 85% towards your monthly goal of GH₵5,000. Just GH₵{(5000 - totalEarnings).toLocaleString()} more to go!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;