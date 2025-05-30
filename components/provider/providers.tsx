'use client';

import { ThemeProvider } from 'next-themes';
import { TRPCReactProvider } from '@/trpc/react';
import { type ReactNode } from 'react';
interface ProvidersProps {
	children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<TRPCReactProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</TRPCReactProvider>
	);
}
