"use client";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";

interface DeleteChatDialogProps {
	onConfirm: () => void;
}

const DeleteChatDialog: React.FC<DeleteChatDialogProps> = ({ onConfirm }) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full p-0 size-8 sm:size-9"
				>
					<IconTrash className="size-4 sm:size-[18px]" />
				</Button>
			</DialogTrigger>
			<DialogContent className=" p-4 sm:p-6">
				<DialogHeader className="space-y-2 sm:space-y-3">
					<DialogTitle className="text-lg sm:text-xl">
						Delete Chat History
					</DialogTitle>
					<DialogDescription className="text-sm sm:text-base">
						Are you sure you want to delete all chat messages? This action
						cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
					<Button
						variant="outline"
						onClick={() => setOpen(false)}
						className="flex-1 sm:flex-none text-sm"
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onConfirm();
							setOpen(false);
						}}
						className="flex-1 sm:flex-none text-sm bg-destructive text-white"
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteChatDialog;
