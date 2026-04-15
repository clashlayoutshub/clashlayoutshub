import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowUpRight } from 'lucide-react';
import type { BlogMeta } from '@/lib/types';
import { getOptimizedImageUrl } from '@/lib/images';

interface BlogCardProps {
  blog: BlogMeta;
  priority?: boolean;
}

const CATEGORY_STYLES: Record<string, string> = {
  'Strategy':     'bg-blue-600 text-white',
  'Base Design':  'bg-purple-600 text-white',
  'Attack Guide': 'bg-orange-500 text-white',
  'Defense':      'bg-emerald-600 text-white',
  'Update':       'bg-amber-400 text-slate-900',
};

export default function BlogCard({ blog, priority = false }: BlogCardProps) {
  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  const categoryStyle = blog.category
    ? (CATEGORY_STYLES[blog.category] ?? 'bg-slate-600 text-white')
    : null;

  return (
    <article className="group relative bg-brand-card border border-brand-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200">
      <Link href={`/blog/${blog.slug}`} className="block">

        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          {blog.featuredImage ? (
            <Image
              src={getOptimizedImageUrl(blog.featuredImage)}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
          )}

          {/* Category badge */}
          {categoryStyle && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-lg tracking-wide ${categoryStyle}`}>
              {blog.category}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-bold text-brand-text leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors text-base">
            {blog.title}
          </h3>
          <p className="text-brand-muted text-sm leading-relaxed line-clamp-2 mb-4">
            {blog.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-brand-border">
            <div className="flex items-center gap-3 text-xs text-brand-muted">
              {blog.author && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {blog.author}
                </span>
              )}
              {formattedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
              )}
            </div>
            <span className="flex items-center gap-0.5 text-primary text-xs font-semibold group-hover:gap-1 transition-all">
              Read <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </Link>
    </article>
  );
}
