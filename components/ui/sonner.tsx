'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			style={{
			}}
			position='top-center'
			theme={theme as ToasterProps['theme']}
			className='toaster group'
			{...props}
		/>
	);
};

export { Toaster };
