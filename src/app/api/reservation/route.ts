import { NextResponse } from 'next/server';
import { bookingServerSchema } from '@/lib/validations';

/**
 * Route API de réservation — POINT D'EXTENSION (non activée par défaut).
 *
 * Par défaut, le formulaire de réservation fonctionne via un lien « mailto: »
 * côté client, sans serveur ni base de données. Cette route est fournie pour
 * permettre de brancher ultérieurement un service d'envoi d'e-mails transactionnels
 * (ex. Resend) à l'aide de variables d'environnement, SANS exposer de secret côté client.
 *
 * Pour l'activer :
 *   1. Ajouter une clé d'API (ex. RESEND_API_KEY) dans les variables d'environnement.
 *   2. Implémenter l'envoi ci-dessous (voir le commentaire).
 *   3. Pointer le formulaire vers cette route au lieu du lien mailto.
 *
 * Tant qu'aucun fournisseur n'est configuré, la route répond 501 et n'affirme
 * jamais qu'un e-mail a été envoyé.
 */
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

  const provider = process.env.RESEND_API_KEY;
  if (!provider) {
    return NextResponse.json(
      {
        error:
          "Aucun service d'envoi d'e-mails n'est configuré. Utilisez le formulaire par e-mail ou configurez un fournisseur.",
      },
      { status: 501 },
    );
  }

  // --- Point d'intégration de l'envoi d'e-mail ---
  // Exemple (à adapter) :
  //   const { Resend } = await import('resend');
  //   const resend = new Resend(provider);
  //   await resend.emails.send({
  //     from: process.env.RESERVATION_FROM_EMAIL!,
  //     to: process.env.RESERVATION_TO_EMAIL!,
  //     subject: `Demande de trajet — ${parsed.data.depart} → ${parsed.data.arrivee}`,
  //     text: JSON.stringify(parsed.data, null, 2),
  //   });

  return NextResponse.json({ ok: true });
}
