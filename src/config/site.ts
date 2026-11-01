/**
 * Configuration centralisée du site.
 *
 * ⚠️ IMPORTANT — DONNÉES À PERSONNALISER
 * Les valeurs marquées `isPlaceholder: true` ou commentées « À COMPLÉTER »
 * sont des valeurs de démonstration. Elles NE sont PAS vérifiées et doivent être
 * remplacées par les informations réelles de l'entreprise avant toute publication.
 * Ne jamais présenter ces valeurs comme réelles tant qu'elles n'ont pas été confirmées.
 */

/** Normalise une URL : ajoute https:// si le protocole manque et retire le slash final. */
function normalizeUrl(value: string): string {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, '');
}

const siteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://taxi-chambourcy.com');

export const siteConfig = {
  /** Nom commercial affiché */
  name: 'Allo Chambourcy Taxi',
  description:
    'Service de taxi premium à Chambourcy (78) : transferts aéroports, déplacements professionnels et trajets privés. Un transport soigné, ponctuel et discret.',

  url: siteUrl,
  locale: 'fr-FR',

  /**
   * Coordonnées de l'entreprise.
   * À COMPLÉTER avec les informations réelles avant publication.
   */
  contact: {
    // Numéro réel (fiche Google « Allo Chambourcy Taxi »).
    phone: '06 07 29 66 67',
    phoneHref: 'tel:+33607296667',
    // E-mail de réservation (boîte de réception des demandes).
    email: 'taxichambourcy78@gmail.com',
    emailHref: 'mailto:taxichambourcy78@gmail.com',
    // WhatsApp : numéro au format international sans "+" (pour les liens wa.me).
    whatsapp: '33607296667',
    whatsappHref: 'https://wa.me/33607296667',
  },

  /**
   * Adresse / implantation.
   * L'entreprise opère depuis Chambourcy ; adresse précise à renseigner si elle doit être publiée.
   */
  address: {
    city: 'Chambourcy',
    postalCode: '78240',
    region: 'Yvelines',
    // Adresse réelle (fiche Google).
    street: '5 Place de la Mairie',
    // Coordonnées géographiques (approximatives — à affiner si besoin).
    geo: { latitude: 48.898, longitude: 2.043 },
  },

  /** Zone principale décrite sur le site (conforme à la réalité de l'exploitation). */
  serviceArea: 'Chambourcy, Paris Ouest et Île-de-France',

  /**
   * Horaires réels — À CONFIRMER.
   * Valeur de démonstration : service sur réservation.
   */
  hours: {
    label: 'Service sur réservation, 7j/7',
    note: 'Horaires précis à confirmer selon la disponibilité du chauffeur.',
  },

  /**
   * Réseaux sociaux — laisser une chaîne vide pour masquer le lien.
   * À COMPLÉTER si des comptes existent.
   */
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  /**
   * Informations légales — À COMPLÉTER impérativement avant publication.
   * Ne jamais inventer de SIRET, de licence ou de numéro professionnel.
   */
  legal: {
    legalName: 'CLUB BUSINESS TAXI PARIS',
    legalForm: 'Société par actions simplifiée à associé unique (SASU)',
    capital: '200,00 €',
    rcs: '108 434 416 R.C.S. Paris',
    siren: '108 434 416',
    euid: 'FR7501.108434416',
    registrationDate: '10/08/2026',
    // Siège social (distinct de la zone d'exploitation à Chambourcy).
    headquarters: '111 avenue Victor Hugo, 75016 Paris',
    operatorName: 'Anes Smail', // Représentant légal
    siret: '108 434 416 00013', // SIRET complet (14 chiffres)
    vatNumber: 'FR 83 108 434 416', // N° de TVA intracommunautaire
    licenseNumber: '012026', // Autorisation de stationnement (taxi) — N° ADS
    stationZone: 'Chambourcy', // Commune de rattachement / zone de stationnement du taxi
    adsAuthority: 'la Mairie de Chambourcy', // Autorité ayant délivré l'ADS
    adsDate: '', // Date de délivrance de l'ADS — À COMPLÉTER
    mediatorName: '', // Médiateur de la consommation — nom — À COMPLÉTER
    mediatorAddress: '', // Médiateur — adresse — À COMPLÉTER
    mediatorUrl: '', // Médiateur — site internet — À COMPLÉTER
    lastUpdated: '1er novembre 2026', // Dernière mise à jour des mentions légales
  },

  /** Éditeur du site (agence web) — distinct de l'exploitant du service de taxi. */
  publisher: {
    name: 'SEO Acquisition',
    parentEntity: 'MeedWise SASU',
    publicationDirector: 'Anes Smail',
    url: 'https://seo-acquisition.com',
  },

  /** Image Open Graph par défaut (aperçu lors du partage de liens). */
  ogImage: '/images/branding/og-default.webp',
} as const;

/** Raccourci : le site est-il prêt à annoncer des coordonnées réelles ? */
export const hasRealContact = true; // Coordonnées réelles renseignées (fiche Google).
