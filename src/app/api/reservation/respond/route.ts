import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { siteConfig } from '@/config/site';
import { escapeHtml } from '@/lib/utils';
import { decryptResponderToken, type ResponderPayload } from '@/lib/reservation-token';
import { buildCalendarEvent, googleCalendarUrl, buildIcs } from '@/lib/calendar';
import { getClientIp, createRateLimiter } from '@/lib/rate-limit';

/**
 * Réponse en un clic depuis l'e-mail de réservation : confirmer ou décliner.
 *
 * - GET : affiche une page qui déclenche l'action en POST (les pré-chargements de liens,
 *   qui font un GET sans exécuter de script, n'envoient donc jamais d'e-mail).
 * - POST : vérifie la signature HMAC du lien, puis envoie au client l'e-mail de
 *   confirmation ou de refus via Resend.
 */

// Anti double-envoi (best-effort, par instance serverless) : évite d'envoyer deux fois
// le même e-mail si le lien est ré-ouvert. Non partagé entre instances.
const processed = new Set<string>();

// Au plus 40 réponses / 10 min / IP (défense en profondeur ; l'accès exige déjà un jeton chiffré valide).
const rateLimited = createRateLimiter(40, 10 * 60 * 1000);

function tokenFromRequest(request: Request): string {
  return new URL(request.url).searchParams.get('t') ?? '';
}

/** Fragment affiché dans la page de résultat (inséré par le script après le POST). */
function fragment(title: string, message: string, ok: boolean): string {
  return `<div style="font-size:40px">${ok ? '✅' : '⚠️'}</div><h1 style="font-size:20px;margin:12px 0 8px">${escapeHtml(title)}</h1><p style="color:#55595b;line-height:1.6">${message}</p>`;
}

function htmlShell(inner: string): string {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(siteConfig.name)}</title></head>
<body style="margin:0;font-family:Arial,Helvetica,sans-serif;background:#f4f0e9;color:#121719">
<div id="box" style="max-width:520px;margin:12vh auto;padding:32px 28px;background:#fff;border-radius:12px;text-align:center;box-shadow:0 12px 34px rgba(0,0,0,.07)">
${inner}
<p style="margin-top:24px"><a href="${siteConfig.url}" style="color:#355e04;font-weight:600;text-decoration:none">${escapeHtml(siteConfig.name)}</a></p>
</div></body></html>`;
}

function htmlResponse(inner: string, status = 200): NextResponse {
  return new NextResponse(htmlShell(inner), {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 16px 6px 0;color:#626768;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#121719;font-weight:600">${escapeHtml(value)}</td></tr>`;

