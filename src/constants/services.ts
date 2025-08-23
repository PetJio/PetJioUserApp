export const SERVICES = {
  GROOMING: 'Grooming',
  WALKING: 'Walking',
  TRAINING: 'Training',
  BOARDING: 'Boarding',
  PARA_VET: 'ParaVet',
  VETERINARY: 'Veterinary',
  NGO: 'NGO',
} as const;

export const SERVICE_CATEGORIES = {
  PET_CARE: 'pet_care',
  HEALTH: 'health',
  TRAINING: 'training',
  EMERGENCY: 'emergency',
  ADOPTION: 'adoption',
} as const;

export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  WALLET: 'wallet',
  NET_BANKING: 'net_banking',
  CASH: 'cash',
} as const;

export const PAYMENT_PROVIDERS = {
  VISA: 'visa',
  GOOGLE_PAY: 'google_pay',
  PHONE_PE: 'phone_pe',
  PAYTM: 'paytm',
} as const;

export const SERVICE_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
