'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { motion } from 'motion/react';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant='outline'
			size='icon'
			className='rounded-full shadow-sm'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<motion.div
				initial={{ rotate: 0, scale: 1 }}
				animate={{
					rotate: theme === 'dark' ? -90 : 0,
					scale: theme === 'dark' ? 0 : 1,
				}}
				transition={{ duration: 0.3 }}
			>
				<IconSun className='h-5 w-5' />
			</motion.div>
			<motion.div
				initial={{ rotate: 90, scale: 0 }}
				animate={{
					rotate: theme === 'dark' ? 0 : 90,
					scale: theme === 'dark' ? 1 : 0,
				}}
				transition={{ duration: 0.3 }}
				className='absolute'
			>
				<IconMoon className='h-5 w-5' />
			</motion.div>
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
