import type { Metadata } from "next";
import { site } from "@/data/site";
import { education, experience, resumePdfPath, skills } from "@/data/resume";
import { HeroReveal, Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name} — education, experience, and technical skills.`,
};

export default function ResumePage() {
  return (
    <div className="space-y-20">
      {/* ---- Header ---- */}
      <HeroReveal>
        <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
          Resume
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              {site.name}
            </h1>
            <p className="mt-3 text-lg text-ink-dim">
              {site.role} · {site.location}
            </p>
          </div>
          {resumePdfPath && (
            <a
              href={resumePdfPath}
              download
              className="rounded-xl bg-accent-soft px-5 py-2.5 text-sm font-medium text-accent-bright ring-1 ring-inset ring-edge-strong transition-colors hover:ring-accent"
            >
              Download PDF
            </a>
          )}
        </div>
      </HeroReveal>

      {/* ---- Experience ---- */}
      <section aria-labelledby="experience-heading">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Experience" id="experience-heading" />
        </Reveal>
        <ol className="space-y-4">
          {experience.map((job, i) => (
            <Reveal key={job.company + job.period} delay={i * 0.05}>
              <li className="glass rounded-2xl p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {job.role}
                  </h3>
                  <span className="font-mono text-[11px] text-ink-faint">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-ink-dim">
                  {job.company}
                  {job.team && ` — ${job.team}`} · {job.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---- Education ---- */}
      <section aria-labelledby="education-heading">
        <Reveal>
          <SectionHeading eyebrow="Education" title="Education" id="education-heading" />
        </Reveal>
        <ol className="grid gap-4 sm:grid-cols-2">
          {education.map((school, i) => (
            <Reveal key={school.school} delay={i * 0.05} className="h-full">
              <li className="glass h-full rounded-2xl p-6 sm:p-7">
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {school.school}
                </h3>
                <p className="mt-2 text-sm text-ink-dim">
                  {school.degree}
                  {school.detail && ` — ${school.detail}`}
                </p>
                <p className="mt-1 font-mono text-[11px] text-ink-faint">
                  {school.period} · {school.location}
                </p>
                {school.coursework && (
                  <p className="mt-4 text-sm leading-relaxed text-ink-dim">
                    <span className="text-ink-faint">Coursework & research: </span>
                    {school.coursework}
                  </p>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---- Skills ---- */}
      <section aria-labelledby="skills-heading">
        <Reveal>
          <SectionHeading eyebrow="Skills" title="Technical skills" id="skills-heading" />
        </Reveal>
        <div className="glass overflow-hidden rounded-2xl">
          <dl className="divide-y divide-edge">
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.04}>
                <div className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent sm:pt-0.5">
                    {group.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink-dim">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
