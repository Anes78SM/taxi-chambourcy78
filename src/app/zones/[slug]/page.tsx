import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, ArrowUpRight, Navigation } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { ZoneHero } from '@/components/zones/ZoneHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/home/CTASection';
import { ReassuranceBar } from '@/components/home/ReassuranceBar';
import { ClientsSection } from '@/components/home/ClientsSection';
import { BookingSection } from '@/components/home/BookingSection';
import { HowToBookSection } from '@/components/home/HowToBookSection';
import { PricingSection } from '@/components/home/PricingSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
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

      <ZoneHero
        city={location.name}
        title={location.title}
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Zones desservies', path: '/zones' },
          { name: location.name, path },
        ]}
      />

      <ReassuranceBar />

      {/* Ils nous font confiance */}
      <ClientsSection />

      {/* Réserver un taxi à {ville} */}
      <BookingSection city={location.name} />

      {/* Contexte + besoins */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <Reveal>
              <p className="eyebrow text-champagne-dark">Taxi à {location.name}</p>
              <h2 className="mt-4 text-h2 text-ink-900">Un transport premium à {location.name}</h2>
              <div className="prose-content mt-6 max-w-none">
                {location.context.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-[var(--radius-lg)] border border-ink-900/10 bg-white p-7 shadow-card sm:p-8">
                <h3 className="font-serif text-xl text-ink-900">Vos besoins de transport</h3>
                <ul className="mt-6 space-y-4">
                  {location.needs.map((need) => (
                    <li
                      key={need}
                      className="flex items-start gap-3.5 text-sm leading-relaxed text-ink-800/85"
                    >
                      <span className="mt-0.5 inline-grid h-7 w-7 shrink-0 place-items-center rounded-full bg-champagne/15 text-champagne-dark">
                        <Check className="h-4 w-4" aria-hidden strokeWidth={2} />
                      </span>
                      {need}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Principales destinations"
            title={`Au départ de ${location.name}`}
            description={`Les trajets les plus demandés au départ de ${location.name}.`}
            tone="light"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {location.destinations.map((dest, i) => (
              <Reveal key={dest.label} delay={(i % 2) * 80}>
                <div className="group flex h-full items-start gap-4 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-6 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne/40 hover:bg-white/[0.07]">
                  <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-full bg-champagne/15 text-champagne">
                    <Navigation className="h-5 w-5" aria-hidden strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-white">{dest.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{dest.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Infos pratiques + services */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow text-champagne-dark">Bon à savoir</p>
              <h2 className="mt-4 text-h2 text-ink-900">Informations pratiques</h2>
              <ul className="mt-7 space-y-4">
                {location.practical.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 text-sm leading-relaxed text-ink-800/85"
                  >
                    <span className="mt-0.5 inline-grid h-7 w-7 shrink-0 place-items-center rounded-full bg-champagne/15 text-champagne-dark">
                      <Check className="h-4 w-4" aria-hidden strokeWidth={2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="#reservation" variant="dark" className="mt-8">
                Réserver depuis {location.name}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow text-champagne-dark">Prestations</p>
              <h3 className="mt-4 font-serif text-2xl text-ink-900">Nos services à {location.name}</h3>
              <div className="mt-6 grid gap-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={s.icon} className="h-5 w-5 text-champagne-dark" />
                      <span className="font-medium text-ink-900">{s.name}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-900/30 transition-colors group-hover:text-champagne-dark" aria-hidden />
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Comment commander */}
      <HowToBookSection city={location.name} />

      {/* Tarifs */}
      <PricingSection city={location.name} />

      {/* Avis clients */}
      <ReviewsSection />

      {/* FAQ */}
      {location.faq.length > 0 && (
        <section className="bg-[#f7f4ef] py-20 sm:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <SectionHeading
                eyebrow="Questions fréquentes"
                title={`Taxi à ${location.name}`}
                description={`Les réponses aux questions les plus fréquentes sur le taxi à ${location.name}.`}
              />
              <FAQAccordion items={location.faq} />
            </div>
          </Container>
        </section>
      )}

      {/* Autres zones */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Autres zones desservies"
            title="Nous intervenons aussi à proximité"
            description="Au départ de Chambourcy, nous rayonnons sur tout l’Ouest parisien et l’Île-de-France."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((l, i) => (
              <Reveal key={l.slug} delay={(i % 3) * 60}>
                <Link
                  href={`/zones/${l.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
                >
                  <span>
                    <span className="block font-serif text-lg text-ink-900">{l.name}</span>
                    {l.postalCode && (
                      <span className="text-xs text-ink-900/45">{l.postalCode}</span>
                    )}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-900/30 transition-colors group-hover:text-champagne-dark" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection primaryHref="#reservation" />
    </>
  );
}
