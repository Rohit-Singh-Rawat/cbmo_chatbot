import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SolarLogout2LineDuotone } from '@/components/icons/logout';
import { IconTrash } from '@tabler/icons-react';
import { authClient } from '@/utils/auth-client';

const AccountTab: React.FC = () => {
	const router = useRouter();

	const handleSignOut = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push('/login');
					toast.success('Signed out successfully');
					router.refresh();
				},
			},
		});
	};

	return (
		<section className=' mx-auto px-2'>
			<div className='space-y-2'>
				<h2 className='text-xl  tracking-tight'>Account Settings</h2>
				<p className='text-muted-foreground text-sm font-light'>
					Manage your account preferences and security.
				</p>
			</div>

			<Separator className='my-6' />

			<div className='space-y-8'>
				<div className='space-y-6'>
					<h3 className='text-lg font-medium text-destructive'>Danger Zone</h3>
					<div className='grid gap-4'>
						<div className='flex items-center justify-between p-4'>
							<div className='space-y-1'>
								<h4 className='text-sm font-medium'>Sign Out</h4>
								<p className='text-sm text-muted-foreground'>
									Sign out of your account
								</p>
							</div>
							<Button
								variant='destructive'
								size='sm'
								onClick={handleSignOut}
								className='transition-all hover:scale-105'
							>
								<SolarLogout2LineDuotone className='mr-2 h-4 w-4' />
								Sign Out
							</Button>
						</div>

						<div className='flex items-center justify-between p-4'>
							<div className='space-y-1'>
								<h4 className='text-sm font-medium'>Delete Account</h4>
								<p className='text-sm text-muted-foreground'>
									Permanently delete your account and all your data
								</p>
							</div>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button 
										variant='destructive'
										size='sm'
										className='transition-all hover:scale-105 ml-4'
									>
										<IconTrash className='mr-2 h-4 w-4' />
										Delete Account
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent className='sm:max-w-[425px]'>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
										<AlertDialogDescription className='pt-3'>
											This action cannot be undone. This will permanently delete your
											account and remove your data from our servers.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter className='gap-2 sm:gap-5'>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											className='bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive'
											
											onClick={() => {
												// Add delete account logic here
												toast.error('Account deletion not implemented yet');
											}}
										>
											Delete Account
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AccountTab;