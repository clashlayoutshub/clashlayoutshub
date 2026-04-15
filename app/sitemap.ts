import type { MetadataRoute } from 'next';
import { getAllLayouts } from '@/lib/layouts';
import { getAllBlogMeta } from '@/lib/blogs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://clashlayoutshub.com';

const TH_LEVELS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const BH_LEVELS = [5, 6, 7, 8, 9, 10];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/dmca`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const thPages: MetadataRoute.Sitemap = TH_LEVELS.map((level) => ({
    url: `${BASE_URL}/th${level}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const bhPages: MetadataRoute.Sitemap = BH_LEVELS.map((level) => ({
    url: `${BASE_URL}/bh${level}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const [layouts, blogs] = await Promise.all([getAllLayouts(), getAllBlogMeta()]);

  const layoutPages: MetadataRoute.Sitemap = layouts.map((layout) => ({
    url: `${BASE_URL}/layout/${layout.id}`,
    lastModified: new Date(layout.updatedAt || layout.createdAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...thPages, ...bhPages, ...layoutPages, ...blogPages];
}
