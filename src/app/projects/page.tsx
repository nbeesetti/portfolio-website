import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectArchive from "@/components/ProjectArchive";
import { HeroReveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A complete archive of projects — full-stack products, ML/AI systems, distributed infrastructure, and tools — with long-form case studies.",
};

export default function ProjectsPage() {
  return (
    <div>
      <HeroReveal>
        <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
          The archive
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          Every project, documented properly.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-dim">
          READMEs are too small for the interesting parts. Each entry here is a case study —
          motivation, architecture, tradeoffs, and what I&apos;d do differently.
        </p>
      </HeroReveal>

      <div className="mt-12">
        <ProjectArchive projects={projects} />
      </div>
    </div>
  );
}
