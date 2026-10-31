import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost, PostFrontmatter } from '@/types';
import { estimateReadingTime } from '@/lib/utils';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFile(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (frontmatter.draft) return null;

  return {
    slug,
    frontmatter,
    content,
    readingTime: estimateReadingTime(content),
  };
}

/** Retourne tous les slugs d'articles disponibles. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

/** Retourne un article par son slug (ou null si absent / brouillon). */
export function getPost(slug: string): BlogPost | null {
  return parseFile(slug);
}

/** Retourne tous les articles publiés, triés du plus récent au plus ancien. */
export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => parseFile(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
    );
}

/** Article mis en avant (featured), sinon le plus récent. */
export function getFeaturedPost(): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.frontmatter.featured) ?? posts[0] ?? null;
}

/** Catégories distinctes présentes dans les articles. */
export function getCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.frontmatter.category)));
}

/** Articles d'une catégorie donnée. */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
}

/** Articles associés (même catégorie), hors article courant. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  const sameCategory = getAllPosts().filter(
    (p) => p.slug !== slug && p.frontmatter.category === current.frontmatter.category,
  );
  const others = getAllPosts().filter(
    (p) => p.slug !== slug && p.frontmatter.category !== current.frontmatter.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
