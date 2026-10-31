/**
 * Tarifs taxi — zone des Yvelines, année 2026.
 *
 * Tarifs réglementés (arrêté préfectoral des Yvelines), dans la limite des
 * plafonds nationaux fixés par l'arrêté du 24 décembre 2025. Anes applique ces
 * tarifs officiels. Le montant exact d'une course reste celui affiché au
 * taximètre. En cas de mise à jour annuelle de l'arrêté, actualiser ces valeurs.
 */

export const pricingYear = 2026;

/** Chiffres clés mis en avant. */
export const pricingHighlights = [
  { value: '3,00 €', label: 'Prise en charge' },
  { value: 'dès 1,00 €', label: 'Le kilomètre' },
  { value: '8,00 €', label: 'Minimum de course' },
] as const;

/** Grille tarifaire réglementée (tarifs maximums). */
export const pricingRows = [
  { label: 'Prise en charge', value: '3,00 €' },
  { label: 'Tarif A — jour (lun.–sam.), retour en charge', value: '1,00 € / km' },
  { label: 'Tarif B — nuit, dimanche et jours fériés, retour en charge', value: '1,50 € / km' },
  { label: 'Tarif C — jour, retour à vide', value: '2,00 € / km' },
  { label: 'Tarif D — nuit, dimanche et jours fériés, retour à vide', value: '3,00 € / km' },
  { label: 'Heure d’attente ou de marche lente', value: '41,56 €' },
  { label: 'Minimum de course', value: '8,00 €' },
  { label: 'Bagage encombrant', value: '2,00 € / bagage' },
  { label: 'Passager à partir du 5ᵉ', value: '4,00 € / passager' },
] as const;

/** Composition d'une course (voix active). */
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

/** Mention de source affichée sous le tableau. */
export const pricingSource =
  'Tarifs réglementés des taxis des Yvelines (arrêté préfectoral), dans la limite des plafonds nationaux 2026. Le prix exact de votre course est celui affiché au taximètre en fin de trajet.';
