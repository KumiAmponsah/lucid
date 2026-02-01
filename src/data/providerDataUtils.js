// ============================================
// PROVIDER DATA UTILITIES
// File: src/data/providerDataUtils.js
// Works alongside mockDataUtils.js for booking data
// ============================================

import { mockProviders, mockClients } from './mockProfiles';
import { getBookingsByProvider, calculateBookingStats } from './mockDataUtils';

// ============================================
// PROVIDER RETRIEVAL
// ============================================

/**
 * Get provider by ID
 */
export const getProviderById = (providerId) => {
  return mockProviders.find(p => p.id === providerId);
};

/**
 * Get multiple providers by IDs
 */
export const getProvidersByIds = (providerIds) => {
  return mockProviders.filter(p => providerIds.includes(p.id));
};

/**
 * Get all providers
 */
export const getAllProviders = () => {
  return mockProviders;
};

// ============================================
// SEARCH & FILTER
// ============================================

/**
 * Search providers by query
 */
export const searchProviders = (query, options = {}) => {
  const {
    area,
    city,
    minRating = 0,
    maxPrice = Infinity,
    verified = false,
    available = false,
    premium = false
  } = options;
  
  let results = [...mockProviders];
  
  // Text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(p => 
      p.fullName.toLowerCase().includes(lowerQuery) ||
      p.occupation.toLowerCase().includes(lowerQuery) ||
      p.bio.toLowerCase().includes(lowerQuery) ||
      p.skills.some(s => s.toLowerCase().includes(lowerQuery)) ||
      p.services.some(s => s.name.toLowerCase().includes(lowerQuery))
    );
  }
  
  // Location filters
  if (area) {
    results = results.filter(p => 
      p.location.area.toLowerCase().includes(area.toLowerCase())
    );
  }
  
  if (city) {
    results = results.filter(p => 
      p.location.city.toLowerCase().includes(city.toLowerCase())
    );
  }
  
  // Rating filter
  if (minRating > 0) {
    results = results.filter(p => p.rating.overall >= minRating);
  }
  
  // Price filter (for providers with set pricing)
  if (maxPrice < Infinity) {
    results = results.filter(p => 
      p.pricing.type === 'set' && p.pricing.hourlyRate <= maxPrice
    );
  }
  
  // Status filters
  if (verified) {
    results = results.filter(p => p.verified);
  }
  
  if (available) {
    results = results.filter(p => 
      p.availability.status === 'available' && 
      p.availability.acceptingNewClients
    );
  }
  
  if (premium) {
    results = results.filter(p => p.premiumMember);
  }
  
  return results;
};

/**
 * Get providers by area/location
 */
export const getProvidersByArea = (area) => {
  return mockProviders.filter(p => 
    p.location.area.toLowerCase().includes(area.toLowerCase()) ||
    p.location.city.toLowerCase().includes(area.toLowerCase())
  );
};

/**
 * Get providers by skill
 */
export const getProvidersBySkill = (skill) => {
  const lowerSkill = skill.toLowerCase();
  return mockProviders.filter(p => 
    p.skills.some(s => s.toLowerCase().includes(lowerSkill)) ||
    p.occupation.toLowerCase().includes(lowerSkill) ||
    p.services.some(s => s.name.toLowerCase().includes(lowerSkill))
  );
};

/**
 * Get top-rated providers
 */
export const getTopRatedProviders = (limit = 10) => {
  return [...mockProviders]
    .sort((a, b) => b.rating.overall - a.rating.overall)
    .slice(0, limit);
};

/**
 * Get featured providers
 */
export const getFeaturedProviders = () => {
  return mockProviders.filter(p => p.featured);
};

/**
 * Get premium providers
 */
export const getPremiumProviders = () => {
  return mockProviders.filter(p => p.premiumMember);
};

/**
 * Get available providers
 */
export const getAvailableProviders = () => {
  return mockProviders.filter(p => 
    p.availability.status === 'available' && 
    p.availability.acceptingNewClients
  );
};

// ============================================
// LOCATION-BASED UTILITIES
// ============================================

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Get providers within radius of a location
 */
export const getProvidersNearLocation = (userLocation, radiusKm = 5) => {
  return mockProviders
    .map(provider => ({
      ...provider,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        provider.location.coordinates.lat,
        provider.location.coordinates.lng
      )
    }))
    .filter(provider => provider.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
};

// ============================================
// PROVIDER STATISTICS
// ============================================

/**
 * Calculate comprehensive provider statistics
 * Uses booking data from mockDataUtils
 */
