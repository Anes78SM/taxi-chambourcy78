import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Navigation } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getLocation, getLocationSlugs, locations } from '@/data/locations';
import { services } from '@/data/services';
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema, absoluteUrl } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return buildMetadata({
    title: location.title,
    description: `${location.tagline}. Transferts aéroports, déplacements professionnels et trajets privés au départ de ${location.name}.`,
    path: `/zones/${location.slug}`,
  });
}

export default async function ZonePage({ params }: Params) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const path = `/zones/${location.slug}`;
  const others = locations.filter((l) => l.slug !== location.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `Taxi à ${location.name}`,
            description: location.tagline,
            url: absoluteUrl(path),
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Zones desservies', path: '/zones' },
            { name: location.name, path },
          ]),
          faqSchema(location.faq),
        ]}
      />

      <PageHero
        eyebrow="Zone desservie"
        title={location.title}
        description={location.tagline}
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Zones desservies', path: '/zones' },
          { name: location.name, path },
        ]}
      />

      {/* Contexte + besoins */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="prose-content max-w-none">
              <h2>Un transport premium à {location.name}</h2>
              {location.context.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div>
              <h2 className="font-serif text-2xl text-ink-900">Vos besoins de transport</h2>
              <ul className="mt-6 space-y-4">
                {location.needs.map((need) => (
                  <li key={need} className="flex gap-3 text-sm leading-relaxed text-ink-800/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                    {need}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Principales destinations"
            title={`Au départ de ${location.name}`}
            tone="light"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {location.destinations.map((dest) => (
              <div
                key={dest.label}
                className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-white/10 bg-ink-800/60 p-6"
              >
                <Navigation className="mt-0.5 h-5 w-5 shrink-0 text-champagne" aria-hidden strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-lg text-white">{dest.label}</h3>
                  <p className="mt-1 text-sm text-mist">{dest.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Infos pratiques + services */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl text-ink-900">Informations pratiques</h2>
              <ul className="mt-6 space-y-4">
                {location.practical.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-800/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/#reservation" variant="dark">
                  Réserver depuis {location.name}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-ink-900">Nos services à {location.name}</h2>
              <div className="mt-6 grid gap-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
                  >
                    <span className="font-medium text-ink-900">{s.name}</span>
                    <ArrowRight className="h-4 w-4 text-ink-900/30 transition-colors group-hover:text-champagne-dark" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {location.faq.length > 0 && (
        <section className="bg-[#f7f4ef] py-20 sm:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <SectionHeading eyebrow="Questions fréquentes" title={`Taxi à ${location.name}`} />
              <FAQAccordion items={location.faq} />
            </div>
          </Container>
        </section>
      )}

      {/* Autres zones */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Autres zones desservies" title="Nous intervenons aussi à proximité" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((l) => (
              <Link
                key={l.slug}
                href={`/zones/${l.slug}`}
                className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
              >
                <span className="font-medium text-ink-900">{l.name}</span>
                <ArrowRight className="h-4 w-4 text-ink-900/30 transition-colors group-hover:text-champagne-dark" aria-hidden />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
