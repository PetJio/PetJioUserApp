import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Service,
  VeterinariansDetails,
  VeterinaryPharmacy,
  PharmacyOrderNow
  // Add other related screens if needed
} from '../screens';

const Stack = createNativeStackNavigator();

const ServiceStackNavigator: React.FC = () => {
  return (
    // @ts-ignore
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Service" component={Service} />
      {/* <Stack.Screen name="Veterinary" component={Veterinary} /> */}
      <Stack.Screen name="VeterinariansDetails" component={VeterinariansDetails} />
      <Stack.Screen name="VeterinaryPharmacy" component={VeterinaryPharmacy} />
      <Stack.Screen name="PharmacyOrderNow" component={PharmacyOrderNow}/>
    </Stack.Navigator>
  );
};

export default ServiceStackNavigator;