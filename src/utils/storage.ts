import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

class StorageService {
  // Generic storage methods
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data to storage:', error);
      throw error;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data from storage:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from storage:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // Login-specific methods
  async storeLoginResponse(loginResponse: any): Promise<void> {
    try {
      if (loginResponse.body) {
        await this.setUserToken(loginResponse.body.token);
        await this.setUserData(loginResponse.body.user);
        await this.setItem(STORAGE_KEYS.IS_LOGGED_IN, true);
        
        // Debug logging
        console.log('✅ Login response stored successfully');
        console.log('🔍 Stored token:', loginResponse.body.token ? 'Present' : 'Missing');
        console.log('🔍 Stored user data:', loginResponse.body.user ? loginResponse.body.user.firstName : 'Missing');
        console.log('🔍 Stored login flag:', true);
      } else {
        console.error('❌ No body in login response:', loginResponse);
      }
    } catch (error) {
      console.error('❌ Failed to store login response:', error);
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const isLoggedIn = await this.getItem<boolean>(STORAGE_KEYS.IS_LOGGED_IN);
      const token = await this.getUserToken();
      const userData = await this.getUserData();
      
      // Debug logging
      console.log('🔍 Login check - isLoggedIn flag:', isLoggedIn);
      console.log('🔍 Login check - token:', token ? 'Present' : 'Missing');
      console.log('🔍 Login check - userData:', userData ? userData.firstName : 'Missing');
      
      const result = isLoggedIn === true && token !== null && userData !== null;
      console.log('🔍 Final login status:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Failed to check login status:', error);
      return false;
    }
  }

  async getUserFullName(): Promise<string> {
    try {
      const userData = await this.getUserData();
      if (userData && userData.firstName && userData.lastName) {
        return `${userData.firstName} ${userData.lastName}`.trim();
      }
      return userData?.firstName || 'User';
    } catch (error) {
      console.error('❌ Failed to get user full name:', error);
      return 'User';
    }
  }

  async getUserFirstName(): Promise<string> {
    try {
      const userData = await this.getUserData();
      return userData?.firstName || 'User';
    } catch (error) {
      console.error('❌ Failed to get user first name:', error);
      return 'User';
    }
  }

  // Specific storage methods
  async setUserToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.USER_TOKEN, token);
  }

  async getUserToken(): Promise<string | null> {
    return await this.getItem<string>(STORAGE_KEYS.USER_TOKEN);
  }

  async removeUserToken(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.USER_TOKEN);
  }

  async setUserData(userData: any): Promise<void> {
    await this.setItem(STORAGE_KEYS.USER_DATA, userData);
  }

  async getUserData(): Promise<any> {
    return await this.getItem(STORAGE_KEYS.USER_DATA);
  }

  async removeUserData(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  async setAppPreferences(preferences: any): Promise<void> {
    await this.setItem(STORAGE_KEYS.APP_PREFERENCES, preferences);
  }

  async getAppPreferences(): Promise<any> {
    return await this.getItem(STORAGE_KEYS.APP_PREFERENCES);
  }

  async setBiometricEnabled(enabled: boolean): Promise<void> {
    await this.setItem(STORAGE_KEYS.BIOMETRIC_ENABLED, enabled);
  }

  async isBiometricEnabled(): Promise<boolean> {
    const enabled = await this.getItem<boolean>(STORAGE_KEYS.BIOMETRIC_ENABLED);
    return enabled ?? false;
  }

  // Logout user - clear all data
  async logout(): Promise<void> {
    try {
      await this.removeItem(STORAGE_KEYS.USER_TOKEN);
      await this.removeItem(STORAGE_KEYS.USER_DATA);
      await this.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
      console.log('✅ User logged out successfully');
    } catch (error) {
      console.error('❌ Failed to logout:', error);
      throw error;
    }
  }

  // Clear all user related data
  async clearUserData(): Promise<void> {
    const keysToRemove = [
      STORAGE_KEYS.USER_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.IS_LOGGED_IN,
    ];

    try {
      await Promise.all(keysToRemove.map(key => this.removeItem(key)));
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
export default storageService;
