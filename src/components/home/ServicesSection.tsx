import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/data/services';

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 bg-ink-900 py-20 text-white sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Nos services"
          title="Aéroport, pro ou privé : un taxi pour chaque trajet"
          tone="light"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 90}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
