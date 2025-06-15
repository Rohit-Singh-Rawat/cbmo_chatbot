"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import { OAuthProvider } from "@/lib/auth/providers";

interface OAuthResponse {
	success: boolean;
	error?: string;
}

export function useOAuth() {
	const router = useRouter();

	const oauthMutation = useMutation<
		OAuthResponse,
		Error,
		{ provider: OAuthProvider }
	>({
		mutationFn: async ({ provider }) => {
			const response = await authClient.signIn.social({ provider });

			if (!response.data) {
				throw new Error("Authentication failed");
			}

			return {
				success: true,
				redirect: true,
			};
		},
		onSuccess: (data) => {
			if (data.success) {
				toast.success("Successfully signed in");
			}
		},
		onError: (error) => {
			toast.error("Failed to sign in: " + error.message);
		},
	});

	const signInWithProvider = (provider: OAuthProvider) => {
		oauthMutation.mutate({ provider });
	};

	const getProviderLoadingState = (provider: OAuthProvider): boolean => {
		return (
			oauthMutation.isPending && oauthMutation.variables?.provider === provider
		);
	};

	return {
		signInWithProvider,
		getProviderLoadingState,
		otherLoading: oauthMutation.isPending,
		error: oauthMutation.error,
	};
}
