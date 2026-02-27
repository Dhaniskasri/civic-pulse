import {
  FileText, CheckCircle2, AlertTriangle, Activity,
  TrendingUp, Users, Clock
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ComplaintsLineChart, CategoryPieChart, SeverityBarChart } from "@/components/dashboard/Charts";

const stats = [
  {
    title: "Total Complaints",
    value: "1,284",
    subtitle: "All time registered",
    icon: <FileText className="w-5 h-5 text-white" />,
    iconBg: "gradient-brand",
    trend: { value: "+12%", up: true },
  },
  {
    title: "Active Complaints",
    value: "347",
    subtitle: "Awaiting resolution",
    icon: <Activity className="w-5 h-5 text-white" />,
    iconBg: "bg-status-assigned",
    trend: { value: "+5%", up: false },
  },
  {
    title: "Completed Today",
    value: "58",
    subtitle: "Last updated 10m ago",
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
    iconBg: "bg-status-completed",
    trend: { value: "+22%", up: true },
  },
  {
    title: "Critical Alerts",
    value: "14",
    subtitle: "Require immediate action",
    icon: <AlertTriangle className="w-5 h-5 text-white" />,
    iconBg: "bg-destructive",
    trend: { value: "+3", up: false },
  },
];

const recentActivity = [
  { id: "CF-2847", area: "Sector 12-B", category: "Pothole", severity: "Critical", status: "Pending", time: "2m ago" },
  { id: "CF-2846", area: "Ward 7", category: "Drainage", severity: "High", status: "Assigned", time: "18m ago" },
  { id: "CF-2845", area: "Zone C", category: "Garbage", severity: "Medium", status: "In Progress", time: "34m ago" },
  { id: "CF-2844", area: "Block D4", category: "Pothole", severity: "Low", status: "Completed", time: "1h ago" },
  { id: "CF-2843", area: "Market St", category: "Garbage", severity: "High", status: "Completed", time: "2h ago" },
];

const statusStyle: Record<string, string> = {
  Pending: "status-pending",
  Assigned: "status-assigned",
  "In Progress": "status-inprogress",
  Completed: "status-completed",
  Rejected: "status-rejected",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Welcome back! Here's what's happening in your city today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} delay={i * 80} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ComplaintsLineChart />
        </div>
        <CategoryPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SeverityBarChart />
        </div>

        {/* Quick Metrics */}
        <div className="bg-card rounded-xl p-5 card-shadow border border-border space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Metrics</h3>
            <p className="text-xs text-muted-foreground">Real-time performance</p>
          </div>
          {[
            { label: "Avg Resolution Time", value: "4.2h", icon: Clock, pct: 70 },
            { label: "Cleaner Utilization", value: "78%", icon: Users, pct: 78 },
            { label: "Weekly Growth", value: "+14%", icon: TrendingUp, pct: 64 },
          ].map((m, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <m.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{m.value}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full gradient-brand transition-all"
                  style={{ width: `${m.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl card-shadow border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
            <p className="text-xs text-muted-foreground">Latest complaint updates</p>
          </div>
          <button className="text-xs font-semibold text-primary hover:underline">View All →</button>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <span className="text-sm">{item.category === "Garbage" ? "🗑️" : item.category === "Drainage" ? "💧" : "🕳️"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{item.id}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{item.area}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.category} — {item.severity} severity</p>
              </div>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[item.status]}`}>
                {item.status}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
