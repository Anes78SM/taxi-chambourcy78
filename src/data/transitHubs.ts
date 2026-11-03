/**
 * Gares et aéroports proposés dans la liste de suggestions des champs Départ /
 * Destination du formulaire de réservation. `label` est la valeur insérée dans
 * le champ (et envoyée par e-mail) ; `short` est le libellé court affiché en
 * tête de proposition ; `terms` ajoute des mots-clés de recherche (alias).
 */
export type TransitHub = {
  short: string;
  label: string;
  type: 'airport' | 'station';
  terms?: string;
};

/** Aéroports (détaillés par terminal) et gares les plus demandés. */
export const transitHubs: TransitHub[] = [
  // Aéroports
  { short: 'Roissy CDG, Terminal 1', label: 'Aéroport Paris-Charles de Gaulle (CDG), Terminal 1', type: 'airport', terms: 'roissy cdg aeroport' },
  { short: 'Roissy CDG, Terminal 2', label: 'Aéroport Paris-Charles de Gaulle (CDG), Terminal 2', type: 'airport', terms: 'roissy cdg aeroport' },
  { short: 'Roissy CDG, Terminal 3', label: 'Aéroport Paris-Charles de Gaulle (CDG), Terminal 3', type: 'airport', terms: 'roissy cdg aeroport' },
  { short: 'Orly, Terminaux 1-2-3', label: 'Aéroport de Paris-Orly (ORY), Terminaux 1, 2 et 3', type: 'airport', terms: 'orly ory aeroport' },
  { short: 'Orly, Terminal 4', label: 'Aéroport de Paris-Orly (ORY), Terminal 4', type: 'airport', terms: 'orly ory aeroport' },
  { short: 'Le Bourget', label: 'Aéroport de Paris-Le Bourget (aviation d’affaires)', type: 'airport', terms: 'bourget aeroport aviation affaires' },
  { short: 'Beauvais-Tillé', label: 'Aéroport de Beauvais-Tillé (BVA)', type: 'airport', terms: 'beauvais bva aeroport' },
  // Gares
  { short: 'Gare du Nord', label: 'Gare de Paris-Nord', type: 'station', terms: 'paris nord gare eurostar thalys' },
  { short: 'Gare de Lyon', label: 'Gare de Paris-Lyon', type: 'station', terms: 'paris lyon gare tgv' },
  { short: 'Gare Montparnasse', label: 'Gare de Paris-Montparnasse', type: 'station', terms: 'paris montparnasse gare tgv' },
  { short: 'Gare Saint-Lazare', label: 'Gare de Paris-Saint-Lazare', type: 'station', terms: 'paris saint lazare gare' },
  { short: 'Gare de l’Est', label: 'Gare de Paris-Est', type: 'station', terms: 'paris est gare' },
  { short: 'Gare d’Austerlitz', label: 'Gare de Paris-Austerlitz', type: 'station', terms: 'paris austerlitz gare' },
  { short: 'Gare de Saint-Germain-en-Laye', label: 'Gare de Saint-Germain-en-Laye (RER A)', type: 'station', terms: 'saint germain en laye rer gare' },
  { short: 'Gare de Poissy', label: 'Gare de Poissy (RER A / Transilien)', type: 'station', terms: 'poissy rer transilien gare' },
];

/**
 * Propositions de gares / aéroports correspondant à la saisie. Sans saisie, la
 * liste complète est renvoyée (affichée au focus du champ). `limit` borne la
 * liste filtrée pour laisser de la place aux adresses.
 */
export function matchHubs(query: string, limit = 6): TransitHub[] {
  const q = query.trim().toLowerCase();
  if (!q) return transitHubs;
  return transitHubs
    .filter((h) => `${h.label} ${h.short} ${h.terms ?? ''}`.toLowerCase().includes(q))
    .slice(0, limit);
}

/**
 * Indique si une valeur de champ désigne un aéroport ou une gare : sert à
 * afficher le champ facultatif « heure de vol / train » dans le formulaire.
 */
export function isTransitHub(value: string): boolean {
  return /a[ée]roport|terminal|\bgare\b|\bCDG\b|\bORY\b|\bBVA\b|orly|roissy|bourget|beauvais|\bRER\b/i.test(
    value,
  );
}
