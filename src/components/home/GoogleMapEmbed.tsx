'use client';

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { googleBusiness } from '@/data/reviews';

const STORAGE_KEY = 'acs-map-consent';

/**
 * Carte Google Maps en « clic pour afficher » : l'iframe (et les cookies Google)
 * ne se chargent qu'après action de l'utilisateur. Le choix est mémorisé localement.
 */
export function GoogleMapEmbed({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setLoaded(true);
    } catch {
      // stockage indisponible : on garde le mode « clic pour afficher »
    }
  }, []);

  function enable() {
    setLoaded(true);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  }

  if (loaded) {
    return (
      <iframe
        src={googleBusiness.mapsEmbedUrl}
        title={`Fiche Google — ${googleBusiness.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={enable}
      className="flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-3 bg-ink-800/60 p-8 text-center transition-colors hover:bg-ink-800/80"
    >
      <MapPin className="h-8 w-8 text-champagne" aria-hidden strokeWidth={1.5} />
      <span className="font-serif text-lg text-white">Afficher la carte Google</span>
      <span className="max-w-xs text-xs leading-relaxed text-mist">
        En l’affichant, vous acceptez le dépôt de cookies par Google Maps (voir notre{' '}
        <a href="/politique-cookies" className="underline hover:text-cream">
          politique de cookies
        </a>
        ).
      </span>
    </button>
  );
}
