"use client"

import { usePathname } from "next/navigation"
import { createContext, useContext, useMemo } from "react"

const CurrentThreadContext = createContext<{ currentThread: { threadId: string | null } }>({
	currentThread: { threadId: null },
})

export const useCurrentThread = () => useContext(CurrentThreadContext)

export function CurrentThreadProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const threadId = useMemo(() => {
		if (pathname?.startsWith("/c/")) return pathname.split("/c/")[1]
		return null
	}, [pathname])

	const currentThread = useMemo(() => ({ threadId }), [threadId])

	return (
		<CurrentThreadContext.Provider value={{ currentThread }}>
			{children}
		</CurrentThreadContext.Provider>
	)
}
