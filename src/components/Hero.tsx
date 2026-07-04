"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { HeroReveal } from "./Reveal";

/**
 * The homepage hero. Name in plain ink, portrait on the right, and the
 * motion lives in a cycling line of what I actually build plus a soft
 * pointer-tracking glow (full-bleed). Both are disabled under
 * prefers-reduced-motion.
 *
 * Edit the cycling phrases here — keep them short and factual.
 */
const BUILDS = [
  "agentic AI systems",
  "distributed ML infrastructure",
  "full-stack products",
  "data & search pipelines",
];

const CYCLE_MS = 2500;

/** Roles I'm actively looking for — shown as a quiet status line. */
const SEEKING = "new-grad software · ML · product roles";

export default function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const glowRef = useRef<HTMLDivElement>(null);

  // Cycle the "builds" phrase. Skipped entirely under reduced motion.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % BUILDS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // Pointer-tracking light well. Mouse only — no effect on touch.
  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse" || !glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glowRef.current.style.background = `radial-gradient(340px circle at ${
      e.clientX - rect.left
    }px ${e.clientY - rect.top}px, rgba(150, 169, 255, 0.09), transparent 70%)`;
  }

  return (
    /* Full-bleed wrapper: spans the whole viewport so the glow never
       hits a visible edge; inner content re-aligns to the site column. */
    <section
      aria-label="Introduction"
      className="relative left-1/2 w-screen -translate-x-1/2"
      onPointerMove={onPointerMove}
    >
      <div ref={glowRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />

      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_300px] lg:gap-16">
        <div>
          <HeroReveal>
            <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
              {site.role}
              <span className="hidden sm:inline"> · {site.location}</span>
            </p>
          </HeroReveal>

          <HeroReveal delay={0.08}>
            <h1 className="font-display text-4xl font-semibold leading-none tracking-tight text-ink sm:text-6xl">
              {site.name}
            </h1>
          </HeroReveal>

          {/* Cycling line: the sentence stays constant, the object changes.
              aria-label carries the full static meaning for screen readers. */}
          <HeroReveal delay={0.18}>
            <p
              aria-label={`Builds ${BUILDS.join(", ")}.`}
              className="mt-5 font-display text-xl font-medium tracking-tight text-ink-dim sm:text-2xl"
            >
              <span aria-hidden="true">builds </span>
              <span aria-hidden="true" className="inline-grid overflow-hidden align-bottom">
                {/* Keyed remount: old phrase unmounts, new one slides up into
                    the clipped grid cell. Sturdier than AnimatePresence here. */}
                <motion.span
                  key={BUILDS[index]}
                  initial={reduce ? false : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
                  className="col-start-1 row-start-1 whitespace-nowrap text-ink"
                >
                  {BUILDS[index]}.
                </motion.span>
              </span>
            </p>
          </HeroReveal>

          <HeroReveal delay={0.26}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim">
              M.S. Computer Science (AI/ML) at Cal Poly, previously at Expedia Group. Every
              meaningful project I&apos;ve built is documented in the archive — architecture,
              tradeoffs, and all.
            </p>
          </HeroReveal>

          {/* Availability: status dot + what I'm looking for */}
          <HeroReveal delay={0.32}>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-edge bg-glass px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Open to {SEEKING}
            </p>
          </HeroReveal>

          <HeroReveal delay={0.38}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
        </div>

        {/* Portrait — swap the file at public/portrait.jpg to update. */}
        <HeroReveal delay={0.2} className="order-first lg:order-none">
          <div className="relative mx-auto w-40 sm:w-52 lg:w-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-full bg-accent-soft opacity-50 blur-3xl"
            />
            <Image
              src="/portrait.jpg"
              alt="Portrait of Neeraja Beesetti at sunset"
              width={880}
              height={848}
              priority
              className="relative w-full rounded-3xl border border-edge-strong object-cover"
            />
          </div>
        </HeroReveal>
      </div>
    </section>
  );
}
