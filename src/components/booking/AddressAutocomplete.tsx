'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

type AddressAutocompleteProps = {
  id?: string;
  name: string;
  placeholder?: string;
  className?: string;
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
  ...aria
}: AddressAutocompleteProps) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
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
        className={className}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        {...aria}
      />
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
