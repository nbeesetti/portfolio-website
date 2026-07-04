import type { Metadata } from "next";
import { projects, STATUS_LABELS } from "@/data/projects";
import ProjectArchive from "@/components/ProjectArchive";
import { HeroReveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A complete archive of projects — full-stack products, ML/AI systems, distributed infrastructure, and tools — with long-form case studies.",
};

/** Archive facts for the spec strip — computed, never hand-maintained. */
function archiveFacts() {
  const years = projects.map((p) => p.year);
  const range =
    Math.min(...years) === Math.max(...years)
      ? `${years[0]}`
      : `${Math.min(...years)} – ${Math.max(...years)}`;
  const categories = [...new Set(projects.flatMap((p) => p.categories))];
  const active = projects.filter((p) => p.status === "in-progress").length;
  return [
    { label: "Entries", value: `${projects.length} documented projects` },
    { label: "Range", value: range },
    {
      label: "Currently",
      value:
        active > 0
          ? `${active} ${STATUS_LABELS["in-progress"].toLowerCase()}`
          : `${categories.length} focus areas`,
    },
  ];
}

export default function ProjectsPage() {
  return (
    <div>
      <HeroReveal>
        <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
          The archive
        </p>
        <h1 className="max-w-3xl font-display text-3xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl">
          Every project, documented properly.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-dim">
          READMEs are too small for the interesting parts. Each entry here is a case study —
          motivation, architecture, tradeoffs, and what I&apos;d do differently.
        </p>

        {/* Spec strip — same ruled device as the homepage hero */}
        <div className="mt-12">
          <hr className="hairline" aria-hidden="true" />
          <dl className="grid gap-x-10 gap-y-6 py-6 sm:grid-cols-3">
            {archiveFacts().map((item) => (
              <div key={item.label}>
                <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  {item.label}
                </dt>
                <dd className="text-sm leading-relaxed text-ink-dim">{item.value}</dd>
              </div>
            ))}
          </dl>
          <hr className="hairline" aria-hidden="true" />
        </div>
      </HeroReveal>

      <div className="mt-12">
        <ProjectArchive projects={projects} />
      </div>
    </div>
  );
}
