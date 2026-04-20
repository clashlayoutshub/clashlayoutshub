'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FormEvent } from 'react';
import { Lock, LogOut, RefreshCw, Trash2, Plus, Eye, Database, BookOpen, LayoutGrid, X, Check, AlertCircle, Search, Edit, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import BlogForm from './BlogForm';
import LayoutForm from './LayoutForm';
import BulkImport from '@/components/BulkImport';

type Tab = 'layouts' | 'blogs' | 'sync';

interface LayoutRow { id: string; title: string; level: number; type: string; category: string; created_at: string; }
interface BlogRow { slug: string; title: string; description: string; category?: string; published_at: string; author?: string; }

function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {ok ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {msg}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-brand-text">{value}</p>
          <p className="text-xs text-brand-muted">{label}</p>
        </div>
      </div>
    </div>
  );
}

const BLOG_CATEGORY_COLORS: Record<string, string> = {
  Strategy:      'bg-blue-100 text-blue-700',
  'Base Design': 'bg-purple-100 text-purple-700',
  'Attack Guide':'bg-orange-100 text-orange-700',
  Defense:       'bg-emerald-100 text-emerald-700',
  Update:        'bg-amber-100 text-amber-700',
};

export default function AdminLitePage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [tab, setTab] = useState<Tab>('layouts');
  const [layouts, setLayouts] = useState<LayoutRow[]>([]);
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [showAddLayout, setShowAddLayout] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [editLayout, setEditLayout] = useState<Record<string, unknown> | null>(null);
  const [editBlog, setEditBlog] = useState<Record<string, unknown> | null>(null);
  const [syncStatus, setSyncStatus] = useState('');
  const [syncing, setSyncing] = useState(false);

  const [layoutSearch, setLayoutSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');

  const authHeader = `Bearer ${password}`;

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchLayouts = useCallback(async () => {
    setDataLoading(true);
    try {
      const res = await fetch('/api/admin/layouts', { headers: { Authorization: authHeader } });
      const json = await res.json();
      setLayouts(json.data ?? []);
    } catch { showToast('Failed to load layouts', false); }
    finally { setDataLoading(false); }
  }, [authHeader]);

  const fetchBlogs = useCallback(async () => {
    setDataLoading(true);
    try {
      const res = await fetch('/api/admin/blogs', { headers: { Authorization: authHeader } });
      const json = await res.json();
      setBlogs(json.data ?? []);
    } catch { showToast('Failed to load blogs', false); }
    finally { setDataLoading(false); }
  }, [authHeader]);

  const fetchLayoutForEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/layouts?id=${encodeURIComponent(id)}`, { headers: { Authorization: authHeader } });
      const json = await res.json();
      if (json.data) setEditLayout(json.data);
      else showToast('Failed to load layout', false);
    } catch { showToast('Failed to load layout', false); }
  };

  const fetchBlogForEdit = async (slug: string) => {
    try {
      const res = await fetch(`/api/admin/blogs?slug=${encodeURIComponent(slug)}`, { headers: { Authorization: authHeader } });
      const json = await res.json();
      if (json.data) setEditBlog(json.data);
      else showToast('Failed to load blog', false);
    } catch { showToast('Failed to load blog', false); }
  };

  useEffect(() => {
    if (!authed) return;
    if (tab === 'layouts') fetchLayouts();
    if (tab === 'blogs') fetchBlogs();
  }, [authed, tab, fetchLayouts, fetchBlogs]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) { setAuthed(true); }
      else { setAuthError('Incorrect password. Please try again.'); }
    } catch { setAuthError('Connection error. Please try again.'); }
    finally { setAuthLoading(false); }
  };

  const deleteLayout = async (id: string, title: string) => {
    if (!window.confirm(`Delete layout "${title}"?\n\nThis cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/layouts?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader },
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setLayouts(prev => prev.filter(l => l.id !== id));
        showToast('Layout deleted', true);
        fetchLayouts();
      } else {
        showToast(`Delete failed: ${(json as { error?: string }).error ?? res.status}`, false);
      }
    } catch (err) {
      showToast(`Delete error: ${err instanceof Error ? err.message : 'Network error'}`, false);
    }
  };

  const deleteBlog = async (slug: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/blogs?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader },
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setBlogs(prev => prev.filter(b => b.slug !== slug));
        showToast('Blog post deleted', true);
        fetchBlogs();
      } else {
        showToast(`Delete failed: ${(json as { error?: string }).error ?? res.status}`, false);
      }
    } catch (err) {
      showToast(`Delete error: ${err instanceof Error ? err.message : 'Network error'}`, false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncStatus('');
    try {
      const res = await fetch('/api/admin/sync', { method: 'POST', headers: { Authorization: authHeader } });
      const json = await res.json();
      setSyncStatus(json.message || json.error || 'Unknown response');
      showToast(res.ok ? 'Sync complete!' : 'Sync failed', res.ok);
    } catch { setSyncStatus('Network error'); showToast('Sync failed', false); }
    finally { setSyncing(false); }
  };

  const filteredLayouts = layouts.filter(l =>
    l.title.toLowerCase().includes(layoutSearch.toLowerCase()) ||
    l.id.toLowerCase().includes(layoutSearch.toLowerCase())
  );

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.slug.toLowerCase().includes(blogSearch.toLowerCase())
  );

  // ─── Login Screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-brand-text">Admin Access</h1>
            <p className="text-brand-muted text-sm mt-1">Enter your admin password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="bg-brand-card border border-brand-border rounded-2xl p-6 space-y-4">
            <div>
              <label htmlFor="pw" className="block text-sm font-medium text-brand-text mb-1.5">Password</label>
              <input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter admin password" autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
            {authError && <p className="text-red-600 text-sm">{authError}</p>}
            <button type="submit" disabled={authLoading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60">
              {authLoading ? 'Verifying...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───────────────────────────────────────────────────────────────
  const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'layouts', label: 'Layouts', icon: LayoutGrid },
    { key: 'blogs', label: 'Blog Posts', icon: BookOpen },
    { key: 'sync', label: 'Sync & Tools', icon: Database },
  ];

  const layoutStats = {
    total: layouts.length,
    byType: layouts.reduce((acc, l) => { acc[l.type] = (acc[l.type] || 0) + 1; return acc; }, {} as Record<string, number>),
  };

  const blogStats = {
    total: blogs.length,
    latest: blogs[0]?.published_at?.slice(0, 10) || 'N/A',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {toast && <Toast msg={toast.msg} ok={toast.ok} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Admin Lite</h1>
          <p className="text-brand-muted text-sm mt-0.5">Supabase-backed content management</p>
        </div>
        <button onClick={() => { setAuthed(false); setPassword(''); }}
          className="flex items-center gap-2 text-sm text-brand-muted hover:text-red-600 transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-brand-card border border-brand-border rounded-xl p-1 w-fit">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => { setTab(key); setLayoutSearch(''); setBlogSearch(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-primary text-white shadow-sm' : 'text-brand-muted hover:text-brand-text'}`}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {/* ── Layouts Tab ─────────────────────────────────────────────────────── */}
      {tab === 'layouts' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Layouts" value={layoutStats.total} icon={LayoutGrid} color="bg-primary" />
            <StatCard label="Town Hall" value={layoutStats.byType.th ?? 0} icon={BarChart3} color="bg-blue-600" />
            <StatCard label="Builder Hall" value={layoutStats.byType.bh ?? 0} icon={BarChart3} color="bg-green-600" />
            <StatCard label="War Bases" value={layouts.filter(l => l.category === 'war').length} icon={BarChart3} color="bg-red-600" />
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="text"
                value={layoutSearch}
                onChange={e => setLayoutSearch(e.target.value)}
                placeholder="Search layouts…"
                autoComplete="off"
                className="w-full pl-9 pr-3 py-2 bg-brand-card border border-brand-border text-brand-text text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-brand-muted/60 transition-all"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={fetchLayouts} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-muted border border-brand-border rounded-lg hover:bg-gray-50 transition-all">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <button onClick={() => { setShowBulkImport(prev => !prev); setShowAddLayout(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-muted border border-brand-border rounded-lg hover:bg-gray-50 transition-all">
                <Database className="w-3.5 h-3.5" /> {showBulkImport ? 'Cancel Import' : 'Bulk Import'}
              </button>
              <button onClick={() => { setEditLayout(null); setShowAddLayout(prev => !prev); setShowBulkImport(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-all">
                <Plus className="w-3.5 h-3.5" /> {showAddLayout ? 'Cancel' : 'Add Layout'}
              </button>
            </div>
          </div>

          {showBulkImport && (
            <BulkImport
              onImportComplete={() => {
                fetchLayouts();
                setShowBulkImport(false);
                showToast('Bulk import completed successfully', true);
              }}
            />
          )}

          {showAddLayout && (
            <LayoutForm
              authHeader={authHeader}
              onSaved={() => { fetchLayouts(); setShowAddLayout(false); }}
              onClose={() => setShowAddLayout(false)}
              showToast={showToast}
            />
          )}

          {editLayout && (
            <LayoutForm
              authHeader={authHeader}
              onSaved={() => { fetchLayouts(); setEditLayout(null); }}
              onClose={() => setEditLayout(null)}
              showToast={showToast}
              editLayout={editLayout}
            />
          )}

          {dataLoading ? (
            <p className="text-brand-muted text-sm py-8 text-center">Loading…</p>
          ) : (
            <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
              {/* Mobile Card View */}
              <div className="sm:hidden divide-y divide-brand-border">
                {filteredLayouts.length === 0 && (
                  <div className="px-4 py-8 text-center text-brand-muted">No layouts found.</div>
                )}
                {filteredLayouts.map((l) => (
                  <div key={l.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-xs text-brand-muted">{l.id}</p>
                        <p className="font-semibold text-brand-text mt-1">{l.title}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-0.5 bg-gray-100 text-brand-muted text-xs rounded-full">{l.type.toUpperCase()}{l.level}</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-brand-muted text-xs rounded-full capitalize">{l.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Link href={`/layout/${l.id}`} target="_blank" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-brand-muted border border-brand-border rounded-lg hover:bg-gray-50 transition-all">
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </Link>
                      <button onClick={() => fetchLayoutForEdit(l.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-brand-muted border border-brand-border rounded-lg hover:bg-gray-50 transition-all">
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={() => deleteLayout(l.id, l.title)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-red-600 border border-brand-border rounded-lg hover:bg-red-50 transition-all">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <table className="hidden sm:table w-full text-sm">
                <thead className="border-b border-brand-border bg-gray-50/50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-brand-text">ID</th>
                    <th className="px-4 py-3 font-semibold text-brand-text">Title</th>
                    <th className="px-4 py-3 font-semibold text-brand-text">TH/BH</th>
                    <th className="px-4 py-3 font-semibold text-brand-text">Category</th>
                    <th className="px-4 py-3 font-semibold text-brand-text text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLayouts.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-brand-muted">No layouts found.</td></tr>
                  )}
                  {filteredLayouts.map((l) => (
                    <tr key={l.id} className="border-t border-brand-border hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-brand-muted">{l.id}</td>
                      <td className="px-4 py-3 text-brand-text font-medium">{l.title}</td>
                      <td className="px-4 py-3 text-brand-muted">{l.type?.toUpperCase()}{l.level}</td>
                      <td className="px-4 py-3 text-brand-muted capitalize">{l.category}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/layout/${l.id}`} target="_blank" className="p-1.5 text-brand-muted hover:text-primary transition-colors" title="Preview">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => fetchLayoutForEdit(l.id)} className="p-1.5 text-brand-muted hover:text-primary transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteLayout(l.id, l.title)} className="p-1.5 text-brand-muted hover:text-red-600 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Blogs Tab ────────────────────────────────────────────────────────── */}
      {tab === 'blogs' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Posts" value={blogStats.total} icon={BookOpen} color="bg-primary" />
            <StatCard label="Published" value={blogStats.total} icon={Check} color="bg-green-600" />
            <StatCard label="Latest" value={blogStats.latest} icon={RefreshCw} color="bg-amber-600" />
            <StatCard label="Strategy" value={blogs.filter(b => b.category === 'Strategy').length} icon={BarChart3} color="bg-blue-600" />
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="text"
                value={blogSearch}
                onChange={e => setBlogSearch(e.target.value)}
                placeholder="Search posts…"
                autoComplete="off"
                className="w-full pl-9 pr-3 py-2 bg-brand-card border border-brand-border text-brand-text text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-brand-muted/60 transition-all"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={fetchBlogs} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-muted border border-brand-border rounded-lg hover:bg-gray-50 transition-all">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <button onClick={() => { setEditBlog(null); setShowAddBlog(prev => !prev); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-all">
                <Plus className="w-3.5 h-3.5" /> {showAddBlog ? 'Cancel' : 'Add Post'}
              </button>
            </div>
          </div>

          {showAddBlog && (
            <BlogForm
              authHeader={authHeader}
              onSaved={() => { fetchBlogs(); setShowAddBlog(false); }}
              onClose={() => setShowAddBlog(false)}
              showToast={showToast}
            />
          )}

          {editBlog && (
            <BlogForm
              authHeader={authHeader}
              onSaved={() => { fetchBlogs(); setEditBlog(null); }}
              onClose={() => setEditBlog(null)}
              showToast={showToast}
              editPost={editBlog}
            />
          )}

          {dataLoading ? (
            <p className="text-brand-muted text-sm py-8 text-center">Loading…</p>
          ) : (
            <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
              {/* Mobile Card View */}
              <div className="sm:hidden divide-y divide-brand-border">
                {filteredBlogs.length === 0 && (
                  <div className="px-4 py-8 text-center text-brand-muted">No blog posts found.</div>
                )}
                {filteredBlogs.map((b) => (
                  <div key={b.slug} className="p-4 space-y-3">
                    <div>
                      {b.category && (
                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${BLOG_CATEGORY_COLORS[b.category] ?? 'bg-gray-100 text-gray-700'}`}>
                          {b.category}
                        </span>
                      )}
                      <p className="font-mono text-xs text-brand-muted">{b.slug}</p>
                      <p className="font-semibold text-brand-text mt-1">{b.title}</p>
                      {b.description && <p className="text-sm text-brand-muted mt-1 line-clamp-2">{b.description}</p>}
                      <p className="text-xs text-brand-muted mt-2">By {b.author ?? '—'} • {b.published_at?.slice(0, 10)}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Link href={`/blog/${b.slug}`} target="_blank" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-brand-muted border border-brand-border rounded-lg hover:bg-gray-50 transition-all">
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </Link>
                      <button onClick={() => fetchBlogForEdit(b.slug)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-brand-muted border border-brand-border rounded-lg hover:bg-gray-50 transition-all">
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={() => deleteBlog(b.slug, b.title)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-red-600 border border-brand-border rounded-lg hover:bg-red-50 transition-all">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <table className="hidden sm:table w-full text-sm">
                <thead className="border-b border-brand-border bg-gray-50/50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-brand-text">Slug</th>
                    <th className="px-4 py-3 font-semibold text-brand-text">Title</th>
                    <th className="px-4 py-3 font-semibold text-brand-text">Category</th>
                    <th className="px-4 py-3 font-semibold text-brand-text">Author</th>
                    <th className="px-4 py-3 font-semibold text-brand-text">Published</th>
                    <th className="px-4 py-3 font-semibold text-brand-text text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-muted">No blog posts found.</td></tr>
                  )}
                  {filteredBlogs.map((b) => (
                    <tr key={b.slug} className="border-t border-brand-border hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-brand-muted">{b.slug}</td>
                      <td className="px-4 py-3 text-brand-text font-medium">{b.title}</td>
                      <td className="px-4 py-3">
                        {b.category && (
                          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${BLOG_CATEGORY_COLORS[b.category] ?? 'bg-gray-100 text-gray-700'}`}>
                            {b.category}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-brand-muted">{b.author ?? '—'}</td>
                      <td className="px-4 py-3 text-brand-muted">{b.published_at?.slice(0, 10)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/blog/${b.slug}`} target="_blank" className="p-1.5 text-brand-muted hover:text-primary transition-colors" title="Preview">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => fetchBlogForEdit(b.slug)} className="p-1.5 text-brand-muted hover:text-primary transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteBlog(b.slug, b.title)} className="p-1.5 text-brand-muted hover:text-red-600 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Sync Tab ─────────────────────────────────────────────────────────── */}
      {tab === 'sync' && (
        <div className="space-y-6">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
            <h2 className="font-bold text-brand-text mb-2">Seed Database from Local Files</h2>
            <p className="text-sm text-brand-muted mb-4">
              This will upsert all entries from <code className="bg-gray-100 px-1 rounded">data/layouts.json</code> and the built-in blog seed data into your Supabase tables. Safe to run multiple times.
            </p>
            <button onClick={handleSync} disabled={syncing}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-60">
              <Database className="w-4 h-4" /> {syncing ? 'Syncing…' : 'Run Sync'}
            </button>
            {syncStatus && (
              <p className={`mt-3 text-sm font-medium ${syncStatus.includes('failed') || syncStatus.includes('error') ? 'text-red-600' : 'text-green-700'}`}>
                {syncStatus}
              </p>
            )}
          </div>

          <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
            <h2 className="font-bold text-brand-text mb-3">Quick Preview Links</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['/', '/blog', '/th14', '/th15', '/bh9', '/bh10'].map((href) => (
                <Link key={href} href={href} target="_blank"
                  className="flex items-center gap-2 px-3 py-2 border border-brand-border rounded-xl text-sm text-brand-muted hover:border-primary hover:text-primary transition-all">
                  <Eye className="w-3.5 h-3.5" /> {href}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-semibold text-blue-800 mb-2">Supabase Table Setup</h3>
            <p className="text-sm text-blue-700 mb-2">Ensure these tables exist in your Supabase project:</p>
            <pre className="text-xs bg-white border border-blue-100 rounded-lg p-3 overflow-auto text-blue-900">{`-- layouts table
create table layouts (
  id text primary key,
  title text, level int, type text, category text,
  image text, description text, base_link text,
  key_features jsonb, how_to_use jsonb, tips jsonb,
  about text, faq jsonb, tags jsonb,
  created_at text, updated_at text
);

-- blogs table
create table blogs (
  slug text primary key,
  title text, description text, featured_image text,
  content text, tags jsonb, published_at text,
  updated_at text, author text, faq jsonb,
  category text
);`}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
