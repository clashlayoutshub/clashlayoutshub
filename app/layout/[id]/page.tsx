import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Shield, Wheat, Trophy, CheckCircle, ChevronRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import AdUnit from '@/components/AdUnit';
import LayoutCard from '@/components/LayoutCard';
import ShareButton from '@/components/ShareButton';
import { getLayoutById, getRelatedLayouts, getAllLayouts } from '@/lib/layouts';
import { buildLayoutMeta, generateBreadcrumbSchema, generateFAQSchema, generateSoftwareApplicationSchema, buildCanonicalUrl } from '@/lib/seo';
import { getOptimizedImageUrl } from '@/lib/images';

export const revalidate = 3600;
export const dynamicParams = true;

const categoryConfig = {
  war: { label: 'War Base', icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
  farming: { label: 'Farming Base', icon: Wheat, color: 'text-green-600', bg: 'bg-green-50' },
  trophy: { label: 'Trophy Base', icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
};

export async function generateStaticParams() {
  try {
    const layouts = await getAllLayouts();
    return layouts.map((l) => ({ id: l.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const layout = await getLayoutById(params.id);
  if (!layout) return {};
  const meta = buildLayoutMeta(layout);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: meta.canonical },
    openGraph: meta.openGraph,
    twitter: meta.twitter,
  };
}

export default async function LayoutPage({ params }: { params: { id: string } }) {
  const layout = await getLayoutById(params.id);
  if (!layout) notFound();

  const related = await getRelatedLayouts(layout!, 4);
  const cat = categoryConfig[layout.category];
  const Icon = cat.icon;
  const prefix = layout.type === 'th' ? 'TH' : 'BH';

  const breadcrumbItems = [
    { label: layout.type === 'th' ? 'Town Hall Bases' : 'Builder Base', href: `/${layout.type}${layout.level}` },
    { label: `${prefix}${layout.level}`, href: `/${layout.type}${layout.level}` },
    { label: layout.title },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: `${prefix}${layout.level} Bases`, url: buildCanonicalUrl(`/${layout.type}${layout.level}`) },
    { name: layout.title, url: buildCanonicalUrl(`/layout/${layout.id}`) },
  ]);

  const faqSchema = layout.faq ? generateFAQSchema(layout.faq) : null;
  const softwareSchema = generateSoftwareApplicationSchema(layout);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${cat.bg} ${cat.color}`}>
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-primary">
                  {prefix}{layout.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">{layout.title}</h1>
              <p className="text-brand-muted text-lg">{layout.description}</p>
            </div>

            {/* Base Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-6 shadow-card">
              <Image
                src={getOptimizedImageUrl(layout.image)}
                alt={layout.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={layout.baseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-xl hover:bg-primary-dark transition-colors shadow-sm text-center"
              >
                <ExternalLink className="w-5 h-5" />
                Copy Base Link in Clash of Clans
              </a>
              <Link
                href={`/${layout.type}${layout.level}`}
                className="flex items-center justify-center gap-1.5 border border-brand-border text-brand-text py-3 px-5 rounded-xl hover:border-primary hover:text-primary transition-colors"
              >
                More {prefix}{layout.level} Bases
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Share Button */}
            <div className="mb-8">
              <ShareButton
                url={buildCanonicalUrl(`/layout/${layout.id}`)}
                title={layout.title}
                description={layout.description}
              />
            </div>

            {/* Key Features */}
            {layout.keyFeatures && layout.keyFeatures.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-brand-text mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {layout.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-brand-muted">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How to Use */}
            {layout.howToUse && layout.howToUse.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-brand-text mb-4">How to Use This Base</h2>
                <ol className="space-y-3">
                  {layout.howToUse.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-brand-muted pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Tips */}
            {layout.tips && layout.tips.length > 0 && (
              <section className="mb-8 bg-blue-50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-brand-text mb-4">Tips &amp; Strategy</h2>
                <ul className="space-y-2">
                  {layout.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-brand-muted">
                      <span className="text-primary font-bold flex-shrink-0">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* About */}
            {layout.about && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-brand-text mb-4">About This Base</h2>
                <p className="text-brand-muted leading-relaxed">{layout.about}</p>
              </section>
            )}

            {/* FAQ */}
            {layout.faq && layout.faq.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-brand-text mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {layout.faq.map((item, i) => (
                    <details
                      key={i}
                      className="group bg-brand-card border border-brand-border rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                        {item.question}
                        <ChevronRight className="w-5 h-5 flex-shrink-0 text-brand-muted group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-5 pb-5 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Base Info Card */}
            <div className="bg-brand-card rounded-2xl border border-brand-border p-5">
              <h3 className="font-bold text-brand-text mb-4">Base Info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brand-muted">Level</dt>
                  <dd className="font-medium text-brand-text">{prefix}{layout.level}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-muted">Category</dt>
                  <dd className={`font-medium ${cat.color}`}>{cat.label}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-muted">Updated</dt>
                  <dd className="font-medium text-brand-text">{layout.updatedAt || layout.createdAt}</dd>
                </div>
              </dl>
              <a
                href={layout.baseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Copy Base Link
              </a>
            </div>

            {/* Ad Sidebar */}
            <AdUnit format="rectangle" label="Advertisement" />
          </div>
        </div>

        {/* Related Layouts */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-brand-text mb-6">Related Bases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r) => (
                <LayoutCard key={r.id} layout={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
