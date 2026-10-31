import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Crumb = { name: string; path: string };

type BreadcrumbProps = {
  items: Crumb[];
  tone?: 'light' | 'dark';
  className?: string;
};

/** Fil d'Ariane accessible (le dernier élément est la page courante). */
export function Breadcrumb({ items, tone = 'dark', className }: BreadcrumbProps) {
  const isDarkBg = tone === 'light';
  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-1.5 text-xs',
          isDarkBg ? 'text-mist' : 'text-ink-800/60',
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className={isDarkBg ? 'text-white' : 'text-ink-900'}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="transition-colors hover:text-champagne-dark"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
