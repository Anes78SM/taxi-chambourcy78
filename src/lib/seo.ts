import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
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
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image);

  return {
    title,
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
 * Elles doivent toujours refléter le contenu réellement visible.
 * Aucune note, étoile ou avis n'est ajouté tant qu'il n'est pas vérifié.
 * ------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    ...(siteConfig.contact.phone.includes('00 00 00')
      ? {}
      : { telephone: siteConfig.contact.phone }),
    email: siteConfig.contact.email,
    areaServed: siteConfig.serviceArea,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.region,
      addressCountry: 'FR',
    },
  };
}

export function localTaxiServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: siteConfig.name,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.serviceArea,
    url: siteConfig.url,
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
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
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
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
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
