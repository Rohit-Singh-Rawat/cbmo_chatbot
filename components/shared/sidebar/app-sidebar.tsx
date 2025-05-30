import { MessageSquarePlus, History, Settings } from 'lucide-react';

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

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
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
									<a
										href='/chat/new'
										className='flex items-center gap-2 px-3 py-2 rounded-md hover:bg-sidebar-hover transition-colors duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sidebar-hover/50 cursor-pointer select-none'
									>
										<SolarPenNewSquareBold className='size-6' />
										<span className='font-medium'>New Chat</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{/* Chat items will be dynamically rendered here */}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
