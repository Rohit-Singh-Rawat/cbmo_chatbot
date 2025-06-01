import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ProfileTab: React.FC = () => {
	return (
		<section className='px-2 space-y-8 '>
			<div>
				<h2 className='text-xl '>Profile Settings</h2>
				<p className='text-muted-foreground text-sm'>
					Update your profile information and preferences
				</p>
			</div>

			<div className='flex items-center gap-8'>
				<div className='relative group'>
					<Avatar className='h-24 w-24 border-2 border-border transition-all duration-200 group-hover:border-primary rounded-lg'>
						<AvatarImage
							src='/placeholder-avatar.jpg'
							alt='Profile picture'
							className='rounded-lg'
						/>
						<AvatarFallback className='text-lg rounded-lg'>CN</AvatarFallback>
					</Avatar>
					<div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg'>
						<Button
							variant='ghost'
							size='sm'
							className='text-white hover:text-white hover:bg-white/20'
						>
							Change
						</Button>
					</div>
				</div>
				<div className='space-y-1'>
					<h3 className='font-medium'>Profile Picture</h3>
					<p className='text-sm text-muted-foreground'>
						Upload a new profile picture. Max size: 2MB
					</p>
				</div>
			</div>

			<Separator />

			<div className='space-y-6'>
				<div className='space-y-2'>
					<Label
						htmlFor='fullName'
						className='text-base'
					>
						Full Name
					</Label>
					<Input
						id='fullName'
						placeholder='Enter your full name'
						className='max-w-md  ring ring-[#524646]'
					/>
				</div>

				<div className='space-y-2'>
					<Label
						htmlFor='about'
						className='text-base'
					>
						About
					</Label>
					<Textarea
						id='about'
						placeholder='Tell us about yourself'
					className='max-w-md  ring ring-[#524646] h-[120px]'
					/>
					<p className='text-sm text-muted-foreground'>
						Brief description for your profile. Max 500 characters.
					</p>
				</div>
			</div>

			<div className='flex justify-end'>
				<Button
					size='lg'
					className='min-w-[120px]'
				>
					Save Changes
				</Button>
			</div>
		</section>
	);
};

export default ProfileTab;
