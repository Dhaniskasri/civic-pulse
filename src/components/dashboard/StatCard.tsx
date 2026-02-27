import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: string; up: boolean };
  iconBg?: string;
  delay?: number;
}

export function StatCard({ title, value, subtitle, icon, trend, iconBg = "gradient-brand", delay = 0 }: StatCardProps) {
  return (
    <div
      className="bg-card rounded-xl p-5 card-shadow border border-border animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">{title}</p>
          <p className="text-3xl font-bold mt-1.5 text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1 truncate">{subtitle}</p>}
        </div>
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ml-3", iconBg)}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className={cn("flex items-center gap-1 mt-3 text-xs font-semibold", trend.up ? "text-status-completed" : "text-destructive")}>
          {trend.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>{trend.value}</span>
          <span className="text-muted-foreground font-normal ml-0.5">vs last week</span>
        </div>
      )}
    </div>
  );
}
