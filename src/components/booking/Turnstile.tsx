'use client';

import { useEffect, useRef } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Vrai si une clé de site Turnstile est configurée (sinon : pas d'anti-spam, formulaire inchangé). */
export const turnstileEnabled = Boolean(SITE_KEY);

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;

/** Charge le script Turnstile (une seule fois) en mode explicite. */
function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Widget Cloudflare Turnstile (anti-spam). Rend un jeton transmis via `onToken`.
 * Ne s'affiche que si NEXT_PUBLIC_TURNSTILE_SITE_KEY est défini.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    let active = true;

    void loadTurnstileScript().then(() => {
      if (!active || !containerRef.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: 'light',
        language: 'fr',
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      });
    });

    return () => {
      active = false;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          // widget déjà retiré
        }
        widgetId.current = null;
      }
    };
  }, [onToken]);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className="mt-5 min-h-[65px]" aria-label="Vérification anti-spam" />;
}
