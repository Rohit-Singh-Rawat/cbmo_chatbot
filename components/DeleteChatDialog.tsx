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
import { Trash2 } from "lucide-react";

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
					className="text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full p-0"
				>
					<Trash2 className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Chat History</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete all chat messages? This action
						cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onConfirm();
							setOpen(false);
						}}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteChatDialog;
