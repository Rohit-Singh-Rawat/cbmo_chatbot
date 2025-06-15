import Google from "@/components/icons/google";
import Github from "@/components/icons/github";
import { IconProps } from "@/components/icons/types";

export type OAuthProvider = "google" | "github";

export interface OAuthProviderConfig {
	id: OAuthProvider;
	name: string;
	icon: React.ComponentType<IconProps>;
	buttonText: string;
	loadingText: string;
}

export const oauthProviders: OAuthProviderConfig[] = [
	{
		id: "google",
		name: "Google",
		icon: Google,
		buttonText: "Google",
		loadingText: "Signing in with Google",
	},
	{
		id: "github",
		name: "GitHub",
		icon: Github,
		buttonText: "GitHub",
		loadingText: "Signing in with GitHub",
	},
];
