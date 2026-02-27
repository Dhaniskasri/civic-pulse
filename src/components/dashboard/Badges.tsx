import { cn } from "@/lib/utils";

type Status = "pending" | "assigned" | "inprogress" | "completed" | "rejected";
type Category = "Garbage" | "Drainage" | "Pothole";
type Severity = "Low" | "Medium" | "High" | "Critical";

export function StatusBadge({ status }: { status: Status }) {
  const labels: Record<Status, string> = {
    pending: "Pending",
    assigned: "Assigned",
    inprogress: "In Progress",
    completed: "Completed",
    rejected: "Rejected",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold", `status-${status}`)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", {
        "bg-[hsl(var(--status-pending))]": status === "pending",
        "bg-[hsl(var(--status-assigned))]": status === "assigned",
        "bg-[hsl(var(--status-inprogress))]": status === "inprogress",
        "bg-[hsl(var(--status-completed))]": status === "completed",
        "bg-[hsl(var(--status-rejected))]": status === "rejected",
      })} />
      {labels[status]}
    </span>
  );
}

export function CategoryBadge({ category }: { category: Category }) {
  const styles: Record<Category, string> = {
    Garbage: "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-400",
    Drainage: "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
    Pothole: "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-400",
  };
  const icons: Record<Category, string> = { Garbage: "🗑️", Drainage: "💧", Pothole: "🕳️" };

  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold", styles[category])}>
      <span>{icons[category]}</span>
      {category}
    </span>
  );
}

export function SeverityIndicator({ severity }: { severity: Severity }) {
  const styles: Record<Severity, { bar: string; text: string; width: string }> = {
    Low: { bar: "bg-status-completed", text: "text-status-completed", width: "w-1/4" },
    Medium: { bar: "bg-status-inprogress", text: "text-status-inprogress", width: "w-2/4" },
    High: { bar: "bg-orange-500", text: "text-orange-600", width: "w-3/4" },
    Critical: { bar: "bg-destructive", text: "text-destructive", width: "w-full" },
  };
  const s = styles[severity];

  return (
    <div className="flex items-center gap-2 min-w-[90px]">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", s.bar, s.width)} />
      </div>
      <span className={cn("text-xs font-semibold", s.text)}>{severity}</span>
    </div>
  );
}
