'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Save, X, RefreshCw } from 'lucide-react';
import ImageUpload from './ImageUpload';
import type { BlogCategory } from '@/lib/types';

const BLOG_CATEGORIES: BlogCategory[] = ['Strategy', 'Base Design', 'Attack Guide', 'Defense', 'Update'];

interface BlogFormProps {
  authHeader: string;
  onSaved: () => void;
  onClose: () => void;
  showToast: (msg: string, ok: boolean) => void;
  editPost?: Record<string, unknown> | null;
}

interface FormData {
  title:         string;
  slug:          string;
  featuredImage: string;
  description:   string;
  seoTitle:      string;
  metaDescription: string;
  author:        string;
  publishedAt:   string;
  tags:          string;
  content:       string;
  category:      BlogCategory;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Lightweight client-side Markdown → HTML renderer for the live preview
function renderMarkdown(md: string): string {
  if (!md.trim()) return '';

  // HTML-escape first to avoid XSS from user input
  let s = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Inline formatting (bold+italic first, then bold, then italic, then code)
  s = s.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
  s = s.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-xs font-mono">$1</code>');

  // Process line-by-line for block elements
  const lines = s.split('\n');
  const out: string[] = [];
  let inUl = false;
  let inOl = false;

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (/^### /.test(line)) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
      out.push(`<h3 class="text-sm font-bold mt-4 mb-1 text-gray-800">${line.slice(4)}</h3>`);
    } else if (/^## /.test(line)) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
      out.push(`<h2 class="text-base font-bold mt-5 mb-2 text-gray-900 border-b border-gray-100 pb-1">${line.slice(3)}</h2>`);
    } else if (/^# /.test(line)) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
      out.push(`<h1 class="text-lg font-bold mt-6 mb-3 text-gray-900">${line.slice(2)}</h1>`);
    } else if (/^- /.test(line)) {
      if (inOl) { out.push('</ol>'); inOl = false; }
      if (!inUl) { out.push('<ul class="list-disc list-inside my-2 space-y-0.5 text-gray-700 text-sm">'); inUl = true; }
      out.push(`<li>${line.slice(2)}</li>`);
    } else if (/^\d+\. /.test(line)) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (!inOl) { out.push('<ol class="list-decimal list-inside my-2 space-y-0.5 text-gray-700 text-sm">'); inOl = true; }
      out.push(`<li>${line.replace(/^\d+\. /, '')}</li>`);
    } else if (/^---$/.test(line)) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
      out.push('<hr class="my-3 border-gray-200">');
    } else if (line.trim() === '') {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
    } else {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
      out.push(`<p class="text-sm text-gray-700 leading-relaxed mb-2">${line}</p>`);
    }
  }

  if (inUl) out.push('</ul>');
  if (inOl) out.push('</ol>');

  return out.join('\n');
}

/**
 * If the API returned a double-encoded string instead of an object, parse it.
 */
function unpackData(raw: unknown): Record<string, unknown> {
  if (raw && typeof raw === 'object') return raw as Record<string, unknown>;
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) as Record<string, unknown>; } catch { /* fall through */ }
  }
  return {};
}

/**
 * Gemini sometimes puts the entire JSON blob as the value of the `content` field.
 * Detect that and extract the real markdown article text.
 */
function extractContent(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('{')) return trimmed;
  try {
    const inner = JSON.parse(trimmed) as Record<string, unknown>;
    if (typeof inner.content === 'string') return inner.content.trim();
  } catch { /* not JSON, return as-is */ }
  return trimmed;
}

/**
 * Normalise the category string Gemini returns.
 * Handles: "Strategy", "category: Strategy", "Strategy | Base Design | ..."
 */
function parseCategory(raw: string): BlogCategory | null {
  const candidates = raw.split(/[|,;]/).map(s => s.replace(/^category[:\s]*/i, '').trim());
  for (const c of candidates) {
    if ((BLOG_CATEGORIES as string[]).includes(c)) return c as BlogCategory;
  }
  return null;
}

