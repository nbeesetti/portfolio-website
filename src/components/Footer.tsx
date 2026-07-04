import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-ink-faint">
          © {new Date().getFullYear()} {site.name} · {site.funFact} 🎾
        </p>
        <ul className="flex gap-5 text-sm">
          <li>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim transition-colors hover:text-accent-bright"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim transition-colors hover:text-accent-bright"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="text-ink-dim transition-colors hover:text-accent-bright"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
