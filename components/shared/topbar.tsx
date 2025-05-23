'use client';
import ThemeToggle from './themeToogle';
import ChatBot from '../icons/bot';
import DeleteChatDialog from '../DeleteChatDialog';
import { useChatStore } from '@/store/chatstore';
import { toast } from 'sonner';
export default function Topbar() {
	const { clearMessages } = useChatStore();
	return (
		<header className='fixed top-0 left-0 right-0 sm:bg-transparent bg-background dark:sm:bg-transparent dark:bg-[#121212] z-100 px-5 '>
			<div className=' flex items-center justify-between h-16 px-4'>
				<div className='flex items-center gap-2'>
					<ChatBot className='dark:invert' />
					<span className='font-light text-xl text-primary dark:text-white'>
						chat
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<DeleteChatDialog
						onConfirm={() => {
							clearMessages();
							toast.success('Chat history deleted');
						}}
					/>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
