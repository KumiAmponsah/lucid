// ============================================
// MOCK PROFILE DATA STRUCTURE
// File: src/data/mockProfiles.js
// ============================================

// ============================================
// 1. SERVICE PROVIDER PROFILES
// ============================================
export const mockProviders = [
  
  // ELECTRICIAN
{
  id: "prov_004",
  userId: "user_004",
  accountType: "provider",
  firstName: "Daniel",
  lastName: "Ofori",
  otherName: "",
  fullName: "Daniel Ofori",
  email: "daniel.ofori@example.com",
  phone: "+233507654321",
  occupation: "Certified Electrician",
  profession: "Residential & Industrial Electrician",
  bio: "Licensed electrician with 6 years experience handling residential wiring, industrial panels, and solar backups. Known for safety-first installations.",

  location: {
    address: "Block D, Ridge",
    area: "Ridge",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    postalCode: "GA-445-3321",
    coordinates: { lat: 5.5600, lng: -0.2050 }
  },

  pricing: {
    type: "set",
    hourlyRate: 70,
    currency: "GHS",
    emergencyRate: 110,
    minimumCharge: 120,
    depositRequired: true,
    depositPercentage: 25
  },

  skills: [
    "House Wiring",
    "Fault Detection",
    "Circuit Breakers",
    "Solar Installation",
    "Generator Connection"
  ],

  services: [
    { id: "srv_010", name: "Electrical Fault Repair", category: "Electrical", price: 180, duration: "2-3 hours" },
    { id: "srv_011", name: "Complete House Wiring", category: "Electrical", price: 0, duration: "Project-based" }
  ],

  certifications: [
    {
      id: "cert_010",
      name: "Licensed Electrician",
      issuedBy: "Energy Commission of Ghana",
      issueDate: "2020-02-14",
      verified: true
    }
  ],

  languages: [
    { name: "English", proficiency: "fluent" },
    { name: "Twi", proficiency: "native" }
  ],

  workExperience: {
    years: 6,
    totalJobs: 164,
    completedJobs: 158,
    cancelledJobs: 6
  },

  business: {
    name: "Ofori Electricals",
    registered: true,
    employees: 2,
    yearsInBusiness: 4,
    insuranceVerified: true
  },

  availability: {
    status: "busy",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.6,
    totalReviews: 98
  },

  profileImage: "/images/profiles/daniel_ofori.jpg",
  coverImage: "/images/covers/electrical_cover.jpg",
  verified: true,
  featured: false,
  premiumMember: false,

  createdAt: "2020-03-10T09:00:00Z",
  updatedAt: "2025-01-18T12:10:00Z",
  lastActive: "2025-01-19T10:00:00Z",
  accountStatus: "active"
},

// PLUMBER
{
  id: "prov_005",
  userId: "user_005",
  accountType: "provider",
  firstName: "Yaw",
  lastName: "Mensah",
  otherName: "",
  fullName: "Yaw Mensah",
  email: "yaw.mensah@example.com",
  phone: "+233243339999",
  occupation: "Professional Plumber",
  profession: "Domestic & Commercial Plumbing",
  bio: "Reliable plumber specializing in leak repairs, pipe replacements, and water tank installations.",

  location: {
    address: "Santasi Main Road",
    area: "Santasi",
    city: "Kumasi",
    region: "Ashanti",
    country: "Ghana",
    coordinates: { lat: 6.6885, lng: -1.6244 }
  },

  pricing: {
    type: "negotiable",
    currency: "GHS",
    minimumCharge: 100,
    depositRequired: false
  },

  skills: [
    "Leak Repairs",
    "Pipe Replacement",
    "Toilet Installation",
    "Water Tank Setup"
  ],

  services: [
    { id: "srv_012", name: "Leak Fixing", category: "Plumbing", price: 120, duration: "1-2 hours" }
  ],

  languages: [
    { name: "Twi", proficiency: "native" },
    { name: "English", proficiency: "basic" }
  ],

  workExperience: {
    years: 7,
    totalJobs: 210,
    completedJobs: 200,
    cancelledJobs: 10
  },

  availability: {
    status: "available",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.5,
    totalReviews: 131
  },

  profileImage: "/images/profiles/yaw_mensah.jpg",
  verified: true,
  createdAt: "2018-07-01T08:00:00Z",
  lastActive: "2025-01-19T06:45:00Z",
  accountStatus: "active"
},

// MECHANIC
{
  id: "prov_006",
  userId: "user_006",
  accountType: "provider",
  firstName: "Ibrahim",
  lastName: "Sadiq",
  fullName: "Ibrahim Sadiq",
  email: "ibrahim.sadiq@example.com",
  phone: "+233552224444",
  occupation: "Auto Mechanic",
  profession: "Vehicle Diagnostics & Repairs",
  bio: "Experienced auto mechanic handling engine repairs, suspension, and diagnostics for saloon and SUV vehicles.",

  location: {
    area: "Suame Magazine",
    city: "Kumasi",
    region: "Ashanti",
    country: "Ghana",
    coordinates: { lat: 6.6915, lng: -1.6227 }
  },

  pricing: {
    type: "contact",
    currency: "GHS",
    depositRequired: true,
    depositPercentage: 40
  },

  skills: [
    "Engine Diagnostics",
    "Brake Systems",
    "Suspension Repair",
    "Oil Servicing"
  ],

  services: [
    { id: "srv_013", name: "Vehicle Diagnostics", category: "Automobile", price: 150, duration: "1 hour" }
  ],

  workExperience: {
    years: 12,
    totalJobs: 540,
    completedJobs: 520,
    cancelledJobs: 20
  },

  availability: {
    status: "available",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.7,
    totalReviews: 311
  },

  profileImage: "/images/profiles/ibrahim_sadiq.jpg",
  verified: true,
  accountStatus: "active"
},

// HANDYMAN
{
  id: "prov_007",
  userId: "user_007",
  accountType: "provider",
  firstName: "Michael",
  lastName: "Boateng",
  fullName: "Michael Boateng",
  email: "michael.boateng@example.com",
  phone: "+233206661111",
  occupation: "Handyman",
  profession: "General Home Maintenance",
  bio: "All-round handyman handling minor electricals, plumbing fixes, furniture assembly, and wall mounting.",

  location: {
    area: "Madina",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    coordinates: { lat: 5.6782, lng: -0.1676 }
  },

  pricing: {
    type: "set",
    hourlyRate: 50,
    currency: "GHS",
    minimumCharge: 80,
    depositRequired: false
  },

  skills: [
    "Furniture Assembly",
    "TV Wall Mounting",
    "Minor Plumbing",
    "Minor Electrical Work"
  ],

  services: [
    { id: "srv_014", name: "General Handyman Visit", category: "Maintenance", price: 100, duration: "2 hours" }
  ],

  workExperience: {
    years: 4,
    totalJobs: 140,
    completedJobs: 135,
    cancelledJobs: 5
  },

  availability: {
    status: "available",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.4,
    totalReviews: 76
  },

  profileImage: "/images/profiles/michael_boateng.jpg",
  verified: true,
  accountStatus: "active"
},

{
  id: "prov_008",
  userId: "user_008",
  accountType: "provider",
  firstName: "Kwame",
  lastName: "Asante",
  fullName: "Kwame Asante",
  email: "kwame.asante@example.com",
  phone: "+233249876543",
  occupation: "Mason",
  profession: "Block Laying & Building Construction",
  bio: "Skilled mason with over 10 years experience in block laying, plastering, and residential building projects.",

  location: {
    area: "Taifa",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    coordinates: { lat: 5.6137, lng: -0.1970 }
  },

  pricing: {
    type: "project",
    currency: "GHS",
    minimumCharge: 300,
    depositRequired: true,
    depositPercentage: 30
  },

  skills: [
    "Block Laying",
    "Plastering",
    "Foundation Works",
    "Concrete Mixing"
  ],

  services: [
    { id: "srv_015", name: "Block Laying", category: "Construction", price: 0, duration: "Project-based" }
  ],

  workExperience: {
    years: 10,
    totalJobs: 320,
    completedJobs: 305,
    cancelledJobs: 15
  },

  availability: {
    status: "available",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.6,
    totalReviews: 187
  },

  profileImage: "/images/profiles/kwame_asante.jpg",
  verified: true,
  accountStatus: "active"
},

{
  id: "prov_009",
  userId: "user_009",
  accountType: "provider",
  firstName: "Patrick",
  lastName: "Nyarko",
  fullName: "Patrick Nyarko",
  email: "patrick.nyarko@example.com",
  phone: "+233551234567",
  occupation: "Professional Painter",
  profession: "Interior & Exterior Painting",
  bio: "Detail-oriented painter delivering clean finishes for homes, offices, and commercial buildings.",

  location: {
    area: "Kasoa",
    city: "Kasoa",
    region: "Central",
    country: "Ghana",
    coordinates: { lat: 5.6277, lng: -0.2070 }
  },

  pricing: {
    type: "set",
    currency: "GHS",
    dailyRate: 250,
    depositRequired: true,
    depositPercentage: 20
  },

  skills: [
    "Interior Painting",
    "Exterior Painting",
    "Wallpaper Installation",
    "Color Consultation"
  ],

  services: [
    { id: "srv_016", name: "Room Painting", category: "Painting", price: 300, duration: "1 day" }
  ],

  workExperience: {
    years: 8,
    totalJobs: 260,
    completedJobs: 250,
    cancelledJobs: 10
  },

  availability: {
    status: "busy",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.7,
    totalReviews: 143
  },

  profileImage: "/images/profiles/patrick_nyarko.jpg",
  verified: true,
  accountStatus: "active"
},

{
  id: "prov_010",
  userId: "user_010",
  accountType: "provider",
  firstName: "Samuel",
  lastName: "Quayson",
  fullName: "Samuel Quayson",
  email: "samuel.quayson@example.com",
  phone: "+233208889999",
  occupation: "AC Technician",
  profession: "Air Condition Installation & Servicing",
  bio: "Certified AC technician specializing in installation, gas refilling, and preventive maintenance.",

  location: {
    area: "Adenta",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    coordinates: { lat: 5.8037, lng: -0.1570 }
  },

  pricing: {
    type: "set",
    currency: "GHS",
    minimumCharge: 150,
    emergencyRate: 250,
    depositRequired: false
  },

  skills: [
    "AC Installation",
    "Gas Refilling",
    "AC Servicing",
    "Fault Diagnosis"
  ],

  services: [
    { id: "srv_017", name: "AC Servicing", category: "HVAC", price: 180, duration: "1-2 hours" }
  ],

  workExperience: {
    years: 6,
    totalJobs: 195,
    completedJobs: 190,
    cancelledJobs: 5
  },

  availability: {
    status: "available",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.5,
    totalReviews: 102
  },

  profileImage: "/images/profiles/samuel_quayson.jpg",
  verified: true,
  accountStatus: "active"
},

{
  id: "prov_011",
  userId: "user_011",
  accountType: "provider",
  firstName: "Emmanuel",
  lastName: "Darko",
  fullName: "Emmanuel Darko",
  email: "emmanuel.darko@example.com",
  phone: "+233271111222",
  occupation: "Carpenter",
  profession: "Furniture & Woodworks",
  bio: "Custom furniture maker specializing in wardrobes, kitchen cabinets, and office fittings.",

  location: {
    area: "Amasaman",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    coordinates: { lat: 5.6837, lng: -0.1170 }
  },

  pricing: {
    type: "project",
    currency: "GHS",
    depositRequired: true,
    depositPercentage: 40
  },

  skills: [
    "Wardrobes",
    "Kitchen Cabinets",
    "Office Furniture",
    "Wood Finishing"
  ],

  services: [
    { id: "srv_018", name: "Custom Wardrobe", category: "Carpentry", price: 0, duration: "Project-based" }
  ],

  workExperience: {
    years: 9,
    totalJobs: 310,
    completedJobs: 295,
    cancelledJobs: 15
  },

  availability: {
    status: "available",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.6,
    totalReviews: 168
  },

  profileImage: "/images/profiles/emmanuel_darko.jpg",
  verified: true,
  accountStatus: "active"
},

{
  id: "prov_012",
  userId: "user_012",
  accountType: "provider",
  firstName: "Gladys",
  lastName: "Owusu",
  fullName: "Gladys Owusu",
  email: "gladys.owusu@example.com",
  phone: "+233503334444",
  occupation: "Professional Cleaner",
  profession: "Residential & Office Cleaning",
  bio: "Trusted cleaner offering deep cleaning, move-in/move-out cleaning, and office maintenance.",

  location: {
    area: "East Legon",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    coordinates: { lat: 5.9937, lng: -0.1370 }
  },

  pricing: {
    type: "set",
    currency: "GHS",
    hourlyRate: 40,
    minimumCharge: 100,
    depositRequired: false
  },

  skills: [
    "Deep Cleaning",
    "Office Cleaning",
    "Post-Construction Cleaning"
  ],

  services: [
    { id: "srv_019", name: "Home Deep Cleaning", category: "Cleaning", price: 200, duration: "3-4 hours" }
  ],

  workExperience: {
    years: 5,
    totalJobs: 180,
    completedJobs: 175,
    cancelledJobs: 5
  },

  availability: {
    status: "Busy",
    workingDays: { weekdays: true, weekend: true },
    emergencyAvailable: true,
    acceptingNewClients: true,
    responseTime: "Within 1 hour"
  },

  rating: {
    overall: 4.8,
    totalReviews: 119
  },

  profileImage: "/images/profiles/gladys_owusu.jpg",
  verified: true,
  accountStatus: "active"
},

];

