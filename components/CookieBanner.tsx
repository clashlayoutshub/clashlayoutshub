'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const COOKIE_KEY = 'clh_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-brand-text rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Cookie className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm leading-relaxed">
            We use cookies to enhance your experience and analyze site traffic. By continuing, you agree to our{' '}
            <Link href="/cookie-policy" className="underline text-blue-300 hover:text-blue-200">Cookie Policy</Link>
            {' '}and{' '}
            <Link href="/privacy-policy" className="underline text-blue-300 hover:text-blue-200">Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            aria-label="Decline cookies"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
