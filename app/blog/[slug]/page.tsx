import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, ChevronRight, CheckCircle, XCircle, List } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import AdUnit from '@/components/AdUnit';
import BlogCard from '@/components/BlogCard';
import { getBlogBySlug, getAllBlogMeta } from '@/lib/blogs';
import { buildBlogMeta, generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema, buildCanonicalUrl } from '@/lib/seo';
import { getOptimizedImageUrl } from '@/lib/images';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogMeta();
    return blogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return {};
  const meta = buildBlogMeta(blog);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: meta.canonical },
    openGraph: meta.openGraph,
    twitter: meta.twitter,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) notFound();

  const allBlogs = await getAllBlogMeta();
  const related = allBlogs.filter((b) => b.slug !== blog!.slug).slice(0, 3);

  const articleSchema = generateArticleSchema(blog);
  const faqSchema = blog.faq ? generateFAQSchema(blog.faq) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Blog', url: buildCanonicalUrl('/blog') },
    { name: blog.title, url: buildCanonicalUrl(`/blog/${blog.slug}`) },
  ]);

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const paragraphs = blog.content
    .trim()
    .split('\n')
    .filter((line) => line.trim() !== '');

  // Extract headings for ToC (excluding Table of Contents itself)
  const tocHeadings = paragraphs
    .filter((line) => line.startsWith('## ') && !line.startsWith('## Table of Contents'))
    .map((line) => ({
      title: line.slice(3).trim(),
      id: line.slice(3).trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-'),
    }));

  // Extract Pros & Cons section
  let prosCons: { pros: string[]; cons: string[] } | null = null;
  let inPros = false;
  let inCons = false;
  const pros: string[] = [];
  const cons: string[] = [];

  for (const line of paragraphs) {
    if (line.startsWith('## Pros & Cons')) {
      inPros = false;
      inCons = false;
      continue;
    }
    if (line.startsWith('**Pros:**')) {
      inPros = true;
      inCons = false;
      continue;
    }
    if (line.startsWith('**Cons:**')) {
      inPros = false;
      inCons = true;
      continue;
    }
    if (inPros && line.startsWith('- ')) {
      pros.push(line.slice(2).replace(/✅/g, '').trim());
    }
    if (inCons && line.startsWith('- ')) {
      cons.push(line.slice(2).replace(/❌/g, '').trim());
    }
  }
  if (pros.length > 0 || cons.length > 0) {
    prosCons = { pros, cons };
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: blog.title }]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Tags */}
            {blog.tags && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {blog.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-primary text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-4 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-brand-muted mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              {blog.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {blog.author}
                </span>
              )}
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-8 shadow-card">
              <Image
                src={getOptimizedImageUrl(blog.featuredImage)}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mt-6 scroll-smooth">
              {paragraphs.map((paragraph, i) => {
                const headingId = paragraph.startsWith('## ')
                  ? paragraph.slice(3).trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
                  : undefined;

                // Skip Table of Contents heading (it's in the sidebar)
                if (paragraph.startsWith('## Table of Contents')) {
                  return null;
                }
                // Skip Pros & Cons section (it's shown as a card)
                if (paragraph.startsWith('## Pros & Cons') || paragraph.startsWith('**Pros:**') || paragraph.startsWith('**Cons:**')) {
                  return null;
                }
                // Skip pros/cons bullet points by checking if this line is in pros/cons section
                let isInProsConsSection = false;
                let prosIndex = paragraphs.findIndex(p => p.startsWith('## Pros & Cons') || p.startsWith('**Pros:**'));
                let consIndex = paragraphs.findIndex(p => p.startsWith('**Cons:**'));
                let faqIndex = paragraphs.findIndex(p => p.startsWith('## Frequently Asked Questions') || p.startsWith('## FAQ'));
                if (prosIndex !== -1 && faqIndex !== -1) {
                  isInProsConsSection = i > prosIndex && i < faqIndex;
                }
                if (isInProsConsSection && paragraph.startsWith('- ')) {
                  return null;
                }

                if (paragraph.startsWith('## ')) {
                  return <h2 key={i} id={headingId} className="scroll-mt-24">{paragraph.slice(3)}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i} id={headingId} className="scroll-mt-24">{paragraph.slice(4)}</h3>;
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <p key={i}><strong>{paragraph.slice(2, -2)}</strong></p>;
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={i}>
                      {paragraph.split('\n').filter(l => l.startsWith('- ')).map((item, j) => (
                        <li key={j}>{item.slice(2)}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i}>{paragraph}</p>;
              })}
            </div>

            {/* Pros & Cons Card */}
            {prosCons && (prosCons.pros.length > 0 || prosCons.cons.length > 0) && (
              <div className="mt-8 bg-gradient-to-br from-gray-50 to-white border border-brand-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-brand-text mb-4 flex items-center gap-2">
                  <List className="w-5 h-5 text-primary" />
                  Pros & Cons
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {prosCons.pros.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {prosCons.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-brand-muted">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {prosCons.cons.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-700 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {prosCons.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-brand-muted">
                            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQ */}
            {blog.faq && blog.faq.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-brand-text mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {blog.faq.map((item, i) => (
                    <details key={i} className="group bg-brand-card border border-brand-border rounded-xl overflow-hidden">
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

            {/* Back to blog */}
            <div className="mt-10 pt-8 border-t border-brand-border">
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Sticky Table of Contents */}
            {tocHeadings.length > 0 && (
              <div className="lg:sticky lg:top-24 bg-brand-card rounded-2xl border border-brand-border p-5 shadow-sm">
                <h3 className="font-bold text-brand-text mb-4 flex items-center gap-2">
                  <List className="w-5 h-5 text-primary" />
                  Contents
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {tocHeadings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="text-sm text-brand-muted hover:text-primary transition-colors block py-1"
                        >
                          {heading.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            <AdUnit format="rectangle" label="Advertisement" />

            {related.length > 0 && (
              <div className="bg-brand-card rounded-2xl border border-brand-border p-5">
                <h3 className="font-bold text-brand-text mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {related.map((b) => (
                    <Link key={b.slug} href={`/blog/${b.slug}`} className="block group">
                      <p className="text-sm font-medium text-brand-text group-hover:text-primary transition-colors leading-tight">
                        {b.title}
                      </p>
                      <p className="text-xs text-brand-muted mt-1">
                        {new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Blog Posts */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-brand-text mb-6">More Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((b) => (
                <BlogCard key={b.slug} blog={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
