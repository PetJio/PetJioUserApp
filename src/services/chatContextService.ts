interface ChatContext {
  isInChat: boolean;
  currentChatUserId: string | null;
  addMessageToChat?: (message: any) => void;
}

class ChatContextService {
  private context: ChatContext = {
    isInChat: false,
    currentChatUserId: null,
    addMessageToChat: undefined,
  };

  // Set the current chat context when entering a chat screen
  setCurrentChat(userId: string, addMessageCallback: (message: any) => void) {
    this.context = {
      isInChat: true,
      currentChatUserId: userId,
      addMessageToChat: addMessageCallback,
    };
    console.log('📱 Chat context set for user:', userId);
  }

  // Clear the chat context when leaving the chat screen
  clearCurrentChat() {
    console.log('📱 Chat context cleared');
    this.context = {
      isInChat: false,
      currentChatUserId: null,
      addMessageToChat: undefined,
    };
  }

  // Get current chat context
  getCurrentContext(): ChatContext {
    return this.context;
  }

  // Check if user is currently in chat with specific user (the sender of the message)
  isChattingWith(senderId: string): boolean {
    return this.context.isInChat && this.context.currentChatUserId === senderId;
  }

  // Add message to current chat if user is in the right chat
  addMessageToCurrentChat(senderId: string, message: any): boolean {
    console.log('🔍 Checking chat context:', {
      isInChat: this.context.isInChat,
      currentChatUserId: this.context.currentChatUserId,
      senderId: senderId,
      hasCallback: !!this.context.addMessageToChat
    });

    if (this.isChattingWith(senderId) && this.context.addMessageToChat) {
      console.log('💬 Adding real-time message to current chat');
      this.context.addMessageToChat(message);
      return true;
    } else {
      console.log('❌ Not adding message - conditions not met');
      return false;
    }
  }
}

export const chatContextService = new ChatContextService();
export default chatContextService;