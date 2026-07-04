import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { StatusBadge, TechTag } from "@/components/badges";
import ProjectLinks from "@/components/ProjectLinks";
import CaseStudy from "@/components/CaseStudy";
import { HeroReveal } from "@/components/Reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Pre-render every project page at build time (static-first). */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      {/* ---- Header ---- */}
      <HeroReveal>
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-accent-bright"
        >
          <span aria-hidden="true">←</span> Back to all projects
        </Link>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {project.categories.join(" · ")}
          </span>
          <span className="font-mono text-[11px] text-ink-faint">{project.year}</span>
          <StatusBadge status={project.status} />
        </div>

        <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>
        {project.distinction && (
          <p className="mt-3 text-base italic text-ink-dim">{project.distinction}</p>
        )}

        {project.overview && (
          <div className="mt-6 max-w-2xl space-y-4">
            {project.overview.split("\n\n").map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-dim">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* ---- Tech stack + links ---- */}
        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <TechTag key={t}>{t}</TechTag>
          ))}
        </div>
        <div className="mt-6">
          <ProjectLinks links={project.links} />
        </div>
      </HeroReveal>

      {/* ---- Case-study body ---- */}
      <div className="mt-14 max-w-3xl border-t border-edge pt-12">
        <CaseStudy caseStudy={project.caseStudy} product={project.product} />
      </div>
    </article>
  );
}
