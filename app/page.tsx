import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Wheat, Trophy, ArrowRight, Zap, Star, TrendingUp, CheckCircle, Users, Download, Award } from 'lucide-react';
import LayoutCard from '@/components/LayoutCard';
import BlogCard from '@/components/BlogCard';
import AdUnit from '@/components/AdUnit';
import { getTrendingLayouts, getAllLayouts } from '@/lib/layouts';
import { getRecentBlogs } from '@/lib/blogs';
import { generateWebSiteSchema, generateOrganizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'ClashLayoutsHub – Best Clash of Clans Base Layouts 2026',
  description:
    'Download the best Clash of Clans base layouts for TH9–TH18 and BH5–BH10. War bases, farming bases, and trophy bases with direct copy links. Updated for 2026.',
  keywords: [
    'clash of clans base layouts',
    'coc bases 2026',
    'war base copy link',
    'farming base',
    'trophy base',
    'th14 base',
    'th15 base',
    'th16 base',
    'clash layouts hub',
  ],
  openGraph: {
    title: 'ClashLayoutsHub – Best Clash of Clans Base Layouts 2026',
    description: 'Download war bases, farming bases, and trophy bases for every Town Hall level with direct copy links.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClashLayoutsHub – Best Clash of Clans Base Layouts 2026',
    description: 'Download war bases, farming bases, and trophy bases for every Town Hall level with direct copy links.',
  },
};

export const revalidate = 0;

const TH_LEVELS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const BH_LEVELS = [5, 6, 7, 8, 9, 10];

