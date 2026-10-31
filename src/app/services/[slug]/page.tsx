import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, MapPin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ServiceHero } from '@/components/services/ServiceHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { ReassuranceBar } from '@/components/home/ReassuranceBar';
import { BookingSection } from '@/components/home/BookingSection';
import { PricingSection } from '@/components/home/PricingSection';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getService, getServiceSlugs, services } from '@/data/services';
import { buildMetadata, serviceSchema, breadcrumbSchema, faqSchema, absoluteUrl } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.cardDescription,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const others = services.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.cardDescription,
            url: absoluteUrl(path),
          }),
          breadcrumbSchema(crumbs),
          faqSchema(service.faq),
        ]}
      />

      <ServiceHero service={service} crumbs={crumbs} />

      <ReassuranceBar />

      {/* Présentation + aperçu du véhicule */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="eyebrow text-champagne-dark">{service.name}</p>
              <h2 className="mt-4 text-h2 text-ink-900">{service.tagline}</h2>
              <div className="prose-content mt-6 max-w-none">
                {service.intro.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] shadow-card">
                <Image
                  src="/images/BMW_bleu_aux_details_raffines.webp"
                  alt="Le véhicule du service — break BMW bleu nuit : extérieur, habitacle, poste de conduite et coffre"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Bénéfices */}
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Bénéfices"
            title="Ce que ce service vous apporte"
            description="Les points forts qui font la différence sur ce type de trajet."
            tone="light"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={(i % 3) * 80}>
                <div className="h-full rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-7 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne/40 hover:bg-white/[0.07]">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-champagne/15 font-serif text-lg text-champagne">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Informations pratiques + destinations */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow text-champagne-dark">Bon à savoir</p>
              <h2 className="mt-4 text-h2 text-ink-900">Informations pratiques</h2>
              <ul className="mt-7 space-y-4">
                {service.practical.map((item) => (
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
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow text-champagne-dark">Où nous allons</p>
              <h2 className="mt-4 text-h2 text-ink-900">Destinations desservies</h2>
              <ul className="mt-7 space-y-3">
                {service.destinations.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-3.5 text-sm text-ink-800/85 transition-colors hover:border-champagne/60"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Réserver */}
      <BookingSection />

      {/* Tarifs */}
      <PricingSection />

      {/* FAQ */}
      <section className="bg-[#f7f4ef] py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Questions fréquentes"
              title={`${service.name} : vos questions`}
              description="Les réponses aux questions les plus courantes sur ce service."
            />
            <FAQAccordion items={service.faq} />
          </div>
        </Container>
      </section>

      {/* Autres services */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Nos autres services"
            title="Poursuivre votre découverte"
            description="Un besoin différent ? Découvrez l’ensemble de nos prestations."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
                >
                  <span className="flex items-center gap-3">
                    <Icon name={s.icon} className="h-5 w-5 text-champagne-dark" />
                    <span className="font-medium text-ink-900">{s.name}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-900/30 transition-colors group-hover:text-champagne-dark" aria-hidden />
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
