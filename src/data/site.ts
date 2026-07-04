/**
 * ============================================================
 * SITE-WIDE SETTINGS — edit your name, links, and SEO here.
 * ============================================================
 */
export const site = {
  name: "Neeraja Beesetti",
  /** Short role line used in the nav, footer, and metadata. */
  role: "Software Engineer · ML Engineer",
  tagline: "Software & ML engineer with full-stack range and product sense",
  description:
    "Portfolio and project archive of Neeraja Beesetti — software engineer and ML engineer building full-stack products, agentic AI systems, and distributed infrastructure.",

  // TODO: replace with your real deployed domain after you deploy to Vercel
  // (e.g. "https://neeraja.dev"). Used for canonical URLs and Open Graph.
  url: "https://example.com",

  email: "neerajabeesetti@gmail.com",
  location: "San Luis Obispo, CA",

  socials: {
    github: "https://github.com/nbeesetti",
    linkedin: "https://linkedin.com/in/neerajabeesetti",
  },

  /** One personal touch, straight from the resume. */
  funFact: "Avid tennis player",
} as const;

/** Top navigation. Order here is the order rendered. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
