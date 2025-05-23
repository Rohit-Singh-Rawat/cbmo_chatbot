'use client';
import React, { useState } from 'react';
import ChatInput from '../../components/ChatInput';
import Chats from '@/components/Chats';
import { useSendMessage } from '@/lib/hook/useSendMessage';
import { useChatStore } from '@/store/chatstore';

const Page = () => {
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<File[]>([]);

	const { messages, addMessage } = useChatStore();
	const { isGenerating, isStreaming, streamingText, sendMessage } = useSendMessage({
		onComplete: (fullText) => {
			addMessage({ content: fullText, isUser: false });
			setIsLoading(false);
		},
		onError: (error) => {
			console.error('Error:', error);
		},
	});

	const isProcessing = isStreaming || isGenerating || isLoading;

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleSend = async () => {
		const trimmedInput = input.trim();
		if (!trimmedInput) return;

		try {
			addMessage({ content: trimmedInput, isUser: true });
			setIsLoading(true);
			setInput('');
			await sendMessage(trimmedInput);
		} catch (error) {
			console.error('Error:', error);
			setIsLoading(false);
		}
	};

	// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (!e.target.files) return;

	// 	const newFiles = Array.from(e.target.files);
	// 	setFiles((prevFiles) => {
	// 		const uniqueFiles = [...prevFiles];
	// 		newFiles.forEach((file) => {
	// 			const isDuplicate = uniqueFiles.some(
	// 				(f) => f.name === file.name && f.size === file.size
	// 			);
	// 			if (!isDuplicate) {
	// 				uniqueFiles.push(file);
	// 			}
	// 		});
	// 		return uniqueFiles;
	// 	});

	// 	e.target.value = ''; // Reset input for re-upload capability
	// };

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
				// onFileChange={handleFileChange}
				files={files}
				onRemoveFile={handleRemoveFile}
			/>
		</main>
	);
};

export default Page;
