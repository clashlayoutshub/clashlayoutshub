import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, AlertTriangle, CheckCircle, Globe, Lock, Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms & Conditions - ClashLayoutsHub',
  description: 'Terms and Conditions for using ClashLayoutsHub website and services. Read our complete terms before using our base layouts.',
  keywords: [
    'terms and conditions',
    'terms of service',
    'user agreement',
    'legal terms',
    'website terms',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://clashlayoutshub.com/terms-and-conditions' },
};

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]} />
      
      {/* Hero Section */}
      <div className="text-center mb-12 mt-8">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
          <FileText className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text mb-4">
          Terms & <span className="text-blue-600">Conditions</span>
        </h1>
        <p className="text-brand-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
          Please read these terms carefully before using ClashLayoutsHub.
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700">
          <CheckCircle className="w-4 h-4" />
          Last updated: April 15, 2026
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 md:p-8 mb-12 border-2 border-blue-200">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-xl text-white flex-shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-brand-text mb-1">Fair & Transparent Terms</h3>
            <p className="text-brand-muted text-sm">Our terms are designed to protect both you and us. We believe in clear, straightforward agreements.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500 rounded-xl text-white">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">1. Acceptance of Terms</h2>
          </div>
          <p className="text-brand-muted">
            By accessing and using ClashLayoutsHub (&quot;the Site&quot;), you accept and agree to be bound by these Terms and Conditions.
            If you do not agree to these terms in their entirety, please do not use this Site.
            Your continued use of the Site following the posting of changes to these terms will constitute your acceptance of such changes.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">2. Use of Content</h2>
          </div>
          <p className="text-brand-muted mb-4">
            All content on ClashLayoutsHub, including base layouts, guides, images, and text, is provided for personal, non-commercial use only.
            You may not reproduce, distribute, modify, display, perform, publish, license, create derivative works from, offer for sale, or use any content
            from this Site without express written permission from ClashLayoutsHub.
          </p>
          <p className="text-brand-muted">
            Base layouts are community-created and shared for informational purposes. Results may vary based on hero levels, Clan Castle troops,
            spell levels, and attack strategies used by opponents.
          </p>
        </section>

        <section className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-6 md:p-8 border-2 border-yellow-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500 rounded-xl text-white">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">3. Intellectual Property and Disclaimer</h2>
          </div>
          <p className="text-brand-muted mb-4">
            ClashLayoutsHub is not affiliated with, endorsed by, sponsored by, or specifically approved by Supercell.
            Clash of Clans is a trademark of Supercell Oy. All game content and materials are trademarks and copyrights of Supercell Oy.
          </p>
          <p className="text-brand-muted">
            All base layouts, strategy guides, and original content created by ClashLayoutsHub are protected by copyright laws.
            You may not use our content for commercial purposes without prior written consent.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500 rounded-xl text-white">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">4. Advertising</h2>
          </div>
          <p className="text-brand-muted mb-4">
            This Site uses Google AdSense to display advertisements. We are not responsible for the content, accuracy, or availability
            of third-party advertisements. Ad content is served by Google based on your browsing history, location, and preferences.
          </p>
          <p className="text-brand-muted">
            By using this Site, you consent to the display of advertisements. You may opt out of personalized advertising by visiting
            Google&apos;s Ad Settings page.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-500 rounded-xl text-white">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">5. User Conduct</h2>
          </div>
          <p className="text-brand-muted mb-4">You agree not to use the Site to:</p>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Engage in any unlawful activity or violate any local, state, national, or international law</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Transmit harmful, offensive, or inappropriate content</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Attempt to gain unauthorized access to any part of the Site or its servers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Interfere with or disrupt the Site or servers connected to the Site</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Use automated tools to access the Site for any purpose without our express written permission</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Reproduce, duplicate, copy, sell, or exploit any portion of the Site</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl text-white">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">6. Privacy Policy</h2>
          </div>
          <p className="text-brand-muted">
            Your use of the Site is also subject to our Privacy Policy. Please review our{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link>,
            which also governs the Site and informs users of our data collection practices.
          </p>
        </section>

        <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 md:p-8 border-2 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-600 rounded-xl text-white">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">7. Limitation of Liability</h2>
          </div>
          <p className="text-brand-muted mb-4">
            ClashLayoutsHub provides content &quot;as is&quot; without warranties of any kind, either express or implied.
            We do not warrant that the Site will be uninterrupted, timely, secure, or error-free.
          </p>
          <p className="text-brand-muted">
            In no event shall ClashLayoutsHub, its directors, officers, employees, or agents be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of your access to or use of the Site.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">8. Indemnification</h2>
          <p className="text-brand-muted">
            You agree to indemnify, defend, and hold harmless ClashLayoutsHub, its officers, directors, employees, and agents from any
            and all claims, damages, or expenses (including attorneys&apos; fees) arising from your use of the Site or violation of these Terms.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">9. Termination</h2>
          <p className="text-brand-muted">
            We reserve the right to terminate or restrict your access to the Site, without notice, for any reason whatsoever,
            including without limitation if you breach these Terms.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">10. Governing Law</h2>
          <p className="text-brand-muted">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ClashLayoutsHub operates,
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">11. Changes to Terms</h2>
          <p className="text-brand-muted">
            We reserve the right to modify these terms at any time. All changes are effective immediately when posted.
            Your continued use of the Site after changes constitutes acceptance of the new terms.
            We will update the &quot;Last updated&quot; date at the top of this page to reflect any material changes.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">12. Severability</h2>
          <p className="text-brand-muted">
            If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision will be enforced to the
            maximum extent permissible and the remaining provisions will remain in full force and effect.
          </p>
        </section>

        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 md:p-8 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">13. Contact</h2>
          </div>
          <p className="text-brand-muted mb-6">
            For questions about these Terms and Conditions, please visit our{' '}
            <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
            We will respond to your inquiry within a reasonable time.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
          >
            Contact Us Now
          </Link>
        </section>
      </div>
    </div>
  );
}
