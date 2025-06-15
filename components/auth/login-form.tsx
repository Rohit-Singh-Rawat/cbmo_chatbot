"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormData } from "@/lib/validation/login";
import { OAuthButtons } from "./oauth-buttons";

export function LoginForm() {
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (data: LoginFormData) => {
		const result = await Promise.resolve({ success: true, error: "" });
		if (result.error) {
			form.setError("root", { message: result.error });
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="email" placeholder="Enter your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && (
					<p className="text-sm text-destructive">
						{form.formState.errors.root.message}
					</p>
				)}

				<Button
					type="submit"
					className="w-full font-medium h-11 rounded-lg bg-primary text-white"
				>
					Log in
				</Button>

				<OAuthButtons />
			</form>
		</Form>
	);
}
