import Link from "next/link";
import type { Project } from "@/data/projects";
import { StatusBadge, TechTag } from "./badges";

/**
 * Homepage feature cards. Two variants:
 *  - "lead": full-width panel for the single strongest project
 *  - "default": compact supporting card
 * The full archive uses list rows instead; these are reserved for the
 * 3–4 flagship projects marked `featured` in src/data/projects.ts.
 */
export default function FeaturedProjectCard({
  project,
  variant = "default",
}: {
  project: Project;
  variant?: "lead" | "default";
}) {
  if (variant === "lead") {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="glass group relative block overflow-hidden rounded-2xl p-7 transition-colors duration-300 hover:border-edge-strong sm:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent-soft opacity-50 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {project.categories.join(" · ")}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-bright sm:text-3xl">
              {project.title}
            </h3>
            {project.distinction && (
              <p className="mt-2 text-sm italic text-ink-faint">{project.distinction}</p>
            )}
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">
              {project.overview?.split("\n\n")[0] ?? project.summary}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent transition-colors group-hover:text-accent-bright">
              Read the case study
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>

          {/* Right column: stack, set like a spec table */}
          <div className="border-t border-edge pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <TechTag key={t}>{t}</TechTag>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-edge-strong"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {project.categories[0]}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-bright">
        {project.title}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-dim">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 3).map((t) => (
          <TechTag key={t}>{t}</TechTag>
        ))}
      </div>
    </Link>
  );
}
