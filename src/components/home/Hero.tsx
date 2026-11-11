import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Landmark, MapPin, BadgeCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ReassuranceBar } from '@/components/home/ReassuranceBar';
import { googleBusiness } from '@/data/reviews';
import { siteConfig } from '@/config/site';

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-ink-900 pt-[88px] text-white lg:flex lg:min-h-[100svh] lg:flex-col">
      {/* Image de fond */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero/hero-chauffeur-panneau.webp"
          alt="Chauffeur de taxi à Chambourcy en costume devant sa BMW, panneau lumineux « Taxi Chambourcy »"
          fill
          priority
          fetchPriority="high"
          quality={74}
          sizes="100vw"
          className="object-cover object-[46%_28%] lg:object-[40%_30%]"
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
        <a
          href={siteConfig.officialListing.mairieChambourcyUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="absolute left-gutter top-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-ink-900/70 px-2.5 py-1 text-[11px] font-medium text-cream backdrop-blur-sm transition-colors hover:border-champagne/60 lg:static lg:left-auto lg:top-auto lg:z-auto lg:mb-5 lg:gap-2 lg:self-start lg:bg-champagne/10 lg:px-3.5 lg:py-1.5 lg:text-xs lg:hover:bg-champagne/15"
        >
          <Landmark
            className="h-3 w-3 shrink-0 text-champagne lg:h-3.5 lg:w-3.5"
            aria-hidden
            strokeWidth={1.75}
          />
          Référencé à l’annuaire officiel de la mairie
        </a>
        <p className="eyebrow inline-flex w-fit items-center gap-1.5 text-champagne tracking-[0.1em] sm:tracking-[0.3em]">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden strokeWidth={2.25} />
          Taxi local à Chambourcy (78)
        </p>
        <h1
          className="mt-4 max-w-3xl font-serif leading-[1.08] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(2rem, 4.6vw, 3.75rem)' }}
        >
          Taxi Chambourcy <span className="text-champagne">(78)</span>
          <span className="mt-3 block font-sans text-[clamp(0.95rem,1.7vw,1.2rem)] font-medium leading-snug tracking-normal text-cream/85">
            Un vrai taxi de Chambourcy, disponible 7j/7
          </span>
        </h1>
        <p className="mt-3 hidden text-xs font-semibold tracking-[0.18em] text-champagne/90 sm:block sm:text-sm sm:tracking-[0.2em]">
          CONFORT · PONCTUALITÉ · DISCRÉTION
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/80 sm:max-w-2xl sm:text-[0.95rem]">
          Besoin d’un taxi à Chambourcy ? Anes vous prend en charge à domicile, au bureau ou à
          l’hôtel. Il vous conduit ainsi vers les gares, les aéroports de Paris et vos rendez-vous,
          7j/7.
          <span className="hidden sm:inline">
            {' '}
            Indiquez simplement votre trajet et votre horaire : nous faisons le reste.
          </span>
        </p>
        <a
          href="#avis"
          className="group mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-cream/90 transition-colors hover:text-white"
        >
          <span className="text-base tracking-widest text-champagne" aria-hidden>
            ★★★★★
          </span>
          <span>
            <strong className="font-semibold text-white">
              {googleBusiness.rating.toFixed(1).replace('.', ',')}/5
            </strong>{' '}
            · {googleBusiness.reviewCount} avis sur Google
          </span>
          <span className="font-semibold text-champagne underline underline-offset-2 transition-colors group-hover:text-champagne-light">
            Voir les avis
          </span>
        </a>
        <div className="mt-7 flex flex-wrap gap-3">
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

      {/* Légende : panneau taxi officiel (desktop) */}
      <div className="pointer-events-none absolute left-[39%] top-[132px] z-20 hidden items-center gap-1.5 rounded-full bg-ink-900/80 px-3 py-1.5 text-[11px] font-medium text-cream ring-1 ring-champagne/45 backdrop-blur-sm lg:inline-flex">
        <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-champagne" aria-hidden strokeWidth={2} />
        Panneau taxi officiel
      </div>

      {/* Barre de réassurance (translucide, sur l'image, calée en bas sur desktop) */}
      <ReassuranceBar className="bg-ink-900/70 backdrop-blur-sm lg:mt-auto lg:bg-ink-900/55" />
    </section>
  );
}
