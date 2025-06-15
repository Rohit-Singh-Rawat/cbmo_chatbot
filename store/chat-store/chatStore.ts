import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Chat } from "@/components/Chats";

export interface ChatData {
	id: string;
	title: string;
	userId: string;
	messages: ChatMessage[];
	createdAt: Date;
	updatedAt: Date;
}

export interface ChatMessage {
	id: string;
	content: string;
	isUser?: boolean;
	threadId: string;
	parentMessageId?: string;
	createdAt: Date;
}

interface ChatState {
	// Chat data management
	chats: Map<string, ChatData>;
	activeThreadId: string | null;
	isLoading: boolean;
	error: string | null;

	// Chat operations
	loadChat: (threadId: string) => Promise<ChatData | null>;
	createChat: (title: string, firstMessage?: ChatMessage) => Promise<string>;
	updateChat: (threadId: string, updates: Partial<ChatData>) => void;
	addMessageToChat: (threadId: string, message: ChatMessage) => void;

	// State management
	setActiveThread: (threadId: string | null) => void;
	getChatMessages: (threadId: string) => ChatMessage[];
	setError: (error: string | null) => void;
	setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>()(
	subscribeWithSelector((set, get) => ({
		chats: new Map(),
		activeThreadId: null,
		isLoading: false,
		error: null,

		loadChat: async (threadId: string) => {
			const { chats } = get();

			// Return cached chat if available
			if (chats.has(threadId)) {
				return chats.get(threadId)!;
			}

			try {
				set({ isLoading: true, error: null });

				// Fetch from database
				const response = await fetch(`/api/chats/${threadId}`);
				if (!response.ok) {
					throw new Error("Failed to load chat");
				}

				const chatData = await response.json();
				const chat: ChatData = {
					...chatData,
					createdAt: new Date(chatData.createdAt),
					updatedAt: new Date(chatData.updatedAt),
					messages:
						chatData.messages?.map((msg: any) => ({
							...msg,
							createdAt: new Date(msg.createdAt),
						})) || [],
				};

				// Cache in local state
				set((state) => ({
					chats: new Map(state.chats).set(threadId, chat),
					isLoading: false,
				}));

				return chat;
			} catch (error) {
				set({ error: "Failed to load chat", isLoading: false });
				return null;
			}
		},

		createChat: async (title: string, firstMessage?: ChatMessage) => {
			try {
				set({ isLoading: true, error: null });

				const response = await fetch("/api/chats", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ title, firstMessage }),
				});

				if (!response.ok) {
					throw new Error("Failed to create chat");
				}

				const { threadId } = await response.json();

				// Create local cache entry
				const newChat: ChatData = {
					id: threadId,
					title,
					userId: "",
					messages: firstMessage ? [firstMessage] : [],
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				set((state) => ({
					chats: new Map(state.chats).set(threadId, newChat),
					activeThreadId: threadId,
					isLoading: false,
				}));

				return threadId;
			} catch (error) {
				set({ error: "Failed to create chat", isLoading: false });
				throw error;
			}
		},

		updateChat: (threadId: string, updates: Partial<ChatData>) => {
			set((state) => {
				const chats = new Map(state.chats);
				const existingChat = chats.get(threadId);

				if (existingChat) {
					chats.set(threadId, {
						...existingChat,
						...updates,
						updatedAt: new Date(),
					});
				}

				return { chats };
			});
		},

		addMessageToChat: (threadId: string, message: ChatMessage) => {
			set((state) => {
				const chats = new Map(state.chats);
				const chat = chats.get(threadId);

				if (chat) {
					const updatedChat = {
						...chat,
						messages: [...chat.messages, message],
						updatedAt: new Date(),
					};
					chats.set(threadId, updatedChat);
				}

				return { chats };
			});
		},

		setActiveThread: (threadId: string | null) => {
			set({ activeThreadId: threadId });
		},

		getChatMessages: (threadId: string) => {
			const { chats } = get();
			return chats.get(threadId)?.messages || [];
		},

		setError: (error: string | null) => {
			set({ error });
		},

		setLoading: (loading: boolean) => {
			set({ isLoading: loading });
		},
	})),
);
