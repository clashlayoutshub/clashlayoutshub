import type { Metadata } from 'next';
import Link from 'next/link';
import { Swords, Target, Users, ShieldCheck, Award, Zap, Globe, Heart, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'About Us - ClashLayoutsHub',
  description:
    'Learn about ClashLayoutsHub — the #1 resource for Clash of Clans base layouts. Our mission to provide free, tested war, farming, and trophy bases for TH9-TH18 and BH5-BH10.',
  keywords: [
    'clash of clans about',
    'clashlayoutshub team',
    'coc base layouts mission',
    'about clashlayoutshub',
  ],
  alternates: { canonical: 'https://clashlayoutshub.com/about' },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ClashLayoutsHub',
  description: 'The #1 resource for Clash of Clans base layouts providing free, tested war, farming, and trophy bases.',
  url: 'https://clashlayoutshub.com',
  logo: 'https://clashlayoutshub.com/icon-192.png',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@clashlayoutshub.com',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: 'English',
  },
};

const PILLARS = [
  {
    icon: Target,
    title: 'Our Mission',
    body: 'To give every Clash of Clans player — from fresh Town Hall 9 to max Town Hall 18 — access to the best war, farming, and trophy base designs completely free.',
    color: 'from-blue-500 to-blue-600',
    bg: 'from-blue-50 to-blue-100',
  },
  {
    icon: Users,
    title: 'Who We Are',
    body: 'We are a small, passionate team of longtime Clash of Clans players who got tired of scouring forums for tested base links. So we built the resource we always wanted.',
    color: 'from-green-500 to-green-600',
    bg: 'from-green-50 to-green-100',
  },
  {
    icon: ShieldCheck,
    title: 'Our Promise',
    body: 'Every base on ClashLayoutsHub is hand-picked, tested in real wars or ranked play, and kept up to date with each Clash of Clans balance update.',
    color: 'from-purple-500 to-purple-600',
    bg: 'from-purple-50 to-purple-100',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        {/* Hero Section */}
        <div className="text-center mb-16 mt-8">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-lg">
            <Swords className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text mb-4">
            About <span className="text-primary">ClashLayoutsHub</span>
          </h1>
          <p className="text-brand-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            The internet&apos;s most focused library of Clash of Clans base layouts — curated, tested, and updated regularly so you spend less time theory-crafting and more time winning.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PILLARS.map(({ icon: Icon, title, body, color, bg }) => (
            <div key={title} className={`bg-gradient-to-br ${bg} rounded-3xl p-8 border-2 border-transparent hover:shadow-xl transition-all duration-300`}>
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${color} text-white mb-6 shadow-lg`}>
                <Icon className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-2xl text-brand-text mb-4">{title}</h2>
              <p className="text-brand-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-3xl p-8 md:p-12 mb-16 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-200 font-medium">Base Layouts</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">TH9-18</div>
              <div className="text-blue-200 font-medium">Town Hall Levels</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">BH5-10</div>
              <div className="text-blue-200 font-medium">Builder Hall Levels</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2026</div>
              <div className="text-blue-200 font-medium">Updated Season</div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="bg-white rounded-3xl p-8 md:p-10 border-2 border-brand-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-500 rounded-xl text-white">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text">Our Story</h2>
            </div>
            <div className="space-y-4 text-brand-muted leading-relaxed">
              <p>
                ClashLayoutsHub started as a simple side project — a personal collection of base links that worked well in clan wars. Over time, friends asked to use it, then their clanmates did too. What began as a private Google Doc became a fully fledged website designed to serve millions of Clash of Clans players worldwide.
              </p>
              <p>
                Today we maintain an ever-growing database of bases covering every Town Hall level from TH9 to TH18 and every Builder Hall level from BH5 to BH10 — all organised by strategy type (war, farming, trophy) and kept current after each game update.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-10 border-2 border-brand-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500 rounded-xl text-white">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text">What We Offer</h2>
            </div>
            <ul className="space-y-4 text-brand-muted">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Hundreds of hand-curated base layouts with one-click copy links</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Detailed breakdowns of key features, defensive strengths, and setup tips</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Regular blog articles covering attack strategies, base building theory, and game updates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span>New bases added weekly to reflect the evolving meta</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-10 border-2 border-brand-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500 rounded-xl text-white">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text">Disclaimer</h2>
            </div>
            <p className="text-brand-muted leading-relaxed">
              ClashLayoutsHub is a fan-made, independent website and is not affiliated with, endorsed by, or connected to Supercell in any way. Clash of Clans and all related names, marks, and images are trademarks of Supercell Oy. All base content is shared for community use only.
            </p>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-10 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-xl text-white">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text">Get In Touch</h2>
            </div>
            <p className="text-brand-muted leading-relaxed mb-6">
              Have a suggestion, a base to submit, or a question? We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
            >
              Visit our Contact page
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
