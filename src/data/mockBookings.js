// ============================================
// CENTRALIZED MOCK DATA STRUCTURE
// File: src/data/mockBookings.js
// ============================================

/**
 * Complete Booking Data Structure
 * This centralizes all mock data to ensure consistency across:
 * - Provider/Client Dashboards
 * - Bookings Pages
 * - History Pages
 * - Booking Details Modal
 * - Payment Modals
 * - Receipt Modal
 */

// ============================================
// USERS DATABASE
// ============================================
export const MOCK_USERS = {
  providers: {
    'PRV001': {
      id: 'PRV001',
      name: 'Kwame Boateng',
      profession: 'HVAC Technician',
      phone: '+233241111111',
      email: 'kwame.hvac@example.com',
      rating: 4.6,
      totalJobs: 47,
      joinDate: '2023-01-15'
    },
    'PRV002': {
      id: 'PRV002',
      name: 'Yaw Mensimah',
      profession: 'Plumber',
      phone: '+233261234567',
      email: 'yaw.plumber@example.com',
      rating: 4.7,
      totalJobs: 52,
      joinDate: '2022-11-20'
    },
    'PRV003': {
      id: 'PRV003',
      name: 'Samuel Owusu',
      profession: 'Electrician',
      phone: '+233209876543',
      email: 'samuel.electric@example.com',
      rating: 4.8,
      totalJobs: 63,
      joinDate: '2023-03-10'
    },
    'PRV004': {
      id: 'PRV004',
      name: 'Kojo Darko',
      profession: 'Mechanical Technician',
      phone: '+233244556677',
      email: 'kojo.mechanical@example.com',
      rating: 4.5,
      totalJobs: 38,
      joinDate: '2023-05-22'
    },
    'PRV005': {
      id: 'PRV005',
      name: 'Daniel Addo',
      profession: 'IT Technician',
      phone: '+233507778899',
      email: 'daniel.it@example.com',
      rating: 4.9,
      totalJobs: 71,
      joinDate: '2022-08-15'
    },
    'PRV006': {
      id: 'PRV006',
      name: 'Patrick Nyarko',
      profession: 'Painter',
      phone: '+233551234567',
      email: 'patrick.paint@example.com',
      rating: 4.8,
      totalJobs: 45,
      joinDate: '2023-02-10'
    },
    'PRV007': {
      id: 'PRV007',
      name: 'Abdul Rahman',
      profession: 'Roofer',
      phone: '+233244000999',
      email: 'abdul.roof@example.com',
      rating: 4.4,
      totalJobs: 29,
      joinDate: '2023-06-18'
    }
  },
  
  clients: {
    'CLT001': {
      id: 'CLT001',
      name: 'Bishop Mensah',
      phone: '+233245678901',
      email: 'bishop@example.com',
      joinDate: '2023-04-12'
    },
    'CLT002': {
      id: 'CLT002',
      name: 'Ama Serwaa',
      phone: '+233241998877',
      email: 'ama@example.com',
      joinDate: '2023-07-20'
    },
    'CLT003': {
      id: 'CLT003',
      name: 'Nana Kofi',
      phone: '+233501112233',
      email: 'nana@example.com',
      joinDate: '2023-09-15'
    },
    'CLT004': {
      id: 'CLT004',
      name: 'TechHub Ltd',
      phone: '+233303030303',
      email: 'admin@techhub.com',
      joinDate: '2023-01-05'
    },
    'CLT005': {
      id: 'CLT005',
      name: 'Linda Osei',
      phone: '+233241234999',
      email: 'linda@example.com',
      joinDate: '2023-05-28'
    }
  }
};

