import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, MapPin, Info, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/home/CTASection';
import { Icon } from '@/components/ui/Icon';
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

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.cardDescription,
            url: absoluteUrl(path),
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path },
          ]),
          faqSchema(service.faq),
        ]}
      />

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.tagline}
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.name, path },
        ]}
      />

      {/* Présentation + image */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="prose-content max-w-none">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-champagne">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <span className="eyebrow text-champagne-dark">{service.name}</span>
              </div>
              {service.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-card">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Bénéfices */}
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading eyebrow="Bénéfices" title="Ce que ce service vous apporte" tone="light" />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {service.benefits.map((benefit) => (
              <div key={benefit.title} className="border-t border-white/15 pt-6">
                <h3 className="font-serif text-xl text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Informations pratiques + destinations */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-champagne-dark">
                <Info className="h-5 w-5" aria-hidden strokeWidth={1.5} />
                <h2 className="font-serif text-2xl text-ink-900">Informations pratiques</h2>
              </div>
              <ul className="mt-6 space-y-4">
                {service.practical.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-800/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-champagne-dark">
                <MapPin className="h-5 w-5" aria-hidden strokeWidth={1.5} />
                <h2 className="font-serif text-2xl text-ink-900">Destinations desservies</h2>
              </div>
              <ul className="mt-6 space-y-3">
                {service.destinations.map((item) => (
                  <li
                    key={item}
                    className="rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-3.5 text-sm text-ink-800/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7f4ef] py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading eyebrow="Questions fréquentes" title={`${service.name} : vos questions`} />
            <FAQAccordion items={service.faq} />
          </div>
        </Container>
      </section>

      {/* Autres services */}
      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Nos autres services" title="Poursuivre votre découverte" />
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-ink-900/10 bg-white px-5 py-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-champagne hover:shadow-card"
              >
                <span className="flex items-center gap-3">
                  <Icon name={s.icon} className="h-5 w-5 text-champagne-dark" />
                  <span className="font-medium text-ink-900">{s.name}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-ink-900/30 transition-colors group-hover:text-champagne-dark" aria-hidden />
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/#reservation" variant="dark">
              Réserver ce service
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
