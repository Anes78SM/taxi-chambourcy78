'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronUp, ChevronDown } from 'lucide-react';

/** Photos réelles du véhicule présentées dans le rail du hero. */
const photos = [
  { src: '/images/vehicule/profil-g7.webp', alt: 'BMW break du taxi vue de profil' },
  { src: '/images/vehicule/avant.webp', alt: 'Face avant de la BMW break du taxi' },
  { src: '/images/taxi_chambourcy_01_exterieur.webp', alt: 'Taxi BMW break stationné à Chambourcy' },
  { src: '/images/vehicule/interieur.webp', alt: 'Intérieur cuir spacieux de la BMW break' },
  { src: '/images/taxi_chambourcy_03_poste_conduite.webp', alt: 'Poste de conduite de la BMW break' },
  { src: '/images/taxi_chambourcy_04_coffre.webp', alt: 'Grand coffre de la BMW break pour les bagages' },
];

const VISIBLE = 3;

/**
 * Rail vertical de vignettes du véhicule (desktop) : trois photos visibles,
 * navigation haut/bas en boucle, première vignette mise en avant.
 * Chaque vignette mène à la galerie complète (/a-propos).
 */
export function HeroVehicleRail() {
  const [start, setStart] = useState(0);
  const total = photos.length;

  const visible = Array.from({ length: VISIBLE }, (_, i) => photos[(start + i) % total]).filter(
    (photo): photo is (typeof photos)[number] => Boolean(photo),
  );
  const move = (dir: 1 | -1) => setStart((s) => (s + dir + total) % total);

  return (
    <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:left-10">
      <button
        type="button"
        onClick={() => move(-1)}
        aria-label="Photos précédentes"
        className="pointer-events-auto inline-grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-ink-900/60 text-cream backdrop-blur-sm transition-colors hover:border-champagne/60 hover:text-champagne"
      >
        <ChevronUp className="h-4 w-4" aria-hidden strokeWidth={2} />
      </button>

      <div className="flex w-[148px] flex-col gap-3 xl:w-[172px]">
        {visible.map((photo, index) => (
          <Link
            key={`${photo.src}-${start}`}
            href="/a-propos"
            aria-label={`${photo.alt} — voir la galerie du véhicule`}
            className={`pointer-events-auto group relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] shadow-card ring-1 transition-all duration-300 ease-premium ${
              index === 0 ? 'ring-2 ring-champagne' : 'ring-champagne/20 hover:ring-champagne/50'
            }`}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="172px"
              className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(8,13,16,0) 55%, rgba(8,13,16,0.4) 100%)' }}
            />
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => move(1)}
        aria-label="Photos suivantes"
        className="pointer-events-auto inline-grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-ink-900/60 text-cream backdrop-blur-sm transition-colors hover:border-champagne/60 hover:text-champagne"
      >
        <ChevronDown className="h-4 w-4" aria-hidden strokeWidth={2} />
      </button>
    </div>
  );
}
