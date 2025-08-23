// Navigation constants
export const SCREEN_NAMES = {
  // Auth Stack
  SIGN_IN: 'SignIn',
  SIGN_UP: 'SignUp',
  LOG_IN: 'LogIn',
  
  // Main Stack
  MAIN: 'Main',
  SERVICE_STACK: 'ServiceStackNavigator',
  
  // Tab Navigation
  HOME: 'Home',
  SERVICE: 'Service',
  VISITS: 'Visits',
  MART: 'Mart',
  PROFILE: 'Profile',
  
  // Service Screens
  GROOMING: 'Grooming',
  GROOMING_DETAILS: 'GroomingDetails',
  WALKING: 'Walking',
  WALKING_DETAILS: 'WalkingDetails',
  TRAINING: 'Training',
  TRAINING_DETAILS: 'TrainingDetails',
  BOARDING: 'Boarding',
  BOARDING_DETAILS: 'BoardingDetails',
  PARA_VET: 'ParaVet',
  PARA_VET_DETAILS: 'ParavetDetails',
  VETERINARY: 'Veterinary',
  VETERINARY_DETAILS: 'VeterinaryDetails',
  NGO: 'NGO',
  NGO_DETAILS: 'NGODetails',
  
  // Common Screens
  CALENDAR_SHEET: 'CalendarSheet',
  LOCALITY: 'Locality',
  USER_DETAILS: 'UserDetails',
  PAYMENT_METHOD: 'Paymentmethod',
  PAYMENT_CONFIRM: 'Paymentconfirmmethod',
  INVOICE_DETAILS: 'InvoiceDetails',
  
  // Forms
  PET_PARENT_FORM: 'PetParentform',
  PET_WARRIOR_FORM: 'PetWarriorform',
  DELIVERY_PARTNER_FORM: 'DeliveryPartnerform',
  SERVICE_PROVIDER_FORM: 'ServiceProviderform',
  VETERINARY_FORM: 'Veterinaryform',
  
  // Donation & Adoption
  VIRTUAL_ADOPTION: 'VirtualAdoption',
  VIRTUAL_ADOPTION_DETAILS: 'VirtualAdoptionDetails',
  DONATION: 'Donation',
  DONATE_DETAILS: 'DonateDetails',
  DONATE_AMOUNT: 'DonateAmount',
  DOG_ADOPTION_FORM: 'DogAdoptionScreeningForm',
} as const;

export const TAB_ICONS = {
  HOME: 'Home',
  SERVICE: 'Service',
  VISITS: 'Visits',
  MART: 'Mart',
  PROFILE: 'Profile',
} as const;
