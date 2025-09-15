import React, { useState, useRef } from 'react';
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

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your pet today?',
      timestamp: '10:30 AM',
      isMe: false,
      status: 'read',
    },
    {
      id: '2',
      text: 'Hi! I wanted to schedule a grooming session for my dog.',
      timestamp: '10:32 AM',
      isMe: true,
      status: 'read',
    },
    {
      id: '3',
      text: 'Of course! What breed is your dog and when would you like to schedule?',
      timestamp: '10:33 AM',
      isMe: false,
      status: 'read',
    },
    {
      id: '4',
      text: 'He\'s a Golden Retriever. How about this Saturday afternoon?',
      timestamp: '10:35 AM',
      isMe: true,
      status: 'delivered',
    },
    {
      id: '5',
      text: 'Perfect! Saturday afternoon works great. I have a slot available at 2 PM. Would that work for you?',
      timestamp: '10:36 AM',
      isMe: false,
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (message.trim()) {
      const messageText = message.trim();
      const newMessage: Message = {
        id: Date.now().toString(),
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
        // Send message via API
        const success = await chatService.sendMessage(user.id, messageText);
        
        if (success) {
          // Update message status to delivered
          setMessages(prev => prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'delivered' }
              : msg
          ));
        } else {
          // Handle send failure - show retry option
          setMessages(prev => prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'sent', text: `${msg.text} (Failed to send - tap to retry)` }
              : msg
          ));
        }
      } catch (error) {
        console.error('Error sending message:', error);
        Alert.alert(
          'Message Failed', 
          'Failed to send message. Please try again.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Retry', onPress: () => sendMessage() }
          ]
        );
      }
    }
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
          <MaterialIcons
            name={
              item.status === 'sent' ? 'done' :
              item.status === 'delivered' ? 'done-all' : 'done-all'
            }
            size={16}
            color={item.status === 'read' ? '#58B9D0' : '#9CA3AF'}
            style={{ marginLeft: 4 }}
          />
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
      <View style={chatStyles.header}>
        <TouchableOpacity 
          style={chatStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        
        <View style={chatStyles.userInfo}>
          <Image 
            source={{ 
              uri: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=58B9D0&color=fff`
            }} 
            style={chatStyles.headerAvatar} 
          />
          <View style={chatStyles.userDetails}>
            <Text style={chatStyles.headerUserName}>{user.name}</Text>
            <Text style={chatStyles.onlineStatus}>
              {user.isOnline ? 'Online' : 'Last seen recently'}
            </Text>
          </View>
        </View>
        
        <View style={chatStyles.headerActions}>
          <TouchableOpacity style={chatStyles.actionButton}>
            <MaterialIcons name="videocam" size={22} color="#58B9D0" />
          </TouchableOpacity>
          <TouchableOpacity style={chatStyles.actionButton}>
            <MaterialIcons name="call" size={20} color="#58B9D0" />
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