// ============================================
// 2. CLIENT PROFILES
// ============================================
export const mockClients = [
  {
    id: "client_001",
    userId: "user_101",
    accountType: "client",
    
    firstName: "Gabriel",
    lastName: "Mensah",
    otherName: "",
    fullName: "Gabriel Mensah",
    email: "Gabriel.mensah@example.com",
    phone: "+233245678901",
    
    location: {
      address: "House 34, Legon Hills",
      area: "East Legon",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      postalCode: "GA-234-5678",
      coordinates: { lat: 5.6500, lng: -0.1800 }
    },
    
    preferences: {
      preferredPaymentMethod: "mobile_money",
      savedAddresses: [
        {
          id: "addr_001",
          label: "Home",
          address: "House 34, Legon Hills",
          area: "East Legon",
          city: "Accra",
          isDefault: true
        },
        {
          id: "addr_002",
          label: "Office",
          address: "Floor 5, Accra Mall",
          area: "Tetteh Quarshie",
          city: "Accra",
          isDefault: false
        }
      ],
      notificationPreferences: {
        email: true,
        sms: true,
        push: true
      }
    },
    
    bookingHistory: {
      totalBookings: 23,
      completedBookings: 20,
      cancelledBookings: 3,
      totalSpent: 4560,
      averageBookingValue: 228
    },
    
    favoriteProviders: ["prov_001", "prov_002"],
    
    rating: {
      asClient: 4.8,
      totalReviews: 18
    },
    
    profileImage: "/images/profiles/Gabriel_mensah.jpg",
    verified: true,
    
    createdAt: "2023-06-10T14:00:00Z",
    updatedAt: "2025-01-18T10:15:00Z",
    lastActive: "2025-01-19T09:30:00Z",
    accountStatus: "active"
  },
  
  {
    id: "client_002",
    userId: "user_102",
    accountType: "client",
    firstName: "Ama",
    lastName: "Serwaa",
    fullName: "Ama Serwaa",
    email: "ama.serwaa@example.com",
    phone: "+233241998877",
    
    location: {
      address: "House 7, Pine Avenue",
      area: "Madina",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      postalCode: "GA-345-6789",
      coordinates: { lat: 5.0037, lng: -0.1870 }
    },
    
    preferences: {
      preferredPaymentMethod: "bank_transfer",
      savedAddresses: [
        {
          id: "addr_003",
          label: "Home",
          address: "House 7, Pine Avenue",
          area: "Madina",
          city: "Accra",
          isDefault: true
        }
      ]
    },
    
    bookingHistory: {
      totalBookings: 12,
      completedBookings: 11,
      cancelledBookings: 1,
      totalSpent: 2340,
      averageBookingValue: 212
    },
    
    favoriteProviders: ["prov_001"],
    
    rating: { asClient: 5.0, totalReviews: 10 },
    
    profileImage: "/images/profiles/ama_serwaa.jpg",
    verified: true,
    
    createdAt: "2024-02-20T10:30:00Z",
    updatedAt: "2025-01-15T14:45:00Z",
    lastActive: "2025-01-18T16:20:00Z",
    accountStatus: "active"
  }
];

