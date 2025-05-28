'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

  const switchTheme = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

  const toggleTheme = () => {
		//@ts-ignore
		if (!document.startViewTransition) switchTheme();

		//@ts-ignore
		document.startViewTransition(switchTheme);
	};

	return (
		<Button
			variant='outline'
			size='icon'
			className='hover:bg-accent text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent transition-all duration-300 size-8 sm:size-9'
			onClick={toggleTheme}
		>
			<div className='relative flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5'>
				<AnimatePresence mode='wait'>
					{resolvedTheme === 'light' ? (
						<motion.div
							key='sun'
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
						>
							<IconSun className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
						</motion.div>
					) : (
						<motion.div
							key='moon'
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
						>
							<IconMoon className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
