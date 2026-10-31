import { cn } from '@/lib/utils';

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** Durée d'un cycle complet en secondes (plus grand = plus lent). */
  durationSec?: number;
  /** Espacement entre éléments (valeur CSS, ex. "2.5rem"). */
  gap?: string;
  /** Libellé accessible décrivant le contenu du bandeau. */
  ariaLabel?: string;
};

/**
 * Bandeau défilant en boucle (CSS pur), avec fondu sur les côtés.
 * Le contenu est dupliqué pour un défilement sans couture ; la copie est
 * masquée aux lecteurs d'écran. Le défilement se met en pause au survol/focus
 * et s'arrête si l'utilisateur préfère réduire les animations.
 */
export function Marquee({ children, className, durationSec = 40, gap, ariaLabel }: MarqueeProps) {
  const style = {
    '--marquee-duration': `${durationSec}s`,
    ...(gap ? { '--marquee-gap': gap } : {}),
  } as React.CSSProperties;

  return (
    <div className={cn('marquee', className)} style={style} role="group" aria-label={ariaLabel}>
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
