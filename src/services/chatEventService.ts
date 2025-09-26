interface ChatMessage {
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

type EventCallback = (message: ChatMessage) => void;

class ChatEventService {
  private listeners: Map<string, EventCallback[]> = new Map();

  // Emit a new message event
  emitNewMessage(senderId: string, message: ChatMessage) {
    console.log('📢 Emitting new message event for sender:', senderId);
    const eventKey = `newMessage-${senderId}`;
    const callbacks = this.listeners.get(eventKey) || [];

    callbacks.forEach(callback => {
      try {
        callback(message);
      } catch (error) {
        console.error('Error in message callback:', error);
      }
    });
  }

  // Listen for messages from a specific sender
  onNewMessage(senderId: string, callback: EventCallback) {
    console.log('👂 Listening for messages from sender:', senderId);
    const eventKey = `newMessage-${senderId}`;

    if (!this.listeners.has(eventKey)) {
      this.listeners.set(eventKey, []);
    }

    this.listeners.get(eventKey)!.push(callback);
  }

  // Stop listening for messages from a specific sender
  offNewMessage(senderId: string, callback: EventCallback) {
    console.log('🔇 Stopped listening for messages from sender:', senderId);
    const eventKey = `newMessage-${senderId}`;
    const callbacks = this.listeners.get(eventKey) || [];

    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }

    if (callbacks.length === 0) {
      this.listeners.delete(eventKey);
    }
  }

  // Clear all listeners
  clearAllListeners() {
    this.listeners.clear();
  }
}

export const chatEventService = new ChatEventService();
export default chatEventService;