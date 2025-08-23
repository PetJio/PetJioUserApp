export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'fish' | 'bird' | 'other';
  breed: string;
  age: number;
  gender: 'male' | 'female';
  weight: number;
  color: string;
  image?: string;
  medicalHistory: MedicalRecord[];
  vaccinations: Vaccination[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  veterinarianId: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  notes?: string;
  date: string;
  followUpDate?: string;
}

export interface Vaccination {
  id: string;
  petId: string;
  vaccineName: string;
  administeredDate: string;
  nextDueDate: string;
  veterinarianId: string;
  notes?: string;
}

export interface UserProfile extends User {
  pets: Pet[];
  address: Address;
  preferences: UserPreferences;
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

export interface UserPreferences {
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
}
