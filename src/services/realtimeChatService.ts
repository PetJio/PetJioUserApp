interface RealtimeMessage {
  id: string;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
  status: {
    id: number;
    status: string;
  };
}

type MessageHandler = (message: RealtimeMessage) => void;

class RealtimeChatService {
  private currentChatUserId: string | null = null;
  private currentUserId: string | null = null;
  private messageHandler: MessageHandler | null = null;

  // Set the current chat context
  setCurrentChat(otherUserId: string, handler: MessageHandler, currentUserId?: string) {
    console.log('🔗 Setting realtime chat context for conversation with user:', otherUserId);
    this.currentChatUserId = otherUserId;
    this.currentUserId = currentUserId || null;
    this.messageHandler = handler;
  }

  // Update current user ID
  setCurrentUserId(currentUserId: string) {
    this.currentUserId = currentUserId;
    console.log('👤 Set current user ID:', currentUserId);
  }

  // Clear the current chat context
  clearCurrentChat() {
    console.log('🔗 Clearing realtime chat context');
    this.currentChatUserId = null;
    this.currentUserId = null;
    this.messageHandler = null;
  }

  // Handle incoming FCM message
  handleIncomingMessage(senderId: string, message: RealtimeMessage): boolean {
    console.log('📥 Handling incoming message from:', senderId);
    console.log('📊 Current chat context:', {
      currentChatUserId: this.currentChatUserId,
      currentUserId: this.currentUserId,
      hasHandler: !!this.messageHandler,
      isFromChatUser: this.currentChatUserId === senderId
    });

    // Message is relevant if it's from the user we're currently chatting with
    const isRelevantMessage = this.currentChatUserId === senderId;

    if (isRelevantMessage && this.messageHandler) {
      console.log('✅ Adding message to active chat - message from chat partner');
      try {
        this.messageHandler(message);
        return true;
      } catch (error) {
        console.error('❌ Error calling message handler:', error);
        return false;
      }
    } else {
      console.log('❌ Message not for current active chat - senderId does not match chat partner');
      return false;
    }
  }

  // Get current chat user ID
  getCurrentChatUserId(): string | null {
    return this.currentChatUserId;
  }
}

export const realtimeChatService = new RealtimeChatService();
export default realtimeChatService;