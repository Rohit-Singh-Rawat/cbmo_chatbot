import type React from "react";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import PaperPlane2 from "./icons/send";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ChatInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onSend: () => void;
	onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveFile?: (index: number) => void;
	files?: File[];
	isStreaming?: boolean;
	placeholder?: string;
	disabled?: boolean;
}

// Format file sizes for display
const formatBytes = (bytes: number) => {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "kB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toFixed(2) + sizes[i];
};

// File preview component
const FilePreview: React.FC<{
	file: File;
	index: number;
	onRemove?: (index: number) => void;
}> = ({ file, index, onRemove }) => {
	const isImage = file.type.startsWith("image/");
	const url = isImage ? URL.createObjectURL(file) : undefined;

	return (
		<div
			className="relative shrink-0 overflow-hidden pt-2"
			style={{ width: 180 }}
		>
			<div className="relative mr-2 mb-0 flex items-center">
				<a className="w-full" tabIndex={-1}>
					<div className="bg-background hover:bg-accent border-input flex w-full items-center gap-3 rounded-2xl border p-2 pr-3 transition-colors">
						<div className="bg-accent text-accent-foreground flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md">
							{isImage ? (
								<Image
									alt={file.name}
									className="h-full w-full object-cover"
									src={url || ""}
									width={40}
									height={40}
									onLoad={() => url && URL.revokeObjectURL(url)}
								/>
							) : (
								<span className="text-xs">
									{file.type.split("/")[1] || "file"}
								</span>
							)}
						</div>
						<div className="flex flex-col overflow-hidden">
							<span className="truncate text-xs font-medium">{file.name}</span>
							<span className="text-xs text-gray-500">
								{formatBytes(file.size)}
							</span>
						</div>
					</div>
				</a>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							className="border-background absolute top-1 right-1 z-10 inline-flex size-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] bg-destructive text-destructive-foreground shadow-none transition-all hover:scale-110 active:scale-90"
							aria-label="Remove file"
							onClick={() => onRemove?.(index)}
							tabIndex={0}
						>
							<IconX size={14} stroke={2} />
						</button>
					</TooltipTrigger>
					<TooltipContent>Remove file</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
};

const ChatInput: React.FC<ChatInputProps> = ({
	value,
	onChange,
	onSend,
	isStreaming,
	onRemoveFile,
	files = [],
	placeholder = "Ask Me anything",
	disabled = false,
}) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (!disabled && value.trim()) {
				onSend();
			}
		}
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!disabled && value.trim()) {
			onSend();
		}
	};

	return (
		<div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl opacity-100 bg-background px-2 sm:px-0">
			<form
				className="relative flex w-full flex-col gap-2 sm:gap-4"
				onSubmit={handleFormSubmit}
				autoComplete="off"
				tabIndex={-1}
			>
				<div className="relative order-2 px-0 sm:px-2 pb-2 sm:pb-4 md:order-1">
					<div className="border-input rounded-2xl sm:rounded-3xl border bg-popover relative z-10 p-0 pt-1 shadow-sm backdrop-blur-xl">
						<AnimatePresence>
							{files.length > 0 && (
								<motion.div
									layout
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="overflow-hidden"
								>
									<div className="flex flex-row overflow-x-auto pl-2 sm:pl-3 gap-2">
										{files.map((file, idx) => (
											<FilePreview
												key={idx}
												file={file}
												index={idx}
												onRemove={onRemoveFile}
											/>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						<div className="flex items-end w-full gap-2 px-2 sm:px-3 pt-2 sm:pt-3 pb-2 sm:pb-3 justify-between">
							<Textarea
								data-slot="textarea"
								className="flex-1 border-none bg-transparent dark:shadow-none no-scrollbar dark:bg-transparent shadow-none outline-hidden  min-h-[40px] sm:min-h-[44px] max-h-[120px] sm:max-h-[200px] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base leading-[1.3] placeholder:text-muted-foreground text-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
								autoFocus
								style={{ maxHeight: 200 }}
								rows={3}
								placeholder={placeholder}
								value={value}
								onChange={onChange}
								onKeyDown={handleKeyDown}
								disabled={disabled}
								spellCheck={false}
								aria-label={placeholder}
							/>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="submit"
										aria-label="Send message"
										className="inline-flex items-center justify-center text-primary-foreground bg-primary hover:bg-primary/80 transition-all hover:scale-105 active:scale-95 size-8 sm:size-9 rounded-full shadow-2xs focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
										disabled={disabled || !value.trim()}
									>
										{isStreaming ? (
											<IconLoader2 className="size-4 sm:size-5 animate-spin" />
										) : (
											<PaperPlane2 className="size-4 sm:size-5 fill-primary-foreground" />
										)}
									</button>
								</TooltipTrigger>
								<TooltipContent>Send</TooltipContent>
							</Tooltip>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ChatInput;
