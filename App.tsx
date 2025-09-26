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
import NotificationNavigationService from './src/services/notificationNavigationService';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  // Status bar configuration - Force white background for consistency
  const statusBarConfig = {
    backgroundColor: '#FFFFFF', // Always white for consistent UI
    barStyle: 'dark-content' as 'default' | 'light-content' | 'dark-content',
    translucent: false // Consistent with screen implementations
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log('App starting - checking login status...');
        const loginStatus = await storageService.isLoggedIn();
        console.log('App login status result:', loginStatus);

        setIsLoggedIn(loginStatus);
        setIsLoading(false);

        // If user is logged in, check for pending navigation from notifications
        if (loginStatus) {
          // Wait a bit for navigation to be ready
          setTimeout(() => {
            NotificationNavigationService.handlePendingNavigation();
          }, 1000);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    };

    // Force status bar to white immediately on app start
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF', false);
      StatusBar.setBarStyle('dark-content', false);
    }

    // Add a small delay to ensure storage is ready
    const timer = setTimeout(checkLoginStatus, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner while checking login status
  if (isLoading) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor="#FFFFFF"
            barStyle="dark-content"
            translucent={false}
            animated={false}
          />
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
          animated={true}
        />
        <NavigationContainer ref={navigationRef}>
          <StackNavigator initialRouteName={isLoggedIn ? 'Main' : 'SignIn'} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
