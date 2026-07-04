import Link from "next/link";
import type { Project } from "@/data/projects";
import { StatusBadge, TechTag } from "./badges";

/**
 * Homepage feature card — glass panel with a soft accent glow on hover.
 * The full archive uses list rows instead; these cards are reserved for
 * the 3–4 flagship projects.
 */
export default function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-edge-strong hover:bg-glass-strong sm:p-7"
    >
      {/* soft light bloom in the corner, brightens on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent-soft opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-90"
      />

      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {project.categories.join(" · ")}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-bright">
        {project.title}
      </h3>
      {project.distinction && (
        <p className="mt-1 text-[13px] italic text-ink-faint">{project.distinction}</p>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((t) => (
          <TechTag key={t}>{t}</TechTag>
        ))}
      </div>

      <span className="mt-5 inline-flex items-center gap-1 text-sm text-accent transition-colors group-hover:text-accent-bright">
        Read the case study
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
