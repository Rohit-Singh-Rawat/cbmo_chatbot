import React, { useRef } from 'react';
import { IconPaperclip, IconSend, IconX } from '@tabler/icons-react';

interface ChatInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onSend: () => void;
	onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveFile?: (index: number) => void;
	files?: File[];
	placeholder?: string;
	disabled?: boolean;
}

const formatBytes = (bytes: number) => {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'kB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toFixed(2) + sizes[i];
};

const ChatInput: React.FC<ChatInputProps> = ({
	value,
	onChange,
	onSend,
	onFileChange,
	onRemoveFile,
	files = [],
	placeholder = 'Ask Me anything',
	disabled = false,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Handle Enter to send, Shift+Enter for newline
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
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
		<div className='relative inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl opacity-100'>
			<form
				className='relative flex w-full flex-col gap-4'
				onSubmit={handleFormSubmit}
				autoComplete='off'
				tabIndex={-1}
			>
				<div className='relative order-2 px-2 pb-3 sm:pb-4 md:order-1'>
					<div className='border-input rounded-3xl border bg-popover relative z-10 p-0 pt-1 shadow-xs backdrop-blur-xl'>
						{/* File/image preview bar */}
						{files.length > 0 && (
							<div
								className='overflow-hidden'
								style={{ height: 'auto' }}
							>
								<div className='flex flex-row overflow-x-auto pl-3'>
									{files.map((file, idx) => {
										const isImage = file.type.startsWith('image/');
										const url = isImage ? URL.createObjectURL(file) : undefined;
										return (
											<div
												key={idx}
												className='relative shrink-0 overflow-hidden pt-2'
												style={{ width: 180 }}
											>
												<div className='relative mr-2 mb-0 flex items-center'>
													<a
														className='w-full'
														tabIndex={-1}
													>
														<div className='bg-background hover:bg-accent border-input flex w-full items-center gap-3 rounded-2xl border p-2 pr-3 transition-colors'>
															<div className='bg-accent-foreground flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-md'>
																{isImage ? (
																	<img
																		alt={file.name}
																		className='h-full w-full object-cover'
																		src={url}
																		onLoad={() =>
																			url && URL.revokeObjectURL(url)
																		}
																	/>
																) : (
																	<span className='text-xs'>
																		{file.type.split('/')[1] || 'file'}
																	</span>
																)}
															</div>
															<div className='flex flex-col overflow-hidden'>
																<span className='truncate text-xs font-medium'>
																	{file.name}
																</span>
																<span className='text-xs text-gray-500'>
																	{formatBytes(file.size)}
																</span>
															</div>
														</div>
													</a>
													<button
														type='button'
														className='border-background absolute top-1 right-1 z-10 inline-flex size-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] bg-black text-white shadow-none transition-colors'
														aria-label='Remove file'
														onClick={() => onRemoveFile && onRemoveFile(idx)}
														tabIndex={0}
													>
														<IconX
															size={14}
															stroke={2}
														/>
													</button>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
						<div className='flex items-end w-full gap-2 px-3 pt-3 pb-3'>
							{/* File upload button */}
							<input
								type='file'
								className='hidden'
								multiple
								accept='.txt,.md,image/jpeg,image/png,image/gif,image/webp,image/svg,image/heic,image/heif'
								aria-hidden='true'
								ref={fileInputRef}
								onChange={onFileChange}
								disabled={disabled}
							/>
							<button
								type='button'
								aria-label='Add files'
								className='inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors size-9 rounded-full border border-border bg-transparent shadow-xs focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none'
								onClick={() => fileInputRef.current?.click()}
								disabled={disabled}
								tabIndex={0}
							>
								<IconPaperclip
									size={22}
									stroke={1.7}
								/>
							</button>
							{/* Textarea */}
							<textarea
								data-slot='textarea'
								className='flex-1 border-none bg-transparent shadow-none outline-none resize-none min-h-[44px] max-h-[200px] rounded-md px-3 py-2 text-base leading-[1.3] placeholder:text-muted-foreground text-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors'
								autoFocus
								style={{ maxHeight: 200 }}
								rows={1}
								placeholder={placeholder}
								value={value}
								onChange={onChange}
								onKeyDown={handleKeyDown}
								disabled={disabled}
								spellCheck={false}
								aria-label={placeholder}
							/>
							{/* Send button */}
							<button
								type='submit'
								aria-label='Send message'
								className='inline-flex items-center justify-center text-primary bg-primary/10 hover:bg-primary/20 transition-colors size-9 rounded-full shadow-xs focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none'
								disabled={disabled || !value.trim()}
								tabIndex={0}
							>
								<IconSend
									size={22}
									stroke={1.7}
								/>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ChatInput;
