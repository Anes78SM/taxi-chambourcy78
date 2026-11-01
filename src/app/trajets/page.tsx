import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { routes, estimatePriceRange, type RouteCategory } from '@/data/routes';

export const metadata: Metadata = buildMetadata({
  title: 'Trajets en taxi au départ de Chambourcy',
  description:
    'Taxi de Chambourcy vers les aéroports (CDG, Orly, Le Bourget, Beauvais), les gares parisiennes, La Défense et Disneyland : prix estimés, durées et réservation 7j/7.',
  path: '/trajets',
});

const ORDER: RouteCategory[] = ['Aéroport', 'Gare', 'Quartier d’affaires', 'Loisir'];

export default function TrajetsPage() {
  const groups = ORDER.map((category) => ({
    category,
    items: routes.filter((r) => r.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Trajets', path: '/trajets' },
        ])}
      />
      <PageHero
        eyebrow="Trajets"
        title="Trajets en taxi au départ de Chambourcy"
        description="Aéroports, gares parisiennes, La Défense, Disneyland : retrouvez nos itinéraires les plus demandés, avec une estimation de prix et de durée."
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Trajets', path: '/trajets' },
        ]}
      />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="space-y-16">
            {groups.map((group) => (
              <div key={group.category}>
                <SectionHeading eyebrow="Destinations" title={group.category} />
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((r, i) => {
                    const price = estimatePriceRange(r.distanceKm);
                    return (
                      <Reveal key={r.slug} delay={(i % 3) * 60}>
                        <Link
                          href={`/trajets/${r.slug}`}
                          className="group flex h-full items-start justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
                        >
                          <span>
                            <span className="block font-serif text-lg text-ink-900">
                              {r.shortName}
                            </span>
                            <span className="mt-1 block text-xs text-ink-900/55">
                              ~ {r.distanceKm} km · {r.durationMin[0]}–{r.durationMin[1]} min · ≈ {price.low}–{price.high} €
                            </span>
                          </span>
                          <ArrowUpRight
                            className="h-5 w-5 shrink-0 text-ink-900/30 transition-colors group-hover:text-champagne-dark"
                            aria-hidden
                          />
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink-800/60">
            Prix estimés selon le tarif réglementé des Yvelines (jour) ; plus élevés la nuit, le
            dimanche et les jours fériés. Un forfait à prix fixe est possible vers les aéroports. Le
            taximètre fait foi — <Link href="/#tarifs" className="text-champagne-dark underline underline-offset-2">voir la grille tarifaire</Link>.
          </p>
        </Container>
      </section>

      <CTASection primaryHref="/#reservation" />
    </>
  );
}
