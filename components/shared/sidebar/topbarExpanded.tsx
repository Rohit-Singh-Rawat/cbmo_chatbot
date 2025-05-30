'use client';
import { Button } from '@/components/ui/button';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import Logo from '../Logo';
import { SolarPenNewSquareBold } from '@/components/icons/newChat';

export default function TopbarExpanded() {
	const { state } = useSidebar();

	return (
		<div
			className={`flex items-center justify-between text-[#888888]  gap-3 transition-opacity duration-200 ${
				state === 'expanded' ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<SidebarTrigger className='size-8 ' />
			{'/'}
			<Button
				variant='ghost'
				size='icon'
				className='w-full flex  gap-2 [&_svg]:size-6 size-8 justify-center items-center'
			>
				<SolarPenNewSquareBold className='h-4 w-4' />
				<span className='sr-only'>New Chat</span>
			</Button>
			{'/'}

			<Logo size='sm' />
		</div>
	);
}
