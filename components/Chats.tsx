import type React from 'react';
import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useMessageStore } from '@/store/message-store/messageStore';
import WelcomeMessage from './chats/WelcomeMessage';
import { useCurrentThread, useThread } from '@/store/currentThread/currentThreadProvider';

export interface Chat {
	id: string;
	content: string;
	isUser?: boolean;
	isStreaming?: boolean;
}

interface ChatsProps {
	className?: string;
	streamingText?: string;
	isStreaming?: boolean;
}

const Chats: React.FC<ChatsProps> = ({
	className,
	streamingText,
	isStreaming,
}) => {
	const bottomRef = useRef<HTMLDivElement>(null);
	const { messages } = useMessageStore();
	const { currentThread } = useCurrentThread();
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages.length, streamingText]);

	const hasMessages = messages.length > 0;

	return (
		<div
			className={`flex flex-col w-full max-w-3xl py-20 pb-40 h-full mx-auto flex-1  ${
				className || ''
			}`.trim()}
		>
			{!hasMessages && !currentThread.threadId ? (
				<WelcomeMessage />
			) : (
				<>
					{messages.map((msg) => (
						<ChatMessage
							key={msg.id || nanoid()}
							{...msg}
						/>
					))}
					<div className='flex items-center justify-start text-muted-foreground flex-col text-left'>
						<AnimatePresence>
							{/* Streaming message display */}
							{streamingText && isStreaming && (
								<motion.div className='w-full text-left'>
									<ChatMessage
										content={streamingText}
										isUser={false}
										isStreaming={isStreaming}
									/>
								</motion.div>
							)}
							{isStreaming && (
								<div className='flex items-center justify-start gap-1 mt-2 text-muted-foreground pl-10 w-full'>
									<span className='size-1.5 rounded-full bg-muted-foreground animate-[bounce_1s_ease-in-out_0s_infinite]' />
									<span className='size-1.5 rounded-full bg-muted-foreground animate-[bounce_1s_ease-in-out_0.2s_infinite]' />
									<span className='size-1.5 rounded-full bg-muted-foreground animate-[bounce_1s_ease-in-out_0.4s_infinite]' />
								</div>
							)}
						</AnimatePresence>
					</div>
				</>
			) }
			<div ref={bottomRef} />
		</div>
	);
};

export default Chats;
