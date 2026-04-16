'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Save, X, RefreshCw } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface LayoutFormProps {
  authHeader: string;
  onSaved: () => void;
  onClose: () => void;
  showToast: (msg: string, ok: boolean) => void;
  editLayout?: Record<string, unknown> | null;
}

type LayoutType = 'th' | 'bh';
type LayoutCategory = 'war' | 'farming' | 'trophy';

interface FormData {
  id: string;
  title: string;
  type: LayoutType;
  level: number;
  category: LayoutCategory;
  image: string;
  description: string;
  baseLink: string;
  keyFeatures: string;
  howToUse: string;
  tips: string;
  about: string;
  tags: string;
}

const TH_LEVELS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const BH_LEVELS = [5, 6, 7, 8, 9, 10];

const INPUT  = 'w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all';
const LABEL  = 'block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1';
const TAREA  = `${INPUT} resize-y`;
const SELECT = `${INPUT} cursor-pointer`;

export default function LayoutForm({ authHeader, onSaved, onClose, showToast, editLayout }: LayoutFormProps) {
  const [form, setForm] = useState<FormData>(() => {
    if (editLayout) {
      const row = editLayout as Record<string, unknown>;
      return {
        id:          typeof row.id === 'string' ? row.id : '',
        title:       typeof row.title === 'string' ? row.title : '',
        type:        (row.type === 'th' || row.type === 'bh') ? row.type : 'th',
        level:       typeof row.level === 'number' ? row.level : 14,
        category:    (row.category === 'war' || row.category === 'farming' || row.category === 'trophy') ? row.category : 'war',
        image:       (row.image ?? '') as string,
        description: typeof row.description === 'string' ? row.description : '',
        baseLink:    (row.base_link ?? row.baseLink) as string ?? '',
        keyFeatures: Array.isArray(row.key_features) ? (row.key_features as string[]).join('\n') : '',
        howToUse:    Array.isArray(row.how_to_use) ? (row.how_to_use as string[]).join('\n') : '',
        tips:        Array.isArray(row.tips) ? (row.tips as string[]).join('\n') : '',
        about:       typeof row.about === 'string' ? row.about : '',
        tags:        Array.isArray(row.tags) ? (row.tags as string[]).join(', ') : '',
      };
    }
    return {
      id: '',
      title: '',
      type: 'th',
      level: 14,
      category: 'war',
      image: '',
      description: '',
      baseLink: '',
      keyFeatures: '',
      howToUse: '',
      tips: '',
      about: '',
      tags: '',
    };
  });

  const isEdit = !!editLayout;
  const [idManual, setIdManual] = useState(!!editLayout);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving]         = useState(false);

  const set = (field: keyof FormData, val: string | number) =>
    setForm(f => ({ ...f, [field]: val }));

  // Reset level when type changes so the value stays valid
  useEffect(() => {
    setForm(f => ({
      ...f,
      level: f.type === 'bh' ? 9 : 14,
    }));
  }, [form.type]);

  // Auto-derive ID from title + type + level + category (skip in edit mode)
  useEffect(() => {
    if (isEdit || idManual || !form.title.trim()) return;
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 22);
    setForm(f => ({ ...f, id: `${f.type}${f.level}-${f.category}-${slug}` }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, form.type, form.level, form.category, isEdit, idManual]);

  // ── AI Generation ──────────────────────────────────────────────────────────
  const generateWithAI = async () => {
    setGenerating(true);
    try {
      const typeLabel = form.type === 'th' ? 'Town Hall' : 'Builder Hall';
      const titleHint = form.title.trim() ? ` called "${form.title}"` : '';
      const prompt = `You are an expert Clash of Clans content writer.

Generate SEO-optimized content for a ${typeLabel} ${form.level} ${form.category} base layout${titleHint}.

Return ONLY valid JSON with EXACTLY these fields (no extra keys):
{
  "title": "Catchy, keyword-rich layout title, max 60 chars (e.g. 'Best TH${form.level} Anti-3 Star ${form.category.charAt(0).toUpperCase() + form.category.slice(1)} Base 2026')",
  "description": "SEO meta description, max 155 chars, naturally mention TH${form.level} ${form.category} base",
  "keyFeatures": [
    "Feature 1 — specific defensive strength",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5"
  ],
  "howToUse": [
    "Step 1: Copy the base link below",
    "Step 2: ...",
    "Step 3: ...",
    "Step 4: ...",
    "Step 5: ..."
  ],
  "tips": [
    "Tip 1 — specific strategy advice",
    "Tip 2",
    "Tip 3"
  ],
  "about": "2-3 sentences explaining the base design philosophy and why it works well against common attack strategies",
  "tags": ["${form.type.toUpperCase()}${form.level}", "${form.category} base", "clash of clans", "best ${form.type}${form.level}"]
}`;

      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        showToast(json.error || 'Generation failed', false);
        return;
      }
      const d = json.data;
      setForm(f => ({
        ...f,
        title:       d.title       ?? f.title,
        description: d.description ?? f.description,
        keyFeatures: Array.isArray(d.keyFeatures) ? d.keyFeatures.join('\n') : f.keyFeatures,
        howToUse:    Array.isArray(d.howToUse)    ? d.howToUse.join('\n')    : f.howToUse,
        tips:        Array.isArray(d.tips)        ? d.tips.join('\n')        : f.tips,
        about:       d.about ?? f.about,
        tags:        Array.isArray(d.tags) ? d.tags.join(', ') : (d.tags ?? f.tags),
      }));
      showToast('Layout content generated!', true);
    } catch {
      showToast('AI generation failed', false);
    } finally {
      setGenerating(false);
    }
  };

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim())    { showToast('Title is required',     false); return; }
    if (!form.id.trim())       { showToast('ID is required',        false); return; }
    if (!form.baseLink.trim()) { showToast('Base Link is required', false); return; }
    setSaving(true);
    try {
      const body = {
        id:          form.id.trim(),
        title:       form.title.trim(),
        type:        form.type,
        level:       form.level,
        category:    form.category,
        image:       form.image.trim(),
        description: form.description.trim(),
        baseLink:    form.baseLink.trim(),
        keyFeatures: form.keyFeatures ? form.keyFeatures.split('\n').map(s => s.trim()).filter(Boolean) : undefined,
        howToUse:    form.howToUse    ? form.howToUse.split('\n').map(s => s.trim()).filter(Boolean)    : undefined,
        tips:        form.tips        ? form.tips.split('\n').map(s => s.trim()).filter(Boolean)        : undefined,
        about:       form.about.trim() || undefined,
        tags:        form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
        createdAt:   new Date().toISOString().slice(0, 10),
      };
      const res = await fetch('/api/admin/layouts', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: authHeader },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        showToast(isEdit ? 'Layout updated!' : 'Layout saved to Supabase!', true);
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

  const levels = form.type === 'bh' ? BH_LEVELS : TH_LEVELS;

  return (
    <div className="mb-6 bg-brand-card border border-brand-border rounded-2xl overflow-hidden shadow-sm">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-brand-border bg-gray-50/80">
        <div className="flex items-center gap-2">
          <span className="font-bold text-brand-text text-sm">{isEdit ? 'Edit Layout' : 'New Layout'}</span>
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

      <div className="p-5 space-y-5">

        {/* ── Row 1: Type / Level / Category / AI Fill ──────────────────────── */}
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className={LABEL}>Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value as LayoutType)} className={`${SELECT} w-24`}>
              <option value="th">TH</option>
              <option value="bh">BH</option>
            </select>
          </div>
          <div>
            <label className={LABEL}>Level</label>
            <select value={form.level} onChange={e => set('level', parseInt(e.target.value, 10))} className={`${SELECT} w-24`}>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value as LayoutCategory)} className={`${SELECT} w-32`}>
              <option value="war">War</option>
              <option value="farming">Farming</option>
              <option value="trophy">Trophy</option>
            </select>
          </div>
          <button
            onClick={generateWithAI}
            disabled={generating}
            title="Generate title, description, features & tips with Gemini AI"
            className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-50 whitespace-nowrap"
          >
            {generating
              ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              : <Sparkles className="w-3.5 h-3.5" />}
            {generating ? 'Working…' : 'AI Fill'}
          </button>
        </div>

        {/* ── Title ─────────────────────────────────────────────────────────── */}
        <div>
          <label className={LABEL}>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            placeholder={`Best ${form.type.toUpperCase()}${form.level} ${form.category.charAt(0).toUpperCase() + form.category.slice(1)} Base 2026`}
            autoComplete="off"
            className={INPUT}
          />
        </div>

        {/* ── ID ────────────────────────────────────────────────────────────── */}
        <div>
          <label className={LABEL}>
            ID
            <span className="ml-1 text-brand-muted/50 normal-case font-normal tracking-normal">— {isEdit ? 'locked in edit mode' : 'auto from title, must be unique'}</span>
          </label>
          <input
            type="text"
            value={form.id}
            onChange={e => { if (!isEdit) { setIdManual(true); set('id', e.target.value); } }}
            placeholder="th14-war-anti-3star-v1"
            disabled={isEdit}
            autoComplete="off"
            className={`${INPUT} font-mono text-xs ${isEdit ? 'bg-gray-100 text-brand-muted cursor-not-allowed' : ''}`}
          />
        </div>

        {/* ── Image Upload ──────────────────────────────────────────────────── */}
        <ImageUpload
          label="Cloudinary Image"
          value={form.image}
          onChange={v => set('image', v)}
          authHeader={authHeader}
        />

        {/* ── Base Link ─────────────────────────────────────────────────────── */}
        <div>
          <label className={LABEL}>Base Link</label>
          <input
            type="url"
            value={form.baseLink}
            onChange={e => set('baseLink', e.target.value)}
            placeholder="https://link.clashofclans.com/en?action=CopyArmy&army=…"
            autoComplete="off"
            className={INPUT}
          />
        </div>

        {/* ── Description ───────────────────────────────────────────────────── */}
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
            placeholder={`Best ${form.type.toUpperCase()}${form.level} ${form.category} base for 2026 — centralized TH, anti-3 star design…`}
            autoComplete="off"
            className={`${TAREA} resize-none`}
          />
        </div>

        {/* ── Key Features / How To Use / Tips (3-col) ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={LABEL}>
              Key Features
              <span className="ml-1 text-brand-muted/50 normal-case font-normal tracking-normal">— one per line</span>
            </label>
            <textarea
              rows={8}
              value={form.keyFeatures}
              onChange={e => set('keyFeatures', e.target.value)}
              placeholder={"Centralized Town Hall\nAnti-queen walk perimeter\nScattershotcovering all lanes\nMultiple compartments\nSelf-sufficient CC"}
              className={TAREA}
            />
          </div>
          <div>
            <label className={LABEL}>
              How To Use
              <span className="ml-1 text-brand-muted/50 normal-case font-normal tracking-normal">— one step per line</span>
            </label>
            <textarea
              rows={8}
              value={form.howToUse}
              onChange={e => set('howToUse', e.target.value)}
              placeholder={"Copy the base link below\nApply during prep day\nFill CC with Headhunters\nActivate Clan Castle traps\nTest with friendly challenge"}
              className={TAREA}
            />
          </div>
          <div>
            <label className={LABEL}>
              Tips
              <span className="ml-1 text-brand-muted/50 normal-case font-normal tracking-normal">— one per line</span>
            </label>
            <textarea
              rows={8}
              value={form.tips}
              onChange={e => set('tips', e.target.value)}
              placeholder={"Set Infernos to multi-mode\nKeep CC full before war\nUse Seeking Air Mines on Blimp paths"}
              className={TAREA}
            />
          </div>
        </div>

        {/* ── About ─────────────────────────────────────────────────────────── */}
        <div>
          <label className={LABEL}>About</label>
          <textarea
            rows={3}
            value={form.about}
            onChange={e => set('about', e.target.value)}
            placeholder={`This ${form.type.toUpperCase()}${form.level} ${form.category} base is designed to…`}
            className={TAREA}
          />
        </div>

        {/* ── Tags ──────────────────────────────────────────────────────────── */}
        <div>
          <label className={LABEL}>
            Tags
            <span className="ml-1 text-brand-muted/50 normal-case font-normal tracking-normal">— comma-separated</span>
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={e => set('tags', e.target.value)}
            placeholder={`${form.type.toUpperCase()}${form.level}, ${form.category} base, clash of clans`}
            autoComplete="off"
            className={INPUT}
          />
        </div>

        {/* ── Save ──────────────────────────────────────────────────────────── */}
        <button
          onClick={handleSave}
          disabled={saving || generating}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {saving
            ? <RefreshCw className="w-4 h-4 animate-spin" />
            : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : (isEdit ? 'Update Layout' : 'Save Layout to Supabase')}
        </button>

      </div>
    </div>
  );
}