const INPUT = 'w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all';
const LABEL = 'block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1';

export default function BlogForm({ authHeader, onSaved, onClose, showToast, editPost }: BlogFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState<FormData>(() => {
    if (editPost) {
      const row = editPost as Record<string, unknown>;
      return {
        title:         typeof row.title === 'string' ? row.title : '',
        slug:          typeof row.slug  === 'string' ? row.slug : '',
        featuredImage: (row.featured_image ?? row.featuredImage) as string ?? '',
        description:   typeof row.description === 'string' ? row.description : '',
        seoTitle:      typeof row.seo_title === 'string' ? row.seo_title : '',
        metaDescription: typeof row.meta_description === 'string' ? row.meta_description : '',
        author:        typeof row.author  === 'string' ? row.author : 'ClashLayoutsHub Team',
        publishedAt:   typeof row.published_at === 'string' ? row.published_at.slice(0, 10) : today,
        tags:          Array.isArray(row.tags) ? (row.tags as string[]).join(', ') : (row.tags as string ?? ''),
        content:       typeof row.content === 'string' ? row.content : '',
        category:      BLOG_CATEGORIES.includes(row.category as BlogCategory) ? (row.category as BlogCategory) : 'Strategy',
      };
    }
    return {
      title:         '',
      slug:          '',
      featuredImage: '',
      description:   '',
      seoTitle:      '',
      metaDescription: '',
      author:        'ClashLayoutsHub Team',
      publishedAt:   today,
      tags:          '',
      content:       '',
      category:      'Strategy',
    };
  });

  const isEdit = !!editPost;
  const [slugManual, setSlugManual] = useState(!!editPost);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving]         = useState(false);
  const [preview, setPreview]       = useState('');

  // Auto-generate slug from title (skip in edit mode)
  useEffect(() => {
    if (isEdit || slugManual || !form.title.trim()) return;
    setForm(f => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, slugManual, isEdit]);

  // Live preview
  useEffect(() => {
    setPreview(renderMarkdown(form.content));
  }, [form.content]);

  const set = (field: keyof FormData, val: string) =>
    setForm(f => ({ ...f, [field]: val }));

  // ── AI Generation ──────────────────────────────────────────────────────────
  const generateWithAI = async () => {
    if (!form.title.trim()) { showToast('Enter a title first', false); return; }
    setGenerating(true);
    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        showToast(json.error || 'Generation failed', false);
        return;
      }

      // Unpack: handles both object and double-encoded string responses
      const d = unpackData(json.data);

      // Title & slug
      const newTitle = typeof d.title === 'string' && d.title.trim()
        ? d.title.trim()
        : form.title;
      const newSlug  = typeof d.slug === 'string' && d.slug.trim()
        ? d.slug.trim()
        : slugify(newTitle);

      // Description (max 155 chars safety trim)
      const newDesc = typeof d.description === 'string'
        ? d.description.trim().slice(0, 155)
        : form.description;

      // SEO Meta Title (max 60 chars)
      const newSeoTitle = typeof d.seoTitle === 'string'
        ? d.seoTitle.trim().slice(0, 60)
        : (typeof d.seo_title === 'string' ? d.seo_title.trim().slice(0, 60) : form.seoTitle);

      // Meta Description (max 150 chars)
      const newMetaDesc = typeof d.metaDescription === 'string'
        ? d.metaDescription.trim().slice(0, 150)
        : (typeof d.meta_description === 'string' ? d.meta_description.trim().slice(0, 150) : form.metaDescription);

      // Category — robust: handle pipes, prefixes, multi-word variants
      const newCat: BlogCategory = typeof d.category === 'string'
        ? (parseCategory(d.category) ?? form.category)
        : form.category;

      // Tags — join array or use string, 5-8 tags
      const newTags = Array.isArray(d.tags)
        ? (d.tags as unknown[]).map(String).map(t => t.trim()).filter(Boolean).join(', ')
        : typeof d.tags === 'string' ? d.tags.trim()
        : form.tags;

      // Content — extract pure markdown; reject accidental JSON blobs
      const rawContent = typeof d.content === 'string' ? d.content : '';
      const newContent = rawContent ? extractContent(rawContent) : form.content;

      setForm(f => ({
        ...f,
        title:       newTitle,
        slug:        newSlug,
        description: newDesc  || f.description,
        seoTitle:    newSeoTitle || f.seoTitle,
        metaDescription: newMetaDesc || f.metaDescription,
        author:      typeof d.author === 'string' ? d.author.trim() : f.author,
        category:    newCat,
        tags:        newTags  || f.tags,
        content:     newContent || f.content,
        publishedAt: today,
      }));
      setSlugManual(true);
      showToast('Content generated — all fields updated!', true);
    } catch {
      showToast('AI generation failed', false);
    } finally {
      setGenerating(false);
    }
  };

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()) { showToast('Title is required', false); return; }
    if (!form.slug.trim())  { showToast('Slug is required',  false); return; }
    setSaving(true);
    try {
      const body = {
        slug:          form.slug.trim(),
        title:         form.title.trim(),
        description:   form.description.trim(),
        seoTitle:      form.seoTitle.trim(),
        metaDescription: form.metaDescription.trim(),
        featuredImage: form.featuredImage.trim(),
        content:       form.content,
        category:      form.category,
        tags:          form.tags
                         ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
                         : [],
        publishedAt:   form.publishedAt || today,
        author:        form.author.trim(),
      };
      const res = await fetch('/api/admin/blogs', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: authHeader },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        showToast(isEdit ? 'Blog post updated!' : 'Blog post saved to Supabase!', true);
        onSaved();
        onClose();
      } else {
        const j = await res.json();
        showToast(j.error || 'Save failed', false);
      }
    } catch {
      showToast('Save failed', false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mb-6 bg-brand-card border border-brand-border rounded-2xl overflow-hidden shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-brand-border bg-gray-50/80">
        <div className="flex items-center gap-2">
          <span className="font-bold text-brand-text text-sm">{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</span>
          {generating && (
            <span className="flex items-center gap-1 text-xs text-purple-600 font-medium">
              <RefreshCw className="w-3 h-3 animate-spin" /> Generating with Gemini…
            </span>
          )}
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-brand-muted hover:text-red-500 hover:bg-red-50 transition-all">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-brand-border">

        {/* ── LEFT: Form ────────────────────────────────────────────────────── */}
        <div className="p-5 space-y-4">

          {/* Title + AI button */}
          <div>
            <label className={LABEL}>Title</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="e.g. Best TH14 War Base 2026"
                autoComplete="off"
                className={`${INPUT} flex-1`}
              />
              <button
                onClick={generateWithAI}
                disabled={generating}
                title="Generate all fields with Gemini AI"
                className="flex items-center gap-1.5 px-3 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {generating
                  ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  : <Sparkles className="w-3.5 h-3.5" />}
                {generating ? 'Working…' : 'AI Fill'}
              </button>
            </div>
          </div>

          {/* Slug */}
          <div>
            <label className={LABEL}>
              Slug
              <span className="ml-1 text-brand-muted/50 normal-case font-normal tracking-normal">— {isEdit ? 'locked in edit mode' : 'auto from title'}</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={e => { if (!isEdit) { setSlugManual(true); set('slug', e.target.value); } }}
              placeholder="best-th14-war-base-2026"
              disabled={isEdit}
              autoComplete="off"
              className={`${INPUT} font-mono text-xs ${isEdit ? 'bg-gray-100 text-brand-muted cursor-not-allowed' : ''}`}
            />
          </div>

          {/* Category */}
          <div>
            <label className={LABEL}>Category</label>
            <select
              value={form.category}
              onChange={e => set('category', e.target.value as BlogCategory)}
              className={`${INPUT} cursor-pointer`}
            >
              {BLOG_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Featured Image + Upload */}
          <ImageUpload
            label="Featured Image"
            value={form.featuredImage}
            onChange={v => set('featuredImage', v)}
            authHeader={authHeader}
          />

          {/* Description */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label className={LABEL} style={{ marginBottom: 0 }}>Description</label>
              <span className={`text-xs ${form.description.length > 155 ? 'text-red-500 font-semibold' : 'text-brand-muted'}`}>
                {form.description.length}/155
              </span>
            </div>
            <textarea
              rows={2}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Discover the best TH14 war bases for 2026…"
              className={`${INPUT} resize-none`}
            />
          </div>

          {/* SEO Meta Title */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label className={LABEL} style={{ marginBottom: 0 }}>SEO Meta Title</label>
              <span className={`text-xs ${form.seoTitle.length > 60 ? 'text-red-500 font-semibold' : 'text-brand-muted'}`}>
                {form.seoTitle.length}/60
              </span>
            </div>
            <input
              type="text"
              value={form.seoTitle}
              onChange={e => set('seoTitle', e.target.value)}
              placeholder="Best TH14 War Base 2026 - Ultimate Guide"
              maxLength={60}
              autoComplete="off"
              className={INPUT}
            />
            <p className="text-[10px] text-brand-muted mt-1">Catchy title for search results (max 60 characters)</p>
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label className={LABEL} style={{ marginBottom: 0 }}>Meta Description</label>
              <span className={`text-xs ${form.metaDescription.length > 150 ? 'text-red-500 font-semibold' : 'text-brand-muted'}`}>
                {form.metaDescription.length}/150
              </span>
            </div>
            <textarea
              rows={2}
              value={form.metaDescription}
              onChange={e => set('metaDescription', e.target.value)}
              placeholder="Discover the ultimate TH14 war base for 2026. Anti-3 star design with optimal placement…"
              maxLength={150}
              className={`${INPUT} resize-none`}
            />
            <p className="text-[10px] text-brand-muted mt-1">Compelling description for search results (max 150 characters)</p>
          </div>

          {/* Author + Published At */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Author</label>
              <input
                type="text"
                value={form.author}
                onChange={e => set('author', e.target.value)}
                placeholder="ClashLayoutsHub Team"
                autoComplete="off"
                className={INPUT}
              />
            </div>
            <div>
              <label className={LABEL}>Published At</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={e => set('publishedAt', e.target.value)}
                autoComplete="off"
                className={INPUT}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className={LABEL}>
              Tags
              <span className="ml-1 text-brand-muted/50 normal-case font-normal tracking-normal">— comma-separated</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
              placeholder="TH14, War Base, Clan Wars"
              autoComplete="off"
              className={INPUT}
            />
          </div>

          {/* Content */}
          <div>
            <label className={LABEL}>
              Content
              <span className="ml-1 text-brand-muted/50 normal-case font-normal tracking-normal">— Markdown</span>
            </label>
            <textarea
              rows={20}
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder={`## Introduction\n\nStart writing your blog post here…\n\n## Key Strategies\n\n- First key point\n- Second key point\n\n## Frequently Asked Questions\n\n**Q: Example question?**\nA: Example answer.`}
              spellCheck={false}
              className={`${INPUT} font-mono text-xs leading-relaxed resize-y`}
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving || generating}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {saving
              ? <RefreshCw className="w-4 h-4 animate-spin" />
              : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : (isEdit ? 'Update Blog Post' : 'Save Blog to Supabase')}
          </button>
        </div>

        {/* ── RIGHT: Live Preview ────────────────────────────────────────────── */}
        <div className="p-5 flex flex-col" style={{ minHeight: '600px' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wide">Live Preview</span>
            {form.title && (
              <span className="text-xs text-brand-muted truncate max-w-[200px]">— {form.title}</span>
            )}
          </div>

          {form.content ? (
            <div
              className="flex-1 overflow-auto rounded-xl border border-brand-border bg-white p-4 text-sm"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-brand-border text-brand-muted">
              <Sparkles className="w-8 h-8 opacity-30" />
              <p className="text-sm text-center px-4">
                Start typing in the Content field<br />or click <strong>AI Fill</strong> to generate everything
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
