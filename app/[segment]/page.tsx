import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import LayoutsGrid from '@/components/LayoutsGrid';
import { getLayoutsByLevel } from '@/lib/layouts';
import { buildThPageMeta, buildBhPageMeta, generateCollectionPageSchema, generateBreadcrumbSchema, buildCanonicalUrl } from '@/lib/seo';

export const revalidate = 3600;
export const dynamicParams = true;

const TH_LEVELS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const BH_LEVELS = [5, 6, 7, 8, 9, 10];

function parseSegment(segment: string): { type: 'th' | 'bh'; level: number } | null {
  const thMatch = segment.match(/^th(\d+)$/i);
  if (thMatch) {
    const level = parseInt(thMatch[1]);
    if (TH_LEVELS.includes(level)) return { type: 'th', level };
  }
  const bhMatch = segment.match(/^bh(\d+)$/i);
  if (bhMatch) {
    const level = parseInt(bhMatch[1]);
    if (BH_LEVELS.includes(level)) return { type: 'bh', level };
  }
  return null;
}

export async function generateStaticParams() {
  const thParams = TH_LEVELS.map((l) => ({ segment: `th${l}` }));
  const bhParams = BH_LEVELS.map((l) => ({ segment: `bh${l}` }));
  return [...thParams, ...bhParams];
}

export async function generateMetadata({
  params,
}: {
  params: { segment: string };
}): Promise<Metadata> {
  const parsed = parseSegment(params.segment);
  if (!parsed) return {};
  const meta =
    parsed.type === 'th'
      ? buildThPageMeta(parsed.level)
      : buildBhPageMeta(parsed.level);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: meta.canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: 'ClashLayoutsHub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function SegmentPage({ params }: { params: { segment: string } }) {
  const parsed = parseSegment(params.segment);
  if (!parsed) notFound();

  const { type, level } = parsed!;
  const layouts = await getLayoutsByLevel(type, level);
  const prefix = type === 'th' ? 'TH' : 'BH';
  const title = `Best ${prefix}${level} Base Layouts 2026`;
  const description =
    type === 'th'
      ? `Download the best Town Hall ${level} base layouts for 2026. War bases, farming bases, and trophy bases with direct copy links.`
      : `Download the best Builder Hall ${level} base layouts for 2026. Trophy and hybrid bases with direct copy links.`;

  const breadcrumbs = [
    { label: type === 'th' ? 'Town Hall Bases' : 'Builder Base' },
    { label: `${prefix}${level}` },
  ];

  const collectionSchema = generateCollectionPageSchema({
    name: title,
    description,
    url: buildCanonicalUrl(`/${type}${level}`),
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: `${prefix}${level} Bases`, url: buildCanonicalUrl(`/${type}${level}`) },
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
          About {prefix}{level} Base Layouts
        </h2>
        {type === 'th' ? (
          <>
            <p className="text-brand-muted">
              Town Hall {level} is one of the most competitive levels in Clash of Clans.
              All TH{level} bases include direct copy links — tap to open in Clash of Clans.
            </p>
            <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">How to Copy a TH{level} Base</h3>
            <ol className="list-decimal pl-5 space-y-1 text-brand-muted">
              <li>Click &quot;Copy&quot; on any base card</li>
              <li>Clash of Clans opens automatically on your device</li>
              <li>Confirm the import in the layout editor</li>
              <li>Adjust hero positions and CC troops</li>
              <li>Save and apply to your village</li>
            </ol>
          </>
        ) : (
          <>
            <p className="text-brand-muted">
              Builder Hall {level} bases are essential for medal income in the Builder Base Season system.
              All BH{level} bases include direct copy links for the current meta.
            </p>
            <h3 className="text-xl font-semibold text-brand-text mt-4 mb-2">How to Use BH{level} Base Links</h3>
            <ol className="list-decimal pl-5 space-y-1 text-brand-muted">
              <li>Tap &quot;Copy&quot; on any base card</li>
              <li>Clash of Clans opens to Builder Base layout editor</li>
              <li>Confirm the import and save</li>
              <li>Battle twice daily to maximize medal income</li>
            </ol>
          </>
        )}
      </div>
    </div>
    </>
  );
}
