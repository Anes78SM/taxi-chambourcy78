import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BlogCard } from '@/components/blog/BlogCard';
import { MdxContent } from '@/components/blog/MdxContent';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPost, getPostSlugs, getAllPosts, getRelatedPosts } from '@/lib/blog';
import { extractToc } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { buildMetadata, blogPostingSchema, breadcrumbSchema } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { frontmatter } = post;
  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/blog/${slug}`,
    image: frontmatter.cover,
    type: 'article',
    publishedTime: frontmatter.date,
    modifiedTime: frontmatter.updated ?? frontmatter.date,
    absoluteTitle: true,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const toc = extractToc(content);
  const related = getRelatedPosts(slug);
  const path = `/blog/${slug}`;

  // Navigation précédent / suivant (ordre chronologique inverse)
  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema({
            title: frontmatter.title,
            description: frontmatter.description,
            path,
            datePublished: frontmatter.date,
            dateModified: frontmatter.updated,
            author: frontmatter.author,
            image: frontmatter.cover,
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: frontmatter.title, path },
          ]),
        ]}
      />

      {/* En-tête article */}
      <section className="bg-ink-900 pb-14 pt-[136px] text-white">
        <Container>
          <Breadcrumb
            items={[
              { name: 'Accueil', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: frontmatter.title, path },
            ]}
            tone="light"
            className="mb-7"
          />
          <p className="eyebrow text-champagne">{frontmatter.category}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-balance" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}>
            {frontmatter.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist">
            {frontmatter.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-mist">
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4 text-champagne" aria-hidden strokeWidth={1.5} />
              {frontmatter.author}
            </span>
            <time dateTime={frontmatter.date}>Publié le {formatDate(frontmatter.date)}</time>
            {frontmatter.updated && frontmatter.updated !== frontmatter.date && (
              <time dateTime={frontmatter.updated}>Mis à jour le {formatDate(frontmatter.updated)}</time>
            )}
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-champagne" aria-hidden strokeWidth={1.5} />
              {readingTime} min de lecture
            </span>
          </div>
        </Container>
      </section>

      {/* Image de couverture */}
      <div className="bg-ink-900">
        <Container>
          <div className="relative aspect-[16/8] -mb-20 overflow-hidden rounded-[var(--radius-lg)] shadow-card">
            <Image
              src={frontmatter.cover}
              alt={frontmatter.coverAlt}
              fill
              priority
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="object-cover"
            />
          </div>
        </Container>
      </div>

      {/* Corps : sommaire + contenu */}
      <section className="bg-cream pb-20 pt-32 sm:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            {toc.length > 2 && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="eyebrow mb-4 text-champagne-dark">Sommaire</p>
                  <nav aria-label="Sommaire de l'article">
                    <ul className="space-y-2.5 text-sm">
                      {toc.map((entry) => (
                        <li key={entry.id} className={entry.level === 3 ? 'pl-4' : ''}>
                          <a
                            href={`#${entry.id}`}
                            className="text-ink-800/65 transition-colors hover:text-champagne-dark"
                          >
                            {entry.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}

            <article className="min-w-0 max-w-prose">
              <MdxContent source={content} />

              {/* Note de fiabilité */}
              <p className="mt-12 rounded-[var(--radius)] border border-ink-900/10 bg-white/60 p-5 text-xs leading-relaxed text-ink-800/60">
                Cet article a une vocation informative. Les durées de trajet, tarifs et
                disponibilités dépendent de chaque demande et ne sont pas garantis. Pour toute
                information précise, transmettez votre demande via le formulaire de réservation.
              </p>

              {/* Navigation précédent / suivant */}
              <nav className="mt-10 flex flex-col gap-4 border-t border-ink-900/10 pt-8 sm:flex-row sm:justify-between" aria-label="Navigation entre articles">
                {previous ? (
                  <Link href={`/blog/${previous.slug}`} className="group inline-flex items-center gap-2 text-sm text-ink-900">
                    <ArrowLeft className="h-4 w-4 text-champagne-dark" aria-hidden />
                    <span className="transition-colors group-hover:text-champagne-dark">
                      {previous.frontmatter.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link href={`/blog/${next.slug}`} className="group inline-flex items-center gap-2 text-right text-sm text-ink-900 sm:ml-auto">
                    <span className="transition-colors group-hover:text-champagne-dark">
                      {next.frontmatter.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-champagne-dark" aria-hidden />
                  </Link>
                )}
              </nav>
            </article>
          </div>
        </Container>
      </section>

      {/* Articles associés */}
      {related.length > 0 && (
        <section className="bg-[#f7f4ef] py-20 sm:py-24">
          <Container>
            <h2 className="text-h2 text-ink-900">À lire également</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
