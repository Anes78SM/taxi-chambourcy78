import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { bookingServerSchema, type BookingServerInput } from '@/lib/validations';
import { siteConfig } from '@/config/site';
import { escapeHtml } from '@/lib/utils';
import { buildResponderUrl } from '@/lib/reservation-token';

/**
 * Route API de réservation — envoi automatique par e-mail (Resend).
 *
 * Variables d'environnement requises pour l'envoi :
 *   - RESEND_API_KEY        : clé d'API Resend (secret, jamais exposée au client)
 *   - RESERVATION_TO_EMAIL  : adresse de réception des demandes (ex. votre Gmail)
 *   - RESERVATION_FROM_EMAIL: expéditeur sur un domaine vérifié dans Resend
 *                             (ex. "Chambourcy Executive Taxi <reservation@mon-domaine.fr>")
 *
 * Tant que ces variables ne sont pas configurées, la route répond 501 et le
 * formulaire bascule automatiquement sur le lien « mailto: » (repli).
 * Aucune donnée n'est stockée côté serveur.
 */

/** Récupère l'IP cliente (Cloudflare puis proxy standard). */
function getClientIp(request: Request): string {
  const fwd =
    request.headers.get('CF-Connecting-IP') ?? request.headers.get('x-forwarded-for') ?? '';
  return fwd.split(',')[0]?.trim() || 'unknown';
}

// Anti-abus : limite de requêtes en mémoire, par IP (défense en profondeur par-dessus Turnstile).
// Note : l'état est par instance serverless ; Turnstile reste la protection principale.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    rateHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateHits.set(ip, recent);
  return false;
}

/** Neutralise les sauts de ligne (défense en profondeur sur l'en-tête Sujet de l'e-mail). */
function stripNewlines(value: string): string {
  return value.replace(/[\r\n]+/g, ' ');
}

function textBody(d: BookingServerInput): string {
  return [
    'Nouvelle demande de trajet',
    '',
    `Départ : ${d.depart}`,
    `Destination : ${d.arrivee}`,
    `Date : ${d.date}`,
    `Heure : ${d.heure}`,
    `Passagers : ${d.passagers}`,
    '',
    `Nom : ${d.nom}`,
    `Téléphone : ${d.telephone}`,
    `E-mail : ${d.email}`,
    d.message ? `\nInformations complémentaires :\n${d.message}` : '',
  ].join('\n');
}

/** Numéro français au format international pour un lien wa.me (best-effort). */
function toWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('33')) return digits;
  if (digits.startsWith('0')) return `33${digits.slice(1)}`;
  return digits;
}

