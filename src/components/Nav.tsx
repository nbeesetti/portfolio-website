"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/data/site";

/**
 * Sticky glass navigation. Highlights the active section and collapses
 * to a disclosure menu on small screens.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6">
        <nav
          aria-label="Main"
          className="glass flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-5"
        >
          <Link
            href="/"
            className="font-display text-[15px] font-semibold tracking-tight text-ink transition-colors hover:text-accent-bright"
            onClick={() => setOpen(false)}
          >
            {site.name}
            <span className="ml-2 hidden font-mono text-[11px] font-normal text-ink-faint sm:inline">
              SWE / ML
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 sm:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    isActive(href)
                      ? "bg-accent-soft text-accent-bright"
                      : "text-ink-dim hover:bg-glass-strong hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded-lg p-2 text-ink-dim hover:text-ink sm:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <ul id="mobile-nav" className="glass mt-2 rounded-2xl p-2 sm:hidden">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm ${
                    isActive(href)
                      ? "bg-accent-soft text-accent-bright"
                      : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
