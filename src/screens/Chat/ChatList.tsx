import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
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

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

type ChatStackParamList = {
  ChatList: undefined;
  Chat: { user: ChatUser };
};

type NavigationProp = NativeStackNavigationProp<ChatStackParamList, 'ChatList'>;

const ChatList: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Mock data for chat users
  const chatUsers: ChatUser[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Your pet\'s vaccination is due next week',
      timestamp: '2m ago',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Pet Groomer Jake',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for booking the grooming session!',
      timestamp: '1h ago',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      name: 'Walker Emma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I\'ll be there at 3 PM for the walk',
      timestamp: '3h ago',
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: '4',
      name: 'Trainer Mark',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Great progress in today\'s training session!',
      timestamp: '1d ago',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '5',
      name: 'Pet Sitter Anna',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Your pet is doing great during boarding',
      timestamp: '2d ago',
      unreadCount: 3,
      isOnline: true,
    },
  ];

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
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Chats</Text>
          <Text style={styles.headerSubtitle}>Chat with providers</Text>
        </View>
        <TouchableOpacity style={styles.newChatButton}>
          <MaterialIcons name="edit" size={20} color="#58B9D0" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder="Search chats..."
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
      <FlatList
        data={chatUsers}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ChatList;
