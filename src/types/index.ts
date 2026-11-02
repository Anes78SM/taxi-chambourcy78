export type FaqItem = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  /** Libellé court (navigation, cartes) */
  name: string;
  /** Titre de page / H1 */
  title: string;
  /** Accroche courte (cartes, hero) */
  tagline: string;
  /** Description de la carte (page d'accueil) */
  cardDescription: string;
  /** Icône lucide-react (nom de composant) */
  icon: string;
  /** Image de couverture */
  image: string;
  imageAlt: string;
  /** Paragraphes de présentation détaillée */
  intro: string[];
  /** Bénéfices clients */
  benefits: { title: string; description: string }[];
  /** Informations pratiques */
  practical: string[];
  /** Zones / destinations citées */
  destinations: string[];
  /** FAQ spécifique à la page */
  faq: FaqItem[];
};

export type Location = {
  slug: string;
  /** Nom de la commune / zone */
  name: string;
  /** Libellé court « Taxi à {ville} » : eyebrow, titre FAQ, liens plan du site / llms.txt, schema Service. */
  title: string;
  /** H1 visible du hero (descriptif, orienté requête). Défaut : `title`. */
  h1?: string;
  /** Titre SEO (<title>) + Open Graph / Twitter, < 60 car., utilisé tel quel sans suffixe de marque. Défaut : `title` + suffixe. */
  metaTitle?: string;
  /** Meta description SEO (~155 car.). Défaut : phrase construite à partir de `tagline` + `name`. */
  metaDescription?: string;
  /** Code postal (vide pour une zone large) */
  postalCode: string;
  /** Accroche courte */
  tagline: string;
  /** Contexte géographique */
  context: string[];
  /** Besoins de transport locaux */
  needs: string[];
  /** Principales destinations depuis cette zone */
  destinations: { label: string; detail: string }[];
  /** Informations pratiques */
  practical: string[];
  /** FAQ locale */
  faq: FaqItem[];
  /** Intro personnalisée du hero (sinon : intro « taxi à {ville} » par défaut). Utile pour un hub régional. */
  heroLede?: string;
  /** Ville utilisée par les sections réservation / tarifs (sinon : `name`). */
  bookingCity?: string;
};

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  draft?: boolean;
};

export type BlogPost = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
};
