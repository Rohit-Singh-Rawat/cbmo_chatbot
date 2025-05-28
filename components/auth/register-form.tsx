'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	registerSchema,
	type RegisterFormData,
} from '../../lib/validation/register';
import { error } from 'console';



export function RegisterForm() {
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const handleSubmit = async (data: RegisterFormData) => {
		const result = await Promise.resolve({ success: true,error:'' });
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

				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='password'
									placeholder='Confirm your password'
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

				<div className='grid grid-cols-2 gap-3'>
					<Button
						type='button'
						variant='outline'
						className='w-full font-medium h-11 rounded-lg'
						onClick={() => {
							/* Add Google OAuth logic */
						}}
					>
						<IconBrandGoogle className='mr-2' />
						Google
					</Button>
					<Button
						type='button'
						variant='outline'
						className='w-full font-medium h-11 rounded-lg'
						onClick={() => {
							/* Add GitHub OAuth logic */
						}}
					>
						<IconBrandGithub className='mr-2' />
						GitHub
					</Button>
				</div>
			</form>
		</Form>
	);
}
