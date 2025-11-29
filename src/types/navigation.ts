import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Root Stack Parameter List
export type RootStackParamList = {
  // Auth Screens
  SignIn: undefined;
  SignUp: undefined;
  LogIn: undefined;
  Location: { userSignUpData: any };
  
  // Main Navigation
  Main: undefined;
  ServiceStackNavigator: undefined;
  
  // Service Screens
  Service: undefined;
  Boarding: undefined;
  BoardingDetails: {
    providerId?: number;
    selectedDate: string;
    selectedTime: string;
    city: string;
    boardDetails?: any;
    mode?: number;
  };
  BoardingUser: undefined;
  
  // Common Screens
  CalendarSheet: undefined;
  Locality: undefined;
  UserDetails: undefined;
  UserService: undefined;
  HomeService: undefined;
  ServicePrice: undefined;
  Paymentmethod: undefined;
  Paymentconfirmmethod: undefined;
  InvoiceDetails: undefined;
  Packages: undefined;
  ConfirmDetails: undefined;
  AddVaccination: undefined;
  VaccinationUpload: { petId: number; petName: string };
  PaymentWebView: {
    paymentUrl: string;
    bookingId: number;
    startDate?: string;
    endDate?: string;
    selectedPets?: number[];
    petOwnerId?: number;
    boardingDetails?: any;
    isSettlement?: boolean;
    settlementAmount?: number;
  };
  AddPet: undefined;
  EditPet: { pet: any };

  // Mart Screens
  MartLocalityAddress: undefined;
  PetjioMartStore: undefined;
  AllCategories: undefined;
  PetProductDescription: undefined;
  WishlistProduct: undefined;
  MyCart: undefined;
  CheckOut: undefined;
  PetMartPaymentMethod: undefined;
  PetMartPaymentconfirmmethod: undefined;
  
  // Forms
  PetParentform: undefined;
  PetWarriorform: undefined;
  DeliveryPartnerform: undefined;
  ServiceProviderform: undefined;
  
  // Other Screens
  VirtualAdoption: undefined;
  VirtualAdoptionDetails: undefined;
  Donation: undefined;
  DonateDetails: undefined;
  DonateAmount: undefined;
  DonatePaymentMethod: undefined;
  DonatePaymentconfirmmethod: undefined;
  DogAdoptionScreeningForm: undefined;
  PrivacyPolicy: undefined;
  ContactUs: undefined;
  DataSafety: undefined;

  // Fallback for any missing screens
  [key: string]: any;
};

// Tab Navigator Parameter List
export type TabParamList = {
  main: undefined;
  Home: undefined;
  Service: undefined;
  Chats: undefined;
  Visits: undefined;
  Mart: undefined;
  Profile: undefined;
};

// Service Stack Parameter List
export type ServiceStackParamList = {
  Service: undefined;
};

// Navigation Props Types
export type RootStackNavigationProp<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type TabNavigationProp<T extends keyof TabParamList> = {
  navigation: BottomTabNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

export type ServiceStackNavigationProp<T extends keyof ServiceStackParamList> = {
  navigation: NativeStackNavigationProp<ServiceStackParamList, T>;
  route: RouteProp<ServiceStackParamList, T>;
};
