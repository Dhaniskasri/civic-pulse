import heatmapBg from "@/assets/heatmap-bg.jpg";
import { MapPin, AlertTriangle, Clock, TrendingUp, X } from "lucide-react";
import { useState } from "react";

const ZONES = [
  { id: 1, name: "Ward 7", x: "22%", y: "28%", severity: "critical", complaints: 34, topIssue: "Drainage", avgTime: "6.8h", risk: 92 },
  { id: 2, name: "Sector 12-B", x: "55%", y: "20%", severity: "high", complaints: 21, topIssue: "Pothole", avgTime: "5.1h", risk: 74 },
  { id: 3, name: "Zone C", x: "38%", y: "50%", severity: "medium", complaints: 14, topIssue: "Garbage", avgTime: "3.4h", risk: 51 },
  { id: 4, name: "Market St", x: "70%", y: "45%", severity: "high", complaints: 18, topIssue: "Garbage", avgTime: "4.7h", risk: 68 },
  { id: 5, name: "NH-48", x: "60%", y: "68%", severity: "medium", complaints: 11, topIssue: "Pothole", avgTime: "4.2h", risk: 55 },
  { id: 6, name: "Block D4", x: "25%", y: "65%", severity: "low", complaints: 6, topIssue: "Garbage", avgTime: "2.1h", risk: 28 },
  { id: 7, name: "Lakeview Rd", x: "80%", y: "30%", severity: "critical", complaints: 29, topIssue: "Drainage", avgTime: "7.2h", risk: 88 },
];

const dotStyle: Record<string, string> = {
  critical: "bg-destructive shadow-[0_0_16px_rgba(239,68,68,0.6)]",
  high: "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]",
  medium: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]",
  low: "bg-primary shadow-[0_0_8px_rgba(16,185,129,0.4)]",
};

const riskColor: Record<string, string> = {
  critical: "text-destructive",
  high: "text-orange-500",
  medium: "text-amber-500",
  low: "text-primary",
};

export default function Heatmap() {
  const [selected, setSelected] = useState<typeof ZONES[0] | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Area Heatmap</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Click on a zone to view detailed analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <div className="lg:col-span-2 bg-card rounded-xl card-shadow border border-border overflow-hidden">
          <div className="relative" style={{ paddingBottom: "65%" }}>
            <img
              src={heatmapBg}
              alt="City heatmap"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Zone dots */}
            {ZONES.map(z => (
              <button
                key={z.id}
                onClick={() => setSelected(z)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: z.x, top: z.y }}
              >
                <div className={`w-4 h-4 rounded-full ${dotStyle[z.severity]} transition-transform group-hover:scale-125 border-2 border-white/40`} />
                <span className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {z.name}
                </span>
              </button>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <p className="text-white text-xs font-semibold mb-2">Risk Level</p>
              <div className="space-y-1.5">
                {[
                  { label: "Critical", cls: "bg-destructive" },
                  { label: "High", cls: "bg-orange-500" },
                  { label: "Medium", cls: "bg-amber-400" },
                  { label: "Low", cls: "bg-emerald-500" },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${l.cls}`} />
                    <span className="text-white/80 text-xs">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-3">
          {selected ? (
            <div className="bg-card rounded-xl card-shadow border border-border p-5 animate-scale-in space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${riskColor[selected.severity]}`} />
                    <h3 className="font-bold text-foreground">{selected.name}</h3>
                  </div>
                  <span className={`text-xs font-bold uppercase ${riskColor[selected.severity]}`}>{selected.severity} risk</span>
                </div>
                <button onClick={() => setSelected(null)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Active Complaints", value: selected.complaints, icon: AlertTriangle },
                  { label: "Top Issue", value: selected.topIssue, icon: TrendingUp },
                  { label: "Avg Resolution", value: selected.avgTime, icon: Clock },
                  { label: "Risk Score", value: `${selected.risk}/100`, icon: MapPin },
                ].map((m, i) => (
                  <div key={i} className="bg-muted/40 rounded-xl p-3">
                    <m.icon className="w-3.5 h-3.5 text-muted-foreground mb-1.5" />
                    <p className="text-lg font-bold text-foreground">{m.value}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-foreground">Risk Score</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${selected.risk > 75 ? "bg-destructive" : selected.risk > 50 ? "bg-orange-500" : "bg-primary"}`}
                    style={{ width: `${selected.risk}%` }}
                  />
                </div>
              </div>

              <button className="w-full py-2 rounded-lg gradient-brand text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                View Complaints for {selected.name}
              </button>
            </div>
          ) : (
            <div className="bg-card rounded-xl card-shadow border border-border p-5 text-center text-sm text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
              Click on a zone marker to view detailed analytics
            </div>
          )}

          {/* Zone Summary */}
          <div className="bg-card rounded-xl card-shadow border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs font-semibold text-foreground">All Zones</p>
            </div>
            <div className="divide-y divide-border max-h-72 overflow-y-auto">
              {ZONES.sort((a, b) => b.risk - a.risk).map(z => (
                <button
                  key={z.id}
                  onClick={() => setSelected(z)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors text-left"
                >
                  <span className={`w-2 h-2 rounded-full ${dotStyle[z.severity]}`} />
                  <span className="flex-1 text-xs font-medium text-foreground truncate">{z.name}</span>
                  <span className="text-xs text-muted-foreground">{z.complaints} issues</span>
                  <span className={`text-xs font-bold ${riskColor[z.severity]}`}>{z.risk}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
