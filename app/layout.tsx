import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clashlayoutshub.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ClashLayoutsHub – Best Clash of Clans Base Layouts 2026',
    template: '%s | ClashLayoutsHub',
  },
  description:
    'Download the best Clash of Clans base layouts for every Town Hall and Builder Hall level. War bases, farming bases, and trophy bases with direct copy links.',
  keywords: [
    'Clash of Clans base layouts',
    'CoC bases',
    'war base',
    'farming base',
    'trophy base',
    'TH14 base',
    'TH15 base',
    'TH16 base',
    'TH17 base',
    'TH18 base',
    'base links',
    'clash layouts',
    'Town Hall bases',
    'Builder Hall bases',
  ],
  authors: [{ name: 'ClashLayoutsHub' }],
  creator: 'ClashLayoutsHub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ClashLayoutsHub',
    title: 'ClashLayoutsHub – Best Clash of Clans Base Layouts 2026',
    description:
      'Download the best Clash of Clans base layouts for every Town Hall and Builder Hall level.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClashLayoutsHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClashLayoutsHub – Best Clash of Clans Base Layouts 2026',
    description:
      'Download the best Clash of Clans base layouts for every Town Hall and Builder Hall level.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