export const calculateProviderStats = (providerId) => {
  const provider = getProviderById(providerId);
  if (!provider) return null;
  
  // Get provider's bookings using existing utility
  const bookings = getBookingsByProvider(providerId);
  
  // Use existing booking stats calculator
  const bookingStats = calculateBookingStats(bookings);
  
  return {
    // Provider info
    providerId: provider.id,
    name: provider.fullName,
    rating: provider.rating.overall,
    totalReviews: provider.rating.totalReviews,
    
    // Booking statistics
    totalJobs: bookingStats.total,
    activeJobs: bookingStats.active,
    completedJobs: bookingStats.completed,
    cancelledJobs: bookingStats.cancelled,
    
    // Financial
    totalEarnings: bookingStats.totalEarnings,
    totalRevenue: bookingStats.totalRevenue,
    
    // Performance
    avgRating: bookingStats.avgRating,
    completionRate: bookingStats.completionRate,
    
    // Additional metrics
    responseTime: provider.availability.responseTime,
    acceptingClients: provider.availability.acceptingNewClients,
    verified: provider.verified,
    premium: provider.premiumMember
  };
};

/**
 * Calculate provider earnings breakdown
 */
export const calculateProviderEarnings = (providerId, timeframe = 'month') => {
  const bookings = getBookingsByProvider(providerId);
  const completedBookings = bookings.filter(b => 
    b.status === 'completed' && b.paymentStatus === 'paid'
  );

  const now = new Date();
  let startDate;

  switch (timeframe) {
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'quarter':
      startDate = new Date(now.setMonth(now.getMonth() - 3));
      break;
    case 'year':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      startDate = new Date(0); // All time
  }

  const relevantBookings = completedBookings.filter(b => 
    new Date(b.date) >= startDate
  );

  const totalRevenue = relevantBookings.reduce((sum, b) => 
    sum + (b.agreedPrice || 0), 0
  );
  
  const platformFee = totalRevenue * 0.18; // 18% platform fee
  const netEarnings = totalRevenue - platformFee;

  return {
    totalRevenue: Math.round(totalRevenue),
    platformFee: Math.round(platformFee),
    netEarnings: Math.round(netEarnings),
    jobsCompleted: relevantBookings.length,
    averageJobValue: relevantBookings.length > 0 
      ? Math.round(totalRevenue / relevantBookings.length) 
      : 0,
    timeframe
  };
};

// ============================================
// CLIENT UTILITIES
// ============================================

/**
 * Get client by ID
 */
export const getClientById = (clientId) => {
  return mockClients.find(c => c.id === clientId);
};

/**
 * Get client's favorite providers
 */
export const getFavoriteProviders = (clientId) => {
  const client = getClientById(clientId);
  if (!client || !client.favoriteProviders) return [];
  
  return getProvidersByIds(client.favoriteProviders);
};

/**
 * Get recommended providers for a client
 * Based on location, past bookings, and ratings
 */
export const getRecommendedProviders = (clientId, limit = 4) => {
  const client = getClientById(clientId);
  if (!client) return [];
  
  const clientBookings = getBookingsByProvider(clientId); // This might need to be getBookingsByClient
  
  // Get providers client has worked with
  const workedWithProviderIds = new Set(
    clientBookings.map(b => b.providerId).filter(Boolean)
  );
  
  const clientLocation = client.location?.coordinates;
  const clientArea = client.location?.area;
  
  // Score and sort providers
  const scoredProviders = mockProviders.map(provider => {
    let score = 0;
    
    // Rating weight (40%)
    score += (provider.rating.overall / 5) * 40;
    
    // Location match (30%)
    if (clientArea && provider.location.area === clientArea) {
      score += 30;
    } else if (clientLocation && provider.location.coordinates) {
      // Proximity bonus (closer = better)
      const distance = calculateDistance(
        clientLocation.lat,
        clientLocation.lng,
        provider.location.coordinates.lat,
        provider.location.coordinates.lng
      );
      if (distance < 5) score += 20;
      else if (distance < 10) score += 10;
    }
    
    // Availability (15%)
    if (provider.availability.status === 'available') {
      score += 15;
    }
    
    // Premium/Verified (15%)
    if (provider.verified) score += 7.5;
    if (provider.premiumMember) score += 7.5;
    
    // Penalize if already worked with (prefer new providers)
    if (workedWithProviderIds.has(provider.id)) {
      score -= 10;
    }
    
    return { ...provider, recommendationScore: score };
  });
  
  return scoredProviders
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, limit);
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
};

/**
 * Sort providers
 */
