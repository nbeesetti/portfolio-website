import type { ProjectLink } from "@/data/projects";

const KIND_LABELS: Record<ProjectLink["kind"], string> = {
  github: "GitHub",
  demo: "Live demo",
  paper: "Paper",
  writeup: "Writeup",
  video: "Video",
  screenshots: "Screenshots",
  private: "Private / internal",
};

/**
 * Renders a project's link set. Links with `href` become external
 * anchors; `private` (or any link without href) renders as a quiet,
 * unlinked note so projects without repos still read as complete.
 */
export default function ProjectLinks({ links }: { links?: ProjectLink[] }) {
  if (!links || links.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link, i) => {
        const label = link.label ?? KIND_LABELS[link.kind];
        if (!link.href || link.kind === "private") {
          return (
            <li key={i}>
              <span className="inline-flex items-center rounded-lg border border-edge px-3 py-1.5 text-sm text-ink-faint">
                {label}
              </span>
            </li>
          );
        }
        return (
          <li key={i}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-edge bg-glass px-3 py-1.5 text-sm text-ink transition-colors hover:border-edge-strong hover:text-accent-bright"
            >
              {label}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
