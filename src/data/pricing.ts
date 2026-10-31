/**
 * Tarifs taxi — informations vérifiées uniquement.
 *
 * On n'affiche ici que des éléments confirmés par une source officielle
 * (arrêté national du 24 décembre 2025, Légifrance) : minimum de course et
 * plafonds nationaux 2026. La grille départementale exacte des Yvelines (prix
 * au kilomètre A/B/C/D, prise en charge) n'a pas pu être confirmée et n'est
 * donc PAS affichée : le montant réel est celui du taximètre. Pour publier la
 * grille détaillée, reprendre la carte tarifaire officielle du professionnel.
 */

export const pricingYear = 2026;

/** Chiffres clés sûrs (cartes de synthèse). */
export const pricingHighlights = [
  { value: '8,00 €', label: 'Minimum de course' },
  { value: 'Au taximètre', label: 'Prix réglementé' },
  { value: 'Sur demande', label: 'Estimation gratuite' },
] as const;

/** Composition d'une course (sans montants départementaux non vérifiés). */
export const pricingComposition = [
  {
    label: 'Prise en charge',
    detail: 'Montant forfaitaire au départ de la course.',
  },
  {
    label: 'Tarif kilométrique',
    detail:
      'Selon le jour, l’heure et le retour en charge ou à vide (tarifs A, B, C ou D).',
  },
  {
    label: 'Tarif horaire',
    detail: 'Il s’applique à l’arrêt ou en circulation lente (moins de 16 km/h).',
  },
] as const;

/** Plafonds nationaux 2026 (arrêté du 24 décembre 2025) — maximums officiels. */
export const nationalCeilings2026 = [
  { label: 'Prise en charge', value: '4,48 € max.' },
  { label: 'Kilomètre parcouru', value: '1,30 € max.' },
  { label: 'Heure d’attente', value: '42,15 € max.' },
  { label: 'Minimum de course', value: '8,00 €' },
] as const;

/** Mention de source / cadre réglementaire affichée sous le bloc. */
export const pricingSource =
  'Plafonds nationaux 2026 (arrêté du 24 décembre 2025). Dans les Yvelines, l’arrêté préfectoral fixe ensuite les tarifs applicables, dans la limite de ces plafonds. En fin de trajet, le taximètre affiche le montant exact de votre course.';
