import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ReassuranceBar } from '@/components/home/ReassuranceBar';
import { googleBusiness } from '@/data/reviews';

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-ink-900 pt-[88px] text-white lg:flex lg:min-h-[100svh] lg:flex-col">
      {/* Image de fond */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero/hero-chauffeur.webp"
          alt="Chauffeur de taxi à Chambourcy en costume, adossé à sa BMW noire siglée Taxi Chambourcy 78"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] lg:object-contain lg:object-right-bottom"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #080d10 0%, rgba(8,13,16,0.94) 24%, rgba(8,13,16,0.6) 52%, rgba(8,13,16,0.1) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(transparent, rgba(8,13,16,0.85))' }}
        />
      </div>

      <Container className="relative z-10 py-12 sm:py-16 lg:flex lg:flex-1 lg:flex-col lg:justify-end lg:pb-12 lg:pt-16">
        <p className="eyebrow text-champagne">Service de taxi premium • Chambourcy</p>
        <h1 className="mt-5 max-w-3xl text-display">
          Taxi Chambourcy <span className="text-champagne">(78)</span>
          <span className="mt-4 block font-sans text-[clamp(1rem,2vw,1.4rem)] font-medium leading-snug tracking-normal text-cream/85">
            Réservation, tarifs et transport 7j/7
          </span>
        </h1>
        <p className="mt-4 text-sm font-semibold tracking-[0.2em] text-champagne/90">
          CONFORT · PONCTUALITÉ · DISCRÉTION
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80">
          Besoin d’un taxi à Chambourcy ? Anes vous prend en charge à domicile, au bureau ou à
          l’hôtel. Il vous conduit ainsi vers les gares, les aéroports de Paris et vos rendez-vous,
          7j/7. Indiquez simplement votre trajet et votre horaire : nous faisons le reste.
        </p>
        <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-cream/90">
          <span className="text-base tracking-widest text-champagne" aria-hidden>
            ★★★★★
          </span>
          <span>
            <strong className="font-semibold text-white">
              {googleBusiness.rating.toFixed(1).replace('.', ',')}/5
            </strong>{' '}
            · {googleBusiness.reviewCount} avis sur Google
          </span>
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/#reservation" size="lg">
            Réserver votre trajet
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/#services" variant="outline" size="lg">
            Découvrir nos services
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Container>

      {/* Barre de réassurance (translucide, sur l'image, calée en bas sur desktop) */}
      <ReassuranceBar className="bg-ink-900/70 backdrop-blur-sm lg:mt-auto lg:bg-ink-900/55" />
    </section>
  );
}
