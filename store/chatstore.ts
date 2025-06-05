import { create } from "zustand";
import type { Chat } from "@/components/Chats";

interface ChatState {
  messages: Chat[];
  tempMessages: Chat[];
  conversationId: string | null;
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Chat, isNewChat?: boolean) => Promise<void>;
  setConversationId: (id: string | null) => void;
  moveTempToMessages: () => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  messages: [],
  tempMessages: [],
  conversationId: null,
  isLoading: false,
  error: null,

  setConversationId: (id) => set({ conversationId: id }),

  moveTempToMessages: () => {
    set((state) => ({
      messages: [...state.tempMessages],
      tempMessages: []
    }));
  },

  addMessage: async (message, isNewChat = false) => {
    try {
      set({ isLoading: true, error: null });
      const { conversationId } = get();
      
      if (!isNewChat && !conversationId) {
        throw new Error("No conversation ID provided");
      }

      set((state) => ({
        messages: isNewChat ? state.messages : [...state.messages, message],
        tempMessages: isNewChat ? [...state.tempMessages, message] : state.tempMessages,
        isLoading: false
      }));
    } catch (error) {
      set({ error: "Failed to add message", isLoading: false });
    }
  }
}));
