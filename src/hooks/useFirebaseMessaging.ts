import { useEffect } from 'react';
import { Platform } from 'react-native';
import FirebaseMessagingService from '../services/firebaseMessagingService';

/**
 * Hook to manage Firebase messaging integration
 */
export const useFirebaseMessaging = () => {

  useEffect(() => {
    // Only initialize on native platforms
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // Add a small delay to ensure Firebase is fully initialized
      const timer = setTimeout(() => {
        FirebaseMessagingService.setupFirebaseMessaging();
      }, 500);

      // Cleanup timer
      return () => clearTimeout(timer);
    }

    // Cleanup is handled by Firebase messaging internally
    return () => {
      // No cleanup needed
    };
  }, []);

  /**
   * Initialize messaging after user login
   */
  const initializeAfterLogin = async () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      await FirebaseMessagingService.initializeMessaging();
    }
  };

  return {
    initializeAfterLogin,
  };
};

export default useFirebaseMessaging;