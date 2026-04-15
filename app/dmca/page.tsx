import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, AlertTriangle, CheckCircle, FileText, Info, Lock, Send, AlertCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'DMCA Policy - ClashLayoutsHub',
  description: 'DMCA takedown policy for ClashLayoutsHub. Learn how to submit a copyright infringement notice and how we handle reports.',
  keywords: [
    'dmca policy',
    'copyright infringement',
    'dmca takedown',
    'copyright notice',
    'intellectual property',
  ],
  alternates: { canonical: 'https://clashlayoutshub.com/dmca' },
  robots: { index: true, follow: true },
};

export default function DmcaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'DMCA Policy' }]} />
      
      {/* Hero Section */}
      <div className="text-center mb-12 mt-8">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 shadow-lg">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text mb-4">
          DMCA <span className="text-red-600">Policy</span>
        </h1>
        <p className="text-brand-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
          We respect intellectual property rights. Learn how to report copyright infringement.
        </p>
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 text-sm font-medium text-red-700">
          <CheckCircle className="w-4 h-4" />
          Last updated: April 2026
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-6 md:p-8 mb-12 border-2 border-red-200">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="p-3 bg-red-600 rounded-xl text-white flex-shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-brand-text mb-1">Compliant with DMCA</h3>
            <p className="text-brand-muted text-sm">We respond promptly to copyright infringement notices in accordance with the Digital Millennium Copyright Act.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl text-white">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Overview</h2>
          </div>
          <p className="text-brand-muted">
            ClashLayoutsHub respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (&quot;DMCA&quot;), we will respond promptly to notices of alleged copyright infringement that are reported to our designated copyright agent.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">What Content We Host</h2>
          </div>
          <p className="text-brand-muted mb-4">ClashLayoutsHub hosts:</p>
          <ul className="space-y-3 text-brand-muted mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Clash of Clans base layout images and copy links created by the community</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Blog articles and strategy guides written by our team</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Thumbnails and preview images related to Clash of Clans gameplay</span>
            </li>
          </ul>
          <p className="text-brand-muted">
            All Clash of Clans game assets (names, trademarks, artwork) belong to Supercell Oy. ClashLayoutsHub is a fan site and is not affiliated with Supercell.
          </p>
        </section>

        <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 md:p-8 border-2 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-600 rounded-xl text-white">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Filing a DMCA Takedown Notice</h2>
          </div>
          <p className="text-brand-muted mb-6">
            If you believe that content hosted on ClashLayoutsHub infringes your copyright, please submit a written notice containing <strong>all</strong> of the following:
          </p>
          <ol className="space-y-4 text-brand-muted">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <span><strong>Identification of the copyrighted work</strong> — A description of the copyrighted work you claim has been infringed.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <span><strong>Identification of the infringing material</strong> — The specific URL(s) on ClashLayoutsHub where the allegedly infringing material appears.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <span><strong>Your contact information</strong> — Your full name, mailing address, telephone number, and email address.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <span><strong>Good-faith statement</strong> — A statement that you have a good-faith belief that the use of the material is not authorised by the copyright owner, its agent, or the law.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
              <span><strong>Accuracy statement</strong> — A statement, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorised to act on the copyright owner&apos;s behalf.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">6</span>
              <span><strong>Signature</strong> — Your physical or electronic signature.</span>
            </li>
          </ol>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500 rounded-xl text-white">
              <Send className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">How to Submit</h2>
          </div>
          <p className="text-brand-muted mb-4">
            Send your completed DMCA notice to us via our{' '}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact page
            </Link>. Use the subject line <strong>&quot;DMCA Takedown Request&quot;</strong> so we can prioritise your message. We aim to acknowledge all valid notices within <strong>5 business days</strong>.
          </p>
          <p className="text-brand-muted mb-4">Upon receipt of a valid and complete notice, we will:</p>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Remove or disable access to the allegedly infringing content promptly</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Notify the uploader of the content (where applicable)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Log the notice in accordance with applicable law</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Counter-Notice</h2>
          </div>
          <p className="text-brand-muted mb-4">
            If you believe your content was removed by mistake or misidentification, you may submit a counter-notice. A valid counter-notice must include:
          </p>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>Your physical or electronic signature</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>Identification of the material that was removed and where it appeared before removal</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>A statement under penalty of perjury that you believe the removal was a mistake</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>Your name, address, and telephone number</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>A statement consenting to the jurisdiction of your local federal court (or any judicial district where we may be found)</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-brand-border shadow-sm">
          <h2 className="text-2xl font-bold text-brand-text mb-4">Repeat Infringers</h2>
          <p className="text-brand-muted">
            It is our policy to terminate the accounts of users who are found to be repeat infringers of copyright.
          </p>
        </section>

        <section className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6 md:p-8 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-600 rounded-xl text-white">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Abuse of this Process</h2>
          </div>
          <p className="text-brand-muted">
            Please note that under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that material or activity is infringing may be liable for damages. Do not submit false DMCA notices.
          </p>
        </section>

        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 md:p-8 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-brand-text">Contact</h2>
          </div>
          <p className="text-brand-muted mb-6">
            For all DMCA-related correspondence, use our{' '}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact page
            </Link>{' '}
            with the subject <strong>&quot;DMCA Takedown Request&quot;</strong>.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
          >
            Submit DMCA Request
          </Link>
        </section>
      </div>
    </div>
  );
}