/** Lien mailto pré-rempli pour que le chauffeur confirme la course au client. */
function confirmMailtoHref(d: BookingServerInput): string {
  const subject = `Confirmation de votre taxi — ${d.depart} → ${d.arrivee} le ${d.date} à ${d.heure}`;
  const body = [
    `Bonjour ${d.nom},`,
    '',
    'Je vous confirme votre réservation de taxi :',
    '',
    `• Départ : ${d.depart}`,
    `• Destination : ${d.arrivee}`,
    `• Date : ${d.date} à ${d.heure}`,
    `• Passagers : ${d.passagers}`,
    '',
    `Je vous prends en charge à l'heure convenue. Pour toute modification, répondez à cet e-mail ou appelez le ${siteConfig.contact.phone}.`,
    '',
    'À bientôt,',
    `Anes — ${siteConfig.name}`,
    siteConfig.contact.phone,
  ].join('\n');
  return `mailto:${d.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function htmlBody(d: BookingServerInput): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#626768;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#121719;font-weight:600">${escapeHtml(value)}</td></tr>`;

  const signSecret = process.env.RESERVATION_SIGNING_SECRET;
  const actionData = {
    to: d.email,
    nom: d.nom,
    depart: d.depart,
    arrivee: d.arrivee,
    date: d.date,
    heure: d.heure,
    passagers: d.passagers,
  };
  const btn = (href: string, label: string, extra: string) =>
    `<a href="${href}" style="display:inline-block;margin:6px 8px 0 0;text-decoration:none;padding:11px 20px;border-radius:8px;font-weight:600;font-size:14px;${extra}">${label}</a>`;
  const primaryButtons = signSecret
    ? btn(
        buildResponderUrl('confirm', actionData, signSecret, siteConfig.url),
        'Confirmer la course',
        'background:#15803d;color:#ffffff',
      ) +
      btn(
        buildResponderUrl('decline', actionData, signSecret, siteConfig.url),
        'Décliner',
        'background:#ffffff;color:#b91c1c;border:1px solid #e3c2c2',
      )
    : btn(confirmMailtoHref(d), 'Confirmer au client', 'background:#121719;color:#ffffff');
  const actionNote = signSecret
    ? 'Un seul clic envoie l’e-mail au client (confirmation ou refus). Vérifiez le trajet avant de cliquer.'
    : '«&nbsp;Confirmer au client&nbsp;» ouvre un e-mail pré-rempli adressé au client ; relisez-le avant de l’envoyer.';

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#121719">
    <h2 style="font-size:18px;margin:0 0 4px">Nouvelle demande de trajet</h2>
    <p style="color:#626768;margin:0 0 20px">Reçue depuis le site ${siteConfig.name}.</p>
    <table style="border-collapse:collapse;font-size:14px">
      ${row('Départ', d.depart)}
      ${row('Destination', d.arrivee)}
      ${row('Date', d.date)}
      ${row('Heure', d.heure)}
      ${row('Passagers', String(d.passagers))}
      ${row('Nom', d.nom)}
      ${row('Téléphone', d.telephone)}
      ${row('E-mail', d.email)}
    </table>
    ${d.message ? `<p style="margin:18px 0 4px;color:#626768">Informations complémentaires :</p><p style="margin:0;white-space:pre-wrap">${escapeHtml(d.message)}</p>` : ''}
    <div style="margin-top:24px">
      ${primaryButtons}
    </div>
    <div style="margin-top:6px">
      ${btn(`tel:${d.telephone.replace(/[^\d+]/g, '')}`, 'Appeler', 'background:#ffffff;color:#121719;border:1px solid #d5d7d8')}
      ${btn(`https://wa.me/${toWhatsApp(d.telephone)}`, 'WhatsApp', 'background:#ffffff;color:#121719;border:1px solid #d5d7d8')}
    </div>
    <p style="color:#8a8f90;font-size:12px;margin-top:10px">${actionNote}</p>
  </div>`;
}

/**
 * Vérifie le jeton anti-spam Cloudflare Turnstile.
 * Nécessite la variable d'environnement TURNSTILE_SECRET_KEY (secret).
 */
async function verifyTurnstile(token: string, secret: string, request: Request): Promise<boolean> {
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    const ip = getClientIp(request);
    if (ip !== 'unknown') body.set('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // Limite la taille du corps avant de le charger en mémoire (DoS).
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 10_000) {
    return NextResponse.json({ error: 'Requête trop volumineuse.' }, { status: 413 });
  }

  // Limite le nombre de demandes par IP.
  if (rateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: 'Trop de demandes. Réessayez dans quelques minutes.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = bookingServerSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Données invalides.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Anti-spam : vérification Cloudflare Turnstile.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const raw = payload as Record<string, unknown>;
    const token = typeof raw.turnstileToken === 'string' ? raw.turnstileToken : '';
    const isHuman = await verifyTurnstile(token, turnstileSecret, request);
    if (!isHuman) {
      return NextResponse.json({ error: 'Vérification anti-spam échouée.' }, { status: 403 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    // Fail-closed : jamais d'envoi sans anti-spam en production.
    console.error('TURNSTILE_SECRET_KEY manquante en production : envoi bloqué.');
    return NextResponse.json({ error: 'Service temporairement indisponible.' }, { status: 503 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_TO_EMAIL;
  const from = process.env.RESERVATION_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "L'envoi automatique n'est pas configuré." },
      { status: 501 },
    );
  }

  const data = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Demande de trajet — ${stripNewlines(data.depart)} → ${stripNewlines(data.arrivee)}`,
      text: textBody(data),
      html: htmlBody(data),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: "L'envoi a échoué. Veuillez réessayer." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Reservation send failed:', err);
    return NextResponse.json({ error: "L'envoi a échoué. Veuillez réessayer." }, { status: 502 });
  }
}
