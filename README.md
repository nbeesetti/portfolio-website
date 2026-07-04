<<<<<<< HEAD
# Neeraja Beesetti — Portfolio & Project Archive

A dark, glassmorphic portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**. Fully static — no backend, database, CMS, or paid services — and deployable on Vercel's free tier.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero → skills → 3–4 featured projects → experience preview → contact CTA |
| `/projects` | Full archive: filter by category & status, search by title/tech/tags (press `/`) |
| `/projects/[slug]` | Long-form case study per project (statically generated) |
| `/resume` | Resume page + PDF download |
| `/contact` | Contact channels |

## Run it locally

Requires **Node 20+** (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender statically)
```

> Note: on this machine the default `node` is v17. Use `nvm use 20` or
> `export PATH=/opt/homebrew/opt/node@20/bin:$PATH` first.

## Where to edit content

Everything editable lives in `src/data/` — no content is hardcoded in components.

- **`src/data/projects.ts`** — the file you'll touch most. Each project is one typed object; a copy-paste template lives at the bottom of the file. Notes:
  - `featured: true` puts a project on the homepage (first 4 shown).
  - `status`: `completed | in-progress | paused | archived`.
  - `links` are all optional — use `{ kind: "private" }` for repo-less/internal work, or omit entirely.
  - Every case-study section (`problem`, `architecture`, `tradeoffs`, `lessons`, …) and every product-thinking field (`userProblem`, `successMetric`, …) is optional and hides itself when empty.
  - Reorder projects by reordering the array (grouped by `year`, newest first).
- **`src/data/resume.ts`** — education, experience, skills. Replace `public/resume.pdf` when your resume updates.
- **`src/data/site.ts`** — name, role line, email, social links, SEO description, and **`url`** (set this to your real domain after deploying — it drives canonical URLs and Open Graph).
- **`src/app/globals.css`** — the entire color/font token system, if you ever want to retheme.

Open TODOs are marked with `// TODO:` comments — search the repo for `TODO` to find them (site URL, OG image, per-project links, and case-study sections worth expanding).

## Deploy to Vercel (free tier)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo — Vercel auto-detects Next.js; no configuration needed.
3. Click **Deploy**.
4. Afterwards: set `url` in `src/data/site.ts` to your `*.vercel.app` (or custom) domain and push again.

Every route is prerendered at build time, so the site serves as static files — comfortably within free-tier limits.

## Structure

```
src/
  data/          ← all editable content (projects, resume, site config)
  components/    ← reusable UI (nav, archive, case study, cards, badges)
  app/           ← routes (App Router), layout, global styles
public/          ← resume.pdf, future OG image & screenshots
```

## Accessibility & performance

- Semantic HTML, skip-to-content link, `aria-current` nav, labelled filter groups, live result counts.
- Full keyboard navigation; visible `:focus-visible` rings; `/` focuses archive search.
- All animation is disabled under `prefers-reduced-motion`.
- No canvas/3D/heavy effects — depth comes from CSS gradients and backdrop blur.
=======
# portfolio-website
>>>>>>> origin/main
