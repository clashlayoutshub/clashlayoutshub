'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {submitted ? (
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-3xl p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">Message Sent!</h2>
          <p className="text-green-700 text-lg">Thanks for reaching out. We&apos;ll get back to you within 48 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border-2 border-brand-border p-6 md:p-8 space-y-6 shadow-lg">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-brand-text mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border-2 border-brand-border bg-white text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-brand-text mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-brand-border bg-white text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-brand-text mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl border-2 border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
            >
              <option value="">Select a topic</option>
              <option value="base-submission">Submit a Base Layout</option>
              <option value="bug-report">Report a Bug</option>
              <option value="content-request">Content Request</option>
              <option value="advertising">Advertising</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-brand-text mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              autoComplete="off"
              rows={6}
              placeholder="Your message..."
              className="w-full px-4 py-3 rounded-xl border-2 border-brand-border bg-white text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-base"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 shadow-lg text-lg"
          >
            {loading ? (
              <span className="animate-spin w-5 h-5 border-3 border-white border-t-transparent rounded-full" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </>
  );
}
