import 'server-only';
import crypto from 'node:crypto';

/**
 * Jetons d'action « confirmer / décliner » placés dans l'e-mail de réservation.
 *
 * Le payload (données de la course, dont des données personnelles du client) est
 * CHIFFRÉ en AES-256-GCM, pas seulement signé : le lien ne contient donc aucune
 * donnée lisible en clair (rien n'apparaît en clair dans les logs d'accès/URL).
 * Le chiffrement authentifié (tag GCM) garantit aussi l'intégrité : un jeton
 * modifié est rejeté. La clé dérive de RESERVATION_SIGNING_SECRET.
 */

const ALGO = 'aes-256-gcm';
const IV_LEN = 12;
const TAG_LEN = 16;

export type ResponderAction = 'confirm' | 'decline';

export type ResponderPayload = {
  /** Action demandée */
  a: ResponderAction;
  /** E-mail du client (destinataire de la réponse) */
  to: string;
  nom: string;
  /** Téléphone du client (pour l'événement agenda) */
  tel: string;
  depart: string;
  arrivee: string;
  date: string;
  heure: string;
  passagers: number;
};

function keyFrom(secret: string): Buffer {
  return crypto.createHash('sha256').update(secret).digest(); // 32 octets
}

/** Chiffre le payload en un jeton opaque (base64url). */
export function encryptResponderPayload(payload: ResponderPayload, secret: string): string {
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, keyFrom(secret), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, data]).toString('base64url');
}

/** Construit l'URL d'action chiffrée (absolue) pour l'e-mail. */
export function buildResponderUrl(
  action: ResponderAction,
  data: Omit<ResponderPayload, 'a'>,
  secret: string,
  baseUrl: string,
): string {
  const token = encryptResponderPayload({ a: action, ...data }, secret);
  const url = new URL('/api/reservation/respond', baseUrl);
  url.searchParams.set('t', token);
  return url.toString();
}

/** Déchiffre et valide le jeton ; renvoie le payload, ou `null` si invalide/altéré. */
export function decryptResponderToken(token: string, secret: string): ResponderPayload | null {
  if (!token) return null;
  try {
    const raw = Buffer.from(token, 'base64url');
    if (raw.length < IV_LEN + TAG_LEN + 2) return null;
    const iv = raw.subarray(0, IV_LEN);
    const tag = raw.subarray(IV_LEN, IV_LEN + TAG_LEN);
    const data = raw.subarray(IV_LEN + TAG_LEN);

    const decipher = crypto.createDecipheriv(ALGO, keyFrom(secret), iv);
    decipher.setAuthTag(tag);
    const json = Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');

    const payload = JSON.parse(json) as ResponderPayload;
    if (
      (payload.a !== 'confirm' && payload.a !== 'decline') ||
      typeof payload.to !== 'string' ||
      !payload.to
    ) {
      return null;
    }
    return payload;
  } catch {
    // Tag d'authentification invalide, altération, ou données corrompues.
    return null;
  }
}
