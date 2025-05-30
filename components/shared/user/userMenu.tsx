import { Suspense } from 'react';
import { auth } from '@/utils/auth';
import { UserMenuClient } from './user-menu-client';
import {
	UserMenuSkeleton,
	UserMenuButtonsSkeleton,
} from './user-menu-skeleton';
import { headers } from 'next/headers';

export default async function UserMenu() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<Suspense fallback={<UserMenuSkeleton />}>
			<UserMenuClient user={session?.user} />
		</Suspense>
	);
}
