import { ComplaintsLineChart, CategoryPieChart, SeverityBarChart } from "@/components/dashboard/Charts";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const weeklyData = [
  { day: "Mon", garbage: 18, drainage: 12, pothole: 8 },
  { day: "Tue", garbage: 22, drainage: 9, pothole: 14 },
  { day: "Wed", garbage: 15, drainage: 16, pothole: 11 },
  { day: "Thu", garbage: 27, drainage: 8, pothole: 9 },
  { day: "Fri", garbage: 20, drainage: 13, pothole: 17 },
  { day: "Sat", garbage: 32, drainage: 6, pothole: 12 },
  { day: "Sun", garbage: 14, drainage: 10, pothole: 7 },
];

const topAreas = [
  { area: "Ward 7", total: 34, pct: 100 },
  { area: "Lakeview Rd", total: 29, pct: 85 },
  { area: "Sector 12-B", total: 21, pct: 62 },
  { area: "Market St", total: 18, pct: 53 },
  { area: "Zone C", total: 14, pct: 41 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Deep-dive into complaint data and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2"><ComplaintsLineChart /></div>
        <CategoryPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Breakdown */}
        <div className="bg-card rounded-xl p-5 card-shadow border border-border">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Weekly Category Breakdown</h3>
            <p className="text-xs text-muted-foreground">This week's daily distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gGarbage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDrainage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPothole" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: 12 }} />
              <Area type="monotone" dataKey="garbage" stroke="#f97316" fill="url(#gGarbage)" strokeWidth={2} name="Garbage" />
              <Area type="monotone" dataKey="drainage" stroke="#3b82f6" fill="url(#gDrainage)" strokeWidth={2} name="Drainage" />
              <Area type="monotone" dataKey="pothole" stroke="#a855f7" fill="url(#gPothole)" strokeWidth={2} name="Pothole" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Areas */}
        <div className="bg-card rounded-xl p-5 card-shadow border border-border">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Top Problem Areas</h3>
            <p className="text-xs text-muted-foreground">Areas with highest active complaints</p>
          </div>
          <div className="space-y-4">
            {topAreas.map((a, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}.</span>
                    <span className="text-sm font-medium text-foreground">{a.area}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{a.total}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-brand transition-all"
                    style={{ width: `${a.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SeverityBarChart />
    </div>
  );
}