// ============================================
// 3. HELPER FUNCTIONS
// ============================================

/**
 * Get provider by ID
 */
export const getProviderById = (providerId) => {
  return mockProviders.find(p => p.id === providerId);
};

/**
 * Get client by ID
 */
export const getClientById = (clientId) => {
  return mockClients.find(c => c.id === clientId);
};

/**
 * Get providers by location/area
 */
export const getProvidersByArea = (area) => {
  return mockProviders.filter(p => 
    p.location.area.toLowerCase().includes(area.toLowerCase())
  );
};

/**
 * Get providers by skill
 */
export const getProvidersBySkill = (skill) => {
  return mockProviders.filter(p => 
    p.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );
};

/**
 * Get top-rated providers
 */
export const getTopRatedProviders = (limit = 10) => {
  return mockProviders
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
 * Get available providers
 */
export const getAvailableProviders = () => {
  return mockProviders.filter(p => 
    p.availability.status === "available" && 
    p.availability.acceptingNewClients
  );
};

/**
 * Search providers
 */
export const searchProviders = (query) => {
  const lowerQuery = query.toLowerCase();
  return mockProviders.filter(p => 
    p.fullName.toLowerCase().includes(lowerQuery) ||
    p.occupation.toLowerCase().includes(lowerQuery) ||
    p.bio.toLowerCase().includes(lowerQuery) ||
    p.skills.some(s => s.toLowerCase().includes(lowerQuery))
  );
};

// ============================================
// 4. EXPORT ALL
// ============================================
export default {
  mockProviders,
  mockClients,
  getProviderById,
  getClientById,
  getProvidersByArea,
  getProvidersBySkill,
  getTopRatedProviders,
  getFeaturedProviders,
  getAvailableProviders,
  searchProviders
};