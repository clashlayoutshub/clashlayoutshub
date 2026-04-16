import { revalidatePath } from 'next/cache';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import TrophyBasesClient from './TrophyBasesClient';
import { getLayoutsByCategory } from '@/lib/layouts';
import { buildCanonicalUrl } from '@/lib/seo';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'All Trophy Base Layouts (2026)',
    description: 'Browse all trophy base layouts for 2026. Push to Legend League with proven designs for TH9-TH18 and BH5-BH10 with direct copy links.',
    keywords: 'Trophy bases, Legend League bases, push bases, trophy pushing, Clash of Clans',
    alternates: { canonical: buildCanonicalUrl('/trophy-bases') },
    openGraph: {
      title: 'All Trophy Base Layouts (2026)',
      description: 'Browse all trophy base layouts for 2026. Push to Legend League with proven designs for TH9-TH18 and BH5-BH10 with direct copy links.',
      url: buildCanonicalUrl('/trophy-bases'),
      siteName: 'ClashLayoutsHub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'All Trophy Base Layouts (2026)',
      description: 'Browse all trophy base layouts for 2026. Push to Legend League with proven designs for TH9-TH18 and BH5-BH10 with direct copy links.',
    },
  };
}

export default async function TrophyBasesPage() {
  const allLayouts = await getLayoutsByCategory('trophy');
  revalidatePath('/trophy-bases');

  const title = 'All Trophy Base Layouts (2026)';
  const description = 'Browse all trophy base layouts for 2026. Push to Legend League with proven designs for TH9-TH18 and BH5-BH10 with direct copy links.';

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Trophy Bases' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbs} />
      <div className="mt-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">{title}</h1>
        <p className="text-brand-muted text-lg max-w-3xl">{description}</p>
      </div>

      <div className="mb-8">
        <TrophyBasesClient layouts={allLayouts} />
      </div>

      <div className="mt-16 prose max-w-none">
        <h2 className="text-2xl font-bold text-brand-text mb-4">
          About Trophy Base Layouts
        </h2>
        <p className="text-brand-muted">
          Trophy bases are designed to maximize your trophy count by defending against attacks. They prioritize the Town Hall
          and key defenses to make it difficult for attackers to gain stars.
        </p>
        <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Trophy Pushing</h3>
        <p className="text-brand-muted">
          We have trophy base layouts for all Town Hall levels from TH9 to TH18 and Builder Hall levels from BH5 to BH10,
          including the latest defenses and strategies for the 2026 meta.
        </p>
        <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Base Types</h3>
        <ul className="list-disc pl-5 space-y-1 text-brand-muted">
          <li><strong>Legend League Bases:</strong> Designed for high-level competitive play</li>
          <li><strong>Trophy Pushing Bases:</strong> Balanced defense for climbing the ranks</li>
          <li><strong>Titan/Champion Bases:</strong> Optimized for mid-to-high trophy ranges</li>
          <li><strong>Hybrid Bases:</strong> Balanced between trophy defense and resource protection</li>
        </ul>
      </div>
    </div>
  );
}
