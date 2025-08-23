export interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  reviewCount: number;
  services: ServiceType[];
  location: Address;
  availability: Availability[];
  pricing: ServicePricing[];
  image?: string;
  description: string;
  experience: number;
  certifications: string[];
  isVerified: boolean;
}

export interface ServiceBooking {
  id: string;
  userId: string;
  providerId: string;
  petId: string;
  serviceType: ServiceType;
  scheduledDate: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceType {
  id: string;
  name: string;
  category: 'grooming' | 'walking' | 'training' | 'boarding' | 'veterinary' | 'para_vet' | 'ngo';
  description: string;
  basePrice: number;
  duration: number;
  isActive: boolean;
}

export interface ServicePricing {
  serviceTypeId: string;
  basePrice: number;
  additionalCharges: AdditionalCharge[];
  discounts: Discount[];
}

export interface AdditionalCharge {
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
  condition?: string;
}

export interface Discount {
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
  validFrom: string;
  validTo: string;
  minAmount?: number;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  userId: string;
  providerId: string;
  bookingId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}
