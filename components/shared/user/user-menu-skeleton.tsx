"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function UserMenuSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<Skeleton className="h-8 w-8 rounded-full" />
		</div>
	);
}

export function UserMenuButtonsSkeleton() {
	return (
		<div className="flex gap-2">
			<Skeleton>
				<Button variant="ghost" size="sm" className="w-[64px]">
					Sign in
				</Button>
			</Skeleton>
			<Skeleton>
				<Button size="sm" className="w-[64px]">
					Sign up
				</Button>
			</Skeleton>
		</div>
	);
}
