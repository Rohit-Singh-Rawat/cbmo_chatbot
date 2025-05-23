'use client';
;
import ThemeToggle from './themeToogle';
import ChatBot from '../icons/bot';
export default function Topbar() {
	return (
		<header className='fixed top-0 left-0 right-0 bg-transparent z-50 px-5'>
			<div className=' flex items-center justify-between h-16 px-4'>
				<div className='flex items-center gap-2'>
					<ChatBot />
					<span className='font-light text-xl text-primary'>chat</span>
				</div>

				<ThemeToggle />
			</div>
		</header>
	);
}
