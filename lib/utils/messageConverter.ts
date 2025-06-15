import type { Chat } from "@/components/Chats";
import type { Message } from "@/store/message-store/messageStore";
import type { ChatMessage } from "@/store/chat-store/chatStore";

// Convert Message Store format to Components Chat format
export const messageToChat = (message: Message): Chat => ({
	id: message.id,
	content: message.content,
	isUser: message.isUser,
	isStreaming: message.isStreaming,
});

// Convert Chat Store format to Message Store format
export const chatMessageToMessage = (chatMessage: ChatMessage): Message => ({
	id: chatMessage.id,
	content: chatMessage.content,
	isUser: chatMessage.isUser,
	threadId: chatMessage.threadId,
	parentMessageId: chatMessage.parentMessageId,
	createdAt: chatMessage.createdAt,
});

// Convert Message Store format to Chat Store format
export const messageToChatMessage = (
	message: Message,
	threadId: string,
): ChatMessage => ({
	id: message.id,
	content: message.content,
	isUser: message.isUser ?? true,
	threadId,
	parentMessageId: message.parentMessageId,
	createdAt: message.createdAt ?? new Date(),
});

// Convert array of messages for components
export const messagesToChats = (messages: Message[]): Chat[] =>
	messages.map(messageToChat);
