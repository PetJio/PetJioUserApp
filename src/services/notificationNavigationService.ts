import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../utils/navigationService';

interface PendingNavigation {
  userId: string;
  timestamp: number;
}

class NotificationNavigationService {
  // Check for pending navigation and handle it
  static async handlePendingNavigation(): Promise<void> {
    try {
      const pendingNav = await AsyncStorage.getItem('pendingChatNavigation');

      if (pendingNav) {
        const navigation: PendingNavigation = JSON.parse(pendingNav);

        // Check if navigation is still valid (not too old)
        const isRecent = Date.now() - navigation.timestamp < 30000; // 30 seconds

        if (isRecent) {
          console.log('🔗 Handling pending chat navigation to user:', navigation.userId);

          // Navigate to chat screen
          navigate('Chat', {
            user: {
              id: parseInt(navigation.userId),
              name: 'User', // You might want to fetch actual user name
            }
          });
        }

        // Clear the pending navigation
        await AsyncStorage.removeItem('pendingChatNavigation');
      }
    } catch (error) {
      console.error('❌ Error handling pending navigation:', error);
    }
  }

  // Navigate to chat with specific user
  static navigateToChat(userId: string, userName?: string): void {
    navigate('Chat', {
      user: {
        id: parseInt(userId),
        name: userName || 'User',
      }
    });
  }
}

export default NotificationNavigationService;