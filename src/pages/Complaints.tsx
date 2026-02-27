import { useState } from "react";
import { Search, Filter, Download, Plus, ChevronDown, Eye, UserPlus, Trash2, MoreHorizontal } from "lucide-react";
import { StatusBadge, CategoryBadge, SeverityIndicator } from "@/components/dashboard/Badges";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Status = "pending" | "assigned" | "inprogress" | "completed" | "rejected";
type Category = "Garbage" | "Drainage" | "Pothole";
type Severity = "Low" | "Medium" | "High" | "Critical";

interface Complaint {
  id: string;
  category: Category;
  area: string;
  ward: string;
  severity: Severity;
  status: Status;
  assignedTo: string;
  createdAt: string;
}

const COMPLAINTS: Complaint[] = [
  { id: "CF-2847", category: "Pothole", area: "Sector 12-B", ward: "Ward 4", severity: "Critical", status: "pending", assignedTo: "—", createdAt: "Feb 27, 2026" },
  { id: "CF-2846", category: "Drainage", area: "Ward 7 Market", ward: "Ward 7", severity: "High", status: "assigned", assignedTo: "Ravi Kumar", createdAt: "Feb 27, 2026" },
  { id: "CF-2845", category: "Garbage", area: "Zone C Block 3", ward: "Ward 2", severity: "Medium", status: "inprogress", assignedTo: "Suresh M.", createdAt: "Feb 26, 2026" },
  { id: "CF-2844", category: "Pothole", area: "Block D4 Road", ward: "Ward 9", severity: "Low", status: "completed", assignedTo: "Ajay Singh", createdAt: "Feb 26, 2026" },
  { id: "CF-2843", category: "Garbage", area: "Market Street", ward: "Ward 3", severity: "High", status: "completed", assignedTo: "Priya Nair", createdAt: "Feb 25, 2026" },
  { id: "CF-2842", category: "Drainage", area: "Lakeview Rd", ward: "Ward 5", severity: "Critical", status: "pending", assignedTo: "—", createdAt: "Feb 25, 2026" },
  { id: "CF-2841", category: "Pothole", area: "Highway NH-48", ward: "Ward 1", severity: "High", status: "assigned", assignedTo: "Mohan Das", createdAt: "Feb 24, 2026" },
  { id: "CF-2840", category: "Garbage", area: "Residency Park", ward: "Ward 6", severity: "Medium", status: "rejected", assignedTo: "—", createdAt: "Feb 24, 2026" },
];

export default function Complaints() {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = COMPLAINTS.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter.toLowerCase().replace(" ", "");
    const matchCategory = categoryFilter === "All" || c.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map(c => c.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Complaint Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{COMPLAINTS.length} total complaints registered</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 card-shadow border border-border">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by ID or area..."
              className="w-full h-9 pl-9 pr-3 text-sm rounded-lg bg-muted/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </div>

          {["All", "Pending", "Assigned", "In Progress", "Completed", "Rejected"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s
                ? "gradient-brand text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {s}
            </button>
          ))}

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="h-9 px-3 text-sm rounded-lg bg-muted/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
          >
            <option>All</option>
            <option>Garbage</option>
            <option>Drainage</option>
            <option>Pothole</option>
          </select>

          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-semibold hover:bg-muted/80 transition-colors ml-auto">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>

          {selected.length > 0 && (
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors">
              <UserPlus className="w-3.5 h-3.5" />
              Bulk Assign ({selected.length})
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl card-shadow border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="w-10 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                </th>
                {["ID", "Category", "Area / Ward", "Severity", "Status", "Assigned To", "Date", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="w-4 h-4 rounded border-border accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs font-semibold text-primary whitespace-nowrap">{c.id}</td>
                  <td className="px-4 py-3.5"><CategoryBadge category={c.category} /></td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="font-medium text-foreground text-xs">{c.area}</p>
                      <p className="text-muted-foreground text-xs">{c.ward}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><SeverityIndicator severity={c.severity} /></td>
                  <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                    {c.assignedTo === "—" ? <span className="text-muted-foreground/50">Unassigned</span> : c.assignedTo}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{c.createdAt}</td>
                  <td className="px-4 py-3.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2"><Eye className="w-3.5 h-3.5" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><UserPlus className="w-3.5 h-3.5" /> Assign Cleaner</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="w-3.5 h-3.5" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/10">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {COMPLAINTS.length} complaints</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${p === 1 ? "gradient-brand text-white" : "text-muted-foreground hover:bg-muted"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
