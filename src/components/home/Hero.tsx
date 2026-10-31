import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Clock, Gem, UserRound, ShieldCheck, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const features = [
  { icon: Clock, label: 'Ponctualité\net sérénité' },
  { icon: Gem, label: 'Service\nhaut de gamme' },
  { icon: UserRound, label: 'Chauffeur\nprofessionnel' },
  { icon: ShieldCheck, label: 'Trajets discrets\net sécurisés' },
  { icon: MapPin, label: 'Chambourcy et\nÎle-de-France' },
];

export function Hero() {
  return (
    <section id="accueil" className="relative flex min-h-[760px] items-center overflow-hidden bg-ink-900 pt-[88px] text-white">
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
              'linear-gradient(90deg, #080d10 0%, rgba(8,13,16,0.94) 24%, rgba(8,13,16,0.6) 52%, rgba(8,13,16,0.1) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(transparent, rgba(8,13,16,0.85))' }}
        />
      </div>

      <Container className="relative z-10 py-24">
        <p className="eyebrow text-champagne">Service de taxi premium • Chambourcy</p>
        <h1 className="mt-5 max-w-3xl text-display">Votre taxi premium à Chambourcy</h1>
        <p className="mt-4 text-sm font-semibold tracking-[0.2em] text-champagne/90">
          CONFORT · PONCTUALITÉ · DISCRÉTION
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80">
          Transferts aéroports, déplacements professionnels et trajets privés. Un service de
          transport soigné, adapté à vos exigences, dans un confort haut de gamme.
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

      {/* Barre de réassurance */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/12 bg-ink-900/55 backdrop-blur-sm">
        <Container>
          <ul className="grid grid-cols-2 gap-5 py-5 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-8">
            {features.map(({ icon: FeatureIcon, label }) => (
              <li key={label} className="flex items-center gap-3 text-xs leading-tight text-cream/90">
                <FeatureIcon className="h-5 w-5 shrink-0 text-champagne" aria-hidden strokeWidth={1.5} />
                <span className="whitespace-pre-line">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
