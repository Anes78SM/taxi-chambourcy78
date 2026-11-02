import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { googleBusiness } from '@/data/reviews';
import { locations } from '@/data/locations';
import { services } from '@/data/services';
import type { FaqItem } from '@/types';

export const absoluteUrl = (path = ''): string =>
  `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, '') || siteConfig.url;

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** true : titre utilisé tel quel (sans le suffixe de marque), utile pour les titres déjà longs. */
  absoluteTitle?: boolean;
};

/** Construit un objet Metadata Next.js cohérent pour une page. */
export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex,
  absoluteTitle,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      // Site monolingue : auto-référencement fr-FR + x-default (ignoré sur les pages noindex).
      ...(noindex ? {} : { languages: { 'fr-FR': url, 'x-default': url } }),
    },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, width: 1672, height: 941, alt: title }],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ---------------------------------------------------------------------------
 * Données structurées (JSON-LD)
 *
 * Elles doivent toujours refléter le contenu réellement visible.
 * Entité centrale unique (LocalBusiness) identifiée par @id, référencée par
 * les autres schémas (provider / publisher) pour former un graphe cohérent.
 * ------------------------------------------------------------------------- */

/** Identifiants stables des entités (ancrés sur l'URL du site). */
export const BUSINESS_ID = `${siteConfig.url}/#business`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Téléphone au format E.164 (ex. +33607296667) à partir du lien tel:. */
function phoneE164(): string {
  return siteConfig.contact.phoneHref.replace(/^tel:/, '');
}

/** Entité principale : l'entreprise locale (taxi). */
export function localBusinessSchema() {
  const { address, contact } = siteConfig;
  const sameAs = [
    googleBusiness.url,
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
  ].filter(Boolean);

  const isRealPhone = contact.phone.length > 0 && !contact.phone.includes('00 00 00');

  return {
    // Entreprise locale ET service de taxi (double typage valide schema.org).
    '@type': ['TaxiService', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: siteConfig.name,
    ...(siteConfig.legal.legalName ? { legalName: siteConfig.legal.legalName } : {}),
    ...(googleBusiness.name && googleBusiness.name !== siteConfig.name
      ? { alternateName: googleBusiness.name }
      : {}),
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    logo: absoluteUrl('/images/branding/logo-green.webp'),
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Espèces, Carte bancaire (Visa, Mastercard)',
    ...(isRealPhone ? { telephone: phoneE164() } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(address.street ? { streetAddress: address.street } : {}),
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressRegion: address.region,
      addressCountry: 'FR',
    },
    ...(address.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: address.geo.latitude,
            longitude: address.geo.longitude,
          },
        }
      : {}),
    // Service disponible 24h/24, 7j/7 (sur réservation).
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    // Zones desservies structurées : Chambourcy + les communes (pages /zones) + le département.
    areaServed: [
      { '@type': 'City', name: siteConfig.address.city },
      ...locations
        .filter((l) => l.postalCode.length === 5)
        .map((l) => ({ '@type': 'City', name: l.name })),
      { '@type': 'AdministrativeArea', name: 'Yvelines' },
    ],
    // Catalogue de prestations relié aux pages services.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prestations de taxi',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          url: absoluteUrl(`/services/${s.slug}`),
        },
      })),
    },
    // Thématiques d'expertise (aide la compréhension sémantique / moteurs IA).
    knowsAbout: [
      'Transferts aéroports (Roissy CDG, Orly, Le Bourget)',
      'Transferts gares',
      'Transport de personnes par taxi',
      'Déplacements professionnels',
      'Trajets privés et sorties',
      'Mise à disposition de taxi avec chauffeur',
      'Transport vers rendez-vous médicaux',
      'Tarifs taxi réglementés des Yvelines',
    ],
    // Note moyenne réelle issue de la fiche Google (reflète le contenu visible).
    ...(googleBusiness.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: googleBusiness.rating,
            reviewCount: googleBusiness.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Entité site web (nom du site). */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'fr-FR',
    publisher: { '@id': BUSINESS_ID },
  };
}

/** Graphe global injecté sur toutes les pages (layout). */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema(), websiteSchema()],
  };
}

export function serviceSchema(args: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: args.name,
    name: args.name,
    description: args.description,
    url: args.url,
    areaServed: siteConfig.serviceArea,
    provider: { '@id': BUSINESS_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingSchema(args: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: args.title,
    description: args.description,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { '@type': 'Person', name: args.author },
    publisher: { '@id': BUSINESS_ID },
    image: args.image.startsWith('http') ? args.image : absoluteUrl(args.image),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(args.path) },
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/**
 * Graphe de la page d'accueil : nœud de page (FAQPage) relié par @id au WebSite
 * (isPartOf) et à l'entreprise (about) déclarés dans le graphe global du layout.
 * Connecte ainsi la FAQ au reste des données structurées plutôt qu'un bloc isolé.
 */
export function homePageGraph(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': BUSINESS_ID },
        primaryImageOfPage: absoluteUrl(siteConfig.ogImage),
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}
