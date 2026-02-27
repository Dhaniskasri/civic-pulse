import { Brain, AlertTriangle, TrendingUp, Map, Zap, Target, CheckCircle2, ArrowRight } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

const predictionData = [
  { week: "W1", actual: 45, predicted: 48 },
  { week: "W2", actual: 52, predicted: 55 },
  { week: "W3", actual: 61, predicted: 59 },
  { week: "W4", actual: 48, predicted: 52 },
  { week: "W5", actual: 70, predicted: 67 },
  { week: "W6", actual: 83, predicted: 78 },
  { week: "W7", actual: null, predicted: 91 },
  { week: "W8", actual: null, predicted: 98 },
];

const ALERTS = [
  {
    level: "critical",
    title: "Flooding Risk — Ward 7",
    desc: "AI detects 87% probability of drainage overflow in next 48h based on weather + complaint patterns.",
    action: "Preemptively deploy 3 drain cleaners",
    confidence: 87,
  },
  {
    level: "high",
    title: "Pothole Cluster — NH-48",
    desc: "6 potholes reported within 500m radius. High traffic zone. Escalation risk: High.",
    action: "Schedule batch repair crew",
    confidence: 79,
  },
  {
    level: "medium",
    title: "Garbage Surge — Market Zone",
    desc: "Post-festival garbage spike predicted for next 3 days. 40% above normal volume expected.",
    action: "Increase pickup frequency",
    confidence: 73,
  },
];

const INSIGHTS = [
  { icon: TrendingUp, title: "Complaint Reduction", value: "↓ 18%", desc: "Month-on-month reduction in repeat complaints in Zone A", positive: true },
  { icon: Map, title: "Top Risk Area", value: "Ward 7", desc: "Highest complaint density — 34 active issues", positive: false },
  { icon: Target, title: "Resolution Efficiency", value: "4.2h avg", desc: "Down from 6.8h last month — 38% improvement", positive: true },
  { icon: Zap, title: "AI Accuracy", value: "91.4%", desc: "Prediction accuracy over last 30 days", positive: true },
];

const levelStyle: Record<string, string> = {
  critical: "border-destructive/30 bg-destructive/5",
  high: "border-orange-400/30 bg-orange-50/50 dark:bg-orange-900/10",
  medium: "border-status-inprogress/30 bg-amber-50/50 dark:bg-amber-900/10",
};

const levelBadge: Record<string, string> = {
  critical: "bg-destructive/15 text-destructive",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function AIInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
          <p className="text-sm text-muted-foreground">Powered by predictive analytics — Updated 5m ago</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary">AI Active</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {INSIGHTS.map((ins, i) => (
          <div key={i} className="bg-card rounded-xl p-4 card-shadow border border-border animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <ins.icon className="w-4 h-4 text-muted-foreground" />
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ins.positive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                {ins.positive ? "↑ Good" : "⚠ Watch"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{ins.value}</p>
            <p className="text-xs font-semibold text-foreground mt-0.5">{ins.title}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{ins.desc}</p>
          </div>
        ))}
      </div>

      {/* Alerts + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alerts */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            High-Risk Alerts
          </h2>
          {ALERTS.map((alert, i) => (
            <div key={i} className={`rounded-xl p-4 border ${levelStyle[alert.level]} animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.level === "critical" ? "bg-destructive animate-pulse-ring" : alert.level === "high" ? "bg-orange-500" : "bg-amber-500"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${levelBadge[alert.level]}`}>
                      {alert.level}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{alert.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      <p className="text-xs text-primary font-semibold">{alert.action}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Brain className="w-3 h-3" />
                      <span>{alert.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prediction chart */}
        <div className="bg-card rounded-xl p-5 card-shadow border border-border">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Complaint Prediction Trend</h3>
            <p className="text-xs text-muted-foreground">AI forecast for next 2 weeks (W7–W8)</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={predictionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                  fontSize: 12,
                }}
              />
              <ReferenceLine x="W6" stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" label={{ value: "Today", fontSize: 10 }} />
              <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Actual" connectNulls={false} />
              <Line type="monotone" dataKey="predicted" stroke="#06b6d4" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} name="AI Forecast" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-4 h-0.5 bg-primary rounded" />
              Actual
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-4 h-0.5 bg-accent rounded border-dashed" style={{ borderTop: "2px dashed #06b6d4", background: "transparent" }} />
              AI Forecast
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-card rounded-xl p-5 card-shadow border border-border">
        <h2 className="text-sm font-semibold text-foreground mb-4">Weekly AI Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "What Happened",
              items: ["83 new complaints this week (+14%)", "Ward 7 emerged as top hotspot", "2 critical drainage issues resolved"],
            },
            {
              title: "AI Observations",
              items: ["Post-rain pothole surge in Zone D", "Cleaner Priya Nair top performer (98%)", "Night-time complaints up 22%"],
            },
            {
              title: "Suggested Actions",
              items: ["Deploy night patrol in Ward 7", "Schedule Ward 4 road inspection", "Increase Sector 12 collection frequency"],
            },
          ].map((s, i) => (
            <div key={i} className="space-y-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">{s.title}</p>
              <ul className="space-y-1.5">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
