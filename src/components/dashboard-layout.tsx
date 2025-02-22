"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Activity, LogOut, History, Menu } from "lucide-react";
import { TopBar } from "./top-bar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/app" },
  { icon: Activity, label: "Trends", href: "#" },
  { icon: History, label: "History", href: "/app/readings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? "w-full" : "w-16"} flex h-full flex-col bg-background`}>
      <div className="p-4">
        <h2 className={`text-lg font-semibold ${!isMobile && "sr-only"}`}>
          BP Monitor
        </h2>
        {!isMobile && (
          <div className="flex justify-center">
            <Activity className="h-6 w-6" />
          </div>
        )}
      </div>
      <nav className="flex-1 px-2">
        <TooltipProvider delayDuration={0}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const NavItem = (
              <Link
                key={item.label}
                href={item.href}
                className={`my-1 flex items-center rounded-md text-sm transition-colors ${
                  !isMobile ? "h-10 w-10 justify-center" : "px-4 py-2"
                } ${
                  isActive ? "bg-white text-black" : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isMobile && "mr-3"}`} />
                {isMobile && item.label}
              </Link>
            );

            return isMobile ? (
              NavItem
            ) : (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
      <div className={`p-4 ${!isMobile && "px-2"}`}>
        {isMobile ? (
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => console.log("Logout")}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        ) : (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground"
                  onClick={() => console.log("Logout")}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden border-r border-border md:block">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-[300px] p-0">
              <Sidebar isMobile />
            </SheetContent>
          </Sheet>
        </TopBar>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8 lg:px-24">{children}</div>
        </main>
      </div>
    </div>
  );
}
