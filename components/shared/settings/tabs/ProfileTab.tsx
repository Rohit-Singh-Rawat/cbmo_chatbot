import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import Loading from "@/components/icons/loading";

const ProfileTab: React.FC = () => {
	const [fullName, setFullName] = useState("");
	const [about, setAbout] = useState("");
	const { data: session, isPending, error, refetch } = authClient.useSession();

	useEffect(() => {
		if (session?.user) {
			setFullName(session.user.name || "");
			setAbout(session.user.email || "");
		}
	}, [session]);

	const handleSave = async () => {
		try {
			// Add your save logic here
			await refetch();
			toast.success("Profile updated successfully");
		} catch (error) {
			toast.error("Failed to update profile");
		}
	};

	if (error) {
		return (
			<div className="flex items-center justify-center h-full text-destructive">
				Error loading profile
			</div>
		);
	}

	return (
		<section className="mx-auto px-2 sm:px-4 space-y-6 sm:space-y-8">
			<div className="space-y-2">
				<h2 className="text-lg sm:text-xl tracking-tight">Profile Settings</h2>
				<p className="text-muted-foreground text-xs sm:text-sm font-light">
					Update your profile information and preferences
				</p>
			</div>

			<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
				<div className="relative group">
					<Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-border transition-all duration-200 group-hover:border-primary rounded-lg">
						{isPending ? (
							<div className="flex items-center justify-center h-full w-full">
								<Loading className="w-5 h-5 sm:w-6 sm:h-6" />
							</div>
						) : (
							<>
								<AvatarImage
									src={session?.user?.image || "/placeholder-avatar.jpg"}
									alt="Profile picture"
									className="rounded-lg"
								/>
								<AvatarFallback className="text-base sm:text-lg rounded-lg">
									{session?.user?.name?.charAt(0) || "U"}
								</AvatarFallback>
							</>
						)}
					</Avatar>
					<div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
						<Button
							variant="ghost"
							size="sm"
							className="text-white hover:text-white hover:bg-white/20"
							disabled={isPending}
						>
							Change
						</Button>
					</div>
				</div>
				<div className="space-y-1">
					<h3 className="text-sm sm:text-base font-medium">Profile Picture</h3>
					<p className="text-xs sm:text-sm text-muted-foreground">
						Upload a new profile picture. Max size: 2MB
					</p>
				</div>
			</div>

			<Separator className="my-4 sm:my-6" />

			<div className="space-y-4 sm:space-y-6">
				<div className="space-y-2">
					<Label htmlFor="fullName" className="text-sm sm:text-base">
						Full Name
					</Label>
					<Input
						id="fullName"
						placeholder="Enter your full name"
						className="w-full sm:max-w-md"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						disabled={isPending}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="about" className="text-sm sm:text-base">
						About
					</Label>
					<Textarea
						id="about"
						placeholder="Tell us about yourself"
						className="w-full sm:max-w-md h-[100px] sm:h-[120px]"
						value={about}
						onChange={(e) => setAbout(e.target.value)}
						disabled={isPending}
					/>
					<p className="text-xs sm:text-sm text-muted-foreground">
						Brief description for your profile. Max 500 characters.
					</p>
				</div>
			</div>

			<div className="flex justify-end">
				<Button
					size="lg"
					className="w-full sm:w-auto min-w-[120px] dark:bg-black/50 dark:hover:bg-black/70"
					variant={"default"}
					onClick={handleSave}
					disabled={isPending}
				>
					{isPending ? <Loading className="w-5 h-5" /> : "Save Changes"}
				</Button>
			</div>
		</section>
	);
};

export default ProfileTab;
