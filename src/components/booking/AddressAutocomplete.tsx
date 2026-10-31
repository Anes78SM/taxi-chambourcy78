'use client';

import { useEffect, useRef, useState } from 'react';
import { LocateFixed, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

type AddressAutocompleteProps = {
  id?: string;
  name: string;
  placeholder?: string;
  className?: string;
  /** Affiche un bouton « Ma position » (géolocalisation + géocodage inverse). */
  geolocate?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
};

/**
 * Champ d'adresse avec propositions, via l'API publique Base Adresse Nationale
 * (api-adresse.data.gouv.fr) — gratuite, sans clé, dédiée aux adresses françaises.
 */
export function AddressAutocomplete({
  id,
  name,
  placeholder,
  className,
  geolocate = false,
  ...aria
}: AddressAutocompleteProps) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);
  const justSelected = useRef(false);
  const listId = `${id ?? name}-suggestions`;

  // Recherche d'adresses (anti-rebond) dès 3 caractères.
  useEffect(() => {
    const query = value.trim();
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }
    if (query.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`,
          { signal: controller.signal },
        );
        if (!res.ok) return;
        const data = (await res.json()) as { features?: { properties: { label: string } }[] };
        const labels = (data.features ?? []).map((f) => f.properties.label);
        setSuggestions(labels);
        setOpen(labels.length > 0);
        setActive(-1);
      } catch {
        // Requête annulée ou réseau indisponible : on ignore silencieusement.
      }
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [value]);

  // Ferme la liste au clic en dehors.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  function selectSuggestion(label: string) {
    justSelected.current = true;
    setValue(label);
    setSuggestions([]);
    setOpen(false);
    setActive(-1);
  }

  // Détecte la position de l'utilisateur puis la convertit en adresse (géocodage inverse BAN).
  function handleGeolocate() {
    setGeoError('');
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoError('Géolocalisation non disponible sur cet appareil.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api-adresse.data.gouv.fr/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`,
          );
          const data = (await res.json()) as { features?: { properties: { label: string } }[] };
          const label = data.features?.[0]?.properties.label;
          if (label) {
            selectSuggestion(label);
          } else {
            setGeoError('Adresse introuvable pour votre position.');
          }
        } catch {
          setGeoError('Impossible de récupérer votre adresse pour le moment.');
        } finally {
          setLocating(false);
        }
      },
      () => {
        setGeoError('Position refusée ou indisponible. Saisissez votre adresse.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault();
      const picked = suggestions[active];
      if (picked) selectSuggestion(picked);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className="relative">
      <input
        id={id}
        name={name}
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className={cn(className, geolocate && 'pr-11')}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        {...aria}
      />
      {geolocate && (
        <button
          type="button"
          onClick={handleGeolocate}
          disabled={locating}
          title="Utiliser ma position"
          aria-label="Utiliser ma position actuelle comme adresse de départ"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-champagne-dark transition-colors hover:bg-cream disabled:opacity-50"
        >
          <LocateFixed
            className={cn('h-4 w-4', locating && 'animate-spin')}
            aria-hidden
            strokeWidth={1.75}
          />
        </button>
      )}
      {geoError && (
        <p className="mt-1.5 text-xs text-red-600" role="status">
          {geoError}
        </p>
      )}
      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-[var(--radius)] border border-ink-900/15 bg-white py-1 shadow-card"
        >
          {suggestions.map((suggestion, index) => (
            <li key={suggestion}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectSuggestion(suggestion);
                }}
                className={cn(
                  'flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-ink-900 transition-colors hover:bg-cream',
                  index === active && 'bg-cream',
                )}
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                <span>{suggestion}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
