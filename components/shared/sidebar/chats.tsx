import { api } from "@/trpc/server";
import { ChatMenuItem } from "./chat-menu-item";
import { SolarChatLineBoldDuotone } from "@/components/icons/chats";
export default async function Chats() {
	const threads = await api.threads.getAll();

	if (!threads) return <div>No threads found</div>;

	return (
		<>
			{threads.length === 0 ? (
				<div className="text-muted-foreground text-xs font-light pl-2 my-5 flex items-center gap-2">
					<SolarChatLineBoldDuotone className="size-4" />
					No threads found
				</div>
			) : (
				threads.map((thread) => (
					<ChatMenuItem
						key={thread.id}
						href={`/chat/${thread.id}`}
						title={thread.title}
					/>
				))
			)}
		</>
	);
}
