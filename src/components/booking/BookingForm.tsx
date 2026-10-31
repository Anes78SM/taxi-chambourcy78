'use client';

import { cloneElement, isValidElement, useId, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Copy } from 'lucide-react';
import { bookingSchema, type BookingInput } from '@/lib/validations';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

type Errors = Partial<Record<keyof BookingInput, string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'ready' | 'error';

const todayISO = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
};

function buildEmailBody(data: BookingInput): string {
  return [
    'Bonjour,',
    '',
    'Je souhaite obtenir un devis pour le trajet suivant :',
    '',
    `• Départ : ${data.depart}`,
    `• Destination : ${data.arrivee}`,
    `• Date : ${data.date}`,
    `• Heure : ${data.heure}`,
    `• Passagers : ${data.passagers}`,
    '',
    `Nom : ${data.nom}`,
    `Téléphone : ${data.telephone}`,
    `E-mail : ${data.email}`,
    data.message ? `\nInformations complémentaires :\n${data.message}` : '',
    '',
    'Merci de me confirmer les modalités et le tarif.',
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export function BookingForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [mailtoUrl, setMailtoUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const minDate = useMemo(todayISO, []);

  const field = (name: string) => `${formId}-${name}`;

  /** Repli : prépare un e-mail via « mailto: » et ouvre la messagerie du visiteur. */
  function fallbackToMailto(data: BookingInput) {
    const body = buildEmailBody(data);
    const subject = `Demande de devis — ${data.depart} → ${data.arrivee}`;
    const url = `${siteConfig.contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailtoUrl(url);
    setStatus('ready');
    window.location.href = url;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    const formData = new FormData(event.currentTarget);
    const raw = {
      depart: formData.get('depart'),
      arrivee: formData.get('arrivee'),
      date: formData.get('date'),
      heure: formData.get('heure'),
      passagers: formData.get('passagers'),
      nom: formData.get('nom'),
      telephone: formData.get('telephone'),
      email: formData.get('email'),
      message: formData.get('message') ?? '',
      consent: formData.get('consent') === 'on',
    };

    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof BookingInput;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus('error');
      const firstKey = parsed.error.issues[0]?.path[0];
      if (firstKey) document.getElementById(field(String(firstKey)))?.focus();
      return;
    }

    setErrors({});

    // 1) Tentative d'envoi automatique via la route API (Resend).
    // Le champ « consent » est ignoré côté serveur (schéma de validation dédié).
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus('sent');
        return;
      }
    } catch {
      // Réseau indisponible : on bascule sur le repli mailto ci-dessous.
    }

    // 2) Repli : envoi automatique indisponible → préparation d'un e-mail mailto.
    fallbackToMailto(parsed.data);
  }

  async function copySummary() {
    try {
      const params = new URL(mailtoUrl).searchParams;
      await navigator.clipboard.writeText(params.get('body') ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[var(--radius-lg)] border border-ink-900/10 bg-white p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-12 w-12 text-champagne-dark" aria-hidden strokeWidth={1.5} />
        <h3 className="mt-4 font-serif text-2xl text-ink-900">Votre demande a bien été envoyée</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-800/75">
          Merci ! Votre demande de trajet nous a été transmise. Nous revenons vers vous dès que
          possible pour confirmer les modalités et le tarif. Aucune réservation n’est encore
          définitive à ce stade.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-xs text-ink-900/50 underline underline-offset-4 hover:text-ink-900"
        >
          Faire une nouvelle demande
        </button>
      </div>
    );
  }

  if (status === 'ready') {
    return (
      <div className="rounded-[var(--radius-lg)] border border-ink-900/10 bg-white p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-12 w-12 text-champagne-dark" aria-hidden strokeWidth={1.5} />
        <h3 className="mt-4 font-serif text-2xl text-ink-900">Votre demande est prête</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-800/75">
          Votre messagerie devrait s’ouvrir avec le récapitulatif pré-rempli. Il ne reste qu’à
          l’envoyer. <strong>Aucune réservation n’a encore été enregistrée</strong> : le
          professionnel vous recontactera pour confirmer les modalités.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={mailtoUrl}
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-ink-900 px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-ink-800"
          >
            Rouvrir ma messagerie
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={copySummary}
            className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-ink-900/15 px-6 py-3 text-xs font-semibold text-ink-900 transition-colors hover:border-ink-900/30"
          >
            <Copy className="h-4 w-4" aria-hidden />
            {copied ? 'Copié' : 'Copier le récapitulatif'}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 text-xs text-ink-900/50 underline underline-offset-4 hover:text-ink-900"
        >
          Faire une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={`${formId}-status`}
      className="rounded-[var(--radius-lg)] border border-ink-900/8 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={field('depart')} name="depart" label="Lieu de départ" error={errors.depart}>
          <input
            id={field('depart')}
            name="depart"
            type="text"
            placeholder="Adresse, hôtel, aéroport…"
            autoComplete="off"
          />
        </Field>
        <Field id={field('arrivee')} name="arrivee" label="Destination" error={errors.arrivee}>
          <input
            id={field('arrivee')}
            name="arrivee"
            type="text"
            placeholder="Adresse, hôtel, aéroport…"
            autoComplete="off"
          />
        </Field>

        <Field id={field('date')} name="date" label="Date" error={errors.date}>
          <input id={field('date')} name="date" type="date" min={minDate} />
        </Field>
        <Field id={field('heure')} name="heure" label="Heure" error={errors.heure}>
          <input id={field('heure')} name="heure" type="time" />
        </Field>

        <Field id={field('passagers')} name="passagers" label="Passagers" error={errors.passagers}>
          <select id={field('passagers')} name="passagers" defaultValue="1">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>
                {n} passager{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </Field>
        <Field id={field('nom')} name="nom" label="Nom" error={errors.nom}>
          <input id={field('nom')} name="nom" type="text" placeholder="Votre nom" autoComplete="name" />
        </Field>

        <Field id={field('telephone')} name="telephone" label="Téléphone" error={errors.telephone}>
          <input
            id={field('telephone')}
            name="telephone"
            type="tel"
            placeholder="06 00 00 00 00"
            autoComplete="tel"
          />
        </Field>
        <Field id={field('email')} name="email" label="E-mail" error={errors.email}>
          <input
            id={field('email')}
            name="email"
            type="email"
            placeholder="vous@exemple.fr"
            autoComplete="email"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            id={field('message')}
            name="message"
            label="Informations complémentaires (facultatif)"
            error={errors.message}
          >
            <textarea
              id={field('message')}
              name="message"
              rows={3}
              placeholder="Bagages, nombre d’arrêts, précisions sur le trajet…"
            />
          </Field>
        </div>
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-ink-800/75">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--champagne-dark)]"
          />
          <span>
            J’accepte que mes informations soient utilisées pour traiter ma demande de trajet.
            Elles ne sont pas conservées sur ce site.{' '}
            <a href="/politique-confidentialite" className="underline underline-offset-2 hover:text-ink-900">
              En savoir plus
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-[var(--radius)] bg-ink-900 px-6 py-4 text-sm font-semibold text-white transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:bg-ink-800 disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Préparation…' : 'Demander un devis'}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>

      <p id={`${formId}-status`} role="status" className="mt-4 text-xs text-ink-800/60">
        Votre demande nous est transmise par e-mail. Aucun paiement n’est demandé et aucune
        réservation n’est définitive à ce stade : nous vous recontactons pour confirmer.
      </p>
    </form>
  );
}

/* --- Sous-composant champ ---
 * Injecte les styles cohérents et les attributs ARIA d'erreur sur l'unique
 * élément de contrôle enfant (input / select / textarea).
 */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const controlClass = cn(
    'w-full rounded-[var(--radius)] border bg-transparent px-3.5 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-900/35 focus:border-champagne-dark',
    error ? 'border-red-400' : 'border-ink-900/15',
  );

  const control = isValidElement(children)
    ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        className: controlClass,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })
    : children;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold text-ink-900">
        {label}
      </label>
      {control}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
