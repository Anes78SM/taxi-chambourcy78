import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Landmark, MapPin, Images } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ReassuranceBar } from '@/components/home/ReassuranceBar';
import { googleBusiness } from '@/data/reviews';
import { siteConfig } from '@/config/site';

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-ink-900 pt-[88px] text-white lg:flex lg:min-h-[100svh] lg:flex-col"
    >
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
          className="object-cover object-[50%_20%] lg:object-[34%_24%]"
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

      <Container className="relative z-10 py-12 sm:py-16 lg:flex lg:flex-1 lg:flex-col lg:justify-end lg:pb-14 lg:pt-16">
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

        <Reveal className="lg:max-w-[600px]">
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

        <Reveal delay={130} className="lg:max-w-[600px]">
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-[0.95rem]">
            Transferts gares et aéroports, déplacements privés et professionnels. Voyagez
            confortablement, en toute sérénité.
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
            <Button href="/#reservation" size="lg" className="group">
              Réserver mon taxi
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5"
                aria-hidden
              />
            </Button>
            <Button href="/#services" variant="outline" size="lg">
              Découvrir nos services
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Reveal>
      </Container>

      {/* Carte discrète « Découvrir le véhicule » (desktop) */}
      <Link
        href="/a-propos"
        className="group absolute bottom-[150px] right-6 z-20 hidden items-center gap-3 rounded-[var(--radius-lg)] border border-white/15 bg-ink-900/55 px-4 py-3 text-cream backdrop-blur-sm transition-colors hover:border-champagne/50 hover:bg-ink-900/70 lg:inline-flex xl:right-10"
      >
        <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-champagne/15 text-champagne">
          <Images className="h-4 w-4" aria-hidden strokeWidth={1.75} />
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold">Découvrir le véhicule</span>
          <span className="block text-[11px] text-cream/65">Break BMW, intérieur et coffre</span>
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-champagne transition-transform duration-200 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </Link>

      {/* Bandeau de réassurance */}
      <ReassuranceBar className="bg-ink-900/70 backdrop-blur-sm lg:mt-auto lg:bg-ink-900/55" />
    </section>
  );
}
