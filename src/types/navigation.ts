import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Root Stack Parameter List
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  LogIn: undefined;
  Main: undefined;
  ServiceStackNavigator: undefined;
  
  // Service Screens
  Grooming: undefined;
  GroomingDetails: undefined;
  Walking: undefined;
  WalkingDetails: undefined;
  WalkingUser: undefined;
  Training: undefined;
  TrainingDetails: undefined;
  TrainingLocalAddress: undefined;
  Boarding: undefined;
  BoardingDetails: undefined;
  ParaVet: undefined;
  ParavetDetails: undefined;
  ParaVetLocatlity: undefined;
  ParaVetUser: undefined;
  Veterinary: undefined;
  VeterinaryDetails: undefined;
  VeterinaryLocal: undefined;
  VeterinaryHomeVisiteDetails: undefined;
  NGO: undefined;
  NGODetails: undefined;
  
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
  
  // Mart Screens
  MartLocalityAddress: undefined;
  MyCart: undefined;
  
  // Forms
  PetParentform: undefined;
  PetWarriorform: undefined;
  DeliveryPartnerform: undefined;
  ServiceProviderform: undefined;
  Veterinaryform: undefined;
  
  // Other screens...
  [key: string]: undefined;
};

// Tab Navigator Parameter List
export type TabParamList = {
  Home: undefined;
  Service: undefined;
  Visits: undefined;
  Mart: undefined;
  Profile: undefined;
};

// Service Stack Parameter List
export type ServiceStackParamList = {
  Service: undefined;
  VeterinariansDetails: undefined;
  VeterinaryPharmacy: undefined;
  PharmacyOrderNow: undefined;
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
