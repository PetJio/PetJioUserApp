import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatList from '../screens/Chat/ChatList';
import Chat from '../screens/Chat/Chat';

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: { user: any };
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="ChatList" 
        component={ChatList}
        options={{
          title: 'Chats',
        }}
      />
      <Stack.Screen 
        name="Chat" 
        component={Chat}
        options={{
          title: 'Chat',
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
