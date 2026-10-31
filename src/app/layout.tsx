import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { FloatingCall } from '@/components/layout/FloatingCall';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteGraph } from '@/lib/seo';
import { siteConfig } from '@/config/site';

const serif = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500'],
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Taxi premium à Chambourcy`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  keywords: [
    'taxi Chambourcy',
    'taxi premium Chambourcy',
    'transfert aéroport Chambourcy',
    'taxi Saint-Germain-en-Laye',
    'taxi Yvelines',
    'taxi Paris Ouest',
  ],
  alternates: {
    canonical: '/',
    languages: { 'fr-FR': '/', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Taxi premium à Chambourcy`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1672, height: 941, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Taxi premium à Chambourcy`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <JsonLd data={siteGraph()} />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius)] focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Aller au contenu principal
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <FloatingWhatsApp />
        <FloatingCall />
      </body>
    </html>
  );
}
