import { revalidatePath } from 'next/cache';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import WarBasesClient from './WarBasesClient';
import { getLayoutsByCategory } from '@/lib/layouts';
import { buildCanonicalUrl } from '@/lib/seo';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'All War Base Layouts (2026)',
    description: 'Browse all war base layouts for 2026. Anti-3 star designs for TH9-TH18 and BH5-BH10 with direct copy links for Clan Wars and CWL.',
    keywords: 'War bases, anti-3 star bases, CWL bases, Clan Wars bases, Clash of Clans',
    alternates: { canonical: buildCanonicalUrl('/war-bases') },
    openGraph: {
      title: 'All War Base Layouts (2026)',
      description: 'Browse all war base layouts for 2026. Anti-3 star designs for TH9-TH18 and BH5-BH10 with direct copy links for Clan Wars and CWL.',
      url: buildCanonicalUrl('/war-bases'),
      siteName: 'ClashLayoutsHub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'All War Base Layouts (2026)',
      description: 'Browse all war base layouts for 2026. Anti-3 star designs for TH9-TH18 and BH5-BH10 with direct copy links for Clan Wars and CWL.',
    },
  };
}

export default async function WarBasesPage() {
  const allLayouts = await getLayoutsByCategory('war');
  revalidatePath('/war-bases');

  const title = 'All War Base Layouts (2026)';
  const description = 'Browse all war base layouts for 2026. Anti-3 star designs for TH9-TH18 and BH5-BH10 with direct copy links for Clan Wars and CWL.';

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'War Bases' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbs} />
      <div className="mt-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">{title}</h1>
        <p className="text-brand-muted text-lg max-w-3xl">{description}</p>
      </div>

      <div className="mb-8">
        <WarBasesClient layouts={allLayouts} />
      </div>

      <div className="mt-16 prose max-w-none">
        <h2 className="text-2xl font-bold text-brand-text mb-4">
          About War Base Layouts
        </h2>
        <p className="text-brand-muted">
          War bases are essential for competitive Clash of Clans gameplay in Clan Wars, Clan War Leagues (CWL), and trophy pushing.
          Having a strong anti-3 star design is crucial for defending against high-level attacks.
        </p>
        <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">War Base Categories</h3>
        <p className="text-brand-muted">
          We have war base layouts for all Town Hall levels from TH9 to TH18 and Builder Hall levels from BH5 to BH10,
          including the latest defenses and strategies for the 2026 meta.
        </p>
        <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Base Types</h3>
        <ul className="list-disc pl-5 space-y-1 text-brand-muted">
          <li><strong>Anti-3 Star:</strong> Designed to prevent attackers from getting 3 stars</li>
          <li><strong>Anti-2 Star:</strong> Focused on protecting the Town Hall and key defenses</li>
          <li><strong>Ring Bases:</strong> Multiple compartment rings to confuse pathing</li>
          <li><strong>Island Bases:</strong> Centralized Town Hall with isolated compartments</li>
        </ul>
      </div>
    </div>
  );
}
