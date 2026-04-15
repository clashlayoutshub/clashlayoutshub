import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Layout } from '@/lib/types';

function checkAuth(req: Request): boolean {
  const auth = req.headers.get('Authorization');
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && auth === `Bearer ${pw}`;
}

// Map camelCase body → DB snake_case row
function toRow(body: Partial<Layout>) {
  return {
    ...(body.id && { id: body.id }),
    ...(body.title && { title: body.title }),
    ...(body.level !== undefined && { level: body.level }),
    ...(body.type && { type: body.type }),
    ...(body.category && { category: body.category }),
    ...(body.image && { image: body.image }),
    ...(body.description && { description: body.description }),
    ...(body.baseLink && { base_link: body.baseLink }),
    ...(body.keyFeatures !== undefined && { key_features: body.keyFeatures }),
    ...(body.howToUse !== undefined && { how_to_use: body.howToUse }),
    ...(body.tips !== undefined && { tips: body.tips }),
    ...(body.about !== undefined && { about: body.about }),
    ...(body.faq !== undefined && { faq: body.faq }),
    ...(body.tags !== undefined && { tags: body.tags }),
    ...(body.createdAt && { created_at: body.createdAt }),
    ...(body.updatedAt && { updated_at: body.updatedAt }),
  };
}

// GET — list all layouts OR single layout by ?id= for edit pre-fill
export async function GET(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const { data, error } = await supabaseAdmin.from('layouts').select('*').eq('id', id).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ data });
  }

  const { data, error } = await supabaseAdmin.from('layouts').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST — create a new layout
export async function POST(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body: Layout = await req.json();
  if (!body.id || !body.title) return NextResponse.json({ error: 'id and title are required' }, { status: 400 });
  const row = { ...toRow(body), created_at: body.createdAt || new Date().toISOString() };
  const { data, error } = await supabaseAdmin.from('layouts').insert([row]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

// PUT — update an existing layout (id required in body)
export async function PUT(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body: Partial<Layout> & { id: string } = await req.json();
  if (!body.id) return NextResponse.json({ error: 'id is required' }, { status: 400 });
  const row = { ...toRow(body), updated_at: new Date().toISOString() };
  const { data, error } = await supabaseAdmin.from('layouts').update(row).eq('id', body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// DELETE — delete a layout by id query param
export async function DELETE(req: Request) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id query param required' }, { status: 400 });
  const { error } = await supabaseAdmin.from('layouts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
