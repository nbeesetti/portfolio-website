import Link from "next/link";
import { site } from "@/data/site";
import { experience, skills } from "@/data/resume";
import { getFeaturedProjects } from "@/data/projects";
import { HeroReveal, Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import Hero from "@/components/Hero";

/**
 * The hero "spec strip" — the site's signature device: facts set in
 * ruled columns, like the header block of a datasheet. Edit freely.
 */
const specStrip = [
  { label: "Now", value: "M.S. Computer Science (AI/ML) · Cal Poly SLO · 3.97 GPA" },
  { label: "Previously", value: "Expedia Group · OC United · Cal Poly AIP" },
  { label: "Focus", value: "Agentic AI · Distributed systems · Full-stack product" },
];

export default function HomePage() {
  const [lead, ...supporting] = getFeaturedProjects();

  return (
    <div className="space-y-28 sm:space-y-36">
      {/* ================= Hero ================= */}
      <div>
        <Hero />

        {/* Spec strip: ruled, factual, quiet */}
        <HeroReveal delay={0.42}>
          <div className="mt-16 sm:mt-20">
            <hr className="hairline" aria-hidden="true" />
            <dl className="grid gap-x-10 gap-y-6 py-6 sm:grid-cols-3">
              {specStrip.map((item) => (
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
      </div>

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

        {/* One project leads; the rest support. Order = order of
            `featured` projects in src/data/projects.ts. */}
        {lead && (
          <Reveal>
            <FeaturedProjectCard project={lead} variant="lead" />
          </Reveal>
        )}
        {supporting.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supporting.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06} className="h-full">
                <FeaturedProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ================= Credibility / skills ================= */}
      <section aria-labelledby="skills-heading">
        <Reveal>
          <SectionHeading eyebrow="Toolbox" title="What I work with" id="skills-heading" />
        </Reveal>
        <Reveal>
          <div className="glass overflow-hidden rounded-2xl">
            <dl className="divide-y divide-edge">
              {skills.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent sm:pt-0.5">
                    {group.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink-dim">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
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
          <div className="glass relative overflow-hidden rounded-2xl p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent-soft blur-3xl"
            />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Contact
                </p>
                <h2
                  id="cta-heading"
                  className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
                >
                  Let&apos;s build something.
                </h2>
                <p className="mt-3 max-w-md text-ink-dim">
                  Open to software engineering and ML engineering opportunities — and always
                  happy to talk shop.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
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
                  More ways →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
