import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileTab from '../settings/tabs/ProfileTab';
import AppearanceTab from '../settings/tabs/AppearanceTab';
import AccountTab from '../settings/tabs/AccountTab';
import Profile from '@/components/icons/profile';
import Appearance from '@/components/icons/apperance';
import Account from '@/components/icons/account';

interface SettingsModalProps {
	trigger: React.ReactNode;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ trigger }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[800px] h-[600px] flex flex-col  '>
				<DialogHeader className=' py-2'>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				<Tabs
					defaultValue='profile'
					orientation='vertical'
					className='w-full  flex-row max-h-[500px] '
				>
					<TabsList className='flex-col gap-1 bg-transparent py-0  h-fit'>
						<TabsTrigger
							value='profile'
							className='data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none'
						>
							<Profile className='mr-2 h-4 w-4' />
							Profile
						</TabsTrigger>
						<TabsTrigger
							value='appearance'
							className='data-[state=active]:bg-black/5  w-full justify-start data-[state=active]:shadow-none'
						>
							<Appearance className='mr-2 h-4 w-4' />
							Appearance
						</TabsTrigger>
						<TabsTrigger
							value='account'
							className='data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none'
						>
							<Account className='mr-2 h-4 w-4' />
							Account
						</TabsTrigger>
					</TabsList>
					<div className='grow  text-start overflow-y-auto'>
						<TabsContent value='profile'>
							<ProfileTab />
						</TabsContent>
						<TabsContent value='appearance'>
							<AppearanceTab />
						</TabsContent>
						<TabsContent value='account'>
							<AccountTab />
						</TabsContent>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default SettingsModal;
