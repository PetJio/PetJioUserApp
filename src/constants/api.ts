// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.petjio.com',
  VERSION: 'v1',
  TIMEOUT: 30000,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  
  // User
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  
  // Services
  SERVICES: '/services',
  SERVICE_BOOKING: '/services/booking',
  SERVICE_PROVIDERS: '/services/providers',
  
  // Pets
  PETS: '/pets',
  PET_PROFILE: '/pets/:id',
  
  // Payments
  PAYMENT_METHODS: '/payments/methods',
  PROCESS_PAYMENT: '/payments/process',
  PAYMENT_HISTORY: '/payments/history',
  
  // Veterinary
  VETERINARIANS: '/veterinarians',
  APPOINTMENTS: '/appointments',
  MEDICAL_RECORDS: '/medical-records',
  
  // Location
  SEARCH_LOCATION: '/location/search',
  NEARBY_SERVICES: '/location/nearby',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
