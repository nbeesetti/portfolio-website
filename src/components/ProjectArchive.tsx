"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Category, Project, Status } from "@/data/projects";
import { CATEGORIES, STATUSES, STATUS_LABELS } from "@/data/projects";
import { StatusBadge, TechTag } from "./badges";

/**
 * The project archive: a filterable, searchable index list grouped by
 * year. Designed to stay legible at dozens of entries — rows, not a
 * card grid. Press "/" anywhere on the page to jump to search.
 */
export default function ProjectArchive({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<Category | "All">("All");
  const [status, setStatus] = useState<Status | "All">("All");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  // "/" focuses search, Escape clears it — lightweight command-palette feel.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && target === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "All" && !p.categories.includes(category)) return false;
      if (status !== "All" && p.status !== status) return false;
      if (!q) return true;
      const haystack = [p.title, p.summary, ...p.tech, ...(p.tags ?? [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, category, status, query]);

  // Group by year, newest first, insertion order preserved within a year.
  const byYear = useMemo(() => {
    const groups = new Map<number, Project[]>();
    for (const p of [...filtered].sort((a, b) => b.year - a.year)) {
      groups.set(p.year, [...(groups.get(p.year) ?? []), p]);
    }
    return [...groups.entries()];
  }, [filtered]);

  return (
    <div>
      {/* ---- Filter bar ---- */}
      <div className="glass mb-10 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-1.5">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  category === c
                    ? "bg-accent-soft text-accent-bright"
                    : "text-ink-dim hover:bg-glass-strong hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative lg:w-64">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <input
              ref={searchRef}
              id="project-search"
              type="search"
              placeholder="Search title, tech, tags…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-edge bg-bg-raised px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-edge-strong focus:outline-none"
            />
            <kbd
              aria-hidden="true"
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-edge px-1.5 font-mono text-[10px] text-ink-faint"
            >
              /
            </kbd>
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter by status"
          className="mt-3 flex flex-wrap gap-1.5 border-t border-edge pt-3"
        >
          {(["All", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors ${
                status === s
                  ? "bg-accent-soft text-accent-bright"
                  : "text-ink-faint hover:text-ink-dim"
              }`}
            >
              {s === "All" ? "Any status" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* ---- Result count (announced to screen readers) ---- */}
      <p aria-live="polite" className="mb-6 font-mono text-[11px] text-ink-faint">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {category !== "All" || status !== "All" || query ? " matching filters" : " in the archive"}
      </p>

      {/* ---- Year-grouped index ---- */}
      {byYear.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-ink-dim">No projects match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setStatus("All");
              setQuery("");
            }}
            className="mt-3 text-sm text-accent hover:text-accent-bright"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          <AnimatePresence initial={false}>
            {byYear.map(([year, group]) => (
              <motion.section
                key={year}
                aria-labelledby={`year-${year}`}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h2
                  id={`year-${year}`}
                  className="mb-4 font-display text-sm font-semibold tracking-[0.18em] text-ink-faint"
                >
                  {year}
                </h2>
                <ul className="divide-y divide-edge border-y border-edge">
                  {group.map((p) => (
                    <ArchiveRow key={p.slug} project={p} />
                  ))}
                </ul>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/** One row in the archive index. The whole row is one link. */
function ArchiveRow({ project }: { project: Project }) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="group grid gap-2 px-2 py-5 transition-colors hover:bg-glass sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6 sm:px-4"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-bright">
              {project.title}
            </h3>
            {project.distinction && (
              <span className="text-[13px] italic text-ink-faint">{project.distinction}</span>
            )}
          </div>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-dim">
            {project.summary}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
            {project.tech.length > 4 && (
              <span className="font-mono text-[11px] text-ink-faint">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {project.categories.join(" · ")}
          </span>
          <StatusBadge status={project.status} />
          <span
            aria-hidden="true"
            className="hidden text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent sm:block"
          >
            →
          </span>
        </div>
      </Link>
    </li>
  );
}
