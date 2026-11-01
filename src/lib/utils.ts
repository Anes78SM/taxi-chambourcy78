/** Concatène des classes conditionnelles sans dépendance externe. */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}

/** Formate une date ISO en français (ex. « 14 mars 2025 »). */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Estime le temps de lecture en minutes (≈ 200 mots/min). */
export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
