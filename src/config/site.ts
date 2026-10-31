/**
 * Configuration centralisée du site.
 *
 * ⚠️ IMPORTANT — DONNÉES À PERSONNALISER
 * Les valeurs marquées `isPlaceholder: true` ou commentées « À COMPLÉTER »
 * sont des valeurs de démonstration. Elles NE sont PAS vérifiées et doivent être
 * remplacées par les informations réelles de l'entreprise avant toute publication.
 * Ne jamais présenter ces valeurs comme réelles tant qu'elles n'ont pas été confirmées.
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.chambourcy-executive-taxi.fr').replace(
  /\/$/,
  '',
);

export const siteConfig = {
  /** Nom commercial affiché */
  name: 'Chambourcy Executive Taxi',
  shortName: 'Chambourcy Executive',
  /** Baseline / slogan */
  tagline: 'Votre taxi premium à Chambourcy',
  description:
    'Service de taxi premium à Chambourcy (78) : transferts aéroports, déplacements professionnels et trajets privés. Un transport soigné, ponctuel et discret.',

  url: siteUrl,
  locale: 'fr-FR',

  /**
   * Coordonnées de l'entreprise.
   * À COMPLÉTER avec les informations réelles avant publication.
   */
  contact: {
    // Numéro de démonstration — À REMPLACER par le numéro professionnel réel.
    phone: '+33 6 00 00 00 00',
    phoneHref: 'tel:+33600000000',
    // E-mail de démonstration — À REMPLACER.
    email: 'contact@chambourcy-executive-taxi.fr',
    emailHref: 'mailto:contact@chambourcy-executive-taxi.fr',
  },

  /**
   * Adresse / implantation.
   * L'entreprise opère depuis Chambourcy ; adresse précise à renseigner si elle doit être publiée.
   */
  address: {
    city: 'Chambourcy',
    postalCode: '78240',
    region: 'Yvelines',
    country: 'France',
    // Adresse postale complète — À COMPLÉTER (laisser vide si elle ne doit pas être publiée).
    street: '',
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
    legalName: '', // Raison sociale — À COMPLÉTER
    operatorName: '', // Nom de l'exploitant — À COMPLÉTER
    siret: '', // À COMPLÉTER
    vatNumber: '', // À COMPLÉTER le cas échéant
    licenseNumber: '', // Numéro d'autorisation de stationnement / licence — À COMPLÉTER
    rcs: '', // À COMPLÉTER
  },

  /** Image Open Graph par défaut (à fournir dans /public). */
  ogImage: '/images/branding/og-default.jpg',
} as const;

export type SiteConfig = typeof siteConfig;

/** Raccourci : le site est-il prêt à annoncer des coordonnées réelles ? */
export const hasRealContact = false; // Passer à true une fois les coordonnées réelles renseignées.
