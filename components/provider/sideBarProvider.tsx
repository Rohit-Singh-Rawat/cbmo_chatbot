import { ReactNode } from "react";
import { cookies } from 'next/headers';
import { SidebarProvider as _SidebarProvider } from '../ui/sidebar';

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = async ({ children }: SidebarProviderProps) => {
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';


  return (
    <_SidebarProvider defaultOpen={defaultOpen}>
      {children}
    </_SidebarProvider>
  );
};

export default SidebarProvider;