// ============================================
// LOCATIONS DATABASE
// ============================================
export const MOCK_LOCATIONS = {
  'LOC001': {
    id: 'LOC001',
    address: 'Plot 12, Ring Road',
    area: 'Osu',
    city: 'Accra',
    landmark: 'Near Osu Oxford Street',
    postalCode: 'GA-111-2222'
  },
  'LOC002': {
    id: 'LOC002',
    address: 'House 7, Pine Avenue',
    area: 'East Legon',
    city: 'Accra',
    landmark: 'Near A&C Mall',
    postalCode: 'GA-222-3333'
  },
  'LOC003': {
    id: 'LOC003',
    address: 'Flat 4B, City View',
    area: 'Spintex',
    city: 'Accra',
    landmark: 'Near Shell Station',
    postalCode: 'GA-333-4444'
  },
  'LOC004': {
    id: 'LOC004',
    address: 'Warehouse 3',
    area: 'Tema',
    city: 'Accra',
    landmark: 'Near Tema Port',
    postalCode: 'GA-444-5555'
  },
  'LOC005': {
    id: 'LOC005',
    address: 'Block C, Tech Park',
    area: 'Airport',
    city: 'Accra',
    landmark: 'Near Airport Shell',
    postalCode: 'GA-777-8888'
  },
  'LOC006': {
    id: 'LOC006',
    address: 'House 10, Sunrise Estate',
    area: 'Adenta',
    city: 'Accra',
    landmark: 'Near Police Station',
    postalCode: 'GA-999-0000'
  },
  'LOC007': {
    id: 'LOC007',
    address: 'House 18',
    area: 'Dansoman',
    city: 'Accra',
    landmark: 'Near Market',
    postalCode: 'GA-121-2121'
  }
};

