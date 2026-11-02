import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  const isDarkBg = tone === 'light'; // texte clair sur fond sombre
  // Intro alignée à gauche AVEC description : deux colonnes sur desktop
  // (titre à gauche, description à droite) pour exploiter toute la largeur.
  const twoCol = align === 'left' && Boolean(description);

  const descriptionEl = description ? (
    <p
      className={cn(
        'text-base leading-relaxed',
        twoCol ? 'mt-5 max-w-prose lg:mt-0' : 'mt-5',
        isDarkBg ? 'text-mist' : 'text-ink-800/70',
      )}
    >
      {description}
    </p>
  ) : null;

  return (
    <div
      className={cn(
        align === 'center' && 'mx-auto max-w-prose text-center',
        align === 'left' && !twoCol && 'max-w-prose',
        twoCol && 'lg:grid lg:grid-cols-2 lg:items-end lg:gap-x-12',
        className,
      )}
    >
      <div className={cn(twoCol && 'max-w-xl')}>
        {eyebrow && (
          <p
            className={cn(
              'eyebrow mb-4',
              isDarkBg ? 'text-champagne' : 'text-champagne-dark',
            )}
          >
            {eyebrow}
          </p>
        )}
        <Tag
          className={cn(
            'text-h2 text-balance',
            isDarkBg ? 'text-white' : 'text-ink-900',
          )}
        >
          {title}
        </Tag>
        {/* Description empilée sous le titre quand on n'est pas en deux colonnes. */}
        {!twoCol && descriptionEl}
      </div>
      {/* Description en colonne de droite sur desktop. */}
      {twoCol && descriptionEl}
    </div>
  );
}
