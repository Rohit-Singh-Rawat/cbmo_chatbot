"use client";

import { IconCopy, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";

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
				"group flex w-full max-w-3xl px-2 sm:px-6 pb-2",
				isUser
					? "flex-col items-end gap-0.5"
					: "items-start gap-2 sm:gap-4 min-h-scroll-anchor",
			)}
		>
			<div
				className={cn(
					isUser
						? "max-w-[85%] sm:max-w-[70%]"
						: "flex min-w-full flex-col justify-start gap-1 sm:gap-2 pb-4 sm:pb-8",
				)}
			>
				<motion.div
					className={cn(
						"flex flex-col text-xs sm:text-sm font-light prose prose-sm sm:prose break-words whitespace-normal text-left",
						isUser
							? "bg-accent text-accent-foreground rounded-2xl sm:rounded-3xl px-3 sm:px-5 py-2 sm:py-2.5"
							: "rounded-lg relative min-w-full bg-transparent p-0 prose-h1:scroll-m-20 prose-h1:text-xl sm:prose-h1:text-2xl prose-h1:font-semibold prose-h2:mt-6 sm:prose-h2:mt-8 prose-h2:scroll-m-20 prose-h2:text-lg sm:prose-h2:text-xl prose-h2:mb-2 sm:prose-h2:mb-3 prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto",
					)}
				>
					<ReactMarkdown>{content}</ReactMarkdown>
				</motion.div>
				<div
					className={cn(
						"text-muted-foreground items-center justify-end my-1 sm:my-2 flex gap-0 opacity-0 transition-opacity group-hover:opacity-100",
						!isUser && "-ml-1 sm:-ml-2 justify-start",
					)}
				>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								className="hover:bg-accent/60 text-muted-foreground hover:text-foreground flex size-6 sm:size-7.5 items-center justify-center rounded-full bg-transparent transition"
								aria-label="Copy text"
								type="button"
								onClick={handleCopy}
							>
								{copied ? (
									<IconCheck className="size-3 sm:size-4" />
								) : (
									<IconCopy className="size-3 sm:size-4" />
								)}
							</button>
						</TooltipTrigger>
						<TooltipContent
							arrowClassName="-translate-y-[30px]"
							sideOffset={-100}
							className="text-xs"
						>
							{copied ? "Copied" : "Copy text"}
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}
