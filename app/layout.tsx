import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/themeProvider";
import Topbar from "@/components/shared/topbar";
import { Toaster } from "@/components/ui/sonner";
const sora = Sora({
	variable: "--font-sora",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "AI Chat Assistant",
	description:
		"An intelligent chatbot powered by AI to help answer your questions",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ThemeProvider>
				<body className={`${sora.className} antialiased`}>
					<Topbar />
					<Toaster />
					{children}
				</body>
			</ThemeProvider>
		</html>
	);
}
