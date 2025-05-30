'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	registerSchema,
	type RegisterFormData,
} from '../../lib/validation/register';
import { OAuthButtons } from './oauth-buttons';

export function RegisterForm() {
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const handleSubmit = async (data: RegisterFormData) => {
		const result = await Promise.resolve({ success: true, error: '' });
		if (result.error) {
			form.setError('root', { message: result.error });
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-6'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Enter your full name'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='email'
									placeholder='Enter your email'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='password'
									placeholder='Create a password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && (
					<p className='text-sm text-destructive'>
						{form.formState.errors.root.message}
					</p>
				)}

				<Button
					type='submit'
					className='w-full font-medium h-11 rounded-lg bg-primary text-white'
				>
					Sign up
				</Button>

				<OAuthButtons />
			</form>
		</Form>
	);
}
