import React from 'react';
import {
    createBottomTabNavigator,
    BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { Home, Mart, Visits, Service, Profile } from '../../screens';
import { Image } from 'react-native';
import iconsPaths from '../../../assets/icons';
import styles from './styles';
import colors from '../../styles/colors';
import ServiceStackNavigator from '../ServiceStackNavigator';



type TabParamList = {
    Home: undefined;
    Mart: undefined;
    Visits: undefined;
    Service: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export type TabNavigationProps<T extends keyof TabParamList> = {
    navigation: BottomTabNavigationProp<TabParamList, T>;
    route: RouteProp<TabParamList, T>;
};

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => (
                    <Image
                        source={iconsPaths[route.name]}
                        style={[styles.icon, { tintColor: color }]}
                    />
                ),
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.secondary,
                tabBarShowLabel: true,
            })}>
            <Tab.Screen name="Home" component={Home}  options={{ headerShown: false }} />
            <Tab.Screen name="Service" component={ServiceStackNavigator} options={{ headerShown: false }}/>
            <Tab.Screen name="Visits" component={Visits} options={{ headerShown: false }} />
            <Tab.Screen name="Mart" component={Mart} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            
        </Tab.Navigator>
    );
};

export default TabNavigator;
