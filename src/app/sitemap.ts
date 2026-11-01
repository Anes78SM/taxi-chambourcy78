import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getServiceSlugs } from '@/data/services';
import { getLocationSlugs } from '@/data/locations';
import { getRouteSlugs } from '@/data/routes';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/zones`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/trajets`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/a-propos`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/plan-du-site`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = getServiceSlugs().map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const zonePages: MetadataRoute.Sitemap = getLocationSlugs().map((slug) => ({
    url: `${base}/zones/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const routePages: MetadataRoute.Sitemap = getRouteSlugs().map((slug) => ({
    url: `${base}/trajets/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...zonePages, ...routePages, ...blogPages];
}
