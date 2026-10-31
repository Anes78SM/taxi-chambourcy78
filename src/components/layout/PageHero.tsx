import { Container } from '@/components/ui/Container';
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
};

/** En-tête sombre et sobre pour les pages internes. */
export function PageHero({ eyebrow, title, description, crumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pb-16 pt-[136px] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            'radial-gradient(60% 120% at 85% 0%, rgba(216,185,139,0.14), transparent 60%)',
        }}
      />
      <Container className="relative z-10">
        <Breadcrumb items={crumbs} tone="light" className="mb-7" />
        {eyebrow && <p className="eyebrow text-champagne">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl text-display text-balance" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}>
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist">{description}</p>
        )}
      </Container>
    </section>
  );
}
