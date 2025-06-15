'use client';

import { ThemeProvider } from 'next-themes';
import { TRPCReactProvider } from '@/trpc/react';
import { type ReactNode } from 'react';
import { CurrentThreadProvider } from '@/store/currentThread/currentThreadProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
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
				<CurrentThreadProvider>
							<TooltipProvider>{children}</TooltipProvider>
				</CurrentThreadProvider>
			</ThemeProvider>
		</TRPCReactProvider>
	);
}
