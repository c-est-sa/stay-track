"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  // BedDouble,
  BookUser,
  CircleUser,
  ShieldUser,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";

const hotelMenuItems = [
  // { title: "Room View", url: "/room-view", icon: BedDouble },
  { title: "Guest View", url: "/guest-view", icon: BookUser },
];

const adminMenuItems = [
  { title: "Staff List", url: "/admin/staff", icon: CircleUser },
  {
    title: "Create New Account",
    url: "/admin/create-account",
    icon: ShieldUser,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const { user, signOut } = useAuth();
  console.log("User in AppSidebar:", user?.app_metadata);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.app_metadata?.isAdmin || false);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <span className="text-lg font-bold">StayTrack</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Stays</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {hotelMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span className={pathname === item.url ? "font-bold" : ""}>
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />

        {isAdmin && (
          <>
            <SidebarGroup />
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span
                          className={pathname === item.url ? "font-bold" : ""}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroup />
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={signOut}
              >
                <LogOut />
                <span>Sign Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
