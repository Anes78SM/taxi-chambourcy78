import { z } from 'zod';

/** Schéma de validation de la demande de réservation. */
export const bookingSchema = z.object({
  depart: z
    .string()
    .trim()
    .min(2, 'Veuillez indiquer un lieu de départ.')
    .max(200, 'Lieu de départ trop long.'),
  arrivee: z
    .string()
    .trim()
    .min(2, 'Veuillez indiquer une destination.')
    .max(200, 'Destination trop longue.'),
  date: z.string().min(1, 'Veuillez choisir une date.'),
  heure: z.string().min(1, 'Veuillez choisir une heure.'),
  passagers: z.coerce
    .number()
    .int()
    .min(1, 'Au moins un passager.')
    .max(8, 'Pour plus de 7 passagers, contactez-nous directement.'),
  nom: z
    .string()
    .trim()
    .min(2, 'Veuillez indiquer votre nom.')
    .max(120, 'Nom trop long.'),
  telephone: z
    .string()
    .trim()
    .min(6, 'Veuillez indiquer un numéro de téléphone valide.')
    .max(30, 'Numéro trop long.')
    .regex(/^[+0-9 ().-]+$/, 'Numéro de téléphone invalide.'),
  email: z.string().trim().email('Adresse e-mail invalide.'),
  // Trajet aéroport / gare (facultatif) : heure du vol ou du train et son sens.
  volTrainSens: z.enum(['depart', 'arrivee']).optional().or(z.literal('')),
  volTrainHeure: z.string().trim().max(5, 'Heure invalide.').optional().or(z.literal('')),
  message: z.string().trim().max(1000, 'Message trop long.').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Votre consentement est nécessaire pour traiter la demande.' }),
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

/** Version serveur (sans le champ consent, déjà vérifié côté client). */
export const bookingServerSchema = bookingSchema.omit({ consent: true });
export type BookingServerInput = z.infer<typeof bookingServerSchema>;
