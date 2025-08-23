// Navigation types
export * from './navigation.ts';

// User types (includes Address as UserAddress)
export type {
  User,
  Pet,
  MedicalRecord,
  Vaccination,
  UserProfile,
  UserPreferences,
  Address as UserAddress
} from './user.ts';

// Service types (includes Address as ServiceAddress)
export type {
  ServiceProvider,
  ServiceBooking,
  ServiceType,
  ServicePricing,
  AdditionalCharge,
  Discount,
  Availability,
  Review,
  Address as ServiceAddress
} from './service.ts';

// API types
export * from './api.ts';

// Common types
export * from './common.ts';
