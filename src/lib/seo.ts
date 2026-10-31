import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { googleBusiness } from '@/data/reviews';
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
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
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
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: siteConfig.name,
    ...(googleBusiness.name && googleBusiness.name !== siteConfig.name
      ? { alternateName: googleBusiness.name }
      : {}),
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
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
    areaServed: siteConfig.serviceArea,
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
