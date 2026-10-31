import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb';
import { Icon } from '@/components/ui/Icon';
import { siteConfig, hasRealContact } from '@/config/site';
import type { Service } from '@/types';

/** Hero d'une page service : photo du véhicule, titre, accroche et CTA. */
export function ServiceHero({ service, crumbs }: { service: Service; crumbs: Crumb[] }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pb-16 pt-[136px] text-white sm:pb-20 lg:min-h-[70vh] lg:pb-24">
      {/* Image de fond */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={service.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #080d10 0%, rgba(8,13,16,0.93) 32%, rgba(8,13,16,0.6) 64%, rgba(8,13,16,0.18) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'linear-gradient(transparent, rgba(8,13,16,0.9))' }}
        />
      </div>

      <Container className="relative z-10 flex h-full flex-col lg:min-h-[calc(70vh-136px)] lg:justify-center">
        <Breadcrumb items={crumbs} tone="light" className="mb-7" />
        <div className="flex items-center gap-3">
          <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-champagne/15 text-champagne">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <p className="eyebrow text-champagne">Service · Taxi à Chambourcy</p>
        </div>
        <h1
          className="mt-5 max-w-3xl text-display text-balance"
          style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
        >
          {service.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/85">{service.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#reservation" size="lg">
            Réserver votre trajet
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          {hasRealContact && (
            <Button href={siteConfig.contact.phoneHref} variant="outline" size="lg">
              <Phone className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              {siteConfig.contact.phone}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
