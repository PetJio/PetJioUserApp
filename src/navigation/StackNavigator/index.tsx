import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import {
  Grooming,
  CalendarSheet,
  Locality,
  HomeService,
  UserDetails,
  UserService,
  ServicePrice,
  Paymentmethod,
  Paymentconfirmmethod,
  InvoiceDetails,
  Walking,
  WalkingUser,
  Service,
  WalkingDetails,
  Packages,
  ConfirmDetails,
  Training,
  TrainingLocalAddress,
  TrainingUser,
  TrainerAbout,
  TrainingDetails,
  TrainingConfirmDetails,
  TrainingPaymentmethod,
  TrainingPaymentconfirmmethod,
  ParaVet,
  ParaVetLocatlity,
  ParaVetUser,
  ParavetDetails,
  Boarding,
  BoardingUser,
  BoardingDetails,
  BoardingRegistrationform,
  SignUp,
  SignIn,
  Location,
  PetParentform,
  PetWarriorform,
  DeliveryPartnerform,
  ServiceProviderform,
  LogIn,
  AddVaccination,
  BookBoarder,
  BoardingPaymentmethod,
  NGO,
  NGOUser,
  NGODetails,
  Veterinaryform,
  BoardingBooking,
  NGOAbout,
  NGOReview,
  VirtualAdoption,
  Donation,
  DonateDetails,
  DonateAmount,
  DonatePaymentMethod,
  DonatePaymentconfirmmethod,
  DogAdoptionScreeningForm,
  VirtualAdoptionDetails,
  ParavetServices,
  ParaVetCheckout,
  ParaVetPaymentmethod,
  ParaVetGoogleMap,
  GroomingDetails,
  GroomingPaymentmethod,
  MartLocalityAddress,
  PetjioMartStore,
  AllCategories,
  PetProductDescription,
  WishlistProduct,
  MyCart,
  CheckOut,
  PetMartPaymentMethod,
  PetMartPaymentconfirmmethod,
  GroomingPaymentconfirmmethod,
  ParaVetPaymentconfirmmethod,
  Veterinary,
  VeterinaryLocal,
  VeterinaryDetails,
  VeterinaryCalendar,
  VoiceCallWithVeterinary,
  OnlineChatWithVeterinary,
  LiveTalkToVeterinary,
  PharmacyOrderOverview,
  VeterinaryPaymentMethod,
  PharmacyOrderOnTheWay,
  VeterinaryHomeVisiteDetails,
  AddPet,
} from '../../screens';
import TabNavigator from '../TabNavigator';
import ServiceStackNavigator from '../ServiceStackNavigator';


const Stack = createNativeStackNavigator<RootStackParamList>();

export type StackNavigationProps<T extends keyof RootStackParamList> = {
    navigation: NativeStackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList,T>;
};

interface StackNavigatorProps {
  initialRouteName?: string;
}

