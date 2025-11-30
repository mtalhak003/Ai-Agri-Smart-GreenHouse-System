"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Leaf,
  LayoutDashboard,
  BarChartBig,
  AlertTriangle,
  ListChecks,
  SlidersHorizontal,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "#dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "#health", icon: BarChartBig, label: "Health" },
  { href: "#alerts", icon: AlertTriangle, label: "Alerts" },
  { href: "#logs", icon: ListChecks, label: "Logs" },
  { href: "#controls", icon: SlidersHorizontal, label: "Controls" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="font-headline text-lg font-semibold">
            LeafPulse
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 rounded-lg bg-sidebar-accent p-2 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" />}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-accent-foreground">
                Jane Doe
              </span>
              <span className="text-xs text-muted-foreground">
                janedoe@example.com
              </span>
            </div>
          </div>
          <SidebarMenuButton variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <LogOut />
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
