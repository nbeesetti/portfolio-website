import type { Status } from "@/data/projects";
import { STATUS_LABELS } from "@/data/projects";

/** Small mono chip for technologies and tags. */
export function TechTag({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-edge bg-glass px-2 py-0.5 font-mono text-[11px] text-ink-dim">
      {children}
    </span>
  );
}

const STATUS_COLOR: Record<Status, string> = {
  completed: "bg-status-done",
  "in-progress": "bg-status-active",
  paused: "bg-status-paused",
  archived: "bg-status-archived",
};

/** Status dot + label, used in archive rows and case-study headers. */
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-dim">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${STATUS_COLOR[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}

/** Category label, e.g. "ML/AI" — quiet, uppercase, accent-tinted. */
export function CategoryLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
      {children}
    </span>
  );
}
