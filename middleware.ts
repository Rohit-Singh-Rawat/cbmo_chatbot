import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Define route types
const publicRoutes = ["/about", "/contact", "/blog"];
const authRoutes = [
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password",
];
const defaultRedirect = "/dashboard"; // Default redirect after login
const defaultNoAuthRedirect = "/login"; // Default redirect when not authenticated

export async function middleware(request: NextRequest) {
	// Skip middleware for public assets and api routes
	if (
		request.nextUrl.pathname.startsWith("/_next") ||
		request.nextUrl.pathname.startsWith("/api")
	) {
		return NextResponse.next();
	}

	const sessionCookie = getSessionCookie(request);
	const isAuthRoute = authRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route),
	);
	const isPublicRoute = publicRoutes.some(
		(route) => request.nextUrl.pathname === route,
	);

	// Redirect authenticated users away from auth routes
	if (sessionCookie && isAuthRoute) {
		const from = request.nextUrl.searchParams.get("from");
		return NextResponse.redirect(new URL(from || defaultRedirect, request.url));
	}

	// Allow access to public routes
	if (isPublicRoute) {
		return NextResponse.next();
	}

	// Redirect unauthenticated users to login
	if (!sessionCookie && !isAuthRoute) {
		const loginUrl = new URL(defaultNoAuthRedirect, request.url);
		loginUrl.searchParams.set("from", request.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		"/((?!_next/static|_next/image|favicon.ico|public/).*)",
	],
};
