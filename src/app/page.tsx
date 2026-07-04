import Link from "next/link";
import { site } from "@/data/site";
import { experience, skills } from "@/data/resume";
import { getFeaturedProjects } from "@/data/projects";
import { HeroReveal, Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-28 sm:space-y-36">
      {/* ================= Hero ================= */}
      <section aria-label="Introduction" className="pt-10 sm:pt-16">
        <HeroReveal>
          <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
            {site.role} · {site.location}
          </p>
        </HeroReveal>
        <HeroReveal delay={0.08}>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            I build systems that ship —{" "}
            <span className="text-accent-bright">from ML pipelines to the pixels on top.</span>
          </h1>
        </HeroReveal>
        <HeroReveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim">
            I&apos;m {site.name.split(" ")[0]} — a CS master&apos;s student at Cal Poly (AI/ML,
            3.97 GPA) with production experience at Expedia Group. I work across the stack:
            agentic LLM systems, distributed infrastructure, and full-stack products people
            actually use.
          </p>
        </HeroReveal>
        <HeroReveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="rounded-xl bg-accent-soft px-5 py-2.5 text-sm font-medium text-accent-bright ring-1 ring-inset ring-edge-strong transition-colors hover:ring-accent"
            >
              Explore the project archive
            </Link>
            <Link
              href="/contact"
              className="rounded-xl px-5 py-2.5 text-sm text-ink-dim transition-colors hover:text-ink"
            >
              Get in touch →
            </Link>
          </div>
        </HeroReveal>
      </section>

      {/* ================= Credibility / skills ================= */}
      <section aria-labelledby="skills-heading">
        <Reveal>
          <SectionHeading eyebrow="Toolbox" title="What I work with" id="skills-heading" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05}>
              <div className="glass h-full rounded-2xl p-5">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {group.label}
                </h3>
                <p className="text-sm leading-relaxed text-ink-dim">
                  {group.items.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= Featured projects ================= */}
      <section aria-labelledby="featured-heading">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Selected work"
              title="Featured projects"
              id="featured-heading"
            />
            <Link
              href="/projects"
              className="mb-8 shrink-0 text-sm text-accent transition-colors hover:text-accent-bright"
            >
              Full archive →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06} className="h-full">
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= Experience preview ================= */}
      <section aria-labelledby="experience-heading">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Experience"
              title="Where I've worked"
              id="experience-heading"
            />
            <Link
              href="/resume"
              className="mb-8 shrink-0 text-sm text-accent transition-colors hover:text-accent-bright"
            >
              Full resume →
            </Link>
          </div>
        </Reveal>
        <ol className="divide-y divide-edge border-y border-edge">
          {experience.map((job, i) => (
            <Reveal key={job.company + job.period} delay={i * 0.05}>
              <li className="grid gap-1 px-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6 sm:px-4">
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {job.role}{" "}
                    <span className="font-normal text-ink-dim">· {job.company}</span>
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-dim">
                    {job.highlights[0]}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-ink-faint">{job.period}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ================= Contact CTA ================= */}
      <section aria-labelledby="cta-heading">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-accent-soft blur-3xl"
            />
            <h2
              id="cta-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              Let&apos;s build something.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-dim">
              Open to software engineering and ML engineering opportunities — and always happy
              to talk shop.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="rounded-xl bg-accent-soft px-5 py-2.5 text-sm font-medium text-accent-bright ring-1 ring-inset ring-edge-strong transition-colors hover:ring-accent"
              >
                Email me
              </a>
              <Link
                href="/contact"
                className="rounded-xl px-5 py-2.5 text-sm text-ink-dim transition-colors hover:text-ink"
              >
                More ways to reach me →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
