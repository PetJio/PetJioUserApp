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

  // Clear all user related data
  async clearUserData(): Promise<void> {
    const keysToRemove = [
      STORAGE_KEYS.USER_TOKEN,
      STORAGE_KEYS.USER_DATA,
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
