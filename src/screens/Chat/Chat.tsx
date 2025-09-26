import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import chatStyles from './chatStyles';
import { chatService, ChatUser } from '../../services/chatService';
import { API_CONFIG, API_ENDPOINTS, buildApiUrl } from '../../config/api';
import { STORAGE_KEYS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MessageStatus {
  id: number;
  status: string;
}

interface ApiMessage {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  statusId: number;
  status: MessageStatus;
  createdAt: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  body: {
    data: ApiMessage[];
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'viewed';
  createdAt?: string;
}

type ChatStackParamList = {
  ChatList: undefined;
  Chat: { user: ChatUser };
};

type ChatRouteProp = RouteProp<ChatStackParamList, 'Chat'>;
type NavigationProp = NativeStackNavigationProp<ChatStackParamList, 'Chat'>;

const Chat: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChatRouteProp>();
  const { user } = route.params;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      loadMessages();
    }
  }, [currentUserId]);

  // Get current user ID
  const loadCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUserId(user.id);
        console.log('👤 Current user ID:', user.id);
      }
    } catch (error) {
      console.error('❌ Error loading current user:', error);
    }
  };

  // Get auth token
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (token) {
        try {
          return JSON.parse(token);
        } catch {
          return token;
        }
      }
    } catch (error) {
      console.error('❌ Error getting auth token:', error);
    }
    return null;
  };

  // Convert API messages to UI format
  const convertApiMessagesToUI = (apiMessages: ApiMessage[], myUserId: number): Message[] => {
    return apiMessages.map(apiMsg => {
      const messageDate = new Date(apiMsg.createdAt);
      const timestamp = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return {
        id: apiMsg.id.toString(),
        text: apiMsg.message,
        timestamp,
        isMe: apiMsg.senderId === myUserId,
        status: apiMsg.status.status as 'sent' | 'delivered' | 'viewed',
        createdAt: apiMsg.createdAt,
      };
    }).reverse(); // Reverse to show oldest first
  };

  // Load messages from API
  const loadMessages = async (pageNum: number = 1, append: boolean = false, isRefresh: boolean = false) => {
    if (!currentUserId) return;

    try {
      if (pageNum === 1 && !append) {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setInitialLoading(true);
        }
      } else {
        setLoading(true);
      }

      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Authentication required. Please login again.');
        return;
      }

      const apiUrl = buildApiUrl(API_ENDPOINTS.CHAT.GET_CONVERSATION_MESSAGES, {
        myId: currentUserId.toString(),
        userId: user.id
      });
      const fullUrl = `${apiUrl}?page=${pageNum}&limit=20`;

      console.log('🌐 Loading messages from:', fullUrl);

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      console.log('📨 Messages API Response:', {
        statusCode: result.statusCode,
        messageCount: result.body?.data?.length || 0,
        hasMore: result.body?.hasMore || false
      });

      if (result.statusCode === 200 && result.body) {
        const uiMessages = convertApiMessagesToUI(result.body.data, currentUserId);

        if (append) {
          setMessages(prev => [...prev, ...uiMessages]);
        } else {
          setMessages(uiMessages);
          // Scroll to bottom after initial load
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }

        setHasMore(result.body.hasMore);
        setPage(result.body.page);
      }
    } catch (error) {
      console.error('❌ Error loading messages:', error);
      Alert.alert('Error', 'Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
      setInitialLoading(false);
      setRefreshing(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !currentUserId) return;

    const messageText = message.trim();
    const tempId = `temp_${Date.now()}`;
    const newMessage: Message = {
      id: tempId,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent',
    };

    // Add message optimistically
    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const apiUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CHAT.SEND_MESSAGE}`;
      console.log('📤 Sending message to:', apiUrl);

      const requestBody = {
        recipientId: parseInt(user.id),
        message: messageText,
        title: 'Chat Message'
      };

      console.log('📤 Message payload:', requestBody);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📤 Send message response status:', response.status);

      const result = await response.json();

      // Handle the case where API returns 500 but we still get a JSON response
      if (!response.ok && response.status === 500) {
        // Check if it's the "recipient not found" error
        if (result.error?.detail?.includes('Recipient not found') ||
            result.message?.includes('Failed to send notification')) {
          console.log('⚠️ Treating as successful send despite notification failure');
          // Continue processing as if successful
        } else {
          const errorText = JSON.stringify(result);
          console.error('❌ Send message API error:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (!response.ok) {
        const errorText = JSON.stringify(result);
        console.error('❌ Send message API error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('✅ Send message API response:', result);

      // Check if the message was successfully processed (even if notification failed)
      const isSuccessfulSend = (
        result.statusCode === 200 ||
        result.statusCode === 201 ||
        (response.status === 500 && (
          result.error?.detail?.includes('Recipient not found') ||
          result.message?.includes('Failed to send notification')
        ))
      );

      if (isSuccessfulSend) {
        // Update message status to delivered
        setMessages(prev => prev.map(msg =>
          msg.id === tempId
            ? {
                ...msg,
                id: result.body?.id?.toString() || tempId,
                status: 'delivered',
                createdAt: result.body?.createdAt || new Date().toISOString()
              }
            : msg
        ));

        if (response.status === 500) {
          console.log('⚠️ Message sent but notification failed (recipient not found)');
        } else {
          console.log('✅ Message sent successfully');
        }
      } else {
        throw new Error(result.message || 'Failed to send message');
      }

    } catch (error) {
      console.error('❌ Error sending message:', error);

      // Update message status to show error
      setMessages(prev => prev.map(msg =>
        msg.id === tempId
          ? {
              ...msg,
              status: 'sent',
              text: `${messageText} ❌`
            }
          : msg
      ));

      Alert.alert(
        'Message Failed',
        `Failed to send message: ${error.message}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              // Remove failed message
              setMessages(prev => prev.filter(msg => msg.id !== tempId));
            }
          },
          {
            text: 'Retry',
            onPress: () => {
              // Remove failed message and retry
              setMessages(prev => prev.filter(msg => msg.id !== tempId));
              setMessage(messageText);
              setTimeout(() => sendMessage(), 100);
            }
          }
        ]
      );
    }
  };

  // Load more messages (pagination)
  const loadMoreMessages = () => {
    if (!loading && hasMore) {
      loadMessages(page + 1, true);
    }
  };

  // Refresh messages
  const refreshMessages = () => {
    setPage(1);
    setHasMore(true);
    loadMessages(1, false, true);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      chatStyles.messageContainer,
      item.isMe ? chatStyles.myMessage : chatStyles.theirMessage
    ]}>
      <View style={[
        chatStyles.messageBubble,
        item.isMe ? chatStyles.myMessageBubble : chatStyles.theirMessageBubble
      ]}>
        <Text style={[
          chatStyles.messageText,
          item.isMe ? chatStyles.myMessageText : chatStyles.theirMessageText
        ]}>
          {item.text}
        </Text>
      </View>
      
      <View style={[
        chatStyles.messageInfo,
        item.isMe ? chatStyles.myMessageInfo : chatStyles.theirMessageInfo
      ]}>
        <Text style={chatStyles.timestamp}>{item.timestamp}</Text>
        {item.isMe && item.status && (
          <View style={{ marginLeft: 6, flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons
              name={
                item.status === 'sent' ? 'done' :
                item.status === 'delivered' ? 'done-all' :
                item.status === 'viewed' ? 'done-all' : 'done'
              }
              size={14}
              color={
                item.status === 'viewed' ? '#58B9D0' :
                item.status === 'delivered' ? '#9CA3AF' : '#B0BEC5'
              }
            />
            {item.status === 'viewed' && (
              <MaterialIcons
                name="done-all"
                size={14}
                color="#58B9D0"
                style={{ marginLeft: -12 }}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={chatStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={chatStyles.serviceStyleHeader}>
        <View style={chatStyles.serviceHeaderContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={chatStyles.serviceHeaderLeft}
          >
            <MaterialIcons name="arrow-back-ios" size={20} color="#000000" />
          </TouchableOpacity>

          <View style={chatStyles.headerUserInfo}>
            <Image
              source={{ uri: user.avatar }}
              style={chatStyles.headerAvatar}
            />
            <View style={chatStyles.headerTextInfo}>
              <Text style={chatStyles.headerUserName}>{user.name}</Text>
              <Text style={chatStyles.headerUserStatus}>
                {user.isOnline ? 'Online' : 'Last seen recently'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={chatStyles.headerAction}>
            <MaterialIcons name="more-vert" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={chatStyles.messagesList}
        contentContainerStyle={chatStyles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && messages.length > 0 && !refreshing ? (
            <View style={{ padding: 16, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#58B9D0" />
              <Text style={{ color: '#9CA3AF', marginTop: 8, fontSize: 12 }}>Loading more messages...</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          !initialLoading && !refreshing && messages.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
              <MaterialIcons name="chat-bubble-outline" size={64} color="#CCCCCC" />
              <Text style={{ color: '#9CA3AF', marginTop: 16, textAlign: 'center', fontSize: 16 }}>
                No messages yet{'\n'}Start a conversation!
              </Text>
            </View>
          ) : initialLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
              <ActivityIndicator size="large" color="#58B9D0" />
              <Text style={{ color: '#9CA3AF', marginTop: 16 }}>Loading messages...</Text>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshMessages}
            colors={['#58B9D0']}
            tintColor="#58B9D0"
          />
        }
      />

      {/* Input */}
      <View style={chatStyles.inputContainer}>
        <View style={chatStyles.inputWrapper}>
          <TouchableOpacity style={chatStyles.attachButton}>
            <MaterialIcons name="attach-file" size={22} color="#6B7280" />
          </TouchableOpacity>
          
          <TextInput
            style={chatStyles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={1000}
          />
          
          <TouchableOpacity 
            style={[
              chatStyles.sendButton,
              message.trim() ? chatStyles.sendButtonActive : {}
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <MaterialIcons 
              name="send" 
              size={20} 
              color={message.trim() ? '#FFFFFF' : '#9CA3AF'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
