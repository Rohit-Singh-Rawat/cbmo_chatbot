import SidebarProvider from "@/components/provider/sideBarProvider";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import Topbar from "@/components/shared/topbar";

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="flex h-screen flex-col  relative w-full">
				<Topbar />
				{children}
			</div>
		</SidebarProvider>
	);
}
