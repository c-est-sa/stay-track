"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession } from "@/services/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const currentSession = getSession();
  const router = useRouter();
  const pathname = usePathname();

  console.log("Current session:", currentSession);
  console.log("Current pathname:", pathname);

  useEffect(() => {
    if (pathname === "/signin") return;

    if (!currentSession) {
      router.replace("/signin");
    }
  }, [currentSession, router, pathname]);

  if (pathname !== "/signin" && !currentSession) {
    return null;
  }

  return <>{children}</>;
}
