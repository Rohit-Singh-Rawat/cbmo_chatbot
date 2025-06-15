// App constants and configuration
export const APP_CONFIG = {
	name: "AI Chat Assistant",
	tagline: "Your Intelligent AI Companion",
	description:
		"An intelligent chatbot powered by Google Gemini AI, built with Next.js, React, and Zustand. Get real-time, streaming AI responses in a modern, responsive chat interface.",
	version: "0.1.0",
	features: [
		{
			title: "AI-Powered Chat",
			description:
				"Uses Google Gemini AI for intelligent, context-aware responses",
			icon: "🤖",
		},
		{
			title: "Streaming Responses",
			description:
				"Messages from the AI stream in real-time for a natural chat experience",
			icon: "⚡",
		},
		{
			title: "Persistent History",
			description:
				"Your chat history is saved locally using Zustand with persistence",
			icon: "💾",
		},
		{
			title: "Modern UI/UX",
			description:
				"Built with Tailwind CSS, Radix UI, and custom components for a sleek interface",
			icon: "🎨",
		},
		{
			title: "Theme Support",
			description:
				"Toggle between light and dark mode for your preferred experience",
			icon: "🌓",
		},
		{
			title: "Responsive Design",
			description: "Works great on desktop and mobile devices",
			icon: "📱",
		},
	],
	security: {
		title: "Privacy First",
		description:
			"Your conversations are processed securely with Google Gemini AI. Chat history is stored locally on your device.",
	},
	tech: {
		framework: "Next.js 15",
		ai: "Google Gemini AI",
		ui: "Tailwind CSS + Radix UI",
		state: "Zustand",
	},
	links: {
		github: "https://github.com/Rohit-Singh-Rawat/cbmo_chatbot",
		chat: "/",
		docs: "#docs",
	},
};

export const NAVIGATION_ITEMS = [
	{ href: "#features", label: "Features" },
	{ href: "#about", label: "About" },
	{ href: "#tech", label: "Technology" },
	{ href: "#contact", label: "Contact" },
];
