import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Brain,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Complaints", icon: FileText, to: "/complaints" },
  { label: "Cleaners", icon: Users, to: "/cleaners" },
  { label: "Analytics", icon: BarChart3, to: "/analytics" },
  { label: "AI Insights", icon: Brain, to: "/ai-insights" },
  { label: "Area Heatmap", icon: MapPin, to: "/heatmap" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in overflow-hidden">
              <p className="text-sm font-bold text-foreground leading-tight">CivicFix</p>
              <p className="text-[10px] text-muted-foreground font-medium">Admin Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-3 pb-1.5">
            Main Menu
          </p>
        )}
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "sidebar-item",
                active && "active",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.label === "AI Insights" && (
                <span className="ml-auto text-[9px] font-bold gradient-brand text-transparent bg-clip-text px-1.5 py-0.5 rounded-full border border-primary/20 bg-primary/5">
                  NEW
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-sidebar-border space-y-0.5">
        <button
          className={cn(
            "sidebar-item w-full",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut style={{ width: 18, height: 18 }} className="shrink-0 text-destructive" />
          {!collapsed && <span className="text-destructive">Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-50"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </aside>
  );
}
