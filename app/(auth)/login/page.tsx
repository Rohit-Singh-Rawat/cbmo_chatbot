import Link from "next/link";
import type { LoginFormData } from "../../../lib/validation/login";
import { LoginForm } from "@/components/auth/login-form";
import Logo from "@/components/shared/Logo";

export default function LoginPage() {
	async function handleLogin(data: LoginFormData) {}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-md space-y-8">
				{/* Logo and Title Section */}
				<div className="text-center">
					<div className="mx-auto w-12 h-12 relative mb-4">
						<Logo
							className="bg-primary text-white dark:text-background rounded-full p-2 size-10"
							iconOnly
							size="sm"
						/>
					</div>
					<h2 className="text-2xl text-foreground">Sign in to Your Account</h2>
					<p className="mt-2 text-muted-foreground text-sm font-light">
						Sign in to access your personalized AI assistant and start chatting
					</p>
				</div>

				{/* Login Form */}
				<LoginForm />

				{/* Footer Links */}
				<div className="flex flex-col items-center justify-center space-y-2 text-sm">
					<Link
						href="/forgot-password"
						className="text-primary hover:text-primary/90"
					>
						Forgot password?
					</Link>
					<p className="text-muted-foreground">
						Don't have an account?{" "}
						<Link
							href="/register"
							className="text-primary hover:text-primary/90 font-medium"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
