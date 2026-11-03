'use client';

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { LocateFixed, MapPin, Plane, TrainFront } from 'lucide-react';
import { cn } from '@/lib/utils';
import { matchHubs, type TransitHub } from '@/data/transitHubs';

/** Une proposition : un pôle gare / aéroport prédéfini, ou une adresse BAN. */
type Suggestion = { kind: 'hub'; hub: TransitHub } | { kind: 'address'; label: string };

type AddressAutocompleteProps = {
  id?: string;
  name: string;
  placeholder?: string;
  className?: string;
  /** Affiche un bouton « Ma position » (géolocalisation + géocodage inverse). */
  geolocate?: boolean;
  /** Notifie le parent à chaque changement de valeur (saisie, sélection, puce). */
  onValueChange?: (value: string) => void;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
};

/** API impérative : permet au parent de renseigner le champ (ex. puces « trajets fréquents »). */
export type AddressAutocompleteHandle = { setAddress: (label: string) => void };

/**
 * Champ d'adresse avec propositions, via l'API publique Base Adresse Nationale
 * (api-adresse.data.gouv.fr) — gratuite, sans clé, dédiée aux adresses françaises.
 */
export const AddressAutocomplete = forwardRef<AddressAutocompleteHandle, AddressAutocompleteProps>(
  function AddressAutocomplete(
    { id, name, placeholder, className, geolocate = false, onValueChange, ...aria },
    ref,
  ) {
  const [value, setValue] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);
  const justSelected = useRef(false);
  const listId = `${id ?? name}-suggestions`;

  // Gares / aéroports correspondant à la saisie, puis adresses BAN : liste combinée.
  const hubMatches = useMemo(() => matchHubs(value), [value]);
  const items = useMemo<Suggestion[]>(
    () => [
      ...hubMatches.map((hub) => ({ kind: 'hub' as const, hub })),
      ...addresses.map((label) => ({ kind: 'address' as const, label })),
    ],
    [hubMatches, addresses],
  );

  // Recherche d'adresses (anti-rebond) dès 3 caractères.
  useEffect(() => {
    const query = value.trim();
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }
    if (query.length < 3) {
      // Trop court pour une adresse : on garde seulement les gares / aéroports.
      setAddresses([]);
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
        setAddresses(labels);
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

  /** Met à jour la valeur et prévient le parent. */
  function commitValue(next: string) {
    setValue(next);
    onValueChange?.(next);
  }

  function selectSuggestion(label: string) {
    justSelected.current = true;
    commitValue(label);
    setAddresses([]);
    setOpen(false);
    setActive(-1);
  }

  // Renseignement programmatique depuis le parent (puces « trajets fréquents »).
  useImperativeHandle(ref, () => ({ setAddress: (label: string) => selectSuggestion(label) }));

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
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Localisation refusée. Autorisez l’accès à votre position dans votre navigateur, ou saisissez votre adresse.'
            : error.code === error.TIMEOUT
              ? 'La localisation a pris trop de temps. Réessayez ou saisissez votre adresse.'
              : 'Position indisponible pour le moment. Saisissez votre adresse.';
        setGeoError(message);
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 },
    );
  }

  /** Insère la proposition (pôle gare / aéroport ou adresse). */
  function pick(item: Suggestion) {
    selectSuggestion(item.kind === 'hub' ? item.hub.label : item.label);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || items.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault();
      const picked = items[active];
      if (picked) pick(picked);
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
        onChange={(e) => {
          setOpen(true);
          commitValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
        onFocus={() => setOpen(true)}
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
      {open && items.length > 0 && (
        <ul
          id={listId}
          className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-[var(--radius)] border border-ink-900/15 bg-white py-1 shadow-card"
        >
          {hubMatches.length > 0 && (
            <li
              aria-hidden
              className="px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-wide text-ink-900/40"
            >
              Gares et aéroports
            </li>
          )}
          {hubMatches.map((hub, index) => {
            const Icon = hub.type === 'airport' ? Plane : TrainFront;
            return (
              <li key={`hub-${hub.label}`}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectSuggestion(hub.label);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink-900 transition-colors hover:bg-cream',
                    index === active && 'bg-cream',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                  <span>{hub.short}</span>
                </button>
              </li>
            );
          })}
          {addresses.length > 0 && (
            <li
              aria-hidden
              className="px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-wide text-ink-900/40"
            >
              Adresses
            </li>
          )}
          {addresses.map((label, j) => {
            const index = hubMatches.length + j;
            return (
              <li key={`addr-${label}`}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectSuggestion(label);
                  }}
                  className={cn(
                    'flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-ink-900 transition-colors hover:bg-cream',
                    index === active && 'bg-cream',
                  )}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-dark" aria-hidden strokeWidth={1.5} />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
  },
);
