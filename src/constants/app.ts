export const APP_NAME = 'PetJio User App';
export const APP_VERSION = '1.0.0';

// Time constants
export const SPLASH_TIMEOUT = 3000;
export const API_TIMEOUT = 30000;

// Storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  IS_LOGGED_IN: 'is_logged_in',
  APP_PREFERENCES: 'app_preferences',
  BIOMETRIC_ENABLED: 'biometric_enabled',
} as const;

// App states
export const APP_STATES = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error',
} as const;

// Pet types
export const PET_TYPES = {
  DOG: 'dog',
  CAT: 'cat',
  FISH: 'fish',
  BIRD: 'bird',
  OTHER: 'other',
} as const;

// Gender types
export const GENDER_TYPES = {
  MALE: 'male',
  FEMALE: 'female',
} as const;