function confirmEmail(d: ResponderPayload) {
  const subject = `Votre taxi est confirmé — ${d.date} à ${d.heure}`;
  const text = [
    `Bonjour ${d.nom},`,
    '',
    'Votre réservation de taxi est confirmée :',
    '',
    `Départ : ${d.depart}`,
    `Destination : ${d.arrivee}`,
    `Date : ${d.date} à ${d.heure}`,
    `Passagers : ${d.passagers}`,
    '',
    `Je vous prends en charge à l'heure convenue. Pour toute modification, appelez le ${siteConfig.contact.phone}.`,
    '',
    'À bientôt,',
    `Anes — ${siteConfig.name}`,
    siteConfig.contact.phone,
  ].join('\n');
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#121719">
    <h2 style="font-size:18px;margin:0 0 4px">Votre taxi est confirmé</h2>
    <p style="color:#626768;margin:0 0 20px">Bonjour ${escapeHtml(d.nom)}, votre réservation est confirmée.</p>
    <table style="border-collapse:collapse;font-size:14px">
      ${row('Départ', d.depart)}${row('Destination', d.arrivee)}${row('Date', `${d.date} à ${d.heure}`)}${row('Passagers', String(d.passagers))}
    </table>
    <p style="margin:18px 0 0">Je vous prends en charge à l'heure convenue. Pour toute modification, appelez le <a href="${siteConfig.contact.phoneHref}">${escapeHtml(siteConfig.contact.phone)}</a>.</p>
    <p style="margin:16px 0 0;color:#626768">Anes — ${escapeHtml(siteConfig.name)}</p>
  </div>`;
  return { subject, text, html };
}

function declineEmail(d: ResponderPayload) {
  const subject = `Votre demande de taxi du ${d.date}`;
  const text = [
    `Bonjour ${d.nom},`,
    '',
    `Merci pour votre demande de taxi (${d.depart} → ${d.arrivee}, le ${d.date} à ${d.heure}).`,
    '',
    `Je suis malheureusement indisponible pour ce trajet. Je vous invite à me rappeler au ${siteConfig.contact.phone} afin d'envisager un autre horaire ou une solution adaptée.`,
    '',
    'Avec toutes mes excuses pour la gêne occasionnée,',
    `Anes — ${siteConfig.name}`,
    siteConfig.contact.phone,
  ].join('\n');
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#121719">
    <h2 style="font-size:18px;margin:0 0 10px">Votre demande de taxi</h2>
    <p style="margin:0 0 12px">Bonjour ${escapeHtml(d.nom)},</p>
    <p style="margin:0 0 12px">Merci pour votre demande de taxi (${escapeHtml(d.depart)} → ${escapeHtml(d.arrivee)}, le ${escapeHtml(d.date)} à ${escapeHtml(d.heure)}).</p>
    <p style="margin:0 0 12px">Je suis malheureusement indisponible pour ce trajet. Je vous invite à me rappeler au <a href="${siteConfig.contact.phoneHref}">${escapeHtml(siteConfig.contact.phone)}</a> afin d'envisager un autre horaire ou une solution adaptée.</p>
    <p style="margin:0 0 12px">Avec toutes mes excuses pour la gêne occasionnée,</p>
    <p style="margin:0;color:#626768">Anes — ${escapeHtml(siteConfig.name)}</p>
  </div>`;
  return { subject, text, html };
}

export async function GET(request: Request): Promise<NextResponse> {
  if (rateLimited(getClientIp(request))) {
    return htmlResponse(fragment('Trop de requêtes', 'Réessayez dans quelques minutes.', false), 429);
  }
  const secret = process.env.RESERVATION_SIGNING_SECRET;
  if (!secret) {
    return htmlResponse(
      fragment('Indisponible', 'La réponse en un clic n’est pas configurée.', false),
      503,
    );
  }
  const token = tokenFromRequest(request);
  const payload = decryptResponderToken(token, secret);
  if (!payload) {
    return htmlResponse(fragment('Lien invalide', 'Ce lien n’est pas valide.', false), 400);
  }

  const label = payload.a === 'confirm' ? 'la confirmation' : 'le refus';
  // La page envoie l'action en POST au chargement (un GET seul n'envoie rien).
  const inner = `<div style="font-size:40px">⏳</div>
<h1 style="font-size:20px;margin:12px 0 8px">Envoi de ${label} à ${escapeHtml(payload.nom)}…</h1>
<p style="color:#55595b">Merci de patienter un instant.</p>
<script>
  fetch(location.href, { method: 'POST' })
    .then(function (r) { return r.json(); })
    .then(function (d) { document.getElementById('box').innerHTML = d.html; })
    .catch(function () { document.getElementById('box').innerHTML = '<div style="font-size:40px">⚠️</div><h1 style="font-size:20px">Une erreur est survenue</h1><p style="color:#55595b">Réessayez, ou contactez le client directement.</p>'; });
