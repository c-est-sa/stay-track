import type { Metadata } from "next";
// import { cookies } from "next/headers";
import "./globals.css";
import { roboto } from "@/lib/fonts";
import AppLayout from "./AppLayout";
import { AuthProvider } from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "StayTrack",
  description: "Hotel room management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {/* <SidebarProvider defaultOpen={defaultOpen}> */}
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