// ============================================
// BOOKINGS DATABASE - MASTER DATA
// ============================================
const MASTER_BOOKINGS = [
  // =========================
  // 🟡 PENDING (3)
  // =========================
  {
    id: 'BK10000001',
    bookingReference: 'BK10000001',
    title: 'Air Conditioner Installation',
    serviceType: 'HVAC',
    status: 'pending',
    urgency: 'normal',
    
    // Foreign Keys
    providerId: 'PRV001',
    clientId: 'CLT001',
    locationId: 'LOC001',
    
    // Dates & Time
    bookingDate: '2026-01-15',
    scheduledDate: '2026-01-22',
    scheduledTime: '09:00',
    completionDate: null,
    
    // Description
    description: 'Install a new split AC unit in the living room.',
    duration: '1 day',
    images: [],
    additionalNotes: null,
    
    // Budget & Pricing
    budget: { min: 1200, max: 1800 },
    quotedPrice: null,
    agreedPrice: null,
    priceBreakdown: null,
    quoteNotes: null,
    
    // Price Adjustment
    priceAdjustment: null,
    
    // Payment
    paymentStatus: 'unpaid',
    paymentData: null,
    
    // Completion Flow
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    // Cancellation
    cancellationRequest: null,
    cancellationReason: null,
    
    // Review
    rating: null,
    review: null
  },
  
  {
    id: 'BK10000002',
    bookingReference: 'BK10000002',
    title: 'Bathroom Plumbing Repair',
    serviceType: 'Plumbing',
    status: 'pending',
    urgency: 'urgent',
    
    providerId: 'PRV002',
    clientId: 'CLT002',
    locationId: 'LOC002',
    
    bookingDate: '2026-01-16',
    scheduledDate: '2026-01-20',
    scheduledTime: '14:00',
    completionDate: null,
    
    description: 'Fix leaking pipes and replace faulty valves.',
    duration: '4 hours',
    images: [],
    additionalNotes: 'Leak is getting worse',
    
    budget: { min: 600, max: 1000 },
    quotedPrice: null,
    agreedPrice: null,
    priceBreakdown: null,
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: null,
    review: null
  },
  
  {
    id: 'BK10000003',
    bookingReference: 'BK10000003',
    title: 'TV Wall Mounting',
    serviceType: 'Electrical',
    status: 'pending',
    urgency: 'normal',
    
    providerId: 'PRV003',
    clientId: 'CLT003',
    locationId: 'LOC003',
    
    bookingDate: '2026-01-17',
    scheduledDate: '2026-01-24',
    scheduledTime: '11:00',
    completionDate: null,
    
    description: 'Mount 55-inch TV and conceal cables.',
    duration: '2 hours',
    images: [],
    additionalNotes: null,
    
    budget: { min: 300, max: 600 },
    quotedPrice: null,
    agreedPrice: null,
    priceBreakdown: null,
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: null,
    review: null
  },
  
  // =========================
  // 🔵 CONFIRMED (2)
  // =========================
  {
    id: 'BK10000004',
    bookingReference: 'BK10000004',
    title: 'Generator Servicing',
    serviceType: 'Mechanical',
    status: 'confirmed',
    urgency: 'normal',
    
    providerId: 'PRV004',
    clientId: 'CLT001',
    locationId: 'LOC004',
    
    bookingDate: '2026-01-14',
    scheduledDate: '2026-01-21',
    scheduledTime: '08:00',
    completionDate: null,
    
    description: 'Full servicing of 5kVA generator.',
    duration: '1 day',
    images: [],
    additionalNotes: 'Oil change required',
    
    budget: { min: 1200, max: 1600 },
    quotedPrice: 1500,
    agreedPrice: 1500,
    priceBreakdown: {
      laborCost: 900,
      materialsCost: 500,
      additionalFees: 100
    },
    quoteNotes: 'Includes test run',
    
    priceAdjustment: null,
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: null,
    review: null
  },
  
  {
    id: 'BK20000002',
    bookingReference: 'BK20000002',
    title: 'Office Deep Cleaning',
    serviceType: 'Cleaning',
    status: 'confirmed',
    urgency: 'urgent',
    
    providerId: 'PRV003',
    clientId: 'CLT004',
    locationId: 'LOC005',
    
    bookingDate: '2026-01-13',
    scheduledDate: '2026-01-19',
    scheduledTime: '06:30',
    completionDate: null,
    
    description: 'Deep clean 5-room office.',
    duration: '1 day',
    images: [],
    additionalNotes: '',
    
    budget: { min: 1200, max: 1500 },
    quotedPrice: 1400,
    agreedPrice: 1400,
    priceBreakdown: {
      laborCost: 1000,
      materialsCost: 350,
      additionalFees: 50
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: null,
    review: null
  },
  
  // =========================
  // 🟣 IN-PROGRESS (2)
  // =========================
  {
    id: 'BK10000007',
    bookingReference: 'BK10000007',
    title: 'Office Network Setup',
    serviceType: 'IT Services',
    status: 'in-progress',
    urgency: 'normal',
    
    providerId: 'PRV005',
    clientId: 'CLT004',
    locationId: 'LOC005',
    
    bookingDate: '2026-01-10',
    scheduledDate: '2026-01-18',
    scheduledTime: '10:00',
    completionDate: null,
    
    description: 'LAN setup for 10 computers.',
    duration: '2 days',
    images: [],
    additionalNotes: null,
    
    budget: { min: 2000, max: 2500 },
    quotedPrice: 2200,
    agreedPrice: 2200,
    priceBreakdown: {
      laborCost: 1400,
      materialsCost: 700,
      additionalFees: 100
    },
    quoteNotes: 'Cables included',
    
    // Price adjustment pending
    priceAdjustment: {
      status: 'pending',
      requestedBy: 'provider',
      originalPrice: 2200,
      newPrice: 2600,
      reason: 'Extra network points requested',
      timestamp: '2026-01-19T09:00:00Z'
    },
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: null,
    review: null
  },
  
  {
    id: 'BK30000002',
    bookingReference: 'BK30000002',
    title: 'Garden Landscaping',
    serviceType: 'Landscaping',
    status: 'in-progress',
    urgency: 'normal',
    
    providerId: 'PRV004',
    clientId: 'CLT003',
    locationId: 'LOC003',
    
    bookingDate: '2026-01-12',
    scheduledDate: '2026-01-19',
    scheduledTime: '07:00',
    completionDate: null,
    
    description: 'Redesign front garden with new grass, flower beds, and decorative stones.',
    duration: '2 days',
    images: [],
    additionalNotes: 'Design plan approved',
    
    budget: { min: 1500, max: 2000 },
    quotedPrice: 1800,
    agreedPrice: 1800,
    priceBreakdown: {
      laborCost: 1200,
      materialsCost: 550,
      additionalFees: 50
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: null,
    review: null
  },
  
  // =========================
  // 🟢 COMPLETED (9)
  // =========================
  {
    id: 'BK10000010',
    bookingReference: 'BK10000010',
    title: 'Interior Painting',
    serviceType: 'Painting',
    status: 'completed',
    urgency: 'normal',
    
    providerId: 'PRV006',
    clientId: 'CLT001',
    locationId: 'LOC006',
    
    bookingDate: '2025-12-20',
    scheduledDate: '2025-12-28',
    scheduledTime: '08:00',
    completionDate: '2025-12-31T17:30:00Z',
    
    description: 'Paint 3-bedroom apartment.',
    duration: '3 days',
    images: [],
    additionalNotes: null,
    
    budget: { min: 2800, max: 3200 },
    quotedPrice: 3000,
    agreedPrice: 3000,
    priceBreakdown: {
      laborCost: 1800,
      materialsCost: 1000,
      additionalFees: 200
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 3000,
      platformFee: 540, // 18% of 3000
      providerReceives: 2460, // 82% of 3000
      totalAmount: 3000,
      paymentMethod: 'mobile_money',
      phoneNumber: '+233245678901',
      transactionReference: 'PAY-10-1735660800000',
      transactionId: 'TXN-PAINT-001',
      paidAt: '2026-01-01T16:00:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'provider',
      notes: 'Painting completed and cleaned.',
      timestamp: '2025-12-31T14:00:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: 5,
    review: 'Excellent work. Very neat and professional.'
  },
  
  {
    id: 'BK40000002',
    bookingReference: 'BK40000002',
    title: 'Window Glass Replacement',
    serviceType: 'Glass Work',
    status: 'completed',
    urgency: 'urgent',
    
    providerId: 'PRV003',
    clientId: 'CLT005',
    locationId: 'LOC007',
    
    bookingDate: '2025-12-15',
    scheduledDate: '2025-12-18',
    scheduledTime: '09:30',
    completionDate: '2025-12-18T11:00:00Z',
    
    description: 'Replace cracked window glass.',
    duration: '1 hour',
    images: [],
    additionalNotes: '',
    
    budget: { min: 250, max: 350 },
    quotedPrice: 300,
    agreedPrice: 300,
    priceBreakdown: {
      laborCost: 150,
      materialsCost: 130,
      additionalFees: 20
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 300,
      platformFee: 54, // 18% of 300
      providerReceives: 246, // 82% of 300
      totalAmount: 300,
      paymentMethod: 'card',
      phoneNumber: null,
      transactionReference: 'PAY-02-1734516600000',
      transactionId: 'TXN-GLASS-002',
      paidAt: '2025-12-18T11:30:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'provider',
      notes: 'Glass replaced successfully.',
      timestamp: '2025-12-18T10:45:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: 4,
    review: 'Quick and professional service.'
  },
  
  {
    id: 'BK40000003',
    bookingReference: 'BK40000003',
    title: 'TV Wall Mounting',
    serviceType: 'Installation',
    status: 'completed',
    urgency: 'normal',
    
    providerId: 'PRV003',
    clientId: 'CLT003',
    locationId: 'LOC003',
    
    bookingDate: '2025-12-10',
    scheduledDate: '2025-12-12',
    scheduledTime: '16:00',
    completionDate: '2025-12-12T17:15:00Z',
    
    description: 'Mount 55-inch TV on wall.',
    duration: '1 hour',
    images: [],
    additionalNotes: '',
    
    budget: { min: 250, max: 300 },
    quotedPrice: 280,
    agreedPrice: 280,
    priceBreakdown: {
      laborCost: 200,
      materialsCost: 60,
      additionalFees: 20
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 280,
      platformFee: 50.4, // 18% of 280
      providerReceives: 229.6, // 82% of 280
      totalAmount: 280,
      paymentMethod: 'mobile_money',
      phoneNumber: '+233501112233',
      transactionReference: 'PAY-03-1733947200000',
      transactionId: 'TXN-MOUNT-003',
      paidAt: '2025-12-12T17:30:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'client',
      notes: 'Work completed to satisfaction.',
      timestamp: '2025-12-12T17:10:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,
    
    rating: 5,
    review: 'Very professional. Mounted perfectly.'
  },

  {
    id: 'BK40000004',
    bookingReference: 'BK40000004',
    title: 'Electrical Wiring Fix',
    serviceType: 'Electrical',
    status: 'completed',
    urgency: 'normal',

    providerId: 'PRV003',
    clientId: 'CLT003',
    locationId: 'LOC003',

    bookingDate: '2026-01-01',
    scheduledDate: '2026-01-03',
    scheduledTime: '09:00',
    completionDate: '2026-01-03T11:15:00Z',
    
    description: 'Fix faulty electrical wiring in bedroom.',
    duration: '2h 15m',
    images: [],
    additionalNotes: null,

    budget: { min: 180, max: 250 },
    quotedPrice: 220,
    agreedPrice: 220,
    priceBreakdown: {
      laborCost: 150,
      materialsCost: 60,
      additionalFees: 10
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 220,
      platformFee: 39.6,
      providerReceives: 180.4,
      totalAmount: 220,
      paymentMethod: 'mobile_money',
      phoneNumber: '+233501112233',
      transactionReference: 'PAY-04-1735902900000',
      transactionId: 'TXN-ELEC-004',
      paidAt: '2026-01-03T11:30:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'provider',
      notes: 'Wiring fixed successfully.',
      timestamp: '2026-01-03T11:10:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,

    rating: 5,
    review: 'Excellent service and very professional.'
  },

  {
    id: 'BK40000005',
    bookingReference: 'BK40000005',
    title: 'Plumbing Leak Repair',
    serviceType: 'Plumbing',
    status: 'completed',
    urgency: 'urgent',

    providerId: 'PRV002',
    clientId: 'CLT003',
    locationId: 'LOC003',

    bookingDate: '2026-01-05',
    scheduledDate: '2026-01-06',
    scheduledTime: '14:30',
    completionDate: '2026-01-06T16:15:00Z',
    
    description: 'Fix water leak under kitchen sink.',
    duration: '1h 45m',
    images: [],
    additionalNotes: 'Urgent repair needed',

    budget: { min: 150, max: 200 },
    quotedPrice: 180,
    agreedPrice: 180,
    priceBreakdown: {
      laborCost: 120,
      materialsCost: 50,
      additionalFees: 10
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 180,
      platformFee: 32.4,
      providerReceives: 147.6,
      totalAmount: 180,
      paymentMethod: 'cash',
      phoneNumber: null,
      transactionReference: 'PAY-05-1736180100000',
      transactionId: 'TXN-PLUMB-005',
      paidAt: '2026-01-06T16:30:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'provider',
      notes: 'Leak fixed and tested.',
      timestamp: '2026-01-06T16:10:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,

    rating: 4,
    review: 'Quick response and good work.'
  },

  {
    id: 'BK40000006',
    bookingReference: 'BK40000006',
    title: 'Air Conditioner Servicing',
    serviceType: 'HVAC',
    status: 'completed',
    urgency: 'normal',

    providerId: 'PRV001',
    clientId: 'CLT003',
    locationId: 'LOC003',

    bookingDate: '2026-01-08',
    scheduledDate: '2026-01-10',
    scheduledTime: '11:00',
    completionDate: '2026-01-10T13:35:00Z',
    
    description: 'Service and clean 2 AC units.',
    duration: '2h 30m',
    images: [],
    additionalNotes: null,

    budget: { min: 250, max: 350 },
    quotedPrice: 300,
    agreedPrice: 300,
    priceBreakdown: {
      laborCost: 200,
      materialsCost: 80,
      additionalFees: 20
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 300,
      platformFee: 54,
      providerReceives: 246,
      totalAmount: 300,
      paymentMethod: 'mobile_money',
      phoneNumber: '+233501112233',
      transactionReference: 'PAY-06-1736506500000',
      transactionId: 'TXN-HVAC-006',
      paidAt: '2026-01-10T14:00:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'provider',
      notes: 'AC units serviced and running well.',
      timestamp: '2026-01-10T13:30:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,

    rating: 5,
    review: 'Great service, AC working perfectly now.'
  },

  {
    id: 'BK40000007',
    bookingReference: 'BK40000007',
    title: 'Ceiling Fan Installation',
    serviceType: 'Electrical',
    status: 'completed',
    urgency: 'normal',

    providerId: 'PRV003',
    clientId: 'CLT003',
    locationId: 'LOC003',

    bookingDate: '2026-01-13',
    scheduledDate: '2026-01-14',
    scheduledTime: '16:00',
    completionDate: '2026-01-14T17:25:00Z',
    
    description: 'Install ceiling fan in master bedroom.',
    duration: '1h 20m',
    images: [],
    additionalNotes: null,

    budget: { min: 120, max: 180 },
    quotedPrice: 150,
    agreedPrice: 150,
    priceBreakdown: {
      laborCost: 100,
      materialsCost: 40,
      additionalFees: 10
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 150,
      platformFee: 27,
      providerReceives: 123,
      totalAmount: 150,
      paymentMethod: 'mobile_money',
      phoneNumber: '+233501112233',
      transactionReference: 'PAY-07-1736870400000',
      transactionId: 'TXN-FAN-007',
      paidAt: '2026-01-14T17:45:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'provider',
      notes: 'Fan installed and tested.',
      timestamp: '2026-01-14T17:20:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,

    rating: 4,
    review: 'Good installation work.'
  },

  {
    id: 'BK40000008',
    bookingReference: 'BK40000008',
    title: 'Water Heater Repair',
    serviceType: 'Plumbing',
    status: 'completed',
    urgency: 'urgent',

    providerId: 'PRV002',
    clientId: 'CLT003',
    locationId: 'LOC003',

    bookingDate: '2026-01-16',
    scheduledDate: '2026-01-18',
    scheduledTime: '10:15',
    completionDate: '2026-01-18T12:20:00Z',
    
    description: 'Repair faulty water heater thermostat.',
    duration: '2h',
    images: [],
    additionalNotes: 'No hot water available',

    budget: { min: 220, max: 280 },
    quotedPrice: 260,
    agreedPrice: 260,
    priceBreakdown: {
      laborCost: 180,
      materialsCost: 70,
      additionalFees: 10
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 260,
      platformFee: 46.8,
      providerReceives: 213.2,
      totalAmount: 260,
      paymentMethod: 'cash',
      phoneNumber: null,
      transactionReference: 'PAY-08-1737196800000',
      transactionId: 'TXN-HEAT-008',
      paidAt: '2026-01-18T12:40:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'provider',
      notes: 'Water heater repaired and working.',
      timestamp: '2026-01-18T12:15:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,

    rating: 5,
    review: 'Excellent repair work, heater works great now.'
  },

  {
    id: 'BK40000009',
    bookingReference: 'BK40000009',
    title: 'Socket Replacement',
    serviceType: 'Electrical',
    status: 'completed',
    urgency: 'normal',

    providerId: 'PRV003',
    clientId: 'CLT003',
    locationId: 'LOC003',

    bookingDate: '2025-12-21',
    scheduledDate: '2025-12-22',
    scheduledTime: '13:45',
    completionDate: '2025-12-22T14:40:00Z',
    
    description: 'Replace damaged power socket in living room.',
    duration: '45m',
    images: [],
    additionalNotes: null,

    budget: { min: 70, max: 110 },
    quotedPrice: 90,
    agreedPrice: 90,
    priceBreakdown: {
      laborCost: 60,
      materialsCost: 25,
      additionalFees: 5
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'paid',
    paymentData: {
      amount: 90,
      platformFee: 16.2,
      providerReceives: 73.8,
      totalAmount: 90,
      paymentMethod: 'mobile_money',
      phoneNumber: '+233501112233',
      transactionReference: 'PAY-09-1734878700000',
      transactionId: 'TXN-SOCK-009',
      paidAt: '2025-12-22T15:00:00Z'
    },
    
    completionRequest: {
      status: 'approved',
      requestedBy: 'provider',
      notes: 'Socket replaced successfully.',
      timestamp: '2025-12-22T14:35:00Z'
    },
    completionConfirmations: { provider: true, client: true },
    
    cancellationRequest: null,
    cancellationReason: null,

    rating: 4,
    review: 'Quick and efficient service.'
  },

  
  // =========================
  // 🔴 CANCELLED (3)
  // =========================
  {
    id: 'BK10000013',
    bookingReference: 'BK10000013',
    title: 'Roof Leak Repair',
    serviceType: 'Roofing',
    status: 'cancelled',
    urgency: 'urgent',
    
    providerId: 'PRV007',
    clientId: 'CLT005',
    locationId: 'LOC007',
    
    bookingDate: '2026-01-08',
    scheduledDate: '2026-01-12',
    scheduledTime: '12:00',
    completionDate: null,
    
    description: 'Fix leaking roof sheets.',
    duration: '1 day',
    images: [],
    additionalNotes: null,
    
    budget: { min: 1000, max: 1500 },
    quotedPrice: 1200,
    agreedPrice: 1200,
    priceBreakdown: {
      laborCost: 800,
      materialsCost: 350,
      additionalFees: 50
    },
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: {
      status: 'approved',
      requestedBy: 'client',
      reason: 'Emergency resolved',
      timestamp: '2026-01-11T10:00:00Z'
    },
    cancellationReason: 'Emergency resolved',
    
    rating: null,
    review: null
  },
  
  {
    id: 'BK50000002',
    bookingReference: 'BK50000002',
    title: 'Office Network Setup',
    serviceType: 'IT Services',
    status: 'cancelled',
    urgency: 'normal',
    
    providerId: 'PRV005',
    clientId: 'CLT004',
    locationId: 'LOC005',
    
    bookingDate: '2025-12-28',
    scheduledDate: '2026-01-05',
    scheduledTime: '09:00',
    completionDate: null,
    
    description: 'Setup LAN for office.',
    duration: '1 day',
    images: [],
    additionalNotes: '',
    
    budget: { min: 1000, max: 1300 },
    quotedPrice: 1200,
    agreedPrice: null,
    priceBreakdown: null,
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: {
      status: 'approved',
      requestedBy: 'provider',
      reason: 'Schedule conflict - unable to fulfill',
      timestamp: '2026-01-02T14:00:00Z'
    },
    cancellationReason: 'Schedule conflict - unable to fulfill',
    
    rating: null,
    review: null
  },
  
  {
    id: 'BK50000003',
    bookingReference: 'BK50000003',
    title: 'Gate Welding',
    serviceType: 'Welding',
    status: 'cancelled',
    urgency: 'normal',
    
    providerId: 'PRV004',
    clientId: 'CLT003',
    locationId: 'LOC003',
    
    bookingDate: '2025-12-25',
    scheduledDate: '2026-01-04',
    scheduledTime: '13:00',
    completionDate: null,
    
    description: 'Fix broken gate hinge.',
    duration: '2 hours',
    images: [],
    additionalNotes: 'Client unavailable',
    
    budget: { min: 400, max: 600 },
    quotedPrice: 500,
    agreedPrice: null,
    priceBreakdown: null,
    quoteNotes: null,
    
    priceAdjustment: null,
    
    paymentStatus: 'unpaid',
    paymentData: null,
    
    completionRequest: null,
    completionConfirmations: { provider: false, client: false },
    
    cancellationRequest: {
      status: 'approved',
      requestedBy: 'client',
      reason: 'Client unavailable on scheduled date',
      timestamp: '2026-01-03T08:00:00Z'
    },
    cancellationReason: 'Client unavailable on scheduled date',
    
    rating: null,
    review: null
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Populates booking with full user and location data
 */
export const populateBooking = (booking) => {
  const provider = MOCK_USERS.providers[booking.providerId];
  const client = MOCK_USERS.clients[booking.clientId];
  const location = MOCK_LOCATIONS[booking.locationId];
  
  return {
    ...booking,
    // Legacy fields for compatibility
    date: booking.scheduledDate,
    time: booking.scheduledTime,
    price: booking.agreedPrice || booking.quotedPrice || 0,
    
    provider: provider ? {
      id: provider.id,
      name: provider.name,
      profession: provider.profession,
      phone: provider.phone,
      email: provider.email,
      rating: provider.rating
    } : null,
    
    client: client ? {
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: client.email
    } : null,
    
    location: location || null
  };
};

export { MASTER_BOOKINGS };
