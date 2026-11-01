import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { services } from '@/data/services';
import { locations } from '@/data/locations';
import { routes } from '@/data/routes';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = buildMetadata({
  title: 'Plan du site',
  description:
    'Toutes les pages d’Allo Chambourcy Taxi : services, zones desservies, articles du blog et informations pratiques.',
  path: '/plan-du-site',
});

type SitemapLink = { label: string; href: string };
type SitemapGroup = { title: string; links: SitemapLink[] };

export default function SitemapPage() {
  const posts = getAllPosts();

  // Les sections « Nos services », « Zones desservies » et « Le journal » se
  // complètent automatiquement à partir des données (mêmes sources que le sitemap.xml).
  const groups: SitemapGroup[] = [
    {
      title: 'Pages principales',
      links: [
        { label: 'Accueil', href: '/' },
        { label: 'Nos services', href: '/services' },
        { label: 'Zones desservies', href: '/zones' },
        { label: 'Le journal', href: '/blog' },
        { label: 'À propos', href: '/a-propos' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Nos services',
      links: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
    },
    {
      title: 'Zones desservies',
      links: locations.map((l) => ({ label: l.title, href: `/zones/${l.slug}` })),
    },
    {
      title: 'Trajets',
      links: [
        { label: 'Tous les trajets', href: '/trajets' },
        ...routes.map((r) => ({ label: `Chambourcy → ${r.shortName}`, href: `/trajets/${r.slug}` })),
      ],
    },
    ...(posts.length > 0
      ? [
          {
            title: 'Le journal',
            links: posts.map((p) => ({ label: p.frontmatter.title, href: `/blog/${p.slug}` })),
          },
        ]
      : []),
    {
      title: 'Informations légales',
      links: [
        { label: 'Mentions légales', href: '/mentions-legales' },
        { label: 'CGV', href: '/cgv' },
        { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
        { label: 'Politique de cookies', href: '/politique-cookies' },
      ],
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Plan du site', path: '/plan-du-site' },
        ])}
      />
      <PageHero
        eyebrow="Plan du site"
        title="Plan du site"
        description="Retrouvez l’ensemble des pages du site, classées par thème."
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Plan du site', path: '/plan-du-site' },
        ]}
      />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-serif text-xl text-ink-900">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-800/75 underline-offset-4 transition-colors hover:text-champagne-dark hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
