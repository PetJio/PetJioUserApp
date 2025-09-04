// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://13.204.155.197',
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/api/user',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  
  // User Management
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
    DELETE_ACCOUNT: '/api/user/delete',
    UPLOAD_AVATAR: '/api/user/avatar',
  },
  
  // Services
  SERVICES: {
    LIST: '/api/services',
    DETAILS: '/api/services/:id',
    BOOK: '/api/services/book',
    BOARDING: '/api/services/boarding',
    GROOMING: '/api/services/grooming',
    WALKING: '/api/services/walking',
    TRAINING: '/api/services/training',
    VETERINARY: '/api/services/veterinary',
    NGO: '/api/services/ngo',
  },
  
  // Location Services
  LOCATION: {
    SEARCH: '/api/location/search',
    NEARBY: '/api/location/nearby',
    GEOCODE: '/api/location/geocode',
  },
  
  // Payments
  PAYMENTS: {
    CREATE_ORDER: '/api/payments/create',
    VERIFY: '/api/payments/verify',
    HISTORY: '/api/payments/history',
  },
  
  // Mart/Store
  MART: {
    PRODUCTS: '/api/mart/products',
    CATEGORIES: '/api/mart/categories',
    CART: '/api/mart/cart',
    ORDERS: '/api/mart/orders',
    WISHLIST: '/api/mart/wishlist',
  },
};

// Helper function to build complete URL
export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Replace path parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, encodeURIComponent(value));
    });
  }
  
  return url;
};

// Helper function to build query string
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
};

// Network request wrapper with better error handling
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  pathParams?: Record<string, string>
): Promise<any> => {
  const url = buildApiUrl(endpoint, pathParams);
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...API_CONFIG.HEADERS,
      ...options.headers,
    },
    // Add timeout using AbortController
    signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please check your connection and try again.');
    }
    
    if (error.message?.includes('Network request failed') || error.message?.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw error;
  }
};