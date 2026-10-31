/**
 * Clients professionnels (B2B) affichés dans la section « Ils nous font confiance ».
 *
 * ⚠️ N'ajouter que des clients réels, et s'assurer de disposer de l'autorisation
 * d'afficher leur nom / logo (les marques et hôtels exigent souvent un accord).
 *
 * - Sans `logo` : le nom est affiché en toutes lettres (joli repli, aucun fichier requis).
 * - Avec `logo` : déposer le fichier dans `public/images/clients/` et indiquer son chemin.
 */

export type Client = {
  /** Nom du client (sert d'alt du logo et de repli texte) */
  name: string;
  /** Chemin du logo, ex. "/images/clients/ritz.svg" — facultatif */
  logo?: string;
  /** Lien vers le site du client — facultatif */
  url?: string;
};

export const clients: Client[] = [
  { name: 'Erborian', logo: '/images/clients/erborian.png' },
  { name: 'Shiseido', logo: '/images/clients/shiseido.png' },
  { name: 'Kantar', logo: '/images/clients/kantar.png' },
  { name: 'BMW', logo: '/images/clients/bmw.png' },
  { name: 'Jetex', logo: '/images/clients/jetex.png' },
  { name: 'Robin & Co', logo: '/images/clients/robin-co.png' },
  { name: 'LSM — Leading Sport Management', logo: '/images/clients/lsm.png' },
  { name: 'A-ROSA', logo: '/images/clients/arosa.png' },
  { name: 'SNCF', logo: '/images/clients/sncf.png' },
];
