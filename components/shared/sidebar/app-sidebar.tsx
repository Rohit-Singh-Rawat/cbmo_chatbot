import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import Logo from '../Logo';
import { SolarPenNewSquareBold } from '@/components/icons/newChat';
import Link from 'next/link';
import { ChatMenuItem } from './chat-menu-item';
import { api } from '@/trpc/server';
import Chats from './chats';
import { Suspense } from 'react';
import Loading from '@/components/icons/loading';

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent className='flex flex-col'>
				<div className='flex items-center justify-between p-4'>
					<div className='flex items-center gap-2'>
						<Logo size='sm' />
					</div>
					<SidebarTrigger />
				</div>

				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link
										href='/chat/new'
										className=''
									>
										<SolarPenNewSquareBold className='size-6' />
										<span className='font text-foreground'>New Chat</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup className='flex-1'>
					<SidebarGroupLabel className='text-muted-foreground font-light'>
						Recent Chats
					</SidebarGroupLabel>
					<SidebarGroupContent className='flex-1'>
						<SidebarMenu className='h-full'>
							<Suspense
								fallback={
									<div className='flex items-center justify-center w-full  flex-1 h-full'>
										<Loading
											className='size-7'
											speed={0.5}
										/>
									</div>
								}
							>
								<Chats />
							</Suspense>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
