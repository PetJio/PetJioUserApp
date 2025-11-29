import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import {
  Service,
  Boarding,
  BoardingUser,
  BoardingDetails,
  SignUp,
  SignIn,
  Location,
  PetParentform,
  PetWarriorform,
  DeliveryPartnerform,
  ServiceProviderform,
  LogIn,
  AddVaccination,
  VirtualAdoption,
  VirtualAdoptionDetails,
  Donation,
  DonateDetails,
  DonateAmount,
  DonatePaymentMethod,
  DonatePaymentconfirmmethod,
  DogAdoptionScreeningForm,
  MartLocalityAddress,
  PetjioMartStore,
  AllCategories,
  PetProductDescription,
  WishlistProduct,
  MyCart,
  CheckOut,
  PetMartPaymentMethod,
  PetMartPaymentconfirmmethod,
  AddPet,
  EditPet,
  VaccinationUpload,
  PaymentWebView,
  BlogDetails,
  AllBlogs,
  NewsDetails,
  AllNews,
  PrivacyPolicy,
  ContactUs,
  DataSafety,
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
            <Stack.Screen name="Service" component={Service}/>
            <Stack.Screen name="Boarding" component={Boarding}/>
            <Stack.Screen name="BoardingUser" component={BoardingUser}/>
            <Stack.Screen name="BoardingDetails" component={BoardingDetails}/>
            <Stack.Screen name="PetParentform" component={PetParentform}/>
            <Stack.Screen name="PetWarriorform" component={PetWarriorform}/>
            <Stack.Screen name="DeliveryPartnerform" component={DeliveryPartnerform}/>
            <Stack.Screen name="ServiceProviderform" component={ServiceProviderform}/>
            <Stack.Screen name="AddVaccination" component={AddVaccination}/>
            <Stack.Screen name="VirtualAdoption" component={VirtualAdoption}/>
            <Stack.Screen name="VirtualAdoptionDetails" component={VirtualAdoptionDetails}/>
            <Stack.Screen name="Donation" component={Donation}/>
            <Stack.Screen name="DonateDetails" component={DonateDetails}/>
            <Stack.Screen name="DonateAmount" component={DonateAmount}/>
            <Stack.Screen name="DonatePaymentMethod" component={DonatePaymentMethod}/>
            <Stack.Screen name="DonatePaymentconfirmmethod" component={DonatePaymentconfirmmethod}/>
            <Stack.Screen name="DogAdoptionScreeningForm" component={DogAdoptionScreeningForm}/>
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
            <Stack.Screen name="AddPet" component={AddPet}/>
            <Stack.Screen name="EditPet" component={EditPet}/>
            <Stack.Screen name="VaccinationUpload" component={VaccinationUpload}/>
            <Stack.Screen name="PaymentWebView" component={PaymentWebView}/>
            <Stack.Screen name="BlogDetails" component={BlogDetails}/>
            <Stack.Screen name="AllBlogs" component={AllBlogs}/>
            <Stack.Screen name="NewsDetails" component={NewsDetails}/>
            <Stack.Screen name="AllNews" component={AllNews}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
            <Stack.Screen name="ContactUs" component={ContactUs}/>
            <Stack.Screen name="DataSafety" component={DataSafety}/>

        </Stack.Navigator>
    );
};

export default StackNavigator;
