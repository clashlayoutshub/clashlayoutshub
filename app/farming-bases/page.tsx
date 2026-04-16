import { revalidatePath } from 'next/cache';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import FarmingBasesClient from './FarmingBasesClient';
import { getLayoutsByCategory } from '@/lib/layouts';
import { buildCanonicalUrl } from '@/lib/seo';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'All Farming Base Layouts (2026)',
    description: 'Browse all farming base layouts for 2026. Protect dark elixir and resources for TH9-TH18 and BH5-BH10 with direct copy links.',
    keywords: 'Farming bases, resource protection bases, dark elixir protection, gold storage, elixir storage, Clash of Clans',
    alternates: { canonical: buildCanonicalUrl('/farming-bases') },
    openGraph: {
      title: 'All Farming Base Layouts (2026)',
      description: 'Browse all farming base layouts for 2026. Protect dark elixir and resources for TH9-TH18 and BH5-BH10 with direct copy links.',
      url: buildCanonicalUrl('/farming-bases'),
      siteName: 'ClashLayoutsHub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'All Farming Base Layouts (2026)',
      description: 'Browse all farming base layouts for 2026. Protect dark elixir and resources for TH9-TH18 and BH5-BH10 with direct copy links.',
    },
  };
}

export default async function FarmingBasesPage() {
  const allLayouts = await getLayoutsByCategory('farming');
  revalidatePath('/farming-bases');

  const title = 'All Farming Base Layouts (2026)';
  const description = 'Browse all farming base layouts for 2026. Protect dark elixir and resources for TH9-TH18 and BH5-BH10 with direct copy links.';

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Farming Bases' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbs} />
      <div className="mt-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">{title}</h1>
        <p className="text-brand-muted text-lg max-w-3xl">{description}</p>
      </div>

      <div className="mb-8">
        <FarmingBasesClient layouts={allLayouts} />
      </div>

      <div className="mt-16 prose max-w-none">
        <h2 className="text-2xl font-bold text-brand-text mb-4">
          About Farming Base Layouts
        </h2>
        <p className="text-brand-muted">
          Farming bases are designed to protect your resources while you're offline. They prioritize the protection of dark elixir,
          gold, and elixir storage, making it harder for attackers to steal your hard-earned loot.
        </p>
        <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Resource Protection</h3>
        <p className="text-brand-muted">
          We have farming base layouts for all Town Hall levels from TH9 to TH18 and Builder Hall levels from BH5 to BH10,
          including the latest defenses and strategies for the 2026 meta.
        </p>
        <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">Base Types</h3>
        <ul className="list-disc pl-5 space-y-1 text-brand-muted">
          <li><strong>Dark Elixir Protection:</strong> Centralized dark elixir storage with heavy defenses</li>
          <li><strong>Gold/Elixir Protection:</strong> Balanced protection for all resource types</li>
          <li><strong>Trophy-Farming Hybrid:</strong> Balanced between resource protection and trophy defense</li>
          <li><strong>Deadzone Bases:</strong> Traps and splash damage in key resource areas</li>
        </ul>
      </div>
    </div>
  );
}
