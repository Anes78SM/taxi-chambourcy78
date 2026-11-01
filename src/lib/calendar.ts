import 'server-only';
import crypto from 'node:crypto';

/**
 * Génération d'un événement de course : lien « Ajouter à Google Agenda » et fichier .ics.
 * L'heure est traitée en heure locale « flottante » (la course a lieu à l'heure indiquée,
 * quelle que soit la zone de l'appareil qui ouvre l'événement).
 */

export type CalendarEvent = {
  title: string;
  description: string;
  location: string;
  /** Format compact iCalendar : YYYYMMDDTHHMMSS (heure locale flottante). */
  startCompact: string;
  endCompact: string;
};

type CourseInput = {
  nom: string;
  tel: string;
  depart: string;
  arrivee: string;
  date: string; // YYYY-MM-DD
  heure: string; // HH:MM
  passagers: number;
};

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Composants (UTC) d'un instant → chaîne compacte iCalendar. */
function compact(ms: number): string {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00`;
}

/** Construit l'événement à partir de la date/heure du formulaire (durée par défaut : 1 h). */
export function buildCalendarEvent(input: CourseInput): CalendarEvent | null {
  const [ys, ms, ds] = input.date.split('-');
  const [hs, mins] = input.heure.split(':');
  const y = Number(ys);
  const m = Number(ms);
  const d = Number(ds);
  const hh = Number(hs);
  const mm = Number(mins);
  if (![y, m, d, hh, mm].every((n) => Number.isFinite(n))) return null;

  const start = Date.UTC(y, m - 1, d, hh, mm);
  const end = start + 60 * 60 * 1000;
  return {
    title: `Taxi : ${input.depart} → ${input.arrivee}`,
    description: [
      `Client : ${input.nom}`,
      `Téléphone : ${input.tel}`,
      `Départ : ${input.depart}`,
      `Destination : ${input.arrivee}`,
      `Passagers : ${input.passagers}`,
    ].join('\n'),
    location: input.depart,
    startCompact: compact(start),
    endCompact: compact(end),
  };
}

/** Lien « Ajouter à Google Agenda » pré-rempli. */
export function googleCalendarUrl(e: CalendarEvent): string {
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', e.title);
  url.searchParams.set('dates', `${e.startCompact}/${e.endCompact}`);
  url.searchParams.set('details', e.description);
  url.searchParams.set('location', e.location);
  url.searchParams.set('ctz', 'Europe/Paris');
  return url.toString();
}

/** Échappement des caractères spéciaux iCalendar (RFC 5545). */
function icsEscape(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** Contenu d'un fichier .ics (iCalendar) pour la course. */
export function buildIcs(e: CalendarEvent): string {
  const uid = crypto
    .createHash('sha1')
    .update(`${e.startCompact}|${e.title}|${e.location}`)
    .digest('hex');
  const stamp = `${compact(Date.now())}Z`; // DTSTAMP en UTC
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Allo Chambourcy Taxi//Reservation//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}@taxi-chambourcy.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${e.startCompact}`,
    `DTEND:${e.endCompact}`,
    `SUMMARY:${icsEscape(e.title)}`,
    `DESCRIPTION:${icsEscape(e.description)}`,
    `LOCATION:${icsEscape(e.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