const categoryCards = [
  {
    title: 'War Bases',
    description: 'Anti-3 star designs tested in Clan Wars & CWL',
    href: '/th14',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-50',
    text: 'text-red-700',
  },
  {
    title: 'Farming Bases',
    description: 'Protect dark elixir and resources while offline',
    href: '/th14',
    icon: Wheat,
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  {
    title: 'Trophy Bases',
    description: 'Push to Legend League with proven layouts',
    href: '/th15',
    icon: Trophy,
    color: 'from-yellow-500 to-yellow-600',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
  },
];

export default async function HomePage() {
  const [trending, allLayouts, recentBlogs] = await Promise.all([
    getTrendingLayouts(8),
    getAllLayouts(),
    getRecentBlogs(3),
  ]);
  const latest = allLayouts.slice(-4).reverse();
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 md:py-32 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold mb-6 border border-white/20 animate-pulse">
            <Zap className="w-4 h-4 text-yellow-300" />
            Updated for 2026 Season
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Best Clash of Clans
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Base Layouts</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-200">2026</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Download proven war bases, farming bases, and trophy bases for every Town Hall level.
            <span className="block mt-2 text-yellow-300 font-semibold">Direct copy links — no login required.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/th14"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 hover:scale-105 transition-all shadow-2xl hover:shadow-blue-500/25 text-lg"
            >
              Browse Town Hall <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/bh5"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 hover:scale-105 transition-all border-2 border-white/30 hover:border-white/50 text-lg"
            >
              Builder Hall Layouts
            </Link>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Download className="w-4 h-4 text-yellow-400" />
              <span>One-Click Copy</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Proven Designs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16 bg-brand-card border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4 text-center">
            Browse by Base Type
          </h2>
          <p className="text-brand-muted text-center mb-10 max-w-2xl mx-auto">
            Choose from our collection of proven base layouts for every playstyle
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categoryCards.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className={`group relative rounded-3xl p-8 ${cat.bg} border-2 border-transparent hover:border-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${cat.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className={`relative font-bold text-xl ${cat.text} mb-2 group-hover:scale-105 transition-transform duration-300`}>{cat.title}</h3>
                <p className="relative text-sm text-brand-muted leading-relaxed mb-4">{cat.description}</p>
                <span className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm text-sm font-semibold ${cat.text} group-hover:bg-white group-hover:shadow-md transition-all`}>
                  View bases <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad — In-content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdUnit format="horizontal" label="Advertisement" />
      </div>

      {/* Trust Signals / Stats Section */}
      <section className="py-12 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-blue-600 text-white mb-3 shadow-lg">
                <Download className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-1">500+</div>
              <div className="text-sm text-blue-600 font-medium">Base Layouts</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-green-600 text-white mb-3 shadow-lg">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-green-700 mb-1">50K+</div>
              <div className="text-sm text-green-600 font-medium">Downloads</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-yellow-500 text-white mb-3 shadow-lg">
                <Star className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-700 mb-1">4.9</div>
              <div className="text-sm text-yellow-600 font-medium">User Rating</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-purple-600 text-white mb-3 shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-purple-700 mb-1">2026</div>
              <div className="text-sm text-purple-600 font-medium">Updated Season</div>
            </div>
          </div>
        </div>
      </section>

      {/* TH Quick Nav */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
            Town Hall Bases
          </h2>
          <p className="text-brand-muted">Select your Town Hall level to view available layouts</p>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {TH_LEVELS.map((level) => (
            <Link
              key={level}
              href={`/th${level}`}
              className="group relative flex flex-col items-center justify-center py-4 px-2 rounded-2xl bg-brand-card border-2 border-brand-border hover:border-primary hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span className="text-xs text-brand-muted group-hover:text-primary font-semibold mb-1">TH</span>
              <span className="text-lg font-bold text-brand-text group-hover:text-primary">{level}</span>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
            Builder Base
          </h2>
          <p className="text-brand-muted">Select your Builder Hall level to view available layouts</p>
        </div>
        <div className="grid grid-cols-6 gap-3 mt-6">
          {BH_LEVELS.map((level) => (
            <Link
              key={level}
              href={`/bh${level}`}
              className="group relative flex flex-col items-center justify-center py-4 px-2 rounded-2xl bg-brand-card border-2 border-brand-border hover:border-primary hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span className="text-xs text-brand-muted group-hover:text-green-600 font-semibold mb-1">BH</span>
              <span className="text-lg font-bold text-brand-text group-hover:text-green-600">{level}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Layouts */}
      <section className="py-12 bg-brand-card border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-brand-text">Trending Bases</h2>
            </div>
            <Link href="/th14" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trending.map((layout, index) => (
              <LayoutCard key={layout.id} layout={layout} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad — In-content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit format="rectangle" label="Advertisement" />
      </div>

      {/* Latest Layouts */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-bold text-brand-text">Latest Bases</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latest.map((layout) => (
            <LayoutCard key={layout.id} layout={layout} />
          ))}
        </div>
      </section>

      {/* Popular Base Searches */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-y border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-3">Popular Base Searches</h2>
            <p className="text-brand-muted text-sm md:text-base">Most searched base layouts on Google - find what players are looking for</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { term: 'TH14 War Base', href: '/th14' },
              { term: 'TH15 Farming Base', href: '/th15' },
              { term: 'TH13 Trophy Base', href: '/th13' },
              { term: 'Best TH16 Base', href: '/th16' },
              { term: 'COC War Base Link', href: '/th14' },
              { term: 'Anti 3 Star Base', href: '/th14' },
              { term: 'TH12 Farming Base', href: '/th12' },
              { term: 'BH9 Trophy Base', href: '/bh9' },
              { term: 'TH17 War Layout', href: '/th17' },
              { term: 'TH18 Defense Base', href: '/th18' },
              { term: 'TH10 Hybrid Base', href: '/th10' },
              { term: 'BH8 Push Base', href: '/bh8' },
            ].map((item) => (
              <Link
                key={item.term}
                href={item.href}
                className="bg-white border-2 border-blue-200 hover:border-primary hover:shadow-lg hover:scale-105 transition-all rounded-xl px-4 py-3 text-center text-sm font-semibold text-brand-text hover:text-primary"
              >
                {item.term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-12 bg-brand-card border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-brand-text">Latest Guides & Tips</h2>
            <Link href="/blog" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-brand-text mb-4">
            Find the Best Clash of Clans Base Layouts for Every Level
          </h2>
          <p className="text-brand-muted">
            ClashLayoutsHub is your go-to source for the best Clash of Clans base layouts in 2026.
            Whether you&apos;re looking for a TH14 war base to defend in CWL, a TH13 farming base to
            protect your dark elixir, or a TH15 trophy base to push to Legend League — we have you covered.
          </p>
          <p className="text-brand-muted">
            All base layouts come with direct copy links that open directly in Clash of Clans. No
            complicated imports, no third-party apps. Just click, open, and start defending.
          </p>
          <h3 className="text-xl font-bold text-brand-text mb-3 mt-6">Why Choose ClashLayoutsHub?</h3>
          <ul className="space-y-2 text-brand-muted">
            <li>✅ <strong>Tested layouts</strong> — every base is verified in real war and competitive play</li>
            <li>✅ <strong>Updated regularly</strong> — we track the meta and update bases after major patches</li>
            <li>✅ <strong>All TH levels</strong> — from TH9 to TH18 and BH5 to BH10</li>
            <li>✅ <strong>Free forever</strong> — no account needed, no paywall</li>
            <li>✅ <strong>Strategy guides</strong> — each base comes with tips and explanations</li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-brand-card border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-text mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-white rounded-xl border border-brand-border overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                What is ClashLayoutsHub?
                <svg className="w-5 h-5 text-brand-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-5 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                ClashLayoutsHub is the #1 resource for Clash of Clans base layouts. We provide hundreds of hand-curated war, farming, and trophy bases for TH9–TH18 and BH5–BH10 with one-click copy links.
              </div>
            </details>
            <details className="group bg-white rounded-xl border border-brand-border overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                How do I copy a base link?
                <svg className="w-5 h-5 text-brand-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-5 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                Click on any base to view its detail page, then click the "Copy Base Link" button. This will open Clash of Clans directly and allow you to apply the base to your village.
              </div>
            </details>
            <details className="group bg-white rounded-xl border border-brand-border overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                Are these bases free?
                <svg className="w-5 h-5 text-brand-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-5 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                Yes! All base layouts on ClashLayoutsHub are completely free. No account required, no paywall, no hidden fees.
              </div>
            </details>
            <details className="group bg-white rounded-xl border border-brand-border overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                How often are bases updated?
                <svg className="w-5 h-5 text-brand-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-5 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                We add new bases weekly and update our collection after every major Clash of Clans balance update to ensure you always have access to the current meta.
              </div>
            </details>
            <details className="group bg-white rounded-xl border border-brand-border overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                Can I submit my own base layout?
                <svg className="w-5 h-5 text-brand-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-5 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                Yes! We welcome community submissions. Visit our Contact page and select "Submit a Base Layout" to share your design with the community.
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
