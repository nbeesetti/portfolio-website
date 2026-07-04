"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { HeroReveal } from "./Reveal";

/**
 * The homepage hero. Big name in plain ink; the motion lives in a
 * cycling line of what I actually build, plus a soft pointer-tracking
 * glow. Both are disabled under prefers-reduced-motion.
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
    <section
      aria-label="Introduction"
      className="relative -mx-4 px-4 pt-10 sm:-mx-6 sm:px-6 sm:pt-16"
      onPointerMove={onPointerMove}
    >
      <div ref={glowRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />

      <HeroReveal>
        <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
          {site.role}
          <span className="hidden sm:inline"> · {site.location}</span>
        </p>
      </HeroReveal>

      <HeroReveal delay={0.08}>
        <h1 className="font-display text-5xl font-semibold leading-none tracking-tight text-ink sm:text-8xl">
          {site.name}
        </h1>
      </HeroReveal>

      {/* Cycling line: the sentence stays constant, the object changes.
          aria-label carries the full static meaning for screen readers. */}
      <HeroReveal delay={0.18}>
        <p
          aria-label={`Builds ${BUILDS.join(", ")}.`}
          className="mt-6 font-display text-xl font-medium tracking-tight text-ink-dim sm:text-3xl"
        >
          <span aria-hidden="true">builds </span>
          <span aria-hidden="true" className="inline-grid overflow-hidden align-bottom">
            {/* Keyed remount: old phrase unmounts, new one slides up into the
                clipped grid cell. Sturdier than AnimatePresence for a loop. */}
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
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-dim">
          M.S. Computer Science (AI/ML) at Cal Poly, previously at Expedia Group. Every
          meaningful project I&apos;ve built is documented in the archive — architecture,
          tradeoffs, and all.
        </p>
      </HeroReveal>

      <HeroReveal delay={0.34}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
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
  );
}