</script>`;
  return htmlResponse(inner);
}

export async function POST(request: Request): Promise<NextResponse> {
  if (rateLimited(getClientIp(request))) {
    return NextResponse.json(
      { html: fragment('Trop de requêtes', 'Réessayez dans quelques minutes.', false) },
      { status: 429 },
    );
  }
  const secret = process.env.RESERVATION_SIGNING_SECRET;
  if (!secret) {
    return NextResponse.json({ html: fragment('Indisponible', 'Service non configuré.', false) }, { status: 503 });
  }
  const token = tokenFromRequest(request);
  const payload = decryptResponderToken(token, secret);
  if (!payload) {
    return NextResponse.json({ html: fragment('Lien invalide', 'Ce lien n’est pas valide.', false) }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESERVATION_FROM_EMAIL;
  const ownerTo = process.env.RESERVATION_TO_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json(
      { html: fragment('Non configuré', 'L’envoi d’e-mails n’est pas configuré.', false) },
      { status: 501 },
    );
  }

  if (processed.has(token)) {
    const already =
      payload.a === 'confirm'
        ? `La confirmation a déjà été envoyée à ${escapeHtml(payload.nom)}.`
        : `Le refus a déjà été envoyé à ${escapeHtml(payload.nom)}.`;
    return NextResponse.json({ html: fragment('Déjà traité', already, true) });
  }

  const resend = new Resend(apiKey);
  const mail = payload.a === 'confirm' ? confirmEmail(payload) : declineEmail(payload);
  try {
    const { error } = await resend.emails.send({
      from,
      to: payload.to,
      replyTo: ownerTo ?? undefined,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    if (error) {
      console.error('Responder send error:', error);
      return NextResponse.json(
        { html: fragment('Échec de l’envoi', 'L’e-mail n’a pas pu être envoyé. Réessayez.', false) },
        { status: 502 },
      );
    }

    processed.add(token);
    if (processed.size > 500) processed.clear();

    if (payload.a === 'decline') {
      return NextResponse.json({
        html: fragment(
          'Réservation déclinée',
          `Le client ${escapeHtml(payload.nom)} a été informé avec courtoisie que le trajet ne peut pas être assuré.`,
          true,
        ),
      });
    }

    // Confirmation : ajout au calendrier (boutons) + invitation agenda à Anes (.ics).
    const okMsg = `La confirmation a été envoyée à ${escapeHtml(payload.nom)} (${escapeHtml(payload.to)}).`;
    const event = buildCalendarEvent(payload);
    let calendarHtml = '';
    if (event) {
      const ics = buildIcs(event);
      const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
      calendarHtml = `<p style="margin:20px 0 8px;color:#55595b;font-size:14px">Ajouter la course à votre agenda :</p>
<div><a href="${googleCalendarUrl(event)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin:0 8px 8px 0;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600;font-size:14px;background:#355e04;color:#ffffff">Google Agenda</a><a href="${icsHref}" download="course.ics" style="display:inline-block;margin:0 8px 8px 0;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600;font-size:14px;background:#ffffff;color:#121719;border:1px solid #d5d7d8">Télécharger .ics</a></div>`;

      // Invitation agenda envoyée à Anes (best-effort : n'échoue pas la confirmation).
      if (ownerTo) {
        try {
          await resend.emails.send({
            from,
            to: ownerTo,
            subject: `Course confirmée — ${payload.date} à ${payload.heure} (${payload.nom})`,
            text: `Course confirmée pour ${payload.nom}.\n${event.title}\nLe ${payload.date} à ${payload.heure}.\nÉvénement en pièce jointe (course.ics).`,
            html: `<p>Course confirmée pour <strong>${escapeHtml(payload.nom)}</strong>.</p><p>${escapeHtml(event.title)} — le ${escapeHtml(payload.date)} à ${escapeHtml(payload.heure)}.</p><p>Événement en pièce jointe (<em>course.ics</em>) à ajouter à votre agenda.</p>`,
            attachments: [{ filename: 'course.ics', content: Buffer.from(ics) }],
          });
        } catch (e) {
          console.error('Invite agenda failed:', e);
        }
      }
    }
    return NextResponse.json({ html: fragment('Course confirmée', okMsg, true) + calendarHtml });
  } catch (err) {
    console.error('Responder failed:', err);
    return NextResponse.json(
      { html: fragment('Échec de l’envoi', 'Une erreur est survenue. Réessayez.', false) },
      { status: 502 },
    );
  }
}
