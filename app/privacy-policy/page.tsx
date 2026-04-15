import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy - ClashLayoutsHub',
  description: 'Privacy Policy for ClashLayoutsHub. Learn how we collect, use, and protect your information. GDPR and CCPA compliant.',
  keywords: [
    'privacy policy',
    'gdpr compliant',
    'ccpa compliant',
    'data protection',
    'cookie policy',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://clashlayoutshub.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      
      {/* Hero Section */}
      <div className="text-center mb-12 mt-8">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-lg">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text mb-4">
          Privacy <span className="text-green-600">Policy</span>
        </h1>
        <p className="text-brand-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
          Your privacy matters to us. Learn how we collect, use, and protect your information.
        </p>
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-sm font-medium text-green-700">
          <CheckCircle className="w-4 h-4" />
          Last updated: April 15, 2026
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-6 md:p-8 mb-12 border-2 border-green-200">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="p-3 bg-green-600 rounded-xl text-white flex-shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-brand-text mb-1">Your Data is Protected</h3>
            <p className="text-brand-muted text-sm">We are GDPR and CCPA compliant. We never sell your personal information.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl text-white">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">1. Information We Collect</h2>
          </div>
          <p className="text-brand-muted mb-4">
            ClashLayoutsHub (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects minimal information necessary to operate and improve the website.
          </p>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Usage data:</strong> Pages visited, time on site, browser type, device information, and IP address collected via analytics tools.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Cookies:</strong> Small text files stored on your device to remember your preferences and improve user experience.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Contact form data:</strong> Name, email address, and message content if you voluntarily contact us.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Advertising data:</strong> Google AdSense may collect data for personalized advertising based on your browsing history.</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">2. How We Use Your Information</h2>
          </div>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Operate and improve the website functionality</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Analyze traffic patterns and user behavior to enhance content quality</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Display relevant advertisements via Google AdSense to support our free service</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Respond to contact form submissions and user inquiries</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Prevent fraud and ensure website security</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Comply with legal obligations</span>
            </li>
          </ul>
        </section>

        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 md:p-8 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">3. Legal Basis for Processing (GDPR)</h2>
          </div>
          <p className="text-brand-muted mb-4">
            For users in the European Economic Area (EEA), we process personal data on the following legal bases:
          </p>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Legitimate Interest:</strong> For website analytics, security, and improvement</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Consent:</strong> For non-essential cookies and personalized advertising</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Contractual Necessity:</strong> For processing contact form submissions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Legal Obligation:</strong> When required by applicable laws</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">4. Cookies</h2>
          </div>
          <p className="text-brand-muted mb-4">
            We use cookies for analytics (Google Analytics), advertising (Google AdSense), and essential functionality.
            You can control cookie preferences through our cookie consent banner or your browser settings.
            Essential cookies are required for the website to function properly and cannot be disabled.
          </p>
          <p className="text-brand-muted">
            For detailed information about cookies, please visit our{' '}
            <Link href="/cookie-policy" className="text-primary hover:underline font-medium">Cookie Policy</Link>.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500 rounded-xl text-white">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">5. Third-Party Services</h2>
          </div>
          <p className="text-brand-muted mb-4">We use the following third-party services that may collect data:</p>
          <ul className="space-y-3 text-brand-muted mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Google Analytics:</strong> Website analytics and usage tracking</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Google AdSense:</strong> Advertisement serving and personalized ads</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Cloudinary:</strong> Image hosting and delivery</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Supabase:</strong> Database hosting for layouts and blogs</span>
            </li>
          </ul>
          <p className="text-brand-muted">
            These services have their own privacy policies. We encourage you to review them.
            Google&apos;s privacy policy is available at{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              policies.google.com/privacy
            </a>.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-500 rounded-xl text-white">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">6. Data Retention</h2>
          </div>
          <p className="text-brand-muted">
            Analytics data is retained according to the retention settings of each analytics provider (typically 26 months for Google Analytics).
            Contact form submissions are retained for up to 12 months for customer support purposes.
            You may request deletion of your data at any time by contacting us.
          </p>
        </section>

        <section className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 md:p-8 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-600 rounded-xl text-white">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">7. Your Rights (GDPR)</h2>
          </div>
          <p className="text-brand-muted mb-4">Under the GDPR, you have the following rights:</p>
          <ul className="space-y-3 text-brand-muted mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Right to Rectification:</strong> Request correction of inaccurate data</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Right to Erasure:</strong> Request deletion of your personal data</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Right to Restrict Processing:</strong> Limit how we process your data</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Right to Data Portability:</strong> Receive your data in a structured format</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Right to Object:</strong> Object to processing based on legitimate interest</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</span>
            </li>
          </ul>
          <p className="text-brand-muted">
            To exercise these rights, contact us via our <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">8. International Data Transfers</h2>
          <p className="text-brand-muted">
            Your information may be transferred to and processed in countries other than your country of residence.
            These countries may have different data protection laws. We ensure appropriate safeguards are in place
            to protect your personal data in accordance with GDPR requirements.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">9. Children&apos;s Privacy</h2>
          <p className="text-brand-muted">
            ClashLayoutsHub is not directed at children under 13. We do not knowingly collect
            personal information from children under 13. If you believe a child has provided us
            with personal information, please contact us immediately via our <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
          </p>
        </section>

        <section className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-6 md:p-8 border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-brand-text mb-4">10. California Consumer Privacy Act (CCPA)</h2>
          <p className="text-brand-muted mb-4">If you are a resident of California, you have the right to:</p>
          <ul className="space-y-3 text-brand-muted mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Know what personal information we collect about you</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Request deletion of your personal information</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Opt-out of the sale of your personal information</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Non-discrimination for exercising your privacy rights</span>
            </li>
          </ul>
          <p className="text-brand-muted">
            To exercise these rights, contact us via our <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">11. Changes to This Policy</h2>
          <p className="text-brand-muted">
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.
            We will notify you of any material changes by updating the &quot;Last updated&quot; date at the top of this page.
          </p>
        </section>

        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 md:p-8 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">12. Contact Us</h2>
          </div>
          <p className="text-brand-muted mb-6">
            If you have questions about this Privacy Policy or want to exercise your rights, please contact us through our{' '}
            <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
            We will respond to your request within 30 days.
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
