"use client";
import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import Chats from "@/components/Chats";
import { useSendMessage } from "@/lib/hook/useSendMessage";
	import { useMessageStore } from "@/store/message-store/messageStore";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { useMessageStore } from "@/store/message-store/messageStore";
const Page = () => {
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<File[]>([]);

	const { addMessage } = useMessageStore();
	const { isGenerating, isStreaming, streamingText, sendMessage } =
		useSendMessage({
			onComplete: (fullText) => {
				addMessage({ content: fullText, isUser: false, id: nanoid() });
				setIsLoading(false);
			},
			onError: () => {
				setIsLoading(false);
				toast.error("Error sending message");
			},
		});

	const isProcessing = isStreaming || isGenerating || isLoading;

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleSend = async () => {
		const trimmedInput = input.trim();
		if (!trimmedInput) return;
		addMessage({ content: trimmedInput, isUser: true, id: nanoid() });
		setIsLoading(true);
		setInput("");
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
		<div className="p-4  flex flex-col justify-end bg-background items-center container mx-auto relative">
			<Chats
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
		</div>
	);
};

export default Page;
