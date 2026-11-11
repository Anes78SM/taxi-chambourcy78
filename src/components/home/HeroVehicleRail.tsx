'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronUp, ChevronDown } from 'lucide-react';

/** Photos réelles du véhicule présentées dans la colonne du hero. */
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
 * Colonne 20 % du hero (desktop) : trois photos du véhicule empilées sur
 * toute la hauteur, navigation haut/bas en boucle, première vignette mise
 * en avant. Chaque vignette mène à la galerie complète (/a-propos).
 */
export function HeroVehicleRail() {
  const [start, setStart] = useState(0);
  const total = photos.length;

  const visible = Array.from({ length: VISIBLE }, (_, i) => photos[(start + i) % total]).filter(
    (photo): photo is (typeof photos)[number] => Boolean(photo),
  );
  const move = (dir: 1 | -1) => setStart((s) => (s + dir + total) % total);

  return (
    <aside className="relative z-10 hidden w-1/5 shrink-0 flex-col items-center gap-2 p-2 lg:flex">
      <button
        type="button"
        onClick={() => move(-1)}
        aria-label="Photos précédentes"
        className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 bg-ink-900/60 text-cream backdrop-blur-sm transition-colors hover:border-champagne/60 hover:text-champagne"
      >
        <ChevronUp className="h-4 w-4" aria-hidden strokeWidth={2} />
      </button>

      <div className="flex w-full flex-1 flex-col gap-2">
        {visible.map((photo, index) => (
          <Link
            key={`${photo.src}-${start}`}
            href="/a-propos"
            aria-label={`${photo.alt} — voir la galerie du véhicule`}
            className={`group relative block w-full flex-1 overflow-hidden rounded-[var(--radius-lg)] shadow-card ring-1 transition-all duration-300 ease-premium ${
              index === 0 ? 'ring-2 ring-champagne' : 'ring-champagne/20 hover:ring-champagne/50'
            }`}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="20vw"
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
        className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 bg-ink-900/60 text-cream backdrop-blur-sm transition-colors hover:border-champagne/60 hover:text-champagne"
      >
        <ChevronDown className="h-4 w-4" aria-hidden strokeWidth={2} />
      </button>
    </aside>
  );
}
