'use client';

import { useRouter } from 'next/navigation';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authClient } from '@/utils/auth-client';
import { SolarSettingsLineDuotone } from '@/components/icons/settings';
import { SolarLogout2LineDuotone } from '@/components/icons/logout';
import { toast } from 'sonner';
import { useState } from 'react';
import SettingsModal from '../dialogs/SettingsModal';
import Link from 'next/link';

interface UserMenuClientProps {
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}

export function UserMenuClient({ user }: UserMenuClientProps) {
	const router = useRouter();

	if (!user) {
		return (
			<div className='flex gap-2'>
				<Link href='/login'>
					<Button
						variant='ghost'
						size='sm'
					>
						Sign in
					</Button>
				</Link>
				<Link href='/register'>
					<Button size='sm'>Sign up</Button>
				</Link>
			</div>
		);
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='relative h-8 w-8 rounded-full'
				>
					<Avatar className='h-8 w-8'>
						<AvatarImage
							src={user.image || ''}
							alt={user.name || ''}
						/>
						<AvatarFallback>
							{user.name?.charAt(0).toUpperCase() || 'U'}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-56'
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{user.name}</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<SettingsModal
					trigger={
						<button className="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80 font-light active:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full">
							<SolarSettingsLineDuotone className='mr-2 h-4 w-4 group-hover:animate-[spin_2s_ease-in-out_infinite] transition-transform ease-in-out' />
							Settings
						</button>
					}
				/>

				<DropdownMenuItem
					className='text-red-600 focus:text-red-600 group font-light'
					onClick={() => {
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									router.push('/login');
									toast.success('Signed out successfully');
									router.refresh();
								},
							},
						});
					}}
				>
					<SolarLogout2LineDuotone className='mr-2 h-4 w-4' />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
