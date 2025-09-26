/**
 * @format
 */

// Initialize Firebase FIRST before any other imports that might use Firebase
import { initializeApp, getApps } from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase if not already initialized
if (getApps().length === 0) {
  initializeApp();
  console.log('Firebase app initialized successfully in index.js');
}

// Initialize FCM token on app start
const initializeFCMToken = async () => {
  try {
    console.log('🔔 Initializing FCM token on app start...');

    // Wait a bit to ensure Firebase is fully initialized
    await new Promise(resolve => setTimeout(resolve, 500));

    // Import messaging after Firebase is initialized
    const messaging = require('@react-native-firebase/messaging').default;

    // Check if messaging is available
    if (!messaging) {
      console.log('Firebase messaging not available');
      return;
    }

    // Get FCM token
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      console.log('✅ FCM Token obtained on app start:', fcmToken);

      // Store FCM token in local storage
      await AsyncStorage.setItem('fcm_token', fcmToken);
      await AsyncStorage.setItem('current_fcm_token', fcmToken);

      console.log('💾 FCM Token stored in local storage');
    } else {
      console.log('❌ Could not obtain FCM token on app start');
    }
  } catch (error) {
    console.error('❌ Error initializing FCM token:', error);
  }
};

// Initialize FCM token
initializeFCMToken();

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
