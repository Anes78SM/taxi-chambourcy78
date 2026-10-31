import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import type { Service } from '@/types';

export function ServiceCard({ service }: { service: Service }) {
  const href = `/services/${service.slug}`;
  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-ink-700 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-champagne/35">
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
        className="object-cover brightness-[0.82] transition-transform duration-700 ease-premium group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(2,10,13,0.92) 8%, rgba(2,10,13,0.3) 55%, transparent 100%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-6">
        <Icon name={service.icon} className="h-7 w-7 text-champagne" />
        <h3 className="mt-3 font-serif text-2xl text-white">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-cream/85">{service.cardDescription}</p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-champagne transition-colors hover:text-champagne-light"
        >
          Découvrir ce service
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <Link href={href} className="absolute inset-0" aria-label={service.name}>
        <span className="sr-only">{service.name}</span>
      </Link>
    </article>
  );
}
