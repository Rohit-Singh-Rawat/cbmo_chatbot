"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
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
import { ZodSchema } from "zod";

interface AuthFormProps<T extends Record<string, any>> {
	onSubmit: (data: T) => Promise<{ success?: boolean; error?: string }>;
	schema: ZodSchema;
	fields: {
		name: keyof T;
		label?: string;
		type: string;
		placeholder: string;
	}[];
	submitText: string;
}

export function AuthForm<T extends Record<string, any>>({
	onSubmit,
	schema,
	fields,
	submitText,
}: AuthFormProps<T>) {
	const form = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues: fields.reduce(
			(acc, field) => {
				acc[field.name as string] = "" as any;
				return acc;
			},
			{} as Record<string, any>,
		),
	});

	const handleSubmit = async (data: T) => {
		const result = await onSubmit(data);
		if (result.error) {
			form.setError("root", { message: result.error });
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				{fields.map((field) => (
					<FormField
						key={field.name as string}
						control={form.control}
						name={field.name as string}
						render={({ field: formField }) => (
							<FormItem>
								{field.label && <FormLabel>{field.label}</FormLabel>}
								<FormControl>
									<Input
										type={field.type}
										placeholder={field.placeholder}
										{...formField}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}

				{form.formState.errors.root && (
					<p className="text-sm text-destructive">
						{form.formState.errors.root.message}
					</p>
				)}

				<Button
					type="submit"
					className="w-full font-medium h-11 rounded-lg bg-primary text-white"
				>
					{submitText}
				</Button>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-border" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-background text-muted-foreground">
							Or authorize with
						</span>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<Button
						type="button"
						variant="outline"
						className="w-full font-medium h-11 rounded-lg"
						onClick={() => {
							/* Add Google OAuth logic */
						}}
					>
						<IconBrandGoogle className="mr-2" />
						Google
					</Button>
					<Button
						type="button"
						variant="outline"
						className="w-full font-medium h-11 rounded-lg"
						onClick={() => {
							/* Add GitHub OAuth logic */
						}}
					>
						<IconBrandGithub className="mr-2" />
						GitHub
					</Button>
				</div>
			</form>
		</Form>
	);
}
