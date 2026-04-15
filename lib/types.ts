export type THLevel = 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
export type BHLevel = 5 | 6 | 7 | 8 | 9 | 10;
export type BaseCategory = 'war' | 'farming' | 'trophy';
export type BlogCategory = 'Strategy' | 'Base Design' | 'Attack Guide' | 'Defense' | 'Update';

export interface Layout {
  id: string;
  title: string;
  level: number;
  type: 'th' | 'bh';
  category: BaseCategory;
  image: string;
  description: string;
  baseLink: string;
  keyFeatures?: string[];
  howToUse?: string[];
  tips?: string[];
  about?: string;
  faq?: { question: string; answer: string }[];
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  content: string;
  category?: BlogCategory;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  faq?: { question: string; answer: string }[];
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  category?: BlogCategory;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  author?: string;
}
