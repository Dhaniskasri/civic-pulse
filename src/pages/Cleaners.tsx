import { useState } from "react";
import { Star, CheckCircle, Clock, AlertCircle, Plus, Search } from "lucide-react";

interface Cleaner {
  id: number;
  name: string;
  initials: string;
  area: string;
  tasks: number;
  completionRate: number;
  rating: number;
  status: "Available" | "Busy" | "Off Duty";
  suspended: boolean;
  score: number;
  color: string;
}

const CLEANERS: Cleaner[] = [
  { id: 1, name: "Ravi Kumar", initials: "RK", area: "Zone A, B", tasks: 12, completionRate: 94, rating: 4.8, status: "Available", suspended: false, score: 96, color: "from-emerald-400 to-cyan-500" },
  { id: 2, name: "Suresh Mehta", initials: "SM", area: "Zone C", tasks: 8, completionRate: 87, rating: 4.3, status: "Busy", suspended: false, score: 82, color: "from-blue-400 to-indigo-500" },
  { id: 3, name: "Priya Nair", initials: "PN", area: "Ward 7, 8", tasks: 15, completionRate: 98, rating: 4.9, status: "Busy", suspended: false, score: 99, color: "from-pink-400 to-purple-500" },
  { id: 4, name: "Ajay Singh", initials: "AS", area: "Zone D", tasks: 5, completionRate: 72, rating: 3.8, status: "Available", suspended: false, score: 68, color: "from-orange-400 to-amber-500" },
  { id: 5, name: "Mohan Das", initials: "MD", area: "NH-48 Area", tasks: 9, completionRate: 81, rating: 4.1, status: "Off Duty", suspended: false, score: 75, color: "from-teal-400 to-cyan-400" },
  { id: 6, name: "Kavitha Rao", initials: "KR", area: "Market Zone", tasks: 3, completionRate: 55, rating: 3.2, status: "Available", suspended: true, score: 42, color: "from-red-400 to-rose-500" },
];

function StatusDot({ status }: { status: Cleaner["status"] }) {
  const styles: Record<string, string> = {
    Available: "bg-status-completed text-status-completed",
    Busy: "bg-status-inprogress text-status-inprogress",
    "Off Duty": "bg-muted-foreground text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-current/10 ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
      {status}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-3 h-3 ${i <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
      ))}
      <span className="ml-1 text-xs font-semibold text-foreground">{rating}</span>
    </div>
  );
}

export default function Cleaners() {
  const [cleaners, setCleaners] = useState(CLEANERS);
  const [search, setSearch] = useState("");

  const filtered = cleaners.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.area.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSuspend = (id: number) => {
    setCleaners(prev => prev.map(c => c.id === id ? { ...c, suspended: !c.suspended } : c));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cleaner Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{cleaners.filter(c => !c.suspended).length} active cleaners</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">
          <Plus className="w-4 h-4" />
          Add Cleaner
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search cleaners..."
          className="w-full h-9 pl-9 pr-3 text-sm rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <div
            key={c.id}
            className={`bg-card rounded-xl card-shadow border border-border p-5 space-y-4 animate-fade-in-up transition-all ${c.suspended ? "opacity-60" : ""}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.area}</p>
              </div>
              <StatusDot status={c.status} />
            </div>

            {/* Performance Score */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Performance Score</span>
                <span className={`text-sm font-bold ${c.score >= 80 ? "text-status-completed" : c.score >= 60 ? "text-status-inprogress" : "text-destructive"}`}>
                  {c.score}/100
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${c.score >= 80 ? "gradient-brand" : c.score >= 60 ? "bg-status-inprogress" : "bg-destructive"}`}
                  style={{ width: `${c.score}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{c.tasks}</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Tasks</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-lg font-bold text-foreground">{c.completionRate}%</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Done</p>
              </div>
              <div className="text-center">
                <StarRating rating={c.rating} />
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Rating</p>
              </div>
            </div>

            {/* Task Load */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Task Load</span>
                <span className="font-semibold text-foreground">{c.tasks}/20</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-status-assigned transition-all"
                  style={{ width: `${(c.tasks / 20) * 100}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button className="flex-1 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors">
                View Profile
              </button>
              <button
                onClick={() => toggleSuspend(c.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${c.suspended
                  ? "bg-status-completed/10 text-status-completed hover:bg-status-completed/20"
                  : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                  }`}
              >
                {c.suspended ? "Reinstate" : "Suspend"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
