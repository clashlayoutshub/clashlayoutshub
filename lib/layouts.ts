import type { Layout, BaseCategory } from './types';
import { supabase, isSupabaseConfigured } from './supabase';

// Map DB row (snake_case columns) → TypeScript Layout interface (camelCase)
function mapRow(r: Record<string, unknown>): Layout {
  return {
    id: r.id as string,
    title: r.title as string,
    level: r.level as number,
    type: r.type as 'th' | 'bh',
    category: r.category as BaseCategory,
    image: (r.image ?? '') as string,
    description: (r.description ?? '') as string,
    baseLink: (r.base_link ?? '') as string,
    keyFeatures: r.key_features as string[] | undefined,
    howToUse: r.how_to_use as string[] | undefined,
    tips: r.tips as string[] | undefined,
    about: r.about as string | undefined,
    faq: r.faq as { question: string; answer: string }[] | undefined,
    tags: r.tags as string[] | undefined,
    createdAt: (r.created_at ?? '') as string,
    updatedAt: r.updated_at as string | undefined,
  };
}

export async function getAllLayouts(): Promise<Layout[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('layouts')
    .select('*')
    .order('created_at', { ascending: false });
  return (data ?? []).map(mapRow);
}

export async function getLayoutById(id: string): Promise<Layout | undefined> {
  if (!isSupabaseConfigured) return undefined;
  const { data } = await supabase
    .from('layouts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  return data ? mapRow(data) : undefined;
}

export async function getLayoutsByLevel(
  type: 'th' | 'bh',
  level: number
): Promise<Layout[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('layouts')
    .select('*')
    .eq('type', type)
    .eq('level', level)
    .order('created_at', { ascending: false });
  return (data ?? []).map(mapRow);
}

export async function getLayoutsByCategory(
  category: BaseCategory
): Promise<Layout[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('layouts')
    .select('*')
    .eq('category', category);
  return (data ?? []).map(mapRow);
}

export async function getLayoutsByType(
  type: 'th' | 'bh'
): Promise<Layout[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('layouts')
    .select('*')
    .eq('type', type)
    .order('created_at', { ascending: false });
  return (data ?? []).map(mapRow);
}

export async function getLayoutsByLevelAndCategory(
  type: 'th' | 'bh',
  level: number,
  category?: BaseCategory
): Promise<Layout[]> {
  if (!isSupabaseConfigured) return [];
  let q = supabase
    .from('layouts')
    .select('*')
    .eq('type', type)
    .eq('level', level);
  if (category) q = q.eq('category', category);
  const { data } = await q;
  return (data ?? []).map(mapRow);
}

export async function getTrendingLayouts(limit = 8): Promise<Layout[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('layouts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapRow);
}

export async function getRelatedLayouts(
  layout: Layout,
  limit = 4
): Promise<Layout[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('layouts')
    .select('*')
    .neq('id', layout.id)
    .or(`level.eq.${layout.level},category.eq.${layout.category}`)
    .limit(limit);
  return (data ?? []).map(mapRow);
}

export function getTHLevels(): number[] {
  return [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
}

export function getBHLevels(): number[] {
  return [5, 6, 7, 8, 9, 10];
}
