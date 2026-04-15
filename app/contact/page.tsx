import type { Metadata } from 'next';
import { Mail, MessageSquare, Send, Phone, Clock, CheckCircle, Shield, Zap } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - ClashLayoutsHub',
  description: 'Get in touch with ClashLayoutsHub for base layout submissions, bug reports, advertising inquiries, or general questions. We respond within 48 hours.',
  keywords: [
    'clash of clans contact',
    'coc support',
    'base layout submission',
    'contact clashlayoutshub',
    'coc help',
  ],
  alternates: {
    canonical: 'https://clashlayoutshub.com/contact',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact ClashLayoutsHub',
  description: 'Contact ClashLayoutsHub for base layout submissions, bug reports, and general inquiries.',
  url: 'https://clashlayoutshub.com/contact',
  mainEntity: {
    '@type': 'ContactPoint',
    email: 'contact@clashlayoutshub.com',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: 'English',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I submit a base layout?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use our contact form and select "Submit a Base Layout" as the subject. Include a link to your base layout image and a brief description of its strengths.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to get a response?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We typically respond to all inquiries within 48 hours. For urgent matters, please indicate this in your message.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I advertise on ClashLayoutsHub?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Select "Advertising" as the subject in our contact form to inquire about advertising opportunities and partnership programs.',
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        
        {/* Hero Section */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
            Contact <span className="text-primary">ClashLayoutsHub</span>
          </h1>
          <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto">
            Have a question, suggestion, or want to submit a base layout? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-600 rounded-xl text-white">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-blue-900">Email Us</h3>
              </div>
              <p className="text-blue-800 font-medium mb-2">contact@clashlayoutshub.com</p>
              <p className="text-blue-700 text-sm">We respond within 48 hours</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-600 rounded-xl text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-green-900">Response Time</h3>
              </div>
              <p className="text-green-800 font-medium mb-2">Within 48 Hours</p>
              <p className="text-green-700 text-sm">Mon-Fri business hours</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-600 rounded-xl text-white">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-purple-900">Privacy Protected</h3>
              </div>
              <p className="text-purple-800 font-medium mb-2">Your Data is Safe</p>
              <p className="text-purple-700 text-sm">We never share your information</p>
            </div>

            {/* Trust Signals */}
            <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-sm">
              <h3 className="font-bold text-brand-text mb-4">Why Contact Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-brand-muted">Submit your base layouts to be featured</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-brand-muted">Report bugs or suggest improvements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-brand-muted">Inquire about advertising partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-brand-muted">Get help with base copying issues</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-text mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="group bg-white rounded-2xl border border-brand-border overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                How do I submit a base layout?
                <svg className="w-5 h-5 text-brand-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-6 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                Use our contact form and select "Submit a Base Layout" as the subject. Include a link to your base layout image and a brief description of its strengths. Our team reviews all submissions and may feature your base on our homepage.
              </div>
            </details>
            <details className="group bg-white rounded-2xl border border-brand-border overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                How long does it take to get a response?
                <svg className="w-5 h-5 text-brand-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-6 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                We typically respond to all inquiries within 48 hours. For urgent matters, please indicate this in your message. During peak periods, response times may be slightly longer.
              </div>
            </details>
            <details className="group bg-white rounded-2xl border border-brand-border overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-brand-text hover:text-primary transition-colors list-none">
                Can I advertise on ClashLayoutsHub?
                <svg className="w-5 h-5 text-brand-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-6 text-brand-muted leading-relaxed border-t border-brand-border pt-4">
                Yes! Select "Advertising" as the subject in our contact form to inquire about advertising opportunities and partnership programs. We offer various advertising options to reach our engaged audience of Clash of Clans players.
              </div>
            </details>
          </div>
        </section>
      </div>
    </>
  );
}
