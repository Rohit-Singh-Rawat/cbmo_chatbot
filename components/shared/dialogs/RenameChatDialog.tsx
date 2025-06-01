import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface RenameChatDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onRename: (newName: string) => void;
	initialValue: string;
	trigger?: React.ReactNode;
}

const RenameChatDialog: React.FC<RenameChatDialogProps> = ({
	open,
	onOpenChange,
	onRename,
	initialValue,
	trigger,
}) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		if (open) setValue(initialValue);
	}, [open, initialValue]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (value.trim()) {
			onRename(value.trim());
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Rename Chat</DialogTitle>
						<DialogDescription>
							Enter a new name for this chat.
						</DialogDescription>
					</DialogHeader>
					<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						autoFocus
						className='mt-4'
						maxLength={100}
						required
					/>
					<DialogFooter className='mt-4'>
						<DialogClose asChild>
							<Button
								type='button'
								variant='ghost'
								className='hover:bg-gray-100 border border-border dark:border-white/10'
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type='submit'
							variant='default'
							disabled={!value.trim()}
							className='dark:bg-white dark:text-black dark:hover:bg-white/90'
							
						>
							Rename
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default RenameChatDialog;
