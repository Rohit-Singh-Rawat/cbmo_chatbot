'use client';
import { useState } from 'react';
import ChatInput from '../../components/ChatInput';
import Chats from '@/components/Chats';
import { useSendMessage } from '@/lib/hook/useSendMessage';
import { useChatStore } from '@/store/chatstore';

const Page = () => {
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<File[]>([]);

	const { messages, addMessage } = useChatStore();
	const { isGenerating, isStreaming, streamingText, sendMessage } =
		useSendMessage({
			onComplete: (fullText) => {
				addMessage({ content: fullText, isUser: false });
				setIsLoading(false);
			},
			onError: () => {
				setIsLoading(false);
			},
		});

	const isProcessing = isStreaming || isGenerating || isLoading;

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleSend = async () => {
		const trimmedInput = input.trim();
		if (!trimmedInput) return;
		addMessage({ content: trimmedInput, isUser: true });
		setIsLoading(true);
		setInput('');
		try {
			await sendMessage(trimmedInput);
		} catch {
			setIsLoading(false);
		}
	};

	const handleRemoveFile = (idx: number) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== idx));
	};

	return (
		<main className='p-4 min-h-screen flex flex-col justify-end bg-background items-center container mx-auto'>
			<Chats
				messages={messages}
				streamingText={streamingText}
				isStreaming={isProcessing}
			/>
			<ChatInput
				value={input}
				onChange={handleInputChange}
				onSend={handleSend}
				isStreaming={isProcessing}
				files={files}
				onRemoveFile={handleRemoveFile}
			/>
		</main>
	);
};

export default Page;
