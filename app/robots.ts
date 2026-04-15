import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://clashlayoutshub.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // সাধারণ বট বা স্ক্র্যাপারদের জন্য কড়াকড়ি
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-lite', '/api/', '/_next/', '/admin/'],
      },
      {
        // গুগল এবং বিং এর জন্য একটু নমনীয় (যাতে CSS/JS রেন্ডার করতে পারে)
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
        disallow: ['/admin-lite', '/api/', '/admin/'],
        crawlDelay: 1, // শুধু বিং এর কাজে লাগবে
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}