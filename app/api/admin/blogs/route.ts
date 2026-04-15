import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { BlogPost } from '@/lib/types';

function checkAuth(req: Request): boolean {
  const auth = req.headers.get('Authorization');
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && auth === `Bearer ${pw}`;
}

function toRow(body: Partial<BlogPost>) {
  return {
    ...(body.slug        && { slug:           body.slug }),
    ...(body.title       && { title:          body.title }),
    ...(body.description && { description:    body.description }),
    ...(body.seoTitle    && { seo_title:      body.seoTitle }),
    ...(body.metaDescription && { meta_description: body.metaDescription }),
    ...(body.featuredImage && { featured_image: body.featuredImage }),
    ...(body.content !== undefined && { content:     body.content }),
    ...(body.tags    !== undefined && { tags:        body.tags }),
    ...(body.category    && { category:       body.category }),
    ...(body.publishedAt && { published_at:   body.publishedAt }),
    ...(body.updatedAt   && { updated_at:     body.updatedAt }),
    ...(body.author      && { author:         body.author }),
    ...(body.faq     !== undefined && { faq:         body.faq }),
  };
}

// GET — list all posts OR single post by ?slug= for edit pre-fill
export async function GET(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const { data, error } = await supabaseAdmin.from('blogs').select('*').eq('slug', slug).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ data });
  }

  const { data, error } = await supabaseAdmin
    .from('blogs')
    .select('slug, title, description, featured_image, category, tags, published_at, updated_at, author')
    .order('published_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST — create a new blog post
export async function POST(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body: BlogPost = await req.json();
  if (!body.slug || !body.title) return NextResponse.json({ error: 'slug and title are required' }, { status: 400 });
  const row = { ...toRow(body), published_at: body.publishedAt || new Date().toISOString() };
  const { data, error } = await supabaseAdmin.from('blogs').insert([row]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

// PUT — update an existing blog post (slug required in body)
export async function PUT(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body: Partial<BlogPost> & { slug: string } = await req.json();
  if (!body.slug) return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  const row = { ...toRow(body), updated_at: new Date().toISOString() };
  const { data, error } = await supabaseAdmin.from('blogs').update(row).eq('slug', body.slug).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// DELETE — delete a blog post by slug query param
export async function DELETE(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug query param required' }, { status: 400 });
  const { error } = await supabaseAdmin.from('blogs').delete().eq('slug', slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