const StackNavigator: React.FC<StackNavigatorProps> = ({ initialRouteName }) => {
    return (
        // @ts-ignore
        <Stack.Navigator 
          initialRouteName={initialRouteName}
          screenOptions={{headerShown:false}}
        >
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="Location" component={Location}/>
            <Stack.Screen name="LogIn" component={LogIn}/>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="ServiceStackNavigator" component={ServiceStackNavigator} />
            <Stack.Screen name="Grooming" component={Grooming} />
            <Stack.Screen name="CalendarSheet" component={CalendarSheet}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="Locality" component={Locality} />
            <Stack.Screen name="HomeService" component={HomeService} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="UserService" component={UserService} />
            <Stack.Screen name="ServicePrice" component={ServicePrice} />
            <Stack.Screen name="Paymentmethod" component={Paymentmethod} />
            <Stack.Screen name="Paymentconfirmmethod" component={Paymentconfirmmethod}/>
            <Stack.Screen name="InvoiceDetails" component={InvoiceDetails}/>
            <Stack.Screen name="Walking" component={Walking}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="WalkingUser" component={WalkingUser}/>
            <Stack.Screen name="Service" component={Service}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="WalkingDetails" component={WalkingDetails}/>
            <Stack.Screen name="Packages" component={Packages}/>
            <Stack.Screen name="ConfirmDetails" component={ConfirmDetails}/>
            <Stack.Screen name="Training" component={Training}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="TrainingLocalAddress" component={TrainingLocalAddress}/>
            <Stack.Screen name="TrainingUser" component={TrainingUser}/>
            <Stack.Screen name="TrainerAbout" component={TrainerAbout}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="TrainingDetails" component={TrainingDetails}/>
            <Stack.Screen name="TrainingConfirmDetails" component={TrainingConfirmDetails}/>
            <Stack.Screen name="TrainingPaymentmethod" component={TrainingPaymentmethod}/>
            <Stack.Screen name="TrainingPaymentconfirmmethod" component={TrainingPaymentconfirmmethod}/>
            <Stack.Screen name="ParaVet" component={ParaVet}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="ParaVetLocatlity" component={ParaVetLocatlity}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="ParaVetUser" component={ParaVetUser}/>
            <Stack.Screen name="ParavetDetails" component={ParavetDetails}/>
            <Stack.Screen name="Boarding" component={Boarding}/>
            <Stack.Screen name="BoardingUser" component={BoardingUser}/>
            <Stack.Screen name="BoardingDetails" component={BoardingDetails}/>
            <Stack.Screen name="BoardingRegistrationform" component={BoardingRegistrationform}/>
            <Stack.Screen name="PetParentform" component={PetParentform}/>
            <Stack.Screen name="PetWarriorform" component={PetWarriorform}/>
            <Stack.Screen name="DeliveryPartnerform" component={DeliveryPartnerform}/>
            <Stack.Screen name="ServiceProviderform" component={ServiceProviderform}/>
            <Stack.Screen name="AddVaccination" component={AddVaccination}/>
            <Stack.Screen name="BookBoarder" component={BookBoarder}/>
            <Stack.Screen name="BoardingPaymentmethod" component={BoardingPaymentmethod}/>
            <Stack.Screen name="NGO" component={NGO}/>
            <Stack.Screen name="NGOUser" component={NGOUser}/>
            <Stack.Screen name="Veterinaryform" component={Veterinaryform}/>
            <Stack.Screen name="BoardingBooking" component={BoardingBooking}/>
            <Stack.Screen name="NGODetails" component={NGODetails}/>
            <Stack.Screen name="NGOAbout" component={NGOAbout}/>
            <Stack.Screen name="NGOReview" component={NGOReview}/>
            <Stack.Screen name="VirtualAdoption" component={VirtualAdoption}/>
            <Stack.Screen name="Donation" component={Donation}/>
            <Stack.Screen name="DonateDetails" component={DonateDetails}/>
            <Stack.Screen name="DonateAmount" component={DonateAmount}/>
            <Stack.Screen name="DonatePaymentMethod" component={DonatePaymentMethod}/>
            <Stack.Screen name="DonatePaymentconfirmmethod" component={DonatePaymentconfirmmethod}/>
            <Stack.Screen name="DogAdoptionScreeningForm" component={DogAdoptionScreeningForm}/>
            <Stack.Screen name="VirtualAdoptionDetails" component={VirtualAdoptionDetails}/>
            <Stack.Screen name="ParavetServices" component={ParavetServices}/>
            <Stack.Screen name="ParaVetCheckout" component={ParaVetCheckout}/>
            <Stack.Screen name="ParaVetPaymentmethod" component={ParaVetPaymentmethod}/>
            <Stack.Screen name="ParaVetGoogleMap" component={ParaVetGoogleMap}/>
            <Stack.Screen name="GroomingDetails" component={GroomingDetails}/>
            <Stack.Screen name="GroomingPaymentmethod" component={GroomingPaymentmethod}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="MartLocalityAddress" component={MartLocalityAddress}/>
            <Stack.Screen name="PetjioMartStore" component={PetjioMartStore}/>
            <Stack.Screen name="AllCategories" component={AllCategories}/>
            <Stack.Screen name="PetProductDescription" component={PetProductDescription}/>
            <Stack.Screen name="WishlistProduct" component={WishlistProduct}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="MyCart" component={MyCart}/>
            <Stack.Screen name="CheckOut" component={CheckOut}/>
            <Stack.Screen name="PetMartPaymentMethod" component={PetMartPaymentMethod}/>
            <Stack.Screen name="PetMartPaymentconfirmmethod" component={PetMartPaymentconfirmmethod}/>
            <Stack.Screen name="GroomingPaymentconfirmmethod" component={GroomingPaymentconfirmmethod}/>
            <Stack.Screen name="ParaVetPaymentconfirmmethod" component={ParaVetPaymentconfirmmethod}/>
            <Stack.Screen name="Veterinary" component={Veterinary}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="VeterinaryLocal" component={VeterinaryLocal}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="VeterinaryDetails" component={VeterinaryDetails}/>
            <Stack.Screen name="VeterinaryCalendar" component={VeterinaryCalendar}/>
            <Stack.Screen name="VoiceCallWithVeterinary" component={VoiceCallWithVeterinary}/>
            <Stack.Screen name="OnlineChatWithVeterinary" component={OnlineChatWithVeterinary}/>
            <Stack.Screen name="LiveTalkToVeterinary" component={LiveTalkToVeterinary}/>
            <Stack.Screen name="PharmacyOrderOverview" component={PharmacyOrderOverview}/>
            <Stack.Screen name="VeterinaryPaymentMethod" component={VeterinaryPaymentMethod}/>
            <Stack.Screen name="PharmacyOrderOnTheWay" component={PharmacyOrderOnTheWay}/>
            {/* @ts-ignore - Legacy component with custom props interface */}
            <Stack.Screen name="VeterinaryHomeVisiteDetails" component={VeterinaryHomeVisiteDetails}/>
            <Stack.Screen name="AddPet" component={AddPet}/>
           
        </Stack.Navigator>
    );
};

export default StackNavigator;
