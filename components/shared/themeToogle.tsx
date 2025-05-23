'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant='outline'
			size='icon'
			className='hover:bg-accent/60 text-muted-foreground hover:text-foreground flex  items-center justify-center rounded-full bg-transparent transition-all duration-300 '
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<div className='relative flex items-center justify-center w-5 h-5'>
				<AnimatePresence mode='wait'>
					{theme === 'light' ? (
						<motion.div
							key='sun'
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
						>
							<IconSun className='h-4 w-4' />
						</motion.div>
					) : (
						<motion.div
							key='moon'
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
						>
							<IconMoon className='h-4 w-4' />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
