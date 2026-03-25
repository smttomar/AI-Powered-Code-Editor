"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Code2,
    Compass,
    FolderPlus,
    History,
    Home,
    LayoutDashboard,
    Lightbulb,
    type LucideIcon,
    Plus,
    Settings,
    Star,
    Terminal,
    Zap,
    Database,
    FlameIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserButton from "@/modules/auth/components/user-button";

// Define the interface for a single playground item, icon is now a string
interface PlaygroundData {
    id: string;
    name: string;
    icon: string; // Changed to string
    starred: boolean;
}

// Map icon names (strings) to their corresponding LucideIcon components
const lucideIconMap: Record<string, LucideIcon> = {
    Zap: Zap,
    Lightbulb: Lightbulb,
    Database: Database,
    Compass: Compass,
    FlameIcon: FlameIcon,
    Terminal: Terminal,
    Code2: Code2, // Include the default icon
    // Add any other icons you might use dynamically
};

export function DashboardSidebar({
    initialPlaygroundData,
}: {
    initialPlaygroundData: PlaygroundData[];
}) {
    const pathname = usePathname();
    const [starredPlaygrounds, setStarredPlaygrounds] = useState(
        initialPlaygroundData.filter((p) => p.starred),
    );
    const [recentPlaygrounds, setRecentPlaygrounds] = useState(
        initialPlaygroundData,
    );

    return (
        <Sidebar variant="inset" collapsible="icon" className="border border-r">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-3 justify-center">
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        height={60}
                        width={60}
                    />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === "/"}
                                tooltip="Home"
                            >
                                <Link href="/">
                                    <Home className="h-4 w-4" />
                                    <span>Home</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === "/dashboard"}
                                tooltip="Dashboard"
                            >
                                <Link href="/dashboard">
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Star className="h-4 w-4 mr-2" />
                        Starred
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {starredPlaygrounds.length === 0 &&
                            recentPlaygrounds.length === 0 ? (
                                <div className="text-center text-muted-foreground py-4 w-full">
                                    Create your playground
                                </div>
                            ) : (
                                starredPlaygrounds.map((playground) => {
                                    const IconComponent =
                                        lucideIconMap[playground.icon] || Code2;
                                    return (
                                        <SidebarMenuItem key={playground.id}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={
                                                    pathname ===
                                                    `/playground/${playground.id}`
                                                }
                                                tooltip={playground.name}
                                            >
                                                <Link
                                                    href={`/playground/${playground.id}`}
                                                >
                                                    {IconComponent && (
                                                        <IconComponent className="h-4 w-4" />
                                                    )}
                                                    <span>
                                                        {playground.name}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        <History className="h-4 w-4 mr-2" />
                        Recent
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {starredPlaygrounds.length === 0 &&
                            recentPlaygrounds.length === 0
                                ? null
                                : recentPlaygrounds.map((playground) => {
                                      const IconComponent =
                                          lucideIconMap[playground.icon] ||
                                          Code2;
                                      return (
                                          <SidebarMenuItem key={playground.id}>
                                              <SidebarMenuButton
                                                  asChild
                                                  isActive={
                                                      pathname ===
                                                      `/playground/${playground.id}`
                                                  }
                                                  tooltip={playground.name}
                                              >
                                                  <Link
                                                      href={`/playground/${playground.id}`}
                                                  >
                                                      {IconComponent && (
                                                          <IconComponent className="h-4 w-4" />
                                                      )}
                                                      <span>
                                                          {playground.name}
                                                      </span>
                                                  </Link>
                                              </SidebarMenuButton>
                                          </SidebarMenuItem>
                                      );
                                  })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Settings">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="hover:cursor-pointer"
                                    >
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-50 ml-4"
                                >
                                    <DropdownMenuItem className="py-2">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                                <span>Change Theme</span>
                                            </div>
                                        </div>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="hover:cursor-pointer"
                                        >
                                            <ThemeToggle />
                                        </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="py-2">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                                <span>User</span>
                                            </div>
                                        </div>

                                        <UserButton />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
