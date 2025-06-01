'use client';
import { useState } from 'react';
import { MessageSquarePlus, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SolarMenuDotsBoldDuotone } from '@/components/icons/moremenu';
import DeleteChatAlertDialog from '../dialogs/DeleteChatAlertDialog';
import RenameChatDialog from '../dialogs/RenameChatDialog';

interface ChatMenuItemProps {
	href: string;
	title: string;
	// Optionally, you can add id or callbacks for rename/delete here
}

export function ChatMenuItem({ href, title }: ChatMenuItemProps) {
	const [renameOpen, setRenameOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleRename = (newName: string) => {
		// TODO: Implement rename logic or call parent callback
		setRenameOpen(false);
	};

	const handleDelete = () => {
		// TODO: Implement delete logic or call parent callback
		setDeleteOpen(false);
	};

	return (
		<SidebarMenuItem className='group/item [&:has([data-state="open"])]:bg-sidebar-accent [&:has([data-state="open"])]:text-sidebar-accent-foreground [&:has([data-state="open"])]:rounded-md'>
			<SidebarMenuButton
				asChild
				className='flex-1 flex cursor-pointer'
			>
				<div className='flex items-center gap-2 justify-between'>
					<Link href={href}>
						<span className='flex-1 truncate text-sm font-light'>{title}</span>
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger
							asChild
							className='cursor-pointer transition-opacity duration-200 group-hover/item:opacity-100 opacity-0 data-[state=open]:opacity-100 '
						>
							<SolarMenuDotsBoldDuotone className='size-full scale-125' />
						</DropdownMenuTrigger>
						<DropdownMenuContent align='start'>
							<DropdownMenuItem onClick={() => setRenameOpen(true)}>
								<Pencil className='mr-2 size-4' />
								Rename
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setDeleteOpen(true)}
								variant='destructive'
							>
								<Trash2 className='mr-2 size-4' />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<RenameChatDialog
						open={renameOpen}
						onOpenChange={setRenameOpen}
						onRename={handleRename}
						initialValue={title}
					/>
					<DeleteChatAlertDialog
						open={deleteOpen}
						onOpenChange={setDeleteOpen}
						onConfirm={handleDelete}
					/>
				</div>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
