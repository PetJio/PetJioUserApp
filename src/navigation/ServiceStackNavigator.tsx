import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Service } from '../screens';

const Stack = createNativeStackNavigator();

const ServiceStackNavigator: React.FC = () => {
  return (
    // @ts-ignore
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Service" component={Service} />
    </Stack.Navigator>
  );
};

export default ServiceStackNavigator;