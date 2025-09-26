import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api';

// Lazy import messaging to avoid early initialization
const getMessaging = () => {
  try {
    // Check if Firebase app is initialized
    const { getApps, initializeApp } = require('@react-native-firebase/app');
    if (getApps().length === 0) {
      console.log('Firebase app not initialized, initializing now...');
      initializeApp();
      console.log('Firebase app initialized successfully in messaging service');
    }
    return require('@react-native-firebase/messaging').default;
  } catch (error) {
    console.error('Error getting Firebase messaging:', error);
    return null;
  }
};

export class FirebaseMessagingService {

  /**
   * Request permission for push notifications
   */
  static async requestPermission(): Promise<boolean> {
    try {
      const messaging = getMessaging();
      if (!messaging) {
        console.error('Firebase messaging not available');
        return false;
      }

      // Check current permission status first
      const currentAuthStatus = await messaging().hasPermission();
      console.log('Current notification permission status:', currentAuthStatus);

      // If already authorized, return true
      if (currentAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          currentAuthStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('Firebase messaging permission already granted:', currentAuthStatus);
        return true;
      }

      // Request permission
      console.log('Requesting Firebase messaging permission...');
      const authStatus = await messaging().requestPermission({
        sound: true,
        announcement: true,
        badge: true,
        carPlay: true,
        criticalAlert: true,
        provisional: false,
        alert: true,
      });

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('✅ Firebase messaging permission granted:', authStatus);
        console.log('🔔 Push notifications are now enabled!');
        return true;
      } else {
        console.log('❌ Firebase messaging permission denied:', authStatus);
        console.log('⚠️ User needs to manually enable notifications in device settings');
        return false;
      }
    } catch (error) {
      console.error('Error requesting Firebase messaging permission:', error);
      return false;
    }
  }

  /**
   * Get FCM token
   */
  static async getFCMToken(): Promise<string | null> {
    try {
      const messaging = getMessaging();
      if (!messaging) {
        console.error('Firebase messaging not available');
        return null;
      }
      const fcmToken = await messaging().getToken();
      console.log('FCM Token retrieved:', fcmToken);
      console.log('FCM TOKEN FOR TESTING:', fcmToken);
      console.log('==================================================');
      console.log('CURRENT FCM TOKEN:');
      console.log(fcmToken);
      console.log('==================================================');
      console.log('🔗 DYNAMIC TOKEN EXTRACTION: CURRENT_FCM_TOKEN=' + fcmToken);
      console.log('📱 Token length:', fcmToken ? fcmToken.length : 0);
      console.log('✅ Token format valid:', fcmToken ? /^[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+$/.test(fcmToken) : false);

      // Store in AsyncStorage for external access
      await AsyncStorage.setItem('current_fcm_token', fcmToken);
      await AsyncStorage.setItem('@fcm_token', fcmToken);
      await AsyncStorage.setItem('firebase_messaging_token', fcmToken);

      console.log('💾 FCM Token stored in AsyncStorage with keys: current_fcm_token, @fcm_token, firebase_messaging_token');

      return fcmToken;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  /**
   * Get authentication token from storage
   */
  private static async getAuthToken(): Promise<string | null> {
    const possibleTokenKeys = ['token', 'user_token', 'authToken', 'access_token', 'loginToken'];

    for (const key of possibleTokenKeys) {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
    }
    return null;
  }

  /**
   * Register or unregister device token with backend API
   */
  static async registerDeviceToken(fcmToken: string): Promise<boolean> {
    try {
      const authToken = await this.getAuthToken();

      if (!authToken) {
        console.error('No authentication token found for device registration');
        // Save the token as pending so it can be registered after login
        await AsyncStorage.setItem('pending_fcm_token', fcmToken);
        console.log('Saved pending FCM token for later registration');
        return false;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/notifications/register-device`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          fcmToken: fcmToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Device token registered successfully:', result);
        console.log('SUCCESS! FCM Token sent to backend API');
        console.log('API Response:', JSON.stringify(result, null, 2));

        // Store registration status
        await AsyncStorage.setItem('fcm_token_registered', 'true');
        await AsyncStorage.setItem('registered_fcm_token', fcmToken);
        return true;
      } else {
        console.error('Failed to register device token:', result);
        console.error('API Error Response:', JSON.stringify(result, null, 2));
        return false;
      }
    } catch (error) {
      console.error('Error registering device token:', error);
      return false;
    }
  }

  /**
   * Try to register a pending token saved when auth wasn't available.
   * Call this after successful login.
   */
  static async registerPendingToken(): Promise<boolean> {
    try {
      const pending = await AsyncStorage.getItem('pending_fcm_token');
      if (!pending) {
        console.log('No pending FCM token to register');
        return true;
      }
      console.log('Attempting to register pending FCM token...');
      const registered = await this.registerDeviceToken(pending);
      if (registered) {
        await AsyncStorage.removeItem('pending_fcm_token');
        console.log('Pending FCM token registered and cleared');
        return true;
      }
      console.warn('Pending FCM token registration still failed');
      return false;
    } catch (error) {
      console.error('Error registering pending FCM token:', error);
      return false;
    }
  }

  /**
   * Unregister device token on logout by sending empty FCM token
   */
  static async unregisterDeviceToken(): Promise<boolean> {
    try {
      const authToken = await this.getAuthToken();

      if (!authToken) {
        console.error('No authentication token found for device unregistration');
        return false;
      }

      console.log('Unregistering device token by sending empty FCM token...');

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/notifications/register-device`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          fcmToken: '', // Empty token to unregister
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Device token unregistered successfully:', result);
        console.log('SUCCESS! Device unregistered from push notifications');

        // Clear registration status
        await AsyncStorage.removeItem('fcm_token_registered');
        await AsyncStorage.removeItem('registered_fcm_token');
        await AsyncStorage.removeItem('pending_fcm_token');

        return true;
      } else {
        console.error('Failed to unregister device token:', result);
        console.error('API Error Response:', JSON.stringify(result, null, 2));
        return false;
      }
    } catch (error) {
      console.error('Error unregistering device token:', error);
      return false;
    }
  }

  /**
   * Initialize Firebase messaging (call after login)
   */
  static async initializeMessaging(): Promise<void> {
    try {
      console.log('Initializing Firebase messaging...');

      // Request permission
      const hasPermission = await this.requestPermission();

      if (!hasPermission) {
        console.log('Push notification permission not granted');
        return;
      }

      // Get FCM token
      const fcmToken = await this.getFCMToken();

      if (!fcmToken) {
        console.error('Could not retrieve FCM token');
        return;
      }

      console.log('Checking if token needs registration...');

      // Check if token is already registered
      // const lastRegisteredToken = await AsyncStorage.getItem('registered_fcm_token');

      console.log('Registering new FCM token with backend API...');
      console.log('New token:', fcmToken);
      // console.log('Previous token:', lastRegisteredToken || 'None');

      // Register token with backend
      const registered = await this.registerDeviceToken(fcmToken);

      if (registered) {
        console.log('Firebase messaging initialization complete');
        console.log('Device is now ready to receive push notifications!');
      } else {
        console.error('Failed to register device token with backend');
        console.error('Push notifications may not work properly');
      }

    } catch (error) {
      console.error('Error initializing Firebase messaging:', error);
    }
  }

  /**
   * Handle token refresh
   */
  static setupTokenRefreshListener(): void {
    const messaging = getMessaging();
    if (!messaging) {
      console.error('Firebase messaging not available for token refresh listener');
      return;
    }
    messaging().onTokenRefresh(async (fcmToken) => {
      console.log('FCM Token refreshed:', fcmToken);
      console.log('NEW FCM TOKEN (REFRESHED):', fcmToken);
      console.log('============================================================');
      console.log('TOKEN REFRESHED - COPY NEW TOKEN FOR TESTING:');
      console.log(fcmToken);
      console.log('============================================================');

      // Re-register the new token
      const registered = await this.registerDeviceToken(fcmToken);

      if (registered) {
        console.log('New FCM token registered successfully');
        console.log('Token refresh and registration complete!');
      } else {
        console.error('Failed to register refreshed FCM token');
        console.error('Manual token re-registration may be needed');
      }
    });
  }

  /**
   * Setup message handlers
   */
  static setupMessageHandlers(): void {
    const messaging = getMessaging();
    if (!messaging) {
      console.error('Firebase messaging not available for message handlers');
      return;
    }

    // Handle messages when app is in foreground
    messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message received:', remoteMessage);
      // Handle foreground messages here (show local notification, update UI, etc.)
    });

    // Handle messages when app is opened from background state
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened app from background:', remoteMessage);
      // Handle navigation or actions when notification is tapped
    });

    // Handle messages when app is opened from quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification opened app from quit state:', remoteMessage);
          // Handle navigation or actions when notification is tapped from quit state
        }
      });
  }

  /**
   * Complete Firebase messaging setup (call in App.tsx)
   */
  static async setupFirebaseMessaging(): Promise<void> {
    try {
      console.log('Setting up Firebase messaging...');

      // Wait a bit to ensure Firebase is fully initialized
      await new Promise(resolve => setTimeout(resolve, 100));

      // Check if messaging is available before setting up
      const messaging = getMessaging();
      if (!messaging) {
        console.log('Firebase messaging not available, skipping setup');
        return;
      }

      // Setup message handlers
      this.setupMessageHandlers();

      // Setup token refresh listener
      this.setupTokenRefreshListener();

      console.log('Firebase messaging setup complete');
    } catch (error) {
      console.error('Error setting up Firebase messaging:', error);
    }
  }
}

export default FirebaseMessagingService;