import { Clock, Gem, UserRound, ShieldCheck, MapPin, Languages } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/ui/Marquee';
import { cn } from '@/lib/utils';

const features = [
  { icon: Clock, label: 'Ponctualité\net sérénité' },
  { icon: Gem, label: 'Véhicule BMW\nspacieux' },
  { icon: UserRound, label: 'Chauffeur\nprofessionnel' },
  { icon: ShieldCheck, label: 'Trajets discrets\net sécurisés' },
  { icon: Languages, label: 'Langues parlées\nFR · EN · ES' },
  { icon: MapPin, label: 'Chambourcy et\nÎle-de-France' },
];

/**
 * Bandeau de réassurance : bandeau défilant en mobile/tablette, rangée alignée sur desktop.
 * Réutilisé dans le hero (fond translucide via className) et en bande autonome (fond plein).
 */
export function ReassuranceBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative z-10 border-t border-white/12 bg-ink-900 text-cream',
        className,
      )}
    >
      {/* Mobile & tablette : bandeau défilant */}
      <Marquee className="py-4 lg:hidden" durationSec={28} gap="2.75rem" ariaLabel="Nos atouts">
        {features.map(({ icon: FeatureIcon, label }) => (
          <span key={label} className="flex shrink-0 items-center gap-2.5 text-xs text-cream/90">
            <FeatureIcon className="h-5 w-5 shrink-0 text-champagne" aria-hidden strokeWidth={1.5} />
            <span className="whitespace-nowrap">{label.replace(/\n/g, ' ')}</span>
          </span>
        ))}
      </Marquee>

      {/* Desktop : rangée alignée */}
      <Container className="hidden lg:block">
        <ul className="flex items-center justify-between gap-8 py-5">
          {features.map(({ icon: FeatureIcon, label }) => (
            <li key={label} className="flex items-center gap-3 text-xs leading-tight text-cream/90">
              <FeatureIcon className="h-5 w-5 shrink-0 text-champagne" aria-hidden strokeWidth={1.5} />
              <span className="whitespace-pre-line">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
