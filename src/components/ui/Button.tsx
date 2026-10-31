import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'dark' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-[var(--radius)] font-semibold tracking-wide transition-all duration-200 ease-premium focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-champagne text-ink-900 border border-champagne hover:bg-champagne-light hover:-translate-y-0.5 shadow-sm',
  outline:
    'bg-transparent text-white border border-white/50 hover:bg-white/10 hover:border-white',
  dark: 'bg-ink-900 text-white border border-ink-900 hover:bg-ink-800 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-ink-900 hover:text-champagne-dark',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3.5 text-[0.8rem]',
  lg: 'px-8 py-4 text-sm',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'>;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children, href, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof href === 'string') {
    const anchorRest = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const isInternal = href.startsWith('/') && !href.startsWith('//');
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
