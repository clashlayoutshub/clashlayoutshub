import { revalidatePath } from 'next/cache';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import LayoutsGrid from '@/components/LayoutsGrid';
import { getLayoutsByType } from '@/lib/layouts';
import { buildThPageMeta, generateCollectionPageSchema, generateBreadcrumbSchema, buildCanonicalUrl } from '@/lib/seo';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const meta = buildThPageMeta(14);
  return {
    title: 'All Town Hall Base Layouts (2026)',
    description: 'Browse all Town Hall base layouts for 2026. War bases, farming bases, and trophy bases for TH9-TH18 with direct copy links.',
    keywords: 'Town Hall bases, TH layouts, war bases, farming bases, trophy bases, Clash of Clans',
    alternates: { canonical: buildCanonicalUrl('/town-hall') },
    openGraph: {
      title: 'All Town Hall Base Layouts (2026)',
      description: 'Browse all Town Hall base layouts for 2026. War bases, farming bases, and trophy bases for TH9-TH18 with direct copy links.',
      url: buildCanonicalUrl('/town-hall'),
      siteName: 'ClashLayoutsHub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'All Town Hall Base Layouts (2026)',
      description: 'Browse all Town Hall base layouts for 2026. War bases, farming bases, and trophy bases for TH9-TH18 with direct copy links.',
    },
  };
}

export default async function TownHallPage() {
  const layouts = await getLayoutsByType('th');
  revalidatePath('/town-hall');
  const title = 'All Town Hall Base Layouts (2026)';
  const description = 'Browse all Town Hall base layouts for 2026. War bases, farming bases, and trophy bases for TH9-TH18 with direct copy links.';

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Town Hall Bases' },
  ];

  const collectionSchema = generateCollectionPageSchema({
    name: title,
    description,
    url: buildCanonicalUrl('/town-hall'),
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Town Hall Bases', url: buildCanonicalUrl('/town-hall') },
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
            About Town Hall Base Layouts
          </h2>
          <p className="text-brand-muted">
            Town Hall bases are essential for competitive Clash of Clans gameplay. Whether you're pushing trophies in Legend League,
            farming resources in Crystal, or competing in Clan Wars, having the right base layout is crucial.
          </p>
          <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Town Hall Levels Available</h3>
          <p className="text-brand-muted">
            We have base layouts for all Town Hall levels from TH9 to TH18, including the latest defenses and strategies for the 2026 meta.
          </p>
          <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Base Categories</h3>
          <ul className="list-disc pl-5 space-y-1 text-brand-muted">
            <li><strong>War Bases:</strong> Anti-3 star designs tested in competitive Clan Wars</li>
            <li><strong>Farming Bases:</strong> Protect dark elixir and resources while offline</li>
            <li><strong>Trophy Bases:</strong> Push to Legend League with proven layouts</li>
          </ul>
        </div>
      </div>
    </>
  );
}
