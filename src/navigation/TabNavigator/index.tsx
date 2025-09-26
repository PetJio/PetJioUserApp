import React, { useCallback } from 'react';
import {
    createBottomTabNavigator,
    BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Home, Mart, Visits, Profile } from '../../screens';
import { Image, StatusBar, Platform, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import iconsPaths from '../../../assets/icons';
import styles from './styles';
import colors from '../../styles/colors/index';
import ServiceStackNavigator from '../ServiceStackNavigator';
import ChatStackNavigator from '../ChatStackNavigator';
import History from '../../screens/History/History';



type TabParamList = {
    Home: undefined;
    // Mart: undefined;
    // Visits: undefined;
    Service: undefined;
    History: undefined;
    Chats: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export type TabNavigationProps<T extends keyof TabParamList> = {
    navigation: BottomTabNavigationProp<TabParamList, T>;
    route: RouteProp<TabParamList, T>;
};

const TabNavigator: React.FC = () => {
    // Force white status bar for all tab screens
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor('#FFFFFF', false);
            StatusBar.setBarStyle('dark-content', false);
            console.log('🔧 TabNavigator: Forcing white status bar');
        }, [])
    );

    // Get Material Icons based on route name
    const getTabBarIcon = (routeName: string, color: string, size: number = 24, focused: boolean = false) => {
        switch (routeName) {
            case 'Home':
                return (
                    <View style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: focused ? '#58B9D0' : '#E8F4FD',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -20,
                        marginBottom: 10,
                        shadowColor: focused ? '#58B9D0' : 'transparent',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        elevation: focused ? 6 : 0,
                        borderWidth: 3,
                        borderColor: '#FFFFFF',
                    }}>
                        <MaterialIcons
                            name="home"
                            size={28}
                            color={focused ? '#FFFFFF' : '#58B9D0'}
                        />
                    </View>
                );
            case 'Service':
                return <MaterialIcons name="medical-services" size={size} color={color} />;
            case 'History':
                return <MaterialIcons name="history" size={size} color={color} />;
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
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => getTabBarIcon(route.name, color, size, focused),
                tabBarActiveTintColor: '#58B9D0',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarShowLabel: true,
                tabBarLabelStyle: ({ focused }) => ({
                    fontSize: route.name === 'Home' ? 14 : 12,
                    fontWeight: route.name === 'Home' ? '700' : '600',
                    marginBottom: 4,
                    marginTop: route.name === 'Home' ? 4 : 0,
                    color: route.name === 'Home' && focused ? '#58B9D0' : undefined,
                }),
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E8EBF0',
                    elevation: 0,
                    height: 80,
                    paddingTop: 8,
                    paddingBottom: 12,
                },
                tabBarItemStyle: {
                    paddingVertical: 4,
                },
            })}>
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    headerShown: false,
                    tabBarLabel: 'History'
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
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home'
                }}
            />
            <Tab.Screen
                name="Chats"
                component={ChatStackNavigator}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatList';
                    return {
                        headerShown: false,
                        tabBarLabel: 'Chats',
                        tabBarStyle: routeName === 'Chat' ? { display: 'none' } : {
                            backgroundColor: '#FFFFFF',
                            borderTopWidth: 1,
                            borderTopColor: '#E8EBF0',
                            elevation: 0,
                            height: 80,
                            paddingTop: 8,
                            paddingBottom: 12,
                        }
                    };
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
