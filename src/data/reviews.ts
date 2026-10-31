/**
 * Avis clients RÉELS issus de la fiche Google (Google Business Profile / GMB).
 *
 * ⚠️ N'ajouter ici que des avis authentiques réellement publiés sur Google.
 * Ne jamais inventer d'avis, de note ou d'auteur.
 *
 * Pour ajouter un avis, copier un bloc et renseigner les champs ci-dessous.
 */

export type Review = {
  /** Nom de l'auteur tel qu'affiché sur Google */
  author: string;
  /** Note sur 5 (entier de 1 à 5) */
  rating: number;
  /** Texte de l'avis */
  text: string;
  /** Date de l'avis (ISO, ex. "2026-09-14") — facultatif */
  date?: string;
  /** Indication relative affichée si pas de date (ex. "il y a 2 mois") — facultatif */
  relativeTime?: string;
};

/**
 * Fiche Google (Google Business Profile) de l'établissement.
 * Données publiques affichées sur Google — à mettre à jour si elles évoluent.
 * Mettre `url` à '' pour masquer les liens vers Google.
 */
export const googleBusiness = {
  name: 'Allo Chambourcy Taxi',
  /** Note moyenne affichée sur Google */
  rating: 5.0,
  /** Nombre total d'avis sur Google */
  reviewCount: 14,
  /** Lien vers la fiche (voir / laisser un avis) */
  url: 'https://share.google/msj09rycxwhDR1dU0',
  /** URL d'intégration Google Maps (iframe, sans clé d'API) */
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Allo+Chambourcy+Taxi,+5+Place+de+la+Mairie,+78240+Chambourcy&output=embed',
};

export const reviews: Review[] = [
  {
    author: 'Arnaud Faguer',
    rating: 5,
    relativeTime: 'il y a 1 mois',
    text: 'Super service et super expérience client. De la prise de rendez vous jusqu’à la prise en charge, suivi personnalisé et hyper professionnel, toujours à l’heure, à l’écoute, digne de confiance, souriant et attentionné. Voiture toujours impeccable. Meilleur service de taxi connu. Bravo et merci Romuald !',
  },
  {
    author: 'stephane vincent',
    rating: 5,
    relativeTime: 'il y a 1 mois',
    text: 'Cela fait 15 ans que je fais appel à ses services, et à ceux de son réseau de taxis du 78, sur lesquels on peut compter les yeux fermés, car on les connaît contrairement à ceux d’UBER. Toujours un peu avant l’heure, avec le sourire et avec des forfaits aéroport très intéressants pour une société qui s’assure que ses employés sont entre de bonnes mains et rentreront à bon port en toute sécurité dans une voiture propre, avec une bouteille d’eau et avec des chauffeurs agréables qui s’adaptent à vos besoins. Quand on vole de nuit en provenance de l’Asie ou des US, c’est une assurance inestimable. Bonne retraite à Romuald et longue vie à ce réseau.',
  },
  {
    author: 'Séverin TARBOURIECH',
    rating: 5,
    relativeTime: 'il y a 1 mois',
    text: 'Vous avez toujours mis le service client en premier. Toujours un plaisir de voyager avec vous. Merci Romuald pour votre professionnalisme et qualité relationnelle.',
  },
  {
    author: 'Acèn',
    rating: 5,
    relativeTime: 'il y a 3 ans',
    text: 'Service très sérieux 🙏',
  },
  {
    author: 'Richard CAILLOT',
    rating: 5,
    relativeTime: 'il y a 1 mois',
    text: 'Ponctualité, amabilité, courtoisie et surtout une qualité de la relation client exceptionnelle.',
  },
  {
    author: 'stephanie moreau',
    rating: 5,
    relativeTime: 'il y a 1 mois',
    text: 'Un chauffeur très professionnel, sympathique, ultra réactif ! Reco les yeux fermés.',
  },
  {
    author: 'Danielle Pancera',
    rating: 5,
    relativeTime: 'il y a 1 mois',
    text: 'Tjrs très fiable.',
  },
  {
    author: 'Jose Angel OSES LISO',
    rating: 5,
    relativeTime: 'il y a 1 mois',
    text: 'Excellent service, très pro et sérieux pendant 17 ans ! La barrière est très haute Ânes !',
  },
  {
    author: 'Jo David',
    rating: 5,
    relativeTime: 'il y a 1 mois',
    text: 'Bienvenue Anes et bonne reprise de la clientèle taxi de Romuald.\nJ’espère rencontrer avec vous le même professionnalisme que lui :\n- Puissant aspect sécuritaire,\n- Qualité irréprochable de conduite,\n- Total respect des horaires,\n- Bienveillance permanente,\n- Forte écoute des attentes et besoins des clients.\nMERCI Romuald et bonne retraite.',
  },
];
