import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { bookingServerSchema, type BookingServerInput } from '@/lib/validations';
import { siteConfig } from '@/config/site';

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

function htmlBody(d: BookingServerInput): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#626768;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#121719;font-weight:600">${escapeHtml(value)}</td></tr>`;
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
    const ip =
      request.headers.get('CF-Connecting-IP') ?? request.headers.get('x-forwarded-for') ?? '';
    if (ip) body.set('remoteip', ip.split(',')[0]!.trim());

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

  // Anti-spam : vérification Cloudflare Turnstile (seulement si la clé secrète est configurée).
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const raw = payload as Record<string, unknown>;
    const token = typeof raw.turnstileToken === 'string' ? raw.turnstileToken : '';
    const isHuman = await verifyTurnstile(token, turnstileSecret, request);
    if (!isHuman) {
      return NextResponse.json({ error: 'Vérification anti-spam échouée.' }, { status: 403 });
    }
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
      subject: `Demande de trajet — ${data.depart} → ${data.arrivee}`,
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