export const sortProviders = (providers, sortBy = 'rating', order = 'desc') => {
  const sorted = [...providers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating.overall - a.rating.overall;
      
      case 'price':
        const priceA = a.pricing.type === 'set' ? a.pricing.hourlyRate : Infinity;
        const priceB = b.pricing.type === 'set' ? b.pricing.hourlyRate : Infinity;
        return priceA - priceB;
      
      case 'experience':
        return b.workExperience.years - a.workExperience.years;
      
      case 'jobs':
        return b.workExperience.totalJobs - a.workExperience.totalJobs;
      
      case 'name':
        return a.fullName.localeCompare(b.fullName);
      
      case 'distance':
        return (a.distance || Infinity) - (b.distance || Infinity);
      
      default:
        return 0;
    }
  });
  
  return order === 'asc' ? sorted.reverse() : sorted;
};

// ============================================
// REACT HOOK FOR PROVIDERS
// ============================================

/**
 * Custom hook for managing providers in components
 * Usage:
 * const { providers, loading } = useProviders({
 *   area: 'Accra',
 *   skill: 'plumbing',
 *   available: true
 * });
 */
export const useProviders = (options = {}) => {
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [options.area, options.skill]);
  
  let providers = getAllProviders();
  
  // Apply filters from options
  if (options.query) {
    providers = searchProviders(options.query, options);
  } else {
    if (options.area) {
      providers = getProvidersByArea(options.area);
    }
    
    if (options.skill) {
      providers = getProvidersBySkill(options.skill);
    }
    
    if (options.available) {
      providers = providers.filter(p => 
        p.availability.status === 'available' && 
        p.availability.acceptingNewClients
      );
    }
    
    if (options.verified) {
      providers = providers.filter(p => p.verified);
    }
    
    if (options.premium) {
      providers = providers.filter(p => p.premiumMember);
    }
    
    if (options.minRating) {
      providers = providers.filter(p => p.rating.overall >= options.minRating);
    }
  }
  
  // Sort if specified
  if (options.sortBy) {
    providers = sortProviders(providers, options.sortBy, options.order);
  }
  
  // Add distance if user location provided
  if (options.userLocation) {
    providers = providers.map(p => ({
      ...p,
      distance: calculateDistance(
        options.userLocation.lat,
        options.userLocation.lng,
        p.location.coordinates.lat,
        p.location.coordinates.lng
      )
    }));
  }
  
  return {
    providers,
    loading,
    count: providers.length
  };
};

// ============================================
// EXPORT ALL
// ============================================
export default {
  // Provider retrieval
  getProviderById,
  getProvidersByIds,
  getAllProviders,
  
  // Search & filter
  searchProviders,
  getProvidersByArea,
  getProvidersBySkill,
  getTopRatedProviders,
  getFeaturedProviders,
  getPremiumProviders,
  getAvailableProviders,
  
  // Location
  calculateDistance,
  getProvidersNearLocation,
  
  // Statistics
  calculateProviderStats,
  calculateProviderEarnings,
  
  // Client
  getClientById,
  getFavoriteProviders,
  getRecommendedProviders,
  
  // Utilities
  getRelativeTime,
  sortProviders,
  
  // Hook
  useProviders
};

// ============================================
// EXAMPLE USAGE
// ============================================

/*
// In your components:

import { useProviders } from '@/data/providerDataUtils';
import { useBookings } from '@/data/mockDataUtils';

// Example 1: Services Near You
function ServicesNearYou() {
  const { providers, loading } = useProviders({
    userLocation: { lat: 5.6037, lng: -0.1870 },
    available: true,
    minRating: 4.0,
    sortBy: 'distance'
  });
  
  if (loading) return <Spinner />;
  
  return <ProvidersList providers={providers} />;
}

// Example 2: Provider Dashboard
function ProviderDashboard({ providerId }) {
  const { bookings, stats } = useBookings({
    userType: 'provider',
    userId: providerId,
    status: 'active'
  });
  
  const providerStats = calculateProviderStats(providerId);
  const earnings = calculateProviderEarnings(providerId, 'month');
  
  return (
    <div>
      <StatCards stats={providerStats} />
      <EarningsChart earnings={earnings} />
      <BookingsList bookings={bookings} />
    </div>
  );
}

// Example 3: Direct usage
import { 
  getProvidersByArea, 
  getTopRatedProviders,
  calculateProviderStats 
} from '@/data/providerDataUtils';

const accraProviders = getProvidersByArea('Accra');
const topProviders = getTopRatedProviders(5);
const stats = calculateProviderStats('PRV001');
*/