// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://13.204.155.197',
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
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
    BOARDING_AVAILABILITY: '/api/boarding-service-availibility/by-day',
    BOARDING_DETAILS: '/api/boarding-service/get-service-details/11',
    BOARDING_REVIEWS: '/api/boarding-reviews/get-by-service/3',
    CONSULTATION_TYPE: '/api/consultation-type',
    SEARCH_BOARDINGS: '/api/boarding/search-boardings',
    GROOMING: '/api/services/grooming',
    WALKING: '/api/services/walking',
    TRAINING: '/api/services/training',
    VETERINARY: '/api/services/veterinary',
    NGO: '/api/services/ngo',
    SERVICES_BOOKING: '/api/boarding-service-bookings',
  },

  // Chat
  CHAT: {
    GET_ALL_MESSAGES: '/api/user-chat/get-all-messages/:userId',
    GET_CONVERSATION_MESSAGES: '/api/user-chat/end-end/:myId/:userId',
    SEND_MESSAGE: '/api/notifications/send-message',
    GET_CONVERSATIONS: '/api/user-chat/conversations',
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
export const buildApiUrl = (
  endpoint: string,
  params?: Record<string, string>,
): string => {
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

// Helper function to build query string without encoding colons (for time parameters)
export const buildQueryStringWithoutEncoding = (
  params: Record<string, any>,
): string => {
  return Object.entries(params)
    .filter(([key, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}=${String(value)}`)
    .join('&');
};

// Network request wrapper with better error handling
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  pathParams?: Record<string, string>,
): Promise<any> => {
  const url = buildApiUrl(endpoint, pathParams);

  // Create AbortController for timeout (React Native compatible)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  const config: RequestInit = {
    ...options,
    headers: {
      ...API_CONFIG.HEADERS,
      ...options.headers,
    },
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId); // Clear timeout on successful response

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(
        data.message || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId); // Clear timeout on error

    if (error.name === 'AbortError') {
      throw new Error(
        'Request timeout. Please check your connection and try again.',
      );
    }

    if (
      error.message?.includes('Network request failed') ||
      error.message?.includes('Failed to fetch')
    ) {
      throw new Error('Network error. Please check your internet connection.');
    }

    throw error;
  }
};
