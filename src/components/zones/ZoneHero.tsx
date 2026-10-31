import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb';
import { siteConfig, hasRealContact } from '@/config/site';

type ZoneHeroProps = {
  city: string;
  title: string;
  crumbs: Crumb[];
};

/** Hero d'une page zone : photo de fond, requête cible « Taxi à {ville} » et CTA. */
export function ZoneHero({ city, title, crumbs }: ZoneHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pb-16 pt-[136px] text-white sm:pb-20 lg:min-h-[72vh] lg:pb-24">
      {/* Image de fond */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #080d10 0%, rgba(8,13,16,0.93) 30%, rgba(8,13,16,0.58) 62%, rgba(8,13,16,0.12) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'linear-gradient(transparent, rgba(8,13,16,0.9))' }}
        />
      </div>

      <Container className="relative z-10 flex h-full flex-col lg:min-h-[calc(72vh-136px)] lg:justify-center">
        <Breadcrumb items={crumbs} tone="light" className="mb-7" />
        <p className="eyebrow text-champagne">Zone desservie · Yvelines (78)</p>
        <h1
          className="mt-4 max-w-3xl text-display text-balance"
          style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
        >
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/85">
          Besoin d’un taxi à {city} ? Nous assurons vos transferts vers les gares et les aéroports,
          mais aussi vos déplacements professionnels et vos trajets privés. Le tout au départ de{' '}
          {city} et des communes voisines, 7j/7, à l’avance comme en course immédiate.
        </p>
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
