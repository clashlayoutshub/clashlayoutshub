import { revalidatePath } from 'next/cache';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import LayoutsGrid from '@/components/LayoutsGrid';
import { getLayoutsByType } from '@/lib/layouts';
import { buildBhPageMeta, generateCollectionPageSchema, generateBreadcrumbSchema, buildCanonicalUrl } from '@/lib/seo';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const meta = buildBhPageMeta(10);
  return {
    title: 'All Builder Base Layouts (2026)',
    description: 'Browse all Builder Base layouts for 2026. Trophy and hybrid bases for BH5-BH10 with direct copy links for the Builder Base Season.',
    keywords: 'Builder Base, BH layouts, trophy bases, hybrid bases, Clash of Clans, Builder Base Season',
    alternates: { canonical: buildCanonicalUrl('/builder-base') },
    openGraph: {
      title: 'All Builder Base Layouts (2026)',
      description: 'Browse all Builder Base layouts for 2026. Trophy and hybrid bases for BH5-BH10 with direct copy links for the Builder Base Season.',
      url: buildCanonicalUrl('/builder-base'),
      siteName: 'ClashLayoutsHub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'All Builder Base Layouts (2026)',
      description: 'Browse all Builder Base layouts for 2026. Trophy and hybrid bases for BH5-BH10 with direct copy links for the Builder Base Season.',
    },
  };
}

export default async function BuilderBasePage() {
  const layouts = await getLayoutsByType('bh');
  revalidatePath('/builder-base');
  const title = 'All Builder Base Layouts (2026)';
  const description = 'Browse all Builder Base layouts for 2026. Trophy and hybrid bases for BH5-BH10 with direct copy links for the Builder Base Season.';

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Builder Base' },
  ];

  const collectionSchema = generateCollectionPageSchema({
    name: title,
    description,
    url: buildCanonicalUrl('/builder-base'),
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Builder Base', url: buildCanonicalUrl('/builder-base') },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbs} />
        <div className="mt-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">{title}</h1>
          <p className="text-brand-muted text-lg max-w-3xl">{description}</p>
        </div>
        <LayoutsGrid layouts={layouts} />
        <div className="mt-16 prose max-w-none">
          <h2 className="text-2xl font-bold text-brand-text mb-4">
            About Builder Base Layouts
          </h2>
          <p className="text-brand-muted">
            Builder Base layouts are essential for maximizing medal income in the Builder Base Season system. 
            Winning attacks and defending your base efficiently is key to climbing the ranks and earning rewards.
          </p>
          <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Builder Hall Levels Available</h3>
          <p className="text-brand-muted">
            We have base layouts for all Builder Hall levels from BH5 to BH10, including the latest defenses and strategies for the 2026 meta.
          </p>
          <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Base Categories</h3>
          <ul className="list-disc pl-5 space-y-1 text-brand-muted">
            <li><strong>Trophy Bases:</strong> Designed to win attacks and defend for maximum medal income</li>
            <li><strong>Hybrid Bases:</strong> Balanced layouts that work well for both attacking and defending</li>
          </ul>
        </div>
      </div>
    </>
  );
}
