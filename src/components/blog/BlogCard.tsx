import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

type BlogCardProps = {
  post: BlogPost;
  priority?: boolean;
};

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const href = `/blog/${slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-ink-900/8 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={frontmatter.cover}
          alt={frontmatter.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-wide text-champagne-dark">
          <span className="font-semibold">{frontmatter.category}</span>
          <span className="h-1 w-1 rounded-full bg-ink-900/20" aria-hidden />
          <span className="text-ink-900/50">{readingTime} min de lecture</span>
        </div>
        <h3 className="mt-3 font-serif text-xl leading-snug text-ink-900">
          <Link href={href} className="transition-colors hover:text-champagne-dark">
            {frontmatter.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-800/70">
          {frontmatter.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-ink-900/8 pt-4">
          <time dateTime={frontmatter.date} className="text-xs text-ink-900/50">
            {formatDate(frontmatter.date)}
          </time>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs font-semibold text-ink-900 transition-colors hover:text-champagne-dark"
            aria-label={`Lire : ${frontmatter.title}`}
          >
            Lire
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
