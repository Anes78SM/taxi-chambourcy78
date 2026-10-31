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
  return (
    <div
      className={cn(
        'max-w-prose',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
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
      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed',
            isDarkBg ? 'text-mist' : 'text-ink-800/70',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
