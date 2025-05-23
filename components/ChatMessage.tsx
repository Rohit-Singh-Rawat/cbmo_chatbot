'use client';

import { IconCopy, IconCheck } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

interface ChatMessageProps {
	content: string;
	isUser?: boolean;
	isStreaming?: boolean;
}

export function ChatMessage({ content, isUser = false }: ChatMessageProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(content);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div
			className={cn(
				'group flex w-full max-w-3xl px-6 pb-2',
				isUser
					? 'flex-col items-end gap-0.5'
					: ' items-start gap-4 min-h-scroll-anchor'
			)}
		>
			<div
				className={cn(
					isUser
						? 'max-w-[70%] '
						: 'flex min-w-full flex-col justify-start gap-2 pb-8'
				)}
			>
				<motion.div
					className={cn(
						'flex flex-col text-sm font-light prose break-words whitespace-normal text-left',
						isUser
							? 'bg-accent rounded-3xl px-5 py-2.5 dark:bg-[#252525] dark:text-white dark:shadow-lg'
							: 'rounded-lg relative min-w-full bg-transparent p-0 prose-h1:scroll-m-20 prose-h1:text-2xl prose-h1:font-semibold prose-h2:mt-8 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:mb-3 prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto dark:border-none dark:text-[#e0e0e0] dark:border  dark:shadow-none'
					)}
				>
					<ReactMarkdown>{content}</ReactMarkdown>
				</motion.div>
				<div
					className={cn(
						'text-muted-foreground items-center justify-end my-2 flex gap-0 opacity-0 transition-opacity group-hover:opacity-100',
						!isUser && '-ml-2 justify-start'
					)}
				>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								className='hover:bg-accent/60 text-muted-foreground hover:text-foreground flex size-7.5 items-center justify-center rounded-full bg-transparent transition'
								aria-label='Copy text'
								type='button'
								onClick={handleCopy}
							>
								{copied ? (
									<IconCheck className='size-4' />
								) : (
									<IconCopy className='size-4' />
								)}
							</button>
						</TooltipTrigger>
						<TooltipContent
							arrowClassName='-translate-y-[30px]'
							sideOffset={-100}
							className='text-xs '
						>
							{copied ? 'Copied' : 'Copy text'}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}
