import Image from 'next/image';
import { ArrowRight, ArrowUpRight, CalendarCheck, CarFront, Clock, Landmark, MapPin, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { HeroVehicleRail } from '@/components/home/HeroVehicleRail';
import { ReassuranceBar } from '@/components/home/ReassuranceBar';
import { googleBusiness } from '@/data/reviews';
import { siteConfig } from '@/config/site';

const pills = [
  { icon: CarFront, strong: 'Confort', rest: '& ponctualité' },
  { icon: ShieldCheck, strong: 'Sécurité', rest: '& discrétion' },
  { icon: Clock, strong: 'Disponible', rest: '7j/7' },
];

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-ink-900 pt-[88px] text-white lg:flex lg:min-h-[100svh] lg:flex-col"
    >
      {/* Accents décoratifs verts (coins) */}
      <div
        className="pointer-events-none absolute -left-28 -top-24 z-[1] h-80 w-80 rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(106,165,32,0.18), transparent 70%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-20 z-[1] h-96 w-96 rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(106,165,32,0.14), transparent 70%)' }}
        aria-hidden
      />

      {/* Split 20 / 80 */}
      <div className="relative lg:flex lg:flex-1">
        {/* 20 % : colonne de photos du véhicule (desktop) */}
        <HeroVehicleRail />

        {/* 80 % : photo du chauffeur + texte */}
        <div className="relative overflow-hidden lg:w-4/5">
          {/* Fond : photo réelle du chauffeur devant la BMW */}
          <div className="absolute inset-0" aria-hidden>
            <Image
              src="/images/hero/hero-chauffeur.webp"
              alt="Chauffeur de taxi à Chambourcy en costume devant sa BMW noire, panneau « Taxi Chambourcy »"
              fill
              priority
              fetchPriority="high"
              quality={76}
              sizes="100vw"
              className="object-cover object-[50%_20%] lg:object-[8%_24%]"
            />
            {/* Dégradé progressif gauche → droite pour la lisibilité du texte */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, #090f10 0%, rgba(9,15,16,0.92) 30%, rgba(9,15,16,0.56) 58%, rgba(9,15,16,0.08) 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-44"
              style={{ background: 'linear-gradient(transparent, rgba(9,15,16,0.82))' }}
            />
          </div>

          <div className="relative z-10 px-gutter py-12 sm:py-16 lg:flex lg:h-full lg:flex-col lg:justify-end lg:pb-14 lg:pt-16">
            {/* Badge de confiance — annuaire mairie */}
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

            <Reveal className="lg:max-w-[620px]">
              <p className="eyebrow inline-flex w-fit items-center gap-1.5 text-champagne tracking-[0.1em] sm:tracking-[0.3em]">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden strokeWidth={2.25} />
                Taxi local à Chambourcy (78)
              </p>
              <h1
                className="mt-4 font-serif leading-[1.06] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.9rem)' }}
              >
                Taxi Chambourcy <span className="text-champagne">(78)</span>
                <span className="mt-3 block font-sans text-[clamp(1rem,1.7vw,1.25rem)] font-medium leading-snug tracking-normal text-cream/85">
                  Votre taxi local, disponible 7j/7
                </span>
              </h1>
            </Reveal>

            {/* Pavés de confiance */}
            <Reveal delay={90} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 lg:max-w-[620px]">
              {pills.map(({ icon: PillIcon, strong, rest }) => (
                <div key={strong} className="flex items-center gap-2.5">
                  <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-full border border-champagne/30 bg-champagne/10 text-champagne">
                    <PillIcon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                  </span>
                  <span className="text-xs leading-tight text-cream/80">
                    <span className="block font-semibold text-white">{strong}</span>
                    {rest}
                  </span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={170} className="lg:max-w-[720px]">
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-[0.95rem]">
                Besoin d’un taxi à Chambourcy ? Anes vous prend en charge pour vos trajets privés,
                professionnels, ou vers les gares et aéroports en région parisienne. Anes vous conduit
                avec sérieux, ponctualité et confort, partout où vous allez.
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
              {/* CTA : empilés pleine largeur en mobile, sur une même ligne en desktop */}
              <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
                <Button href="/#reservation" size="lg" className="group w-full justify-center lg:w-auto">
                  <CalendarCheck className="h-4 w-4" aria-hidden strokeWidth={2} />
                  Réserver mon taxi
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Button>
                <Button href="/#services" variant="outline" size="lg" className="w-full justify-center lg:w-auto">
                  <CarFront className="h-4 w-4" aria-hidden strokeWidth={2} />
                  Découvrir nos services
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Panneau lumineux « Taxi » (desktop) */}
          <Image
            src="/images/hero/panneau-taxi.webp"
            alt="Panneau lumineux de taxi Chambourcy"
            width={1774}
            height={887}
            className="pointer-events-none absolute bottom-6 right-6 z-20 hidden w-[180px] drop-shadow-[0_14px_30px_rgba(0,0,0,0.55)] lg:block xl:bottom-8 xl:right-10 xl:w-[216px]"
          />
        </div>
      </div>

      {/* Bandeau de réassurance */}
      <ReassuranceBar className="bg-ink-900/70 backdrop-blur-sm lg:mt-auto lg:bg-ink-900/55" />
    </section>
  );
}
