import Link from 'next/link';
import { RegisterForm } from '../../../components/auth/register-form';

import type { RegisterFormData } from '../../../lib/validation/register';
import ChatBot from '@/components/icons/bot';

export default function RegisterPage() {


	return (
		<div className='min-h-screen flex items-center justify-center bg-background p-4'>
			<div className='w-full max-w-md space-y-8'>
				{/* Logo and Title Section */}
				<div className='text-center'>
					<div className='mx-auto w-12 h-12 relative mb-4'>
						<ChatBot className='bg-primary text-white dark:text-background rounded-full p-2 size-10' />
					</div>
					<h2 className='text-2xl text-foreground'>Create your account</h2>
					<p className='mt-2 text-muted-foreground text-sm font-light'>
						Join us to experience the next generation of AI chat
					</p>
				</div>

				{/* Register Form */}
				<RegisterForm />

				{/* Footer Links */}
				<div className='flex flex-col items-center justify-center space-y-2 text-sm'>
					<p className='text-muted-foreground'>
						Already have an account?{' '}
						<Link
							href='/login'
							className='text-primary hover:text-primary/90 font-medium'
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
