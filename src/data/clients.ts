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
  { name: 'Ritz Paris', logo: '/images/clients/ritz-paris.svg' },
  { name: 'Molitor' },
];
