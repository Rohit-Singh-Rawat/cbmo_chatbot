"use client";
import React from "react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Reusable NavLink component
const NavLink = ({
	href,
	children,
}: { href: string; children: React.ReactNode }) => (
	<li>
		<a href={href} className="hover:text-indigo-600 transition-colors">
			{children}
		</a>
	</li>
);

// Reusable BentoCard component
const BentoCard = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => (
	<Card className={cn("p-6 shadow-sm rounded-none", className)}>
		{children}
	</Card>
);

// Navigation component
function Navigation() {
	return (
		<nav className="flex justify-between items-center px-4 md:px-20 py-6 relative w-full">
			<Logo />
			<ul className="hidden md:flex gap-8 text-primary">
				<NavLink href="#features">Features</NavLink>
				<NavLink href="#security">Security</NavLink>
				<NavLink href="#team">Team</NavLink>
				<NavLink href="#contact">Contact</NavLink>
			</ul>
			<div className="flex gap-4">
				<Button variant="ghost" asChild>
					<Link href="/login">Login</Link>
				</Button>
				<Button asChild>
					<Link href="/signup">Signup</Link>
				</Button>
			</div>
		</nav>
	);
}

// Bento grid component
function BentoGrid() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 max-w-6xl mx-auto mt-16 px-4">
			{/* Chat screenshot card */}
			<BentoCard className="row-span-2 col-span-1 overflow-hidden">
				<svg
					className="w-full h-full"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
						fill="#E5E7EB"
					/>
					<path d="M7 9H17V11H7V9ZM7 13H13V15H7V13Z" fill="#9CA3AF" />
				</svg>
			</BentoCard>

			{/* Start chatting card */}
			<BentoCard className="col-span-2 row-span-1 bg-indigo-600 text-white">
				<div className="flex items-end justify-between">
					<span className="font-semibold text-lg">
						Start Chatting Instantly
					</span>
					<span className="text-2xl">→</span>
				</div>
			</BentoCard>

			{/* Security card */}
			<BentoCard className="col-span-1 row-span-2">
				<div className="font-bold text-xs mb-2 text-indigo-600">SECURITY</div>
				<p className="text-gray-800 text-sm">
					All your messages are protected with end-to-end encryption. Only you
					and your friends can read your chats.
				</p>
			</BentoCard>

			{/* Update card */}
			<BentoCard className="col-span-1 row-span-2">
				<div className="font-bold text-xs text-indigo-500">UPDATE</div>
				<div className="font-semibold text-sm">
					Group video calls are now live!
				</div>
				<div className="text-xs text-gray-500">June 2024</div>
				<svg
					className="w-full h-20 mt-2"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17 10.5V7C17 5.9 16.1 5 15 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19H15C16.1 19 17 18.1 17 17V13.5L21 17.5V6.5L17 10.5Z"
						fill="#E5E7EB"
					/>
				</svg>
			</BentoCard>

			{/* Mission card */}
			<BentoCard className="bg-indigo-50 col-span-2 row-span-2">
				<div className="text-xs font-bold text-indigo-600 mb-2">
					OUR MISSION
				</div>
				<div className="text-2xl font-light leading-snug text-black">
					Making communication seamless, private, and fun for everyone.
				</div>
			</BentoCard>

			{/* Careers card */}
			<BentoCard>
				<div>
					<div className="font-bold text-xs text-indigo-600 mb-2">CAREERS</div>
					<div className="font-semibold text-sm mb-2">Join Our Team</div>
					<p className="text-xs text-gray-600">
						We're hiring talented individuals to help shape the future of
						communication.
					</p>
				</div>
				<Button
					variant="link"
					className="text-indigo-600 hover:text-indigo-700 mt-4 p-0"
					asChild
				>
					<a href="/careers">View Open Positions →</a>
				</Button>
			</BentoCard>
		</div>
	);
}

// Main page component
export default function HomePage() {
	return (
		<div className="min-h-screen w-full bg-white p-2 h-screen">
			<div className="min-h-full bg-background mx-auto">
				<Navigation />
				<BentoGrid />
			</div>
		</div>
	);
}
