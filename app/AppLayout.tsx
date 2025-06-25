"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/nav/AppSidebar";
import AuthGuard from "./AuthGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isSignInPage = pathname === "/signin";

  if (isSignInPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </AuthGuard>
  );
}
