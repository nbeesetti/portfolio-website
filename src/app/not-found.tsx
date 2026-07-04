import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 pt-16">
      <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent">404</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-ink-dim">
        The link may be stale, or the project was renamed. Everything worth finding is in the
        archive.
      </p>
      <Link
        href="/projects"
        className="mt-2 rounded-xl bg-accent-soft px-5 py-2.5 text-sm font-medium text-accent-bright ring-1 ring-inset ring-edge-strong transition-colors hover:ring-accent"
      >
        Browse all projects
      </Link>
    </div>
  );
}
