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

// Initialize FCM token and messaging setup on app start
const initializeFirebaseMessaging = async () => {
  try {
    console.log('🔔 Initializing Firebase messaging on app start...');

    // Wait a bit to ensure Firebase is fully initialized
    await new Promise(resolve => setTimeout(resolve, 500));

    // Import messaging after Firebase is initialized
    const messaging = require('@react-native-firebase/messaging').default;

    // Check if messaging is available
    if (!messaging) {
      console.log('Firebase messaging not available');
      return;
    }

    // Request permission for notifications
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);

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

      // Set up message handlers
      setupMessageHandlers(messaging);

      // Set up token refresh listener
      setupTokenRefreshListener(messaging);

    } else {
      console.log('❌ Push notification permission not granted');
    }
  } catch (error) {
    console.error('❌ Error initializing Firebase messaging:', error);
  }
};

// Setup message handlers for different app states
const setupMessageHandlers = (messaging) => {
  // Handle background messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // Handle foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

    // Handle chat messages specially
    if (remoteMessage.data && remoteMessage.data.type === 'private_message') {
      handleChatMessage(remoteMessage);
    } else {
      // Handle other types of notifications
      console.log('Other notification type received');
    }
  });

  // Handle notification opened app from background state
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );

    // Handle chat message navigation
    if (remoteMessage.data && remoteMessage.data.type === 'private_message') {
      handleNotificationNavigation(remoteMessage);
    }
  });

  // Handle notification opened app from quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );

        // Handle chat message navigation
        if (remoteMessage.data && remoteMessage.data.type === 'private_message') {
          handleNotificationNavigation(remoteMessage);
        }
      }
    });
};

// Handle chat messages received via FCM
const handleChatMessage = async (remoteMessage) => {
  try {
    const { data, notification, sentTime } = remoteMessage;
    const { senderId, recipientId, type } = data;

    console.log('💬 Chat message received:', {
      senderId,
      recipientId,
      type,
      body: notification.body,
      title: notification.title,
    });

    // Try to get chat context service (will be available if app is running)
    try {
      const { chatContextService } = require('./src/services/chatContextService');

      // Check if user is currently chatting with the sender
      if (chatContextService.isChattingWith(senderId)) {
        console.log('✅ User is currently chatting with sender, adding message to chat');

        // Create message object in the format expected by chat screen
        const messageDate = new Date(sentTime);
        const timestamp = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newMessage = {
          id: `fcm-${remoteMessage.messageId}-${Date.now()}`, // Ensure unique ID
          text: notification.body, // UI expects 'text' field
          timestamp: timestamp, // Formatted timestamp
          senderId: parseInt(senderId),
          receiverId: parseInt(recipientId),
          message: notification.body, // Keep original for compatibility
          createdAt: new Date(sentTime).toISOString(),
          isMe: false, // This is a message from someone else
          status: 'delivered'
        };

        // Try multiple approaches to ensure message delivery
        let messageAdded = false;

        // Try original chat context service
        try {
          messageAdded = chatContextService.addMessageToCurrentChat(senderId, newMessage);
          console.log('📞 Original service result:', messageAdded);
        } catch (error) {
          console.log('Original service error:', error.message);
        }

        // Try new realtime service as backup
        try {
          const { realtimeChatService } = require('./src/services/realtimeChatService');
          const realtimeResult = realtimeChatService.handleIncomingMessage(senderId, newMessage);
          console.log('📱 Realtime service result:', realtimeResult);
          messageAdded = messageAdded || realtimeResult;
        } catch (error) {
          console.log('Realtime service error:', error.message);
        }

        if (messageAdded) {
          console.log('💬 Message successfully added to current chat');
          return; // Don't show notification if message was added to chat
        }
      }
    } catch (error) {
      console.log('Chat context service not available:', error.message);
    }

    // If user is not in the chat or chat context is not available,
    // you could show a local notification or update unread count
    console.log('📱 User not in current chat, could show notification');

  } catch (error) {
    console.error('❌ Error handling chat message:', error);
  }
};

// Handle navigation when notification is tapped
const handleNotificationNavigation = async (remoteMessage) => {
  try {
    const { data } = remoteMessage;
    const { senderId, type } = data;

    if (type === 'private_message') {
      console.log('🔗 Navigating to chat with user:', senderId);

      // Store navigation intent for when app is ready
      await AsyncStorage.setItem('pendingChatNavigation', JSON.stringify({
        userId: senderId,
        timestamp: Date.now()
      }));
    }
  } catch (error) {
    console.error('❌ Error handling notification navigation:', error);
  }
};

// Setup token refresh listener
const setupTokenRefreshListener = (messaging) => {
  messaging().onTokenRefresh(async fcmToken => {
    console.log('🔄 FCM Token refreshed:', fcmToken);

    // Store the new token
    await AsyncStorage.setItem('fcm_token', fcmToken);
    await AsyncStorage.setItem('current_fcm_token', fcmToken);

    console.log('💾 New FCM Token stored in local storage');

    // You might want to send this new token to your server
    // sendTokenToServer(fcmToken);
  });
};

// Initialize Firebase messaging
initializeFirebaseMessaging();

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
