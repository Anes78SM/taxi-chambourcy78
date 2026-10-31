import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { locations } from '@/data/locations';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Zones desservies',
  description:
    'Taxi premium à Chambourcy, Saint-Germain-en-Laye, Poissy, Orgeval et dans tout l’Ouest parisien. Découvrez nos zones desservies.',
  path: '/zones',
});

export default function ZonesIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Zones desservies', path: '/zones' },
        ])}
      />
      <PageHero
        eyebrow="Zones desservies"
        title="Un service de proximité sur tout l’Ouest parisien"
        description="Au départ de Chambourcy, nous desservons les communes voisines et l’ensemble de l’Île-de-France."
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Zones desservies', path: '/zones' },
        ]}
      />
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/zones/${location.slug}`}
                className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-5 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
              >
                <span>
                  <span className="block font-serif text-lg text-ink-900">{location.name}</span>
                  <span className="mt-1 block text-xs text-ink-900/50">{location.tagline}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-900/30 transition-colors group-hover:text-champagne-dark" aria-hidden />
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
