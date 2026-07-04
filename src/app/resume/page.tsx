import type { Metadata } from "next";
import { site } from "@/data/site";
import { education, experience, resumePdfPath, skills } from "@/data/resume";
import { HeroReveal, Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name} — education, experience, and technical skills.`,
};

/** Contact facts for the header spec strip. Edit sources in src/data/site.ts. */
const headerFacts: Array<{
  label: string;
  value: string;
  href?: string;
  parts?: Array<{ text: string; href: string }>;
}> = [
  { label: "Location", value: site.location },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "Links",
    value: "GitHub · LinkedIn",
    parts: [
      { text: "GitHub", href: site.socials.github },
      { text: "LinkedIn", href: site.socials.linkedin },
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="space-y-24">
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
            <p className="mt-3 text-lg text-ink-dim">{site.role}</p>
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

        {/* Spec strip — same ruled device as the homepage hero */}
        <div className="mt-10">
          <hr className="hairline" aria-hidden="true" />
          <dl className="grid gap-x-10 gap-y-6 py-6 sm:grid-cols-3">
            {headerFacts.map((item) => (
              <div key={item.label}>
                <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  {item.label}
                </dt>
                <dd className="text-sm leading-relaxed text-ink-dim">
                  {item.parts ? (
                    item.parts.map((part, i) => (
                      <span key={part.text}>
                        {i > 0 && " · "}
                        <a
                          href={part.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-dim underline decoration-edge-strong underline-offset-4 transition-colors hover:text-accent-bright"
                        >
                          {part.text}
                        </a>
                      </span>
                    ))
                  ) : item.href ? (
                    <a
                      href={item.href}
                      className="text-ink-dim underline decoration-edge-strong underline-offset-4 transition-colors hover:text-accent-bright"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <hr className="hairline" aria-hidden="true" />
        </div>
      </HeroReveal>

      {/* ---- Experience: ruled ledger, period in the label column ---- */}
      <section aria-labelledby="experience-heading">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Experience" id="experience-heading" />
        </Reveal>
        <ol className="divide-y divide-edge border-y border-edge">
          {experience.map((job, i) => (
            <Reveal key={job.company + job.period} delay={i * 0.05}>
              <li className="grid gap-3 px-2 py-7 sm:grid-cols-[180px_1fr] sm:gap-8 sm:px-4">
                <div className="font-mono text-[11px] leading-relaxed text-ink-faint">
                  <p>{job.period}</p>
                  <p className="mt-1">{job.location}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-accent">
                    {job.company}
                    {job.team && <span className="text-ink-dim"> — {job.team}</span>}
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
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---- Education: same ledger language ---- */}
      <section aria-labelledby="education-heading">
        <Reveal>
          <SectionHeading eyebrow="Education" title="Education" id="education-heading" />
        </Reveal>
        <ol className="divide-y divide-edge border-y border-edge">
          {education.map((school, i) => (
            <Reveal key={school.school} delay={i * 0.05}>
              <li className="grid gap-3 px-2 py-7 sm:grid-cols-[180px_1fr] sm:gap-8 sm:px-4">
                <div className="font-mono text-[11px] leading-relaxed text-ink-faint">
                  <p>{school.period}</p>
                  <p className="mt-1">{school.location}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {school.school}
                  </h3>
                  <p className="mt-1 text-sm text-ink-dim">
                    {school.degree}
                    {school.detail && (
                      <span className="text-accent"> — {school.detail}</span>
                    )}
                  </p>
                  {school.coursework && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                      <span className="text-ink-faint">Coursework & research: </span>
                      {school.coursework}
                    </p>
                  )}
                </div>
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
    </div>
  );
}
