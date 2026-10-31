import { CreditCard, Banknote } from 'lucide-react';
import { cn } from '@/lib/utils';

type PaymentMethodsProps = {
  /** "light" = texte clair (fond sombre), "dark" = texte foncé (fond clair). */
  tone?: 'light' | 'dark';
  className?: string;
};

/**
 * Moyens de paiement acceptés.
 * ⚠️ Valeurs par défaut courantes pour un taxi — à confirmer avec l'exploitant.
 */
export function PaymentMethods({ tone = 'dark', className }: PaymentMethodsProps) {
  const onDark = tone === 'light';
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-5 gap-y-2 text-xs',
        onDark ? 'text-mist' : 'text-ink-800/65',
        className,
      )}
    >
      <span
        className={cn(
          'font-semibold uppercase tracking-wide',
          onDark ? 'text-cream/80' : 'text-ink-900/70',
        )}
      >
        Paiements acceptés
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CreditCard className="h-4 w-4 text-champagne" aria-hidden strokeWidth={1.5} />
        Carte bancaire · Visa · Mastercard
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Banknote className="h-4 w-4 text-champagne" aria-hidden strokeWidth={1.5} />
        Espèces
      </span>
    </div>
  );
}
