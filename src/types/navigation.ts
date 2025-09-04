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
  Grooming: undefined;
  GroomingDetails: undefined;
  GroomingPaymentmethod: undefined;
  GroomingPaymentconfirmmethod: undefined;
  Walking: undefined;
  WalkingDetails: undefined;
  WalkingUser: undefined;
  Training: undefined;
  TrainingDetails: undefined;
  TrainingLocalAddress: undefined;
  TrainingUser: undefined;
  TrainerAbout: undefined;
  TrainingConfirmDetails: undefined;
  TrainingPaymentmethod: undefined;
  TrainingPaymentconfirmmethod: undefined;
  Boarding: undefined;
  BoardingDetails: undefined;
  BoardingUser: undefined;
  BoardingRegistrationform: undefined;
  BoardingPaymentmethod: undefined;
  BoardingBooking: undefined;
  BookBoarder: undefined;
  ParaVet: undefined;
  ParavetDetails: undefined;
  ParaVetLocatlity: undefined;
  ParaVetUser: undefined;
  ParavetServices: undefined;
  ParaVetCheckout: undefined;
  ParaVetPaymentmethod: undefined;
  ParaVetPaymentconfirmmethod: undefined;
  ParaVetGoogleMap: undefined;
  Veterinary: undefined;
  VeterinaryDetails: undefined;
  VeterinaryLocal: undefined;
  VeterinariansDetails: undefined;
  VeterinaryCalendar: undefined;
  VoiceCallWithVeterinary: undefined;
  OnlineChatWithVeterinary: undefined;
  LiveTalkToVeterinary: undefined;
  PharmacyOrderOverview: undefined;
  VeterinaryPaymentMethod: undefined;
  PharmacyOrderOnTheWay: undefined;
  VeterinaryHomeVisiteDetails: undefined;
  NGO: undefined;
  NGODetails: undefined;
  NGOUser: undefined;
  NGOAbout: undefined;
  NGOReview: undefined;
  
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
  AddPet: undefined;
  
  // Chat Screens
  ChatList: undefined;
  Chat: { user: any };
  
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
  Veterinaryform: undefined;
  
  // Other Screens
  VirtualAdoption: undefined;
  VirtualAdoptionDetails: undefined;
  Donation: undefined;
  DonateDetails: undefined;
  DonateAmount: undefined;
  DonatePaymentMethod: undefined;
  DonatePaymentconfirmmethod: undefined;
  DogAdoptionScreeningForm: undefined;
  
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
