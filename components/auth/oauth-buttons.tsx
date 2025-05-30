'use client';

import { Button } from '@/components/ui/button';
import { oauthProviders } from '@/lib/auth/providers';
import { useOAuth } from '@/hooks/oauth';

export interface OAuthButtonsProps {
	className?: string;
}

export function OAuthButtons({ className = '' }: OAuthButtonsProps) {
	const { signInWithProvider, getProviderLoadingState, otherLoading } = useOAuth();

	return (
		<div className={className}>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<div className='w-full border-t border-border' />
				</div>
				<div className='relative flex justify-center text-sm'>
					<span className='px-2 bg-background text-muted-foreground'>
						Or authorize with
					</span>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-3 mt-6'>
				{oauthProviders.map((provider) => {
					const isLoading = getProviderLoadingState(provider.id);
					const Icon = provider.icon;

					return (
						<Button
							key={provider.id}
							type='button'
							variant='outline'
							className='w-full font-medium h-11 rounded-lg'
							disabled={isLoading || otherLoading}
							loading={isLoading}
							loadingText={provider.loadingText}
							onClick={() => signInWithProvider(provider.id)}
						>
							<Icon className='mr-2 dark:invert' />
							{provider.buttonText}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
