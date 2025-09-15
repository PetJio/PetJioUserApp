import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api';

export interface ChatUser {
  id: string;
  firstName: string;
  lastName: string;
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  role?: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isOnline?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

class ChatService {
  private baseUrl = API_CONFIG.BASE_URL;

  /**
   * Get authentication token from storage
   */
  private async getAuthToken(): Promise<string | null> {
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
   * Fetch all users from API for chat list
   */
  async getAllUsers(): Promise<ChatUser[]> {
    try {
      const authToken = await this.getAuthToken();
      
      if (!authToken) {
        console.warn('No authentication token found for getAllUsers');
        return [];
      }

      const response = await fetch(`${this.baseUrl}/api/user/get-all-users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        // Transform API response to ChatUser format
        const users = Array.isArray(result) ? result : (result.users || result.data || []);
        return users.map(this.formatUserForChat);
      } else {
        console.error('Failed to fetch users:', result);
        return [];
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  /**
   * Format user data for chat interface
   */
  private formatUserForChat = (user: any): ChatUser => {
    return {
      id: user.id?.toString() || user._id?.toString() || Math.random().toString(),
      firstName: user.firstName || user.first_name || 'Unknown',
      lastName: user.lastName || user.last_name || 'User',
      name: user.name || `${user.firstName || user.first_name || 'Unknown'} ${user.lastName || user.last_name || 'User'}`,
      avatar: user.avatar || user.profileImage || user.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'U')}+${encodeURIComponent(user.lastName || 'U')}&background=58B9D0&color=fff`,
      email: user.email,
      phone: user.phone || user.phoneNumber,
      role: user.role || user.userType || 'user',
      lastMessage: 'Start a conversation...',
      timestamp: '',
      unreadCount: 0,
      isOnline: false,
    };
  };

  /**
   * Send message to another user
   */
  async sendMessage(receiverId: string, message: string): Promise<boolean> {
    try {
      const authToken = await this.getAuthToken();
      
      if (!authToken) {
        console.error('No authentication token found for sendMessage');
        return false;
      }

      const response = await fetch(`${this.baseUrl}/notifications/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          receiverId: receiverId,
          message: message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Message sent successfully:', result);
        return true;
      } else {
        console.error('Failed to send message:', result);
        return false;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }
}

export const chatService = new ChatService();