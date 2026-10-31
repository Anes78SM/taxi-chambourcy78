import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { BlogCard } from '@/components/blog/BlogCard';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllPosts, getFeaturedPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog — Conseils et actualités',
  description:
    'Conseils pratiques pour vos trajets en taxi à Chambourcy : transferts aéroports, déplacements professionnels, préparation de vos déplacements.',
  path: '/blog',
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <PageHero
        eyebrow="Le journal"
        title="Conseils et actualités"
        description="Nos articles pour préparer vos trajets et mieux connaître nos services, à Chambourcy et en Île-de-France."
        crumbs={[
          { name: 'Accueil', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-14 grid overflow-hidden rounded-[var(--radius-lg)] border border-ink-900/8 bg-white shadow-card transition-shadow hover:shadow-card-hover lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.frontmatter.cover}
                  alt={featured.frontmatter.coverAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-wide text-champagne-dark">
                  <span className="font-semibold">À la une</span>
                  <span className="h-1 w-1 rounded-full bg-ink-900/20" aria-hidden />
                  <span className="text-ink-900/50">{featured.frontmatter.category}</span>
                </div>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-ink-900">
                  {featured.frontmatter.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-800/70">
                  {featured.frontmatter.description}
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-ink-900/50">
                  <time dateTime={featured.frontmatter.date}>
                    {formatDate(featured.frontmatter.date)}
                  </time>
                  <span className="h-1 w-1 rounded-full bg-ink-900/20" aria-hidden />
                  <span>{featured.readingTime} min de lecture</span>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-ink-900/30 transition-colors group-hover:text-champagne-dark" aria-hidden />
                </div>
              </div>
            </Link>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
