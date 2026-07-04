import type { CaseStudy as CaseStudyData, ProductThinking } from "@/data/projects";
import { Reveal } from "./Reveal";

/* Section order + headings for the case-study body. Only sections with
   content render, so sparse projects still read cleanly. */
const CASE_SECTIONS: Array<{ key: keyof CaseStudyData; heading: string }> = [
  { key: "problem", heading: "Problem & motivation" },
  { key: "role", heading: "My role" },
  { key: "architecture", heading: "Architecture" },
  { key: "implementation", heading: "Implementation details" },
  { key: "keyFeatures", heading: "Key features" },
  { key: "mlDetails", heading: "ML & modeling details" },
  { key: "tradeoffs", heading: "Tradeoffs" },
  { key: "results", heading: "Results & current status" },
  { key: "lessons", heading: "Lessons learned" },
  { key: "futureWork", heading: "Future work" },
];

const PRODUCT_FIELDS: Array<{ key: keyof ProductThinking; label: string }> = [
  { key: "userProblem", label: "User problem" },
  { key: "targetUser", label: "Target user" },
  { key: "productDecision", label: "Product decision" },
  { key: "tradeoff", label: "Tradeoff" },
  { key: "successMetric", label: "Success metric" },
  { key: "roadmapIdea", label: "Roadmap idea" },
];

/** Renders string content as paragraphs (split on \n\n) or string[] as bullets. */
function SectionBody({ content }: { content: string | string[] }) {
  if (Array.isArray(content)) {
    return (
      <ul className="space-y-2.5">
        {content.map((item, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink-dim">
            <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="space-y-4">
      {content.split("\n\n").map((para, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-ink-dim">
          {para}
        </p>
      ))}
    </div>
  );
}

/** The long-form body of a project page. */
export default function CaseStudy({
  caseStudy,
  product,
}: {
  caseStudy?: CaseStudyData;
  product?: ProductThinking;
}) {
  const sections = CASE_SECTIONS.filter(({ key }) => {
    const value = caseStudy?.[key];
    return value && (typeof value === "string" || value.length > 0);
  });

  const productRows = PRODUCT_FIELDS.filter(({ key }) => product?.[key]);

  if (sections.length === 0 && productRows.length === 0) return null;

  return (
    <div className="space-y-12">
      {sections.map(({ key, heading }) => (
        <Reveal key={key}>
          <section aria-labelledby={`section-${key}`}>
            <h2
              id={`section-${key}`}
              className="mb-3 font-display text-lg font-semibold tracking-tight text-ink"
            >
              {heading}
            </h2>
            <SectionBody content={caseStudy![key]!} />
          </section>
        </Reveal>
      ))}

      {/* Product thinking renders as a definition-list panel, and only
          when at least one field is filled in. */}
      {productRows.length > 0 && (
        <Reveal>
          <section aria-labelledby="section-product" className="glass rounded-2xl p-6 sm:p-8">
            <h2
              id="section-product"
              className="mb-5 font-display text-lg font-semibold tracking-tight text-ink"
            >
              Product thinking
            </h2>
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {productRows.map(({ key, label }) => (
                <div key={key}>
                  <dt className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-ink-dim">{product![key]}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>
      )}
    </div>
  );
}
