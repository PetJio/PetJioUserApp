import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icons from '../../../assets/icons';
import images from '../../../assets/images';
import styles from './chatlist.styles';

// Define your navigation stack's param list
type RootStackParamList = {
  Chat: { chatData: ChatItem };
  Main: undefined;
};

// Define the navigation prop type
type ChatListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chat'
>;

// Define props interface for the component
interface ChatListProps {
  navigation: ChatListScreenNavigationProp;
}

// Define chat item interface
interface ChatItem {
  id: string;
  name: string;
  avatar: any;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount?: number;
  isProfessional?: boolean;
  profession?: string;
}

const ChatList: React.FC<ChatListProps> = ({ navigation }) => {
  // Mock data for chat list
  const [chatData, setChatData] = useState<ChatItem[]>([
    {
      id: '1',
      name: 'Dr. Samar Halder',
      avatar: images.doctorImage,
      lastMessage: 'Can you send me a picture, so I can determine what kind of rashes.',
      timestamp: '2m ago',
      isOnline: true,
      unreadCount: 2,
      isProfessional: true,
      profession: 'Veterinarian',
    },
    {
      id: '2',
      name: 'Sarah Connor',
      avatar: images.patientImage,
      lastMessage: 'Thank you for the grooming service! My dog looks amazing.',
      timestamp: '1h ago',
      isOnline: false,
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Dr. Michael Torres',
      avatar: images.doctorImage,
      lastMessage: 'The vaccination schedule has been updated.',
      timestamp: '3h ago',
      isOnline: true,
      unreadCount: 1,
      isProfessional: true,
      profession: 'Veterinarian',
    },
    {
      id: '4',
      name: 'Pet Walker John',
      avatar: images.patientImage,
      lastMessage: 'Your dog had a great walk today! See you tomorrow.',
      timestamp: '1d ago',
      isOnline: false,
      unreadCount: 0,
      isProfessional: true,
      profession: 'Pet Walker',
    },
    {
      id: '5',
      name: 'Emma Watson',
      avatar: images.patientImage,
      lastMessage: 'Hi! I saw your post about pet adoption.',
      timestamp: '2d ago',
      isOnline: false,
      unreadCount: 0,
    },
  ]);

  const navigateToChat = (item: ChatItem) => {
    navigation.navigate('Chat', { chatData: item });
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigateToChat(item)}
    >
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            {item.isProfessional && (
              <View style={styles.professionalBadge}>
                <Text style={styles.professionText}>{item.profession}</Text>
              </View>
            )}
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.lastMessage} numberOfLines={2}>
            {item.lastMessage}
          </Text>
          {item.unreadCount && item.unreadCount > 0 && (
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
    <LinearGradient
      colors={['#ECEEF2', '#D0D4D7']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chats</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Image source={Icons.BiSearch} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {/* Chat List */}
        <FlatList
          data={chatData}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChatList;
