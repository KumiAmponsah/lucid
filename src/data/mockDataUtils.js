// ============================================
// MOCK DATA UTILITIES & HOOKS
// File: src/data/mockDataUtils.js
// ============================================
import React from 'react';
import { MASTER_BOOKINGS, populateBooking } from './mockBookings';


/**
 * Get all bookings with populated data
 */
export const getAllBookings = () => {
  return MASTER_BOOKINGS.map(populateBooking);
};

/**
 * Filter bookings by status
 */
export const getBookingsByStatus = (status) => {
  return MASTER_BOOKINGS
    .filter(b => b.status === status)
    .map(populateBooking);
};


/**
 * Filter bookings by provider ID
 */
export const getBookingsByProvider = (providerId) => {
  return getAllBookings().filter(b => b.providerId === providerId);
};

/**
 * Filter bookings by client ID
 */
export const getBookingsByClient = (clientId) => {
  return getAllBookings().filter(b => b.clientId === clientId);
};

/**
 * Get single booking by ID
 */
export const getBookingById = (bookingId) => {
  const booking = getAllBookings().find(b => b.id === bookingId);
  return booking || null;
};

/**
 * Get bookings by multiple statuses
 */
export const getBookingsByStatuses = (statuses = []) => {
  return getAllBookings().filter(b => statuses.includes(b.status));
};

/**
 * Get active bookings (pending, confirmed, in-progress)
 */
export const getActiveBookings = () => {
  return getBookingsByStatuses(['pending', 'confirmed', 'in-progress']);
};

/**
 * Get historical bookings (completed, cancelled)
 */
export const getHistoricalBookings = () => {
  return getBookingsByStatuses(['completed', 'cancelled']);
};

/**
 * Get completed bookings only
 */
export const getCompletedBookings = () => {
  return getAllBookings().filter(b => b.status === 'completed');
};

/**
 * Get cancelled bookings only
 */
export const getCancelledBookings = () => {
  return getAllBookings().filter(b => b.status === 'cancelled');
};

/**
 * Get bookings with pending actions
 */
export const getPendingActionBookings = () => {
  return getAllBookings().filter(b => 
    b.status === 'pending' ||
    b.priceAdjustment?.status === 'pending' ||
    b.completionRequest?.status === 'pending' ||
    b.cancellationRequest?.status === 'pending'
  );
};

/**
 * Calculate statistics from bookings
 */
export const calculateBookingStats = (bookings) => {
  const completed = bookings.filter(b => b.status === 'completed');
  const cancelled = bookings.filter(b => b.status === 'cancelled');
  const active = bookings.filter(b => 
    ['pending', 'confirmed', 'in-progress'].includes(b.status)
  );
  
  const totalEarnings = completed.reduce((sum, b) => {
    const amount = b.agreedPrice || 0;
    const providerReceives = amount * 0.82; // 82% after 18% platform fee
    return sum + providerReceives;
  }, 0);
  
  const totalRevenue = completed.reduce((sum, b) => {
    return sum + (b.agreedPrice || 0);
  }, 0);
  
  const ratingsArray = completed
    .filter(b => b.rating)
    .map(b => b.rating);
  
  const avgRating = ratingsArray.length > 0
    ? (ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length).toFixed(1)
    : 0;
  
  const completionRate = bookings.length > 0
    ? ((completed.length / bookings.length) * 100).toFixed(0)
    : 0;
  
  return {
    total: bookings.length,
    active: active.length,
    completed: completed.length,
    cancelled: cancelled.length,
    totalEarnings: totalEarnings.toFixed(2),
    totalRevenue: totalRevenue.toFixed(2),
    avgRating,
    completionRate: parseInt(completionRate)
  };
};

/**
 * Search bookings by query
 */
export const searchBookings = (bookings, query) => {
  if (!query || query.trim() === '') return bookings;
  
  const lowerQuery = query.toLowerCase();
  
  return bookings.filter(booking => {
    const searchableFields = [
      booking.title,
      booking.serviceType,
      booking.description,
      booking.provider?.name,
      booking.provider?.profession,
      booking.client?.name,
      booking.location?.area,
      booking.location?.city,
      booking.bookingReference
    ];
    
    return searchableFields.some(field => 
      field && field.toLowerCase().includes(lowerQuery)
    );
  });
};

/**
 * Sort bookings
 */
export const sortBookings = (bookings, sortBy = 'date', order = 'desc') => {
  const sorted = [...bookings].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.scheduledDate) - new Date(a.scheduledDate);
      
      case 'price':
        return (b.agreedPrice || 0) - (a.agreedPrice || 0);
      
      case 'status':
        const statusOrder = {
          'in-progress': 0,
          'confirmed': 1,
          'pending': 2,
          'completed': 3,
          'cancelled': 4
        };
        return statusOrder[a.status] - statusOrder[b.status];
      
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      
      default:
        return 0;
    }
  });
  
  return order === 'asc' ? sorted.reverse() : sorted;
};

/**
 * Filter bookings by date range
 */
export const filterBookingsByDateRange = (bookings, startDate, endDate) => {
  if (!startDate && !endDate) return bookings;
  
  return bookings.filter(booking => {
    const bookingDate = new Date(booking.scheduledDate);
    
    if (startDate && bookingDate < new Date(startDate)) return false;
    if (endDate && bookingDate > new Date(endDate)) return false;
    
    return true;
  });
};

