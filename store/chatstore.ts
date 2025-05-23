import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chat } from '@/components/Chats';

interface ChatState {
	messages: Chat[];
	addMessage: (message: Chat) => void;
	clearMessages: () => void;
	removeMessage: (index: number) => void;
	updateMessage: (index: number, message: Chat) => void;
}

export const useChatStore = create<ChatState>()(
	persist(
		(set) => ({
			messages: [],
			addMessage: (message) =>
				set((state) => ({
					messages: [...state.messages, message],
				})),
			clearMessages: () =>
				set(() => ({
					messages: [],
				})),
			removeMessage: (index) =>
				set((state) => ({
					messages: state.messages.filter((_, i) => i !== index),
				})),
			updateMessage: (index, message) =>
				set((state) => ({
					messages: state.messages.map((m, i) => (i === index ? message : m)),
				})),
		}),
		{
			name: 'chat-storage',
		}
	)
);
