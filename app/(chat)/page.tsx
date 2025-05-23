'use client';
import React, { useState } from 'react';
import ChatInput from '../../components/ChatInput';
import ThemeToggle from '../../components/shared/themeToogle';
const Page = () => {
	const [input, setInput] = useState('');
	const [files, setFiles] = useState<File[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleSend = () => {
		// Implement send logic here
		setInput('');
		setFiles([]);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			// Only add unique files by name+size
			setFiles((prev) => {
				const all = [...prev];
				newFiles.forEach((file) => {
					if (!all.some((f) => f.name === file.name && f.size === file.size)) {
						all.push(file);
					}
				});
				return all;
			});
			// Reset input value so same file can be re-uploaded
			e.target.value = '';
		}
	};

	const handleRemoveFile = (idx: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== idx));
	};

	return (
		<main className='p-4 h-screen flex flex-col justify-end bg-background'>
			<div className='flex flex-col gap-4'>
				<ChatInput
					value={input}
				onChange={handleInputChange}
				onSend={handleSend}
				onFileChange={handleFileChange}
				files={files}
					onRemoveFile={handleRemoveFile}
				/>
			</div>
		</main>
	);
};

export default Page;
