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
import { API_CONFIG } from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update interface to match API response
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  address: string;
  businessName?: string;
  userRoles: {
    userId: number;
    roleId: number;
    role: {
      id: number;
      value: string;
    };
  }[];
  fcmToken?: string;
  isActive: number;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  body: User[];
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

  // Function to get auth token
  const getAuthToken = async () => {
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
  };

  // Function to convert API users to ChatUser format
  const convertToCompatibleUsers = (apiUsers: User[]): ChatUser[] => {
    return apiUsers.map(user => ({
      id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=58B9D0&color=fff`,
      isOnline: Math.random() > 0.5, // Random online status for demo
      lastMessage: user.userRoles[0]?.role?.value === 'boarding'
        ? 'Available for boarding services'
        : user.userRoles[0]?.role?.value === 'veterinary'
        ? 'Veterinary services available'
        : 'Hello! How can I help you?',
      timestamp: 'Recently',
      unreadCount: Math.floor(Math.random() * 3), // Random unread count for demo
      role: user.userRoles[0]?.role?.value || 'user'
    }));
  };

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await getAuthToken();
      if (!token) {
        setError('Authentication token not found. Please login again.');
        return;
      }

      const apiUrl = 'http://13.204.155.197/api/user/get-all-users';
      console.log('🌐 Fetching users from:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Users API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Users API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('📄 Users Raw Response length:', responseText.length);

      let result: ApiResponse;
      try {
        result = JSON.parse(responseText);
        console.log('✅ Users Parsed Response:', {
          statusCode: result.statusCode,
          message: result.message,
          userCount: result.body ? result.body.length : 0,
        });
      } catch (parseError) {
        console.error('❌ Users JSON Parse Error:', parseError);
        throw new Error(`Invalid JSON response`);
      }

      if (result.statusCode === 200) {
        const apiUsers = result.body || [];
        // Filter out inactive users and convert to ChatUser format
        const activeUsers = apiUsers.filter(user => user.isActive === 1);
        const chatUsers = convertToCompatibleUsers(activeUsers);

        console.log('✅ Users Success - Data loaded:', chatUsers.length, 'active users');
        setUsers(chatUsers);

        if (chatUsers.length === 0) {
          setError('No active users found');
        }
      } else {
        console.error('❌ Users API returned non-200 status:', result.statusCode);
        throw new Error(result.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('🔥 Critical Error in loadUsers:', error);
      setError(`Failed to load users: ${error.message}`);
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
          placeholder="Search users..."
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
          <Text style={styles.loadingText}>Loading users...</Text>
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
                <Text style={styles.emptyTitle}>No users found</Text>
                <Text style={styles.emptySubtitle}>
                  {searchQuery ? 'Try adjusting your search' : 'Pull down to refresh'}
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
