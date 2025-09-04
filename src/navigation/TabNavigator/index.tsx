import React, { useCallback } from 'react';
import {
    createBottomTabNavigator,
    BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { Home, Mart, Visits, Profile } from '../../screens';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import iconsPaths from '../../../assets/icons';
import styles from './styles';
import colors from '../../styles/colors/index';
import ServiceStackNavigator from '../ServiceStackNavigator';
import ChatStackNavigator from '../ChatStackNavigator';



type TabParamList = {
    Home: undefined;
    // Mart: undefined;
    // Visits: undefined;
    Service: undefined;
    Chats: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export type TabNavigationProps<T extends keyof TabParamList> = {
    navigation: BottomTabNavigationProp<TabParamList, T>;
    route: RouteProp<TabParamList, T>;
};

const TabNavigator: React.FC = () => {
    // Get Material Icons based on route name
    const getTabBarIcon = (routeName: string, color: string, size: number = 24) => {
        switch (routeName) {
            case 'Home':
                return <MaterialIcons name="home" size={size} color={color} />;
            case 'Service':
                return <MaterialIcons name="medical-services" size={size} color={color} />;
            case 'Chats':
                return <MaterialIcons name="chat" size={size} color={color} />;
            case 'Profile':
                return <MaterialIcons name="person" size={size} color={color} />;
            default:
                return <MaterialIcons name="circle" size={size} color={color} />;
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
                tabBarActiveTintColor: '#58B9D0',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: 4,
                },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E8EBF0',
                    elevation: 0,
                    height: 70,
                    paddingTop: 8,
                    paddingBottom: 12,
                },
                tabBarItemStyle: {
                    paddingVertical: 4,
                },
            })}>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ 
                    headerShown: false,
                    tabBarLabel: 'Home'
                }} 
            />
            <Tab.Screen 
                name="Service" 
                component={ServiceStackNavigator} 
                options={{ 
                    headerShown: false,
                    tabBarLabel: 'Services'
                }}
            />
            <Tab.Screen 
                name="Chats" 
                component={ChatStackNavigator} 
                options={{ 
                    headerShown: false,
                    tabBarLabel: 'Chats'
                }}
            />
            {/* <Tab.Screen name="Visits" component={Visits} options={{ headerShown: false }} /> */}
            {/* <Tab.Screen name="Mart" component={Mart} options={{ headerShown: false }} /> */}
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{ 
                    headerShown: false,
                    tabBarLabel: 'Profile'
                }} 
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
