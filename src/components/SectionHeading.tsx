/**
 * Consistent section header: small mono eyebrow + display heading.
 */
export default function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="mb-8" id={id}>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
