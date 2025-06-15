import { useEffect, useCallback } from 'react';
import { useThread } from '@/store/currentThread/currentThreadProvider';
import { useChatStore } from '@/store/chat-store/chatStore';
import { useMessageStore } from '@/store/message-store/messageStore';
import {
	chatMessageToMessage,
	messageToChatMessage,
} from '@/lib/utils/messageConverter';
import { nanoid } from 'nanoid';

export const useChatIntegration = () => {
	const { currentThread, setThreadId } = useThread();
	const { loadChat, createChat, addMessageToChat } = useChatStore();
	const {
		messages,
		addOptimisticMessage,
		updateMessageWithRealId,
		clearMessages,
		setLoading,
		setError,
		updateMessage,
		removeMessage,
	} = useMessageStore();

	// Load messages when thread changes
	useEffect(() => {
		const loadThreadMessages = async () => {
			if (currentThread.threadId) {
				try {
					setLoading(true);
					const chat = await loadChat(currentThread.threadId);

					if (chat) {
						clearMessages();
						// Convert and add chat messages to message store
						chat.messages.forEach((chatMsg) => {
							const message = chatMessageToMessage(chatMsg);
							useMessageStore.getState().addMessage(message);
						});
					}
				} catch (error) {
					setError('Failed to load thread messages');
				} finally {
					setLoading(false);
				}
			} else {
				clearMessages();
			}
		};

		loadThreadMessages();
	}, [currentThread.threadId, loadChat, clearMessages, setLoading, setError]);

	// Send message with optimistic updates
	const sendMessage = useCallback(
		async (content: string) => {
			let userTempId = '';
			let assistantTempId = '';

			try {
				// Add optimistic user message
				userTempId = addOptimisticMessage(content, true);

				// Add optimistic assistant message for streaming
				assistantTempId = addOptimisticMessage('', false);
				updateMessage(assistantTempId, { isStreaming: true });

				let threadId = currentThread.threadId;

				// Create new thread if needed
				if (!threadId) {
					const userMessage = {
						id: nanoid(),
						content,
						isUser: true,
						threadId: '',
						createdAt: new Date(),
					};

					threadId = await createChat('New Chat', userMessage);
					setThreadId(threadId);

					// Update optimistic message with real thread ID
					updateMessageWithRealId(userTempId, userMessage.id, { threadId });
				}

				// Send to API
				const response = await fetch('/api/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						messages: [{ content, role: 'user' }],
						conversationId: threadId,
					}),
				});

				if (!response.ok) {
					throw new Error('Failed to send message');
				}

				const reader = response.body?.getReader();
				const decoder = new TextDecoder();
				let assistantContent = '';

				if (reader) {
					while (true) {
						const { done, value } = await reader.read();
						if (done) break;

						const chunk = decoder.decode(value);
						const lines = chunk.split('\n');

						for (const line of lines) {
							if (line.startsWith('data: ')) {
								try {
									const data = JSON.parse(line.slice(6));

									if (data.content) {
										assistantContent += data.content;
										updateMessage(assistantTempId, {
											content: assistantContent,
										});
									}

									if (data.messageId) {
										// Update with real ID when complete
										updateMessageWithRealId(assistantTempId, data.messageId, {
											isStreaming: false,
											threadId,
										});

										// Add to chat store
										const chatMessage = {
											id: data.messageId,
											content: assistantContent,
											isUser: false,
											threadId: threadId!,
											createdAt: new Date(),
										};
										addMessageToChat(threadId!, chatMessage);
									}
								} catch (e) {
									// Ignore JSON parse errors
								}
							}
						}
					}
				}
			} catch (error) {
				setError('Failed to send message');
				// Remove optimistic messages on error
				if (userTempId) removeMessage(userTempId);
				if (assistantTempId) removeMessage(assistantTempId);
			}
		},
		[
			currentThread,
			addOptimisticMessage,
			updateMessageWithRealId,
			createChat,
			setThreadId,
			addMessageToChat,
			setError,
			updateMessage,
			removeMessage,
		]
	);

	return {
		messages,
		sendMessage,
		currentThread,
		isLoading: useMessageStore((state) => state.isLoading),
		error: useMessageStore((state) => state.error),
	};
};
