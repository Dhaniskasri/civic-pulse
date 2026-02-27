import { useState } from "react";
import { Bell, Search, Moon, Sun, ChevronDown, User, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  sidebarCollapsed: boolean;
}

export function Navbar({ isDark, onToggleDark, sidebarCollapsed }: NavbarProps) {
  const [hasAlert, setHasAlert] = useState(true);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 flex items-center px-6 gap-4",
        "bg-card/80 backdrop-blur-md border-b border-border",
        "transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-60"
      )}
    >
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search complaints, areas..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/60 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Dark mode */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg"
          onClick={onToggleDark}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg relative">
              <Bell className="w-4 h-4" />
              {hasAlert && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse-ring" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Notifications
              <span className="ml-auto text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">3 new</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { title: "Critical pothole reported", area: "Sector 12-B", time: "2m ago", dot: "bg-destructive" },
              { title: "Drainage overflow alert", area: "Ward 7", time: "15m ago", dot: "bg-status-inprogress" },
              { title: "Cleaner assigned to task", area: "Zone C", time: "1h ago", dot: "bg-status-completed" },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="py-3 gap-3 cursor-pointer">
                <span className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${n.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.area} · {n.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary text-sm justify-center font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 h-9 px-3 rounded-lg hover:bg-muted/60 transition-colors">
              <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold leading-tight">Admin User</p>
                <p className="text-[10px] text-muted-foreground leading-tight flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" /> Verified Admin
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-muted-foreground font-normal">admin@civicfix.gov</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Activity Log</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
