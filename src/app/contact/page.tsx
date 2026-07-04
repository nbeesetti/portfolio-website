import type { Metadata } from "next";
import { site } from "@/data/site";
import { HeroReveal, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about software engineering and ML engineering opportunities.`,
};

/** Edit contact channels in src/data/site.ts. */
const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Best for opportunities and anything substantial.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/neerajabeesetti",
    href: site.socials.linkedin,
    note: "Happy to connect — mention where you found me.",
  },
  {
    label: "GitHub",
    value: "github.com/nbeesetti",
    href: site.socials.github,
    note: "Public code lives here; the deeper writeups live on this site.",
  },
];

export default function ContactPage() {
  return (
    <div>
      <HeroReveal>
        <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
          Contact
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          Say hello.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-dim">
          I&apos;m open to software engineering and ML engineering roles, collaborations, and
          good conversations about systems and products. Based in {site.location}.
        </p>
      </HeroReveal>

      <ul className="mt-12 grid max-w-3xl gap-4">
        {channels.map((channel, i) => (
          <Reveal key={channel.label} delay={i * 0.06}>
            <li>
              <a
                href={channel.href}
                target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group relative flex flex-col gap-1 overflow-hidden rounded-2xl bg-accent-soft p-6 ring-1 ring-inset ring-edge-strong transition-colors hover:ring-accent sm:flex-row sm:items-center sm:justify-between sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent-soft opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-bright">
                    {channel.label}
                  </span>
                  <p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-bright">
                    {channel.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-dim">{channel.note}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden text-lg text-accent transition-transform group-hover:translate-x-1 sm:block"
                >
                  →
                </span>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.2}>
        <p className="mt-12 max-w-xl text-sm text-ink-faint">
          No contact form — this site is fully static by design. Email gets read fastest. 🎾
        </p>
      </Reveal>
    </div>
  );
}
