import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileTab from "../settings/tabs/ProfileTab";
import AppearanceTab from "../settings/tabs/AppearanceTab";
import AccountTab from "../settings/tabs/AccountTab";
import Profile from "@/components/icons/profile";
import Appearance from "@/components/icons/apperance";
import Account from "@/components/icons/account";

interface SettingsModalProps {
	trigger: React.ReactNode;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ trigger }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col ">
				<DialogHeader className="py-2">
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				<Tabs
					defaultValue="profile"
					orientation="horizontal"
					className="w-full gap-4  sm:gap-0 sm:flex-row max-h-[500px] sm:orientation-vertical"
				>
					<TabsList className="flex sm:flex-col gap-1 bg-transparent py-0 h-fit">
						{["profile", "appearance", "account"].map((tab) => (
							<TabsTrigger
								key={tab}
								value={tab}
								className="data-[state=active]:bg-black/5 w-fit sm:w-full  justify-start data-[state=active]:shadow-none"
							>
								{tab === "profile" && <Profile className="sm:mr-2 h-4 w-4" />}
								{tab === "appearance" && (
									<Appearance className="sm:mr-2 h-4 w-4" />
								)}
								{tab === "account" && <Account className="sm:mr-2 h-4 w-4" />}
								<span className="hidden sm:inline">{tab}</span>
							</TabsTrigger>
						))}
					</TabsList>
					<div className="grow text-start overflow-y-auto">
						<TabsContent value="profile">
							<ProfileTab />
						</TabsContent>
						<TabsContent value="appearance">
							<AppearanceTab />
						</TabsContent>
						<TabsContent value="account">
							<AccountTab />
						</TabsContent>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default SettingsModal;
