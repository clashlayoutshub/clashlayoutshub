import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CLOUD  = process.env.CLOUDINARY_CLOUD_NAME   ?? '';
const KEY    = process.env.CLOUDINARY_API_KEY      ?? '';
const SECRET = process.env.CLOUDINARY_API_SECRET   ?? '';
const PRESET = process.env.CLOUDINARY_UPLOAD_PRESET ?? '';
const FOLDER = 'clashlayoutshub';

function requireAuth(req: NextRequest) {
  return req.headers.get('authorization') === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

/** Insert f_auto,q_auto after /upload/ for automatic format + quality optimization */
function optimizeUrl(url: string): string {
  if (!url || !url.includes('cloudinary.com')) return url;
  if (url.includes('f_auto') || url.includes('q_auto')) return url;
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
}

export async function POST(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!CLOUD) {
    return NextResponse.json(
      { error: 'CLOUDINARY_CLOUD_NAME is not configured' },
      { status: 500 }
    );
  }

  if (!KEY && !SECRET && !PRESET) {
    return NextResponse.json(
      { error: 'No Cloudinary credentials. Add CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET (signed) or CLOUDINARY_UPLOAD_PRESET (unsigned) to .env.local.' },
      { status: 500 }
    );
  }

  try {
    const incoming = await req.formData();
    const file = incoming.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are accepted' }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File must be under 10 MB' }, { status: 400 });
    }

    const upload = new FormData();
    upload.append('file', file);

    if (KEY && SECRET) {
      // ── Signed upload ──────────────────────────────────────────────────────
      const timestamp = Math.floor(Date.now() / 1000);
      const paramsToSign = `folder=${FOLDER}&timestamp=${timestamp}`;
      const signature = crypto
        .createHash('sha1')
        .update(`${paramsToSign}${SECRET}`)
        .digest('hex');

      upload.append('api_key',   KEY);
      upload.append('timestamp', String(timestamp));
      upload.append('signature', signature);
      upload.append('folder',    FOLDER);
    } else {
      // ── Unsigned upload via preset ─────────────────────────────────────────
      upload.append('upload_preset', PRESET);
    }

    const cdnRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
      { method: 'POST', body: upload }
    );

    if (!cdnRes.ok) {
      const errBody = await cdnRes.json().catch(() => ({})) as { error?: { message?: string } };
      return NextResponse.json(
        { error: errBody.error?.message ?? 'Cloudinary upload failed' },
        { status: 502 }
      );
    }

    const result = await cdnRes.json() as {
      secure_url: string;
      public_id:  string;
      width:      number;
      height:     number;
      bytes:      number;
    };

    return NextResponse.json({
      success:   true,
      url:       optimizeUrl(result.secure_url),
      publicId:  result.public_id,
      width:     result.width,
      height:    result.height,
      sizeBytes: result.bytes,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
