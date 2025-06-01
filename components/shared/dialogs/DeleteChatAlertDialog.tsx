import React from 'react';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogTrigger,
	AlertDialogAction,
	AlertDialogCancel,
} from '@/components/ui/alert-dialog';

export interface DeleteChatAlertDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	title?: string;
	description?: string;
	trigger?: React.ReactNode;
}

const DeleteChatAlertDialog: React.FC<DeleteChatAlertDialogProps> = ({
	open,
	onOpenChange,
	onConfirm,
	title = 'Delete Chat',
	description = 'Are you sure you want to delete this chat? This action cannot be undone.',
	trigger,
}) => (
	<AlertDialog
		open={open}
		onOpenChange={onOpenChange}
	>
		{trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				<AlertDialogDescription>{description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel  >Cancel</AlertDialogCancel>
				<AlertDialogAction onClick={onConfirm} className='bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-red-500 dark:text-white dark:hover:bg-red-600'>Delete</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

export default DeleteChatAlertDialog;
