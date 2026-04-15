import type { Metadata } from 'next';
import { getAllBlogMeta } from '@/lib/blogs';
import BlogClientPage from './BlogClientPage';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Clash of Clans Strategy Blog – Guides, Tips & CoC Updates',
  description:
    'Read the latest Clash of Clans guides, base strategy tips, attack walkthroughs, and meta breakdowns. Expert content for TH9–TH18 and Builder Base players.',
  alternates: {
    canonical: 'https://clashlayoutshub.com/blog',
  },
};

export default async function BlogPage() {
  const blogs = await getAllBlogMeta();
  return <BlogClientPage blogs={blogs} />;
}
