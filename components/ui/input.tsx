import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);

		const togglePasswordVisibility = () => {
			setShowPassword(!showPassword);
		};

		return (
			<div className="relative w-full">
				<input
					type={type === "password" ? (showPassword ? "text" : "password") : type}
					className={cn(
						"flex h-11 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-[#191919] dark:border-[#252525] dark:text-[#e0e0e0] dark:placeholder:text-[#888] dark:shadow-lg",
						className,
					)}
					ref={ref}
					{...props}
				/>
				{type === "password" && (
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						{showPassword ? (
							<EyeOff className="h-4 w-4" />
						) : (
							<Eye className="h-4 w-4" />
						)}
					</button>
				)}
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
