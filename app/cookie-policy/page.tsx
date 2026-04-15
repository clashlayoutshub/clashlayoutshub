import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, Shield, CheckCircle, Settings, Info, Clock, Lock, FileText } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Cookie Policy - ClashLayoutsHub',
  description: 'Cookie Policy for ClashLayoutsHub. Learn about the cookies we use, how we use them, and how to manage your preferences. GDPR compliant.',
  keywords: [
    'cookie policy',
    'gdpr cookies',
    'cookie consent',
    'third-party cookies',
    'cookie management',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://clashlayoutshub.com/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]} />
      
      {/* Hero Section */}
      <div className="text-center mb-12 mt-8">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
          <Cookie className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text mb-4">
          Cookie <span className="text-orange-600">Policy</span>
        </h1>
        <p className="text-brand-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
          Learn about the cookies we use and how to manage your preferences.
        </p>
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 text-sm font-medium text-orange-700">
          <CheckCircle className="w-4 h-4" />
          Last updated: April 15, 2026
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-6 md:p-8 mb-12 border-2 border-orange-200">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="p-3 bg-orange-600 rounded-xl text-white flex-shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-brand-text mb-1">GDPR Compliant</h3>
            <p className="text-brand-muted text-sm">We only use cookies with your consent. You can opt out at any time.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl text-white">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">What Are Cookies?</h2>
          </div>
          <p className="text-brand-muted mb-4">
            Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences,
            improve user experience, and provide analytics data. Cookies typically contain:
          </p>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>The name of the server that created the cookie</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>A unique identifier for the cookie</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>An expiration date</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>The domain the cookie is valid for</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500 rounded-xl text-white">
              <Settings className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">How We Use Cookies</h2>
          </div>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Essential functionality:</strong> To keep you logged in and remember your preferences</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Analytics:</strong> To understand how visitors use our site and improve our content</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Advertising:</strong> To display relevant advertisements through Google AdSense</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Performance:</strong> To optimize website speed and reliability</span>
            </li>
          </ul>
        </section>

        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 md:p-8 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white">
              <Cookie className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Cookies We Use</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-brand-text mb-2">Essential Cookies</h3>
              <p className="text-brand-muted mb-3">These cookies are required for the website to function properly. They cannot be disabled.</p>
              <ul className="space-y-2 text-brand-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>clh_cookie_consent</strong> — Stores your cookie consent preference</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Next.js session cookies</strong> — Maintain secure user sessions</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-brand-text mb-2">Analytics Cookies (Google Analytics)</h3>
              <p className="text-brand-muted mb-3">These cookies help us understand how visitors use our site by collecting anonymous information.</p>
              <ul className="space-y-2 text-brand-muted mb-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Pages visited and time spent on each page</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Browser type and device information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Referring websites</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Geographic location (approximate)</span>
                </li>
              </ul>
              <p className="text-brand-muted text-sm">These cookies are only set with your consent in accordance with GDPR requirements.</p>
            </div>

            <div>
              <h3 className="font-bold text-brand-text mb-2">Advertising Cookies (Google AdSense)</h3>
              <p className="text-brand-muted mb-3">
                These cookies are used by Google AdSense to display relevant advertisements based on your browsing history and interests.
              </p>
              <p className="text-brand-muted text-sm">These cookies require your explicit consent and follow Google&apos;s advertising policies.</p>
            </div>

            <div>
              <h3 className="font-bold text-brand-text mb-2">Performance Cookies</h3>
              <p className="text-brand-muted">
                These cookies help us optimize website performance by tracking load times and identifying technical issues.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-xl text-white">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Third-Party Cookies</h2>
          </div>
          <p className="text-brand-muted mb-4">We use the following third-party services that may set their own cookies:</p>
          <ul className="space-y-3 text-brand-muted mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <span><strong>Google Analytics:</strong> Website analytics and usage tracking</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <span><strong>Google AdSense:</strong> Advertisement serving and personalization</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <span><strong>Cloudinary:</strong> Image hosting and delivery optimization</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <span><strong>Supabase:</strong> Database authentication and session management</span>
            </li>
          </ul>
          <p className="text-brand-muted">
            These services have their own cookie policies. For more information on Google&apos;s cookie practices,
            see <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google&apos;s Cookie Policy
            </a>.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500 rounded-xl text-white">
              <Settings className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Managing Cookies</h2>
          </div>
          <p className="text-brand-muted mb-4">You can manage your cookie preferences in the following ways:</p>
          <ul className="space-y-3 text-brand-muted mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span><strong>Cookie banner:</strong> Use the consent banner when you first visit the site to accept or reject non-essential cookies</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span><strong>Browser settings:</strong> Most browsers allow you to refuse or delete cookies through their settings menu</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span><strong>Google opt-out:</strong> Visit{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  adssettings.google.com
                </a>{' '}
                to opt out of personalized advertising
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span><strong>Google Analytics opt-out:</strong> Install the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Analytics Opt-out Browser Add-on
                </a>
              </span>
            </li>
          </ul>
          <p className="text-brand-muted text-sm">
            <strong>Note:</strong> Disabling essential cookies may prevent the website from functioning properly.
            Disabling analytics or advertising cookies may limit your experience but will not affect core functionality.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cyan-500 rounded-xl text-white">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Cookie Lifespan</h2>
          </div>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span><strong>Session cookies:</strong> Expire when you close your browser</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span><strong>Persistent cookies:</strong> Remain on your device for a set period (typically 30 days to 2 years)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span><strong>First-party cookies:</strong> Set by the website you&apos;re visiting</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <span><strong>Third-party cookies:</strong> Set by external services (Google, Cloudinary, etc.)</span>
            </li>
          </ul>
        </section>

        <section className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 md:p-8 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-600 rounded-xl text-white">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Your Rights (GDPR)</h2>
          </div>
          <p className="text-brand-muted mb-4">Under the GDPR, you have the right to:</p>
          <ul className="space-y-3 text-brand-muted mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Withdraw your consent for cookies at any time</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Access information about cookies we use</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Request deletion of your cookie data</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Object to certain types of cookie processing</span>
            </li>
          </ul>
          <p className="text-brand-muted">
            To exercise these rights, contact us via our <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">Updates to This Policy</h2>
          <p className="text-brand-muted">
            We may update this Cookie Policy from time to time to reflect changes in our cookie practices or applicable laws.
            We will notify you of any material changes by updating the &quot;Last updated&quot; date at the top of this page.
          </p>
        </section>

        <section className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6 md:p-8 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-600 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Contact</h2>
          </div>
          <p className="text-brand-muted mb-6">
            For questions about our Cookie Policy or to exercise your rights, please visit our{' '}
            <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
            For more information about our data practices, please review our{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
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