/**
 * Filter bookings by time period
 */
export const filterBookingsByPeriod = (bookings, period = 'all') => {
  if (period === 'all') return bookings;
  
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const ranges = {
    today: {
      start: startOfToday,
      end: new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000)
    },
    week: {
      start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      end: now
    },
    month: {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: new Date(now.getFullYear(), now.getMonth() + 1, 0)
    },
    quarter: {
      start: new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1),
      end: new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + 3, 0)
    },
    year: {
      start: new Date(now.getFullYear(), 0, 1),
      end: new Date(now.getFullYear(), 11, 31)
    }
  };
  
  const range = ranges[period];
  if (!range) return bookings;
  
  return filterBookingsByDateRange(bookings, range.start, range.end);
};

/**
 * Get bookings requiring action from user
 */
export const getActionRequiredBookings = (bookings, userType) => {
  return bookings.filter(booking => {
    // Pending bookings require provider action
    if (booking.status === 'pending' && userType === 'provider') {
      return true;
    }
    
    // Price adjustment requires client approval
    if (booking.priceAdjustment?.status === 'pending' && 
        booking.priceAdjustment.requestedBy !== userType) {
      return true;
    }
    
    // Completion request requires opposite party confirmation
    if (booking.completionRequest?.status === 'pending' &&
        booking.completionRequest.requestedBy !== userType) {
      return true;
    }
    
    // Cancellation request requires opposite party approval
    if (booking.cancellationRequest?.status === 'pending' &&
        booking.cancellationRequest.requestedBy !== userType) {
      return true;
    }
    
    return false;
  });
};

// ============================================
// REACT HOOK FOR BOOKINGS
// ============================================

/**
 * Custom hook for managing bookings in components
 * Usage:
 * const { bookings, stats, loading } = useBookings({
 *   userType: 'provider',
 *   userId: 'PRV001',
 *   status: 'active',
 *   period: 'month'
 * });
 */
export const useBookings = ({
  userType = null,
  userId = null,
  status = 'all',
  period = 'all',
  searchQuery = ''
} = {}) => {
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [userId, status, period]);
  
  let bookings = getAllBookings();
  
  // Filter by user
  if (userType === 'provider' && userId) {
    bookings = getBookingsByProvider(userId);
  } else if (userType === 'client' && userId) {
    bookings = getBookingsByClient(userId);
  }
  
  // Filter by status category
  if (status === 'active') {
    bookings = bookings.filter(b => 
      ['pending', 'confirmed', 'in-progress'].includes(b.status)
    );
  } else if (status === 'history') {
    bookings = bookings.filter(b => 
      ['completed', 'cancelled'].includes(b.status)
    );
  } else if (status !== 'all') {
    bookings = bookings.filter(b => b.status === status);
  }
  
  // Filter by period
  bookings = filterBookingsByPeriod(bookings, period);
  
  // Search
  if (searchQuery) {
    bookings = searchBookings(bookings, searchQuery);
  }
  
  // Calculate stats
  const stats = calculateBookingStats(bookings);
  
  // Get action required count
  const actionRequired = userType 
    ? getActionRequiredBookings(bookings, userType).length 
    : 0;
  
  return {
    bookings,
    stats,
    loading,
    actionRequired
  };
};

// ============================================
// EXAMPLE USAGE IN COMPONENTS
// ============================================

/*
// Provider Dashboard Example:
import { useBookings } from '@/data/mockDataUtils';

function ProviderDashboard() {
  const { bookings, stats, loading, actionRequired } = useBookings({
    userType: 'provider',
    userId: 'PRV001',
    status: 'active',
    period: 'month'
  });
  
  if (loading) return <Spinner />;
  
  return (
    <div>
      <StatsGrid stats={stats} />
      <BookingsList bookings={bookings} />
      {actionRequired > 0 && <ActionBadge count={actionRequired} />}
    </div>
  );
}

// Client History Example:
function ClientHistory() {
  const [period, setPeriod] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { bookings, stats } = useBookings({
    userType: 'client',
    userId: 'CLT001',
    status: 'history',
    period,
    searchQuery
  });
  
  return (
    <div>
      <PeriodSelector value={period} onChange={setPeriod} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <HistoryList bookings={bookings} />
      <StatsOverview stats={stats} />
    </div>
  );
}

// Direct function usage:
import { 
  getAllBookings, 
  getBookingById,
  calculateBookingStats 
} from '@/data/mockDataUtils';

// Get specific booking
const booking = getBookingById('BK10000001');

// Get all bookings and calculate stats
const allBookings = getAllBookings();
const stats = calculateBookingStats(allBookings);
*/

export default {
  getBookingsByProvider,
  getBookingsByClient,
  getBookingById,
  getActiveBookings,
  getHistoricalBookings,
  getCompletedBookings,
  getCancelledBookings,
  getPendingActionBookings,
  calculateBookingStats,
  searchBookings,
  sortBookings,
  filterBookingsByDateRange,
  filterBookingsByPeriod,
  getActionRequiredBookings,
  useBookings
};