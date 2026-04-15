'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Swords, FileSearch } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import type { BlogMeta, BlogCategory } from '@/lib/types';

const ALL = 'All';
const CATEGORIES: (typeof ALL | BlogCategory)[] = [
  ALL, 'Strategy', 'Base Design', 'Attack Guide', 'Defense', 'Update',
];

const PILL_ACTIVE: Record<string, string> = {
  All:           'bg-primary text-white',
  Strategy:      'bg-blue-600 text-white',
  'Base Design': 'bg-purple-600 text-white',
  'Attack Guide':'bg-orange-500 text-white',
  Defense:       'bg-emerald-600 text-white',
  Update:        'bg-amber-400 text-slate-900',
};

interface Props {
  blogs: BlogMeta[];
}

export default function BlogClientPage({ blogs }: Props) {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState<string>(ALL);

  const pageTitle    = category === ALL ? 'Strategy Blog' : category;
  const pageSubtitle = category === ALL
    ? 'Guides, attack tips & CoC updates — written by players, for players.'
    : `All ${category} articles — tips, guides and breakdowns.`;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs.filter(b => {
      const matchesCat    = category === ALL || b.category === category;
      const matchesSearch = !q
        || b.title.toLowerCase().includes(q)
        || b.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [blogs, search, category]);

  return (
    <div className="min-h-screen bg-brand-bg">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-brand-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-text">Blog</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight">
              {pageTitle}
            </h1>
          </div>
          <p className="text-brand-muted text-base md:text-lg max-w-xl">
            {pageSubtitle}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-5">
            <span className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Swords className="w-3.5 h-3.5 text-primary" />
              {blogs.length} article{blogs.length !== 1 ? 's' : ''}
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-border" />
            <span className="text-xs text-brand-muted">Updated weekly</span>
          </div>
        </div>
      </div>

      {/* ── Sticky Filter Bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-brand-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">

          {/* Search */}
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles…"
              autoComplete="off"
              className="w-full pl-9 pr-3 py-2 bg-brand-card border border-brand-border text-brand-text text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-brand-muted/60 transition-all"
            />
          </div>

          {/* Category Pills — horizontally scrollable */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                  category === cat
                    ? (PILL_ACTIVE[cat] ?? 'bg-primary text-white')
                    : 'bg-gray-100 text-brand-muted hover:bg-gray-200 hover:text-brand-text border border-brand-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {filtered.length > 0 ? (
          <>
            {/* Result count */}
            <p className="text-xs text-brand-muted mb-5">
              {filtered.length === blogs.length
                ? `${blogs.length} article${blogs.length !== 1 ? 's' : ''}`
                : `${filtered.length} of ${blogs.length} articles`}
              {category !== ALL && ` in ${category}`}
              {search && ` matching "${search}"`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(blog => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </>
        ) : (
          /* ── Empty State ─────────────────────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="p-5 bg-brand-card rounded-2xl border border-brand-border mb-5">
              <FileSearch className="w-10 h-10 text-brand-muted/40" />
            </div>
            <h2 className="text-lg font-bold text-brand-text mb-1">No articles found</h2>
            <p className="text-sm text-brand-muted max-w-xs">
              {search || category !== ALL
                ? 'Try clearing your search or selecting a different category.'
                : 'No blog posts have been published yet. Check back soon!'}
            </p>
            {(search || category !== ALL) && (
              <button
                onClick={() => { setSearch(''); setCategory(ALL); }}
                className="mt-5 px-4 py-2 bg-brand-card border border-brand-border text-brand-text text-sm rounded-xl hover:bg-gray-100 transition-all"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
