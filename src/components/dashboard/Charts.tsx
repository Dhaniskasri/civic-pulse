import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const lineData = [
  { month: "Jan", complaints: 45, resolved: 38 },
  { month: "Feb", complaints: 52, resolved: 44 },
  { month: "Mar", complaints: 61, resolved: 55 },
  { month: "Apr", complaints: 48, resolved: 46 },
  { month: "May", complaints: 70, resolved: 62 },
  { month: "Jun", complaints: 83, resolved: 71 },
  { month: "Jul", complaints: 76, resolved: 70 },
  { month: "Aug", complaints: 91, resolved: 82 },
];

const pieData = [
  { name: "Garbage", value: 42, color: "#f97316" },
  { name: "Drainage", value: 33, color: "#3b82f6" },
  { name: "Pothole", value: 25, color: "#a855f7" },
];

const barData = [
  { area: "Zone A", Low: 12, Medium: 18, High: 8, Critical: 3 },
  { area: "Zone B", Low: 8, Medium: 22, High: 12, Critical: 5 },
  { area: "Zone C", Low: 15, Medium: 14, High: 6, Critical: 2 },
  { area: "Zone D", Low: 5, Medium: 19, High: 15, Critical: 7 },
  { area: "Zone E", Low: 10, Medium: 11, High: 9, Critical: 1 },
];

const BRAND_GREEN = "#10b981";
const BRAND_CYAN = "#06b6d4";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  fontSize: "12px",
};

export function ComplaintsLineChart() {
  return (
    <div className="bg-card rounded-xl p-5 card-shadow border border-border">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Complaints Over Time</h3>
        <p className="text-xs text-muted-foreground">Monthly complaints vs resolutions</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradComplaints" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={BRAND_GREEN} stopOpacity={0.2} />
              <stop offset="95%" stopColor={BRAND_GREEN} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={BRAND_CYAN} stopOpacity={0.2} />
              <stop offset="95%" stopColor={BRAND_CYAN} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="complaints" stroke={BRAND_GREEN} strokeWidth={2} fill="url(#gradComplaints)" name="Complaints" />
          <Area type="monotone" dataKey="resolved" stroke={BRAND_CYAN} strokeWidth={2} fill="url(#gradResolved)" name="Resolved" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryPieChart() {
  return (
    <div className="bg-card rounded-xl p-5 card-shadow border border-border">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Category Distribution</h3>
        <p className="text-xs text-muted-foreground">By complaint type</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-1">
        {pieData.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            {d.name} <strong className="text-foreground">{d.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SeverityBarChart() {
  return (
    <div className="bg-card rounded-xl p-5 card-shadow border border-border">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Severity by Area</h3>
        <p className="text-xs text-muted-foreground">Issue intensity breakdown per zone</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="area" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="Low" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Medium" stackId="a" fill="#f59e0b" />
          <Bar dataKey="High" stackId="a" fill="#f97316" />
          <Bar dataKey="Critical" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
