import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { API_CONFIG, API_ENDPOINTS, buildApiUrl } from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants';

// Chat conversation interfaces
interface ConversationUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface LastMessage {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  statusId: number;
  status: {
    id: number;
    status: string;
  };
  createdAt: string;
}

interface Conversation {
  conversationWith: ConversationUser;
  lastMessage: LastMessage;
  unreadCount: number;
}

// API Response for conversations
interface ConversationApiResponse {
  statusCode: number;
  message: string;
  body: Conversation[];
}

// User data interface
interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// For navigation compatibility
interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  role?: string;
}

type ChatStackParamList = {
  ChatList: undefined;
  Chat: { user: ChatUser };
};

type NavigationProp = NativeStackNavigationProp<ChatStackParamList, 'ChatList'>;

const ChatList: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, []);

  // Debug function to check all AsyncStorage keys
  const debugAsyncStorage = async () => {
    try {
      console.log('🔍 Debugging AsyncStorage contents...');
      const allKeys = await AsyncStorage.getAllKeys();
      console.log('📋 All AsyncStorage keys:', allKeys);

      for (const key of allKeys) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value && (key.toLowerCase().includes('user') || key.toLowerCase().includes('token'))) {
            console.log(`🔑 ${key}:`, value.substring(0, 100) + '...');
          }
        } catch (e) {
          console.log(`❌ Error reading key ${key}:`, e);
        }
      }
    } catch (error) {
      console.error('❌ Error debugging AsyncStorage:', error);
    }
  };

  // Function to get auth token
  const getAuthToken = async () => {
    try {
      console.log('🔍 Getting auth token from storage...');

      // Try the correct storage key first
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (token) {
        console.log('✅ Found auth token in correct storage key');
        try {
          return JSON.parse(token);
        } catch {
          return token;
        }
      }

      // Fallback: try alternative token keys
      const possibleTokenKeys = ['token', 'authToken', 'access_token', 'loginToken', 'bearerToken'];
      for (const key of possibleTokenKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          console.log(`🔍 Found auth token in alternative key: ${key}`);
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
      }

      console.error('❌ No auth token found in any storage key');
    } catch (error) {
      console.error('❌ Error getting auth token:', error);
    }
    return null;
  };

  // Function to get current user data
  const getCurrentUser = async (): Promise<CurrentUser | null> => {
    try {
      console.log('🔍 Getting current user data from storage...');

      // Try the correct storage key first
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      console.log('📄 Raw user data from storage:', userData ? 'Present' : 'Missing');

      if (userData) {
        const user = JSON.parse(userData);
        console.log('✅ Parsed user data:', {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });

        if (user.id && user.firstName && user.lastName) {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          };
        } else {
          console.error('❌ User data is missing required fields');
        }
      }

      // Fallback: try alternative storage keys
      const alternativeKeys = ['userData', 'user', 'currentUser', 'loginUser'];
      for (const key of alternativeKeys) {
        try {
          const altData = await AsyncStorage.getItem(key);
          if (altData) {
            console.log(`🔍 Found user data in alternative key: ${key}`);
            const user = JSON.parse(altData);
            if (user.id && user.firstName) {
              return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName || '',
                email: user.email || ''
              };
            }
          }
        } catch (e) {
          // Continue to next key
        }
      }

      console.error('❌ No valid user data found in any storage key');
    } catch (error) {
      console.error('❌ Error getting current user:', error);
    }
    return null;
  };

  // Function to convert conversations to ChatUser format
  const convertConversationsToUsers = (conversations: Conversation[]): ChatUser[] => {
    return conversations.map(conversation => {
      const user = conversation.conversationWith;
      const lastMsg = conversation.lastMessage;

      // Format timestamp
      const messageDate = new Date(lastMsg.createdAt);
      const now = new Date();
      const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

      let timestamp = '';
      if (diffInHours < 1) {
        timestamp = 'Just now';
      } else if (diffInHours < 24) {
        timestamp = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffInHours < 168) { // Less than a week
        const days = Math.floor(diffInHours / 24);
        timestamp = `${days}d ago`;
      } else {
        timestamp = messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }

      return {
        id: user.id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=58B9D0&color=fff`,
        isOnline: Math.random() > 0.5, // Random online status for demo
        lastMessage: lastMsg.message,
        timestamp,
        unreadCount: conversation.unreadCount,
        role: 'user'
      };
    });
  };

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      // Debug AsyncStorage contents
      await debugAsyncStorage();

      // Get authentication token
      const token = await getAuthToken();
      if (!token) {
        setError('Authentication token not found. Please login again.');
        return;
      }

      // Get current user data
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        setError('User data not found. Please login again.');
        return;
      }

      // Build API URL with user ID
      const apiUrl = buildApiUrl(API_ENDPOINTS.CHAT.GET_ALL_MESSAGES, { userId: currentUser.id.toString() });
      const fullUrl = `${apiUrl}?page=1&limit=10`;

      console.log('🌐 Fetching conversations from:', fullUrl);
      console.log('👤 Current user ID:', currentUser.id);

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Chat API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Chat API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('📄 Chat Raw Response length:', responseText.length);

      let result: ConversationApiResponse;
      try {
        result = JSON.parse(responseText);
        console.log('✅ Chat Parsed Response:', {
          statusCode: result.statusCode,
          message: result.message,
          conversationCount: result.body ? result.body.length : 0,
        });
      } catch (parseError) {
        console.error('❌ Chat JSON Parse Error:', parseError);
        throw new Error(`Invalid JSON response`);
      }

      if (result.statusCode === 200) {
        const conversations = result.body || [];
        const chatUsers = convertConversationsToUsers(conversations);

        console.log('✅ Chat Success - Data loaded:', chatUsers.length, 'conversations');
        setUsers(chatUsers);

        if (chatUsers.length === 0) {
          setError('No conversations found. Start chatting with someone!');
        }
      } else {
        console.error('❌ Chat API returned non-200 status:', result.statusCode);
        throw new Error(result.message || 'Failed to fetch conversations');
      }
    } catch (error) {
      console.error('🔥 Critical Error in loadUsers:', error);
      setError(`Failed to load conversations: ${error.message}`);
    } finally {
      console.log('🏁 loadUsers completed');
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToChat = (user: ChatUser) => {
    navigation.navigate('Chat', { user });
  };

  const renderChatItem = ({ item }: { item: ChatUser }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigateToChat(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {item.unreadCount > 99 ? '99+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      
      {/* Header - Matching Service Page Style */}
      <View style={styles.serviceStyleHeader}>
        <View style={styles.serviceHeaderContainer}>
          <TouchableOpacity style={styles.serviceHeaderLeft}>
            <Text style={styles.serviceHeaderTitle}>Chats</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          theme={{
            roundness: 16,
            colors: { primary: '#58B9D0', outline: '#E8E8E8' },
          }}
          style={styles.textInput}
          contentStyle={styles.inputContent}
          outlineStyle={styles.inputOutline}
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialIcons name="search" size={20} color="#666" />
              )}
            />
          }
        />
      </View>

      {/* Chat List */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#58B9D0" />
          <Text style={styles.loadingText}>Loading conversations...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color="#E74C3C" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadUsers}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.chatList,
            filteredUsers.length === 0 && styles.emptyList
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#58B9D0']}
              tintColor="#58B9D0"
            />
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="chat-bubble-outline" size={64} color="#CCCCCC" />
                <Text style={styles.emptyTitle}>No conversations found</Text>
                <Text style={styles.emptySubtitle}>
                  {searchQuery ? 'Try adjusting your search' : 'Start a conversation with someone!'}
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default ChatList;
