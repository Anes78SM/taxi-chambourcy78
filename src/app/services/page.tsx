import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { ServiceCard } from '@/components/services/ServiceCard';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { services } from '@/data/services';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Nos services de taxi premium',
  description:
    'Transferts aéroports, taxi professionnel, trajets privés et mise à disposition à Chambourcy et en Île-de-France.',
  path: '/services',
});

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <PageHero
        eyebrow="Nos services"
        title="Des solutions de transport pour tous vos déplacements"
        description="Un service premium pensé pour vos transferts aéroports, vos déplacements professionnels, vos trajets privés et vos mises à disposition."
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />
      <section className="bg-ink-900 py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
