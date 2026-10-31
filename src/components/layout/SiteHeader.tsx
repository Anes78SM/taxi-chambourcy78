'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { mainNav } from '@/config/navigation';
import { siteConfig, hasRealContact } from '@/config/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Header transparent uniquement au-dessus du hero de la page d'accueil.
  const overHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !overHero || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ease-premium',
        solid ? 'bg-ink-900/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[88px] max-w-container items-center justify-between gap-6 px-gutter">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} — accueil`}>
          <span className="text-2xl leading-none text-champagne" aria-hidden>
            ⌁
          </span>
          <span className="leading-none">
            <span className="block font-serif text-lg tracking-[0.12em] text-cream">CHAMBOURCY</span>
            <span className="mt-1 block text-[0.5rem] tracking-[0.32em] text-champagne/90">
              EXECUTIVE TAXI
            </span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 text-[0.8rem] lg:flex" aria-label="Navigation principale">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-champagne">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {hasRealContact && (
            <a
              href={siteConfig.contact.phoneHref}
              className="hidden items-center gap-2 text-[0.8rem] text-cream transition-colors hover:text-champagne md:flex"
            >
              <Phone className="h-4 w-4 text-champagne" aria-hidden />
              {siteConfig.contact.phone}
            </a>
          )}
          <Link
            href="/#reservation"
            className="hidden items-center gap-2 rounded-full border border-champagne bg-champagne px-5 py-2.5 text-[0.75rem] font-semibold text-ink-900 transition-colors hover:bg-champagne-light sm:inline-flex"
          >
            Réserver
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-white/25 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 bg-ink-900 lg:hidden"
      >
        <nav className="mx-auto flex max-w-container flex-col gap-1 px-gutter py-5" aria-label="Navigation mobile">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[var(--radius)] px-2 py-3 text-base transition-colors hover:bg-white/5 hover:text-champagne"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#reservation"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-champagne px-5 py-3.5 text-sm font-semibold text-ink-900"
          >
            Réserver votre trajet
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          {hasRealContact && (
            <a
              href={siteConfig.contact.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 text-sm text-cream"
            >
              <Phone className="h-4 w-4 text-champagne" aria-hidden />
              {siteConfig.contact.phone}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
