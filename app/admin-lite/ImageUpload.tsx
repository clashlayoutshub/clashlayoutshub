'use client';

import { useRef, useState } from 'react';
import { Upload, X, ImageIcon, RefreshCw, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value:       string;
  onChange:    (url: string) => void;
  authHeader:  string;
  label?:      string;
}

/** Applies f_auto,q_auto transformation to any plain Cloudinary upload URL */
function optimizeCloudinaryUrl(url: string): string {
  if (!url || !url.includes('cloudinary.com')) return url;
  if (url.includes('f_auto') || url.includes('q_auto')) return url;
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
}

const LABEL = 'block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1';
const INPUT = 'px-3 py-2 rounded-xl border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all';

export default function ImageUpload({ value, onChange, authHeader, label = 'Image' }: ImageUploadProps) {
  const fileRef              = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState('');
  const [justUploaded, setJustUploaded] = useState(false);
  const [imgError, setImgError]   = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only image files are accepted.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.');
      return;
    }

    setUploading(true);
    setError('');
    setJustUploaded(false);

    try {
      const body = new FormData();
      body.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: authHeader },
        body,
      });
      const json = await res.json();

      if (!res.ok || !json.url) {
        setError(json.error ?? 'Upload failed');
        return;
      }

      onChange(json.url);
      setImgError(false);
      setJustUploaded(true);
      setTimeout(() => setJustUploaded(false), 3000);
    } catch {
      setError('Upload failed — check your connection');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handlePasteBlur = (url: string) => {
    const optimized = optimizeCloudinaryUrl(url);
    if (optimized !== url) onChange(optimized);
  };

  const clear = () => {
    onChange('');
    setError('');
    setImgError(false);
    setJustUploaded(false);
  };

  return (
    <div>
      <label className={LABEL}>{label}</label>

      {/* URL input + Upload button */}
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={e => { onChange(e.target.value); setImgError(false); setError(''); }}
          onBlur={e => handlePasteBlur(e.target.value)}
          placeholder="Paste Cloudinary URL or click Upload →"
          autoComplete="off"
          className={`${INPUT} flex-1`}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {uploading
            ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            : <Upload className="w-3.5 h-3.5" />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          autoComplete="off"
          onChange={handleFile}
        />
      </div>

      {/* Status messages */}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
      )}
      {justUploaded && !error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-green-600 font-medium">
          <CheckCircle className="w-3.5 h-3.5" /> Uploaded & optimized (f_auto,q_auto applied)
        </p>
      )}

      {/* Live preview */}
      {value && (
        <div className="mt-2 flex items-start gap-3">
          <div className="relative w-48 h-28 flex-shrink-0 rounded-xl overflow-hidden border border-brand-border bg-gray-100 flex items-center justify-center">
            {imgError ? (
              <div className="flex flex-col items-center gap-1 text-brand-muted text-xs">
                <ImageIcon className="w-5 h-5 opacity-40" />
                <span>Cannot load</span>
              </div>
            ) : (
              <Image
                src={value}
                alt="Preview"
                fill
                unoptimized
                className="object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div className="flex flex-col gap-1 mt-1 min-w-0">
            <p className="text-xs text-brand-muted break-all leading-relaxed line-clamp-3">{value}</p>
            <button
              type="button"
              onClick={clear}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors w-fit mt-0.5"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
