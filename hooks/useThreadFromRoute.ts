import { useParams, usePathname } from 'next/navigation';

export const useThreadFromRoute = () => {
	const params = useParams();
	const pathname = usePathname();

	// Extract threadId from route params (e.g., /chat/[threadId])
	const threadId = params?.chatId as string | undefined;

	// Check if we're on a new chat route (/ or /new)
	const isNewThread = pathname === '/' || pathname === '/new' || !threadId;

	return {
		threadId: isNewThread ? null : threadId,
		isNewThread,
	};
};
