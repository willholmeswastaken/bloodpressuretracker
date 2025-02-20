import type React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Search, User } from "lucide-react";
import { useTheme } from "next-themes";
import { CommandMenu } from "./command-menu";

export function TopBar({ children }: { children?: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {children}
          <h1 className="ml-2 text-lg font-semibold md:ml-0">BP Monitor</h1>
        </div>
        <div className="mx-4 flex max-w-2xl flex-1 justify-center">
          <Button
            variant="outline"
            className="hidden w-full justify-start text-muted-foreground md:inline-flex"
            onClick={() =>
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              )
            }
          >
            <Search className="mr-2 h-4 w-4" />
            Press ⌘K to search...
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </div>
      <CommandMenu />
    </div>
  );
}
