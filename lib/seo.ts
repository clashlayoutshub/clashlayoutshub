const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://clashlayoutshub.com';
const SITE_NAME = 'ClashLayoutsHub';
const CURRENT_YEAR = new Date().getFullYear();

const CATEGORY_LABELS: Record<string, string> = {
  war: 'War Base',
  farming: 'Farming Base',
  trophy: 'Trophy Base',
};

export function getSiteUrl(): string {
  return SITE_URL;
}

export function getSiteName(): string {
  return SITE_NAME;
}

export function buildCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function buildLayoutMeta(layout: {
  title: string;
  description: string;
  id: string;
  level: number;
  type: 'th' | 'bh';
  category: string;
  image?: string;
}) {
  const prefix = layout.type === 'th' ? 'TH' : 'BH';
  const catLabel = CATEGORY_LABELS[layout.category] ?? layout.category;
  const seoTitle = `Best ${prefix}${layout.level} ${catLabel} ${CURRENT_YEAR} – ${layout.title} | ${SITE_NAME}`;
  const seoDescription = `Download the best ${prefix}${layout.level} ${catLabel.toLowerCase()} link for ${CURRENT_YEAR}. ${layout.description.slice(0, 110)}… Direct copy link for Clash of Clans.`;
  const keywords = [
    `${prefix}${layout.level} ${catLabel.toLowerCase()}`,
    `${prefix}${layout.level} base link`,
    `${prefix}${layout.level} base ${CURRENT_YEAR}`,
    `clash of clans ${prefix}${layout.level}`,
    `${catLabel.toLowerCase()} copy link`,
    `clash layouts`,
  ];
  const canonical = buildCanonicalUrl(`/layout/${layout.id}`);
  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    canonical,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website' as const,
      images: layout.image ? [{ url: layout.image, width: 1200, height: 630, alt: layout.title }] : [],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: seoTitle,
      description: seoDescription,
      images: layout.image ? [layout.image] : [],
    },
  };
}

export function buildBlogMeta(blog: {
  title: string;
  description: string;
  slug: string;
  featuredImage?: string;
  publishedAt?: string;
  tags?: string[];
  author?: string;
}) {
  const seoTitle = `${blog.title} | ${SITE_NAME}`;
  const seoDescription = blog.description.length > 155
    ? blog.description.slice(0, 152) + '…'
    : blog.description;
  const keywords = [
    ...(blog.tags ?? []),
    'clash of clans guide',
    'coc base strategy',
    'clash layouts',
  ];
  const canonical = buildCanonicalUrl(`/blog/${blog.slug}`);
  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    canonical,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article' as const,
      images: blog.featuredImage
        ? [{ url: blog.featuredImage, width: 1200, height: 630, alt: blog.title }]
        : [],
      publishedTime: blog.publishedAt,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: seoTitle,
      description: seoDescription,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  };
}

export function buildThPageMeta(level: number) {
  return {
    title: `Best TH${level} Base Links ${CURRENT_YEAR} – War, Farming & Trophy | ${SITE_NAME}`,
    description: `Download the best Town Hall ${level} base layouts for ${CURRENT_YEAR}. TH${level} war base, farming base, and trophy base with direct copy links. Anti-3 star designs tested in Clan Wars.`,
    keywords: [
      `th${level} base`,
      `th${level} war base`,
      `th${level} farming base`,
      `th${level} trophy base`,
      `town hall ${level} base link`,
      `clash of clans th${level}`,
    ],
    canonical: buildCanonicalUrl(`/th${level}`),
  };
}

export function buildBhPageMeta(level: number) {
  return {
    title: `Best Builder Hall ${level} Base Links ${CURRENT_YEAR} | ${SITE_NAME}`,
    description: `Top Builder Hall ${level} base layouts for ${CURRENT_YEAR}. BH${level} trophy and hybrid bases with direct copy links. Optimised for the Builder Base Season meta.`,
    keywords: [
      `bh${level} base`,
      `builder hall ${level} base`,
      `bh${level} base link`,
      `clash of clans bh${level}`,
    ],
    canonical: buildCanonicalUrl(`/bh${level}`),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateSoftwareApplicationSchema(layout: {
  id: string;
  title: string;
  description: string;
  level: number;
  type: 'th' | 'bh';
  category: string;
}) {
  const prefix = layout.type === 'th' ? 'TH' : 'BH';
  const catLabel = CATEGORY_LABELS[layout.category] ?? layout.category;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${prefix}${layout.level} ${catLabel} – ${layout.title}`,
    applicationCategory: 'GameApplication',
    applicationSubCategory: 'Strategy',
    operatingSystem: 'iOS, Android',
    description: layout.description,
    url: buildCanonicalUrl(`/layout/${layout.id}`),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateArticleSchema(blog: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.description,
    image: blog.featuredImage,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: {
      '@type': 'Person',
      name: blog.author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildCanonicalUrl(`/blog/${blog.slug}`),
    },
  };
}

export function generateCollectionPageSchema(params: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: params.name,
    description: params.description,
    url: params.url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Best Clash of Clans base layouts for every Town Hall and Builder Hall level with direct copy links.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/clashlayoutshub',
      'https://discord.gg/clashlayoutshub',
    ],
  };
}
