export type NavItem = {
  label: string;
  href: string;
};

/** Navigation principale (header). */
export const mainNav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Destinations', href: '/zones' },
  { label: 'Avis', href: '/#avis' },
  { label: 'Contact', href: '/contact' },
];

/** Liens de pied de page regroupés par colonne. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Services',
    items: [
      { label: 'Transferts aéroports', href: '/services/transfert-aeroport' },
      { label: 'Taxi professionnel', href: '/services/taxi-professionnel' },
      { label: 'Trajets privés', href: '/services/trajets-prives' },
      { label: 'Mise à disposition', href: '/services/mise-a-disposition' },
    ],
  },
  {
    title: 'Zones desservies',
    items: [
      { label: 'Taxi Saint-Germain-en-Laye', href: '/zones/taxi-saint-germain-en-laye' },
      { label: 'Taxi Poissy', href: '/zones/taxi-poissy' },
      { label: 'Taxi Orgeval', href: '/zones/taxi-orgeval' },
      { label: 'Taxi Maisons-Laffitte', href: '/zones/taxi-maisons-laffitte' },
      { label: 'Toutes les zones', href: '/zones' },
    ],
  },
  {
    title: 'Informations',
    items: [
      { label: 'À propos', href: '/a-propos' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'CGV', href: '/cgv' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { label: 'Politique de cookies', href: '/politique-cookies' },
    ],
  },
];
