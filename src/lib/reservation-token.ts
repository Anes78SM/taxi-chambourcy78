import 'server-only';
import crypto from 'node:crypto';

/**
 * Jetons signés (HMAC-SHA256) pour les liens d'action « confirmer / décliner »
 * placés dans l'e-mail de réservation reçu par le chauffeur.
 *
 * Le lien transporte les données de la course (payload base64url) + une signature.
 * Sans la clé secrète (RESERVATION_SIGNING_SECRET), impossible de forger ou d'altérer
 * un lien : on ne peut ni changer le destinataire, ni transformer un refus en confirmation.
 */

export type ResponderAction = 'confirm' | 'decline';

export type ResponderPayload = {
  /** Action demandée */
  a: ResponderAction;
  /** E-mail du client (destinataire de la réponse) */
  to: string;
  nom: string;
  depart: string;
  arrivee: string;
  date: string;
  heure: string;
  passagers: number;
};

function hmac(data: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('base64url');
}

/** Signe un payload et renvoie les paramètres `p` (données) et `s` (signature). */
export function signResponderPayload(
  payload: ResponderPayload,
  secret: string,
): { p: string; s: string } {
  const p = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return { p, s: hmac(p, secret) };
}

/** Construit l'URL d'action signée (absolue) pour l'e-mail. */
export function buildResponderUrl(
  action: ResponderAction,
  data: Omit<ResponderPayload, 'a'>,
  secret: string,
  baseUrl: string,
): string {
  const { p, s } = signResponderPayload({ a: action, ...data }, secret);
  const url = new URL('/api/reservation/respond', baseUrl);
  url.searchParams.set('p', p);
  url.searchParams.set('s', s);
  return url.toString();
}

/** Vérifie la signature et renvoie le payload, ou `null` si le lien est invalide. */
export function verifyResponderToken(
  p: string,
  s: string,
  secret: string,
): ResponderPayload | null {
  if (!p || !s) return null;
  try {
    const expected = hmac(p, secret);
    const a = Buffer.from(s);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    const payload = JSON.parse(Buffer.from(p, 'base64url').toString('utf8')) as ResponderPayload;
    if (
      (payload.a !== 'confirm' && payload.a !== 'decline') ||
      typeof payload.to !== 'string' ||
      !payload.to
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
