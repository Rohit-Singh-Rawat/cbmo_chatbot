import { create } from "zustand";
import { nanoid } from "nanoid";

export interface Message {
	id: string;
	tempId?: string; // For optimistic updates
	content: string;
	isUser?: boolean;
	threadId?: string;
	parentMessageId?: string;
	isOptimistic?: boolean; // Flag for temporary messages
	isStreaming?: boolean;
	createdAt?: Date;
	error?: string;
}

interface MessageState {
	messages: Message[];
	streamingMessage: Message | null;
	isLoading: boolean;
	error: string | null;

	// Optimistic updates with temp IDs
	addOptimisticMessage: (content: string, isUser?: boolean) => string;
	updateMessageWithRealId: (
		tempId: string,
		realId: string,
		updates?: Partial<Message>,
	) => void;

	// Standard message operations
	addMessage: (message: Message) => void;
	updateMessage: (id: string, updates: Partial<Message>) => void;
	removeMessage: (id: string) => void;
	setStreamingMessage: (message: Message | null) => void;
	clearMessages: () => void;
	setError: (error: string | null) => void;
	setLoading: (loading: boolean) => void;
}

export const useMessageStore = create<MessageState>()((set, get) => ({
	messages: [],
	streamingMessage: null,
	isLoading: false,
	error: null,

	addOptimisticMessage: (content: string, isUser = true) => {
		const tempId = nanoid();
		const optimisticMessage: Message = {
			id: tempId,
			tempId,
			content,
			isUser,
			isOptimistic: true,
			createdAt: new Date(),
		};

		set((state) => ({
			messages: [...state.messages, optimisticMessage],
		}));

		return tempId;
	},

	updateMessageWithRealId: (tempId: string, realId: string, updates = {}) => {
		set((state) => ({
			messages: state.messages.map((msg) =>
				msg.tempId === tempId
					? {
							...msg,
							id: realId,
							tempId: undefined,
							isOptimistic: false,
							...updates,
						}
					: msg,
			),
		}));
	},

	addMessage: (message: Message) => {
		set((state) => ({
			messages: [...state.messages, message],
		}));
	},

	updateMessage: (id: string, updates: Partial<Message>) => {
		set((state) => ({
			messages: state.messages.map((msg) =>
				msg.id === id || msg.tempId === id ? { ...msg, ...updates } : msg,
			),
		}));
	},

	removeMessage: (id: string) => {
		set((state) => ({
			messages: state.messages.filter(
				(msg) => msg.id !== id && msg.tempId !== id,
			),
		}));
	},

	setStreamingMessage: (message: Message | null) => {
		set({ streamingMessage: message });
	},

	clearMessages: () => {
		set({ messages: [], streamingMessage: null, error: null });
	},

	setError: (error: string | null) => {
		set({ error });
	},

	setLoading: (loading: boolean) => {
		set({ isLoading: loading });
	},
}));
