'use client';
import { Button } from '@/components/ui/button';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import Logo from '../Logo';
import { SolarPenNewSquareBold } from '@/components/icons/newChat';

interface TooltipButtonProps {
	children: React.ReactNode;
	tooltip: string;
	side?: 'top' | 'right' | 'bottom' | 'left';
}

export function TooltipButton({
	children,
	tooltip,
	side = 'bottom',
}: TooltipButtonProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent
				side={side}
				className='px-2 py-1'
			>
				<p>{tooltip}</p>
			</TooltipContent>
		</Tooltip>
	);
}

export function SidebarButton() {
	const { state } = useSidebar();
	return (
		<TooltipButton
			tooltip={state === 'expanded' ? 'Collapse Sidebar' : 'Expand Sidebar'}
		>
			<SidebarTrigger className='size-8 ' />
		</TooltipButton>
	);
}

export default function TopbarExpanded() {
	const { state } = useSidebar();

	return (
		<div
			className={`flex items-center justify-between text-[#888888]   transition-opacity duration-200 ${
				state === 'expanded' ? 'opacity-0 *:hidden' : 'opacity-100'
			}`}
		>
			<div className='flex items-center gap-3 '>
				<SidebarButton />
				{'/'}
				<TooltipButton tooltip='New Chat'>
					<Button
						variant='ghost'
						size='icon'
						className='w-full flex  gap-2 [&_svg]:size-5 size-6 justify-center items-center'
					>
						<SolarPenNewSquareBold className='h-4 w-4' />
						<span className='sr-only'>New Chat</span>
					</Button>
				</TooltipButton>
				{'/'}

				<Logo size='xs' />
			</div>
		</div>
	);
}
