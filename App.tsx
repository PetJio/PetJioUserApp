// Initialize Firebase FIRST before any other imports that might use Firebase
import { initializeApp, getApps } from '@react-native-firebase/app';

// Initialize Firebase if not already initialized
if (getApps().length === 0) {
  initializeApp();
  console.log('Firebase app initialized successfully');
}

import React, { useState, useEffect } from 'react';
import { StatusBar, useColorScheme, Platform, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import StackNavigator from './src/navigation/StackNavigator';
import colors from './src/styles/colors/index';
import { storageService } from './src/utils/storage';
import { navigationRef } from './src/utils/navigationService';
import { useFirebaseMessaging } from './src/hooks/useFirebaseMessaging';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  // Initialize Firebase messaging
  useFirebaseMessaging();
  
  // Status bar configuration
  const statusBarConfig = {
    backgroundColor: Platform.OS === 'android' ? (isDarkMode ? colors.gray900 : colors.white) : 'transparent',
    barStyle: isDarkMode ? 'light-content' : 'dark-content' as 'default' | 'light-content' | 'dark-content',
    translucent: Platform.OS === 'android'
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log('App starting - checking login status...');
        const loginStatus = await storageService.isLoggedIn();
        console.log('App login status result:', loginStatus);
        
        setIsLoggedIn(loginStatus);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure storage is ready
    const timer = setTimeout(checkLoginStatus, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner while checking login status
  if (isLoading) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white || '#FFFFFF' }}>
            <ActivityIndicator size="large" color={colors.primary || '#58B9D0'} />
          </View>
        </SafeAreaProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={statusBarConfig.backgroundColor}
          barStyle={statusBarConfig.barStyle}
          translucent={statusBarConfig.translucent}
        />
        <NavigationContainer ref={navigationRef}>
          <StackNavigator initialRouteName={isLoggedIn ? 'Main' : 'SignIn'} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
