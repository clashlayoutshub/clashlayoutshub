import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { supabaseAdmin } from '@/lib/supabase';
import type { Layout } from '@/lib/types';

function checkAuth(req: Request): boolean {
  const auth = req.headers.get('Authorization');
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && auth === `Bearer ${pw}`;
}

// ─── Blog seed data ──────────────────────────────────────────────────────────

const BLOG_SEED = [
  {
    slug: 'best-th14-war-base-2024',
    title: 'Best TH14 War Base Links 2024 – Anti-2 Star & Anti-3 Star',
    description: 'Discover the top TH14 war base layouts for 2024. Anti-2 star and anti-3 star designs with copy links tested in competitive Clan Wars.',
    featured_image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
    tags: ['TH14', 'War Base', 'Clan Wars'],
    published_at: '2024-04-01',
    author: 'ClashLayoutsHub Team',
    content: `## Why TH14 War Bases Matter\n\nTown Hall 14 introduced the Pet House and powerful new defenses, making base design more critical than ever in Clan Wars.\n\n## Top TH14 Anti-3 Star Designs\n\n### 1. The Ring Base\n\nCentralised Town Hall surrounded by Scattershots and Inferno Towers.\n\n### 2. The Spread Box\n\nSpreads defenses across all four quadrants to force sub-optimal pathing.\n\n## How to Use\n\n1. Copy the base link before war prep day\n2. Apply during prep day\n3. Adjust hero positions\n4. Fill CC with Super Minions or Headhunters\n\n## FAQ\n\n**Q: Can I use a TH14 war base at a lower TH?**\nA: No — base links are TH-specific.\n\n**Q: How often should I change my war base?**\nA: Every 2-3 war seasons or when attackers find a reliable path.`,
    faq: [
      { question: 'Can I use a TH14 war base at a lower TH in CWL?', answer: 'No — base links are Town Hall specific.' },
      { question: 'How often should I change my war base?', answer: 'Change every 2-3 war seasons or when attackers find a reliable path.' },
      { question: 'What is the best CC troop for TH14 war defense?', answer: 'Super Minions or Headhunters + Valkyrie is highly recommended.' },
    ],
  },
  {
    slug: 'best-th13-farming-base-2024',
    title: 'Best TH13 Farming Base 2024 – Protect Dark Elixir & Loot',
    description: 'Top TH13 farming base layouts to protect your dark elixir and resources. Includes copy links and detailed strategy breakdown.',
    featured_image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
    tags: ['TH13', 'Farming Base', 'Dark Elixir'],
    published_at: '2024-04-05',
    author: 'ClashLayoutsHub Team',
    content: `## Protecting Your Resources at TH13\n\nTH13 brought the Royal Champion and Giga Inferno, significantly changing the farming meta.\n\n## Best TH13 Farming Designs\n\n### 1. Anti-Dragon Farming Base\n\nGround-level collectors outside with a fortified dark elixir core.\n\n### 2. Hybrid Protection Layout\n\nBalances resource protection with trophy maintenance.\n\n## Tips\n\n- Keep Town Hall inside for defensive value\n- Build walls to level 12+ before focusing on defenses\n- Log on twice daily to spend excess loot`,
    faq: [
      { question: 'Should I keep my TH outside for a shield?', answer: 'At TH13, the Town Hall shield is rarely worth it. Keep it inside.' },
      { question: 'What is the biggest threat to TH13 farming bases?', answer: 'Super Goblin + Sneaky Goblin raids are most effective.' },
      { question: 'How do I protect dark elixir at TH13?', answer: 'Place it in the very center with 2+ wall layers and high-DPS defenses.' },
    ],
  },
  {
    slug: 'best-th15-trophy-base-2024',
    title: 'Best TH15 Trophy Base 2024 – Climb to Legend League',
    description: 'Push trophies to Legend League with these proven TH15 trophy base designs. Anti-everything layouts with base copy links.',
    featured_image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/girl-urban-view.jpg',
    tags: ['TH15', 'Trophy Base', 'Legend League'],
    published_at: '2024-04-10',
    author: 'ClashLayoutsHub Team',
    content: `## Reaching Legend League with TH15\n\nTH15 is the current meta pinnacle, featuring the Monolith and Spell Tower.\n\n## Best TH15 Trophy Designs\n\n### 1. Legend League Qualifier Base\n\nMonolith centrally placed with 360-degree wall coverage.\n\n### 2. 5000+ Cup Maintenance Base\n\nAsymmetric design to confuse funneling.\n\n## Tips\n\n- Stay active during your local off-peak hours\n- Always have a maxed CC donation before Legend\n- Practice attack strategy to maintain offensive cups`,
    faq: [
      { question: 'Should I use single or multi-target Infernos for trophy pushing?', answer: 'Single-target above 4500 cups; multi-target below.' },
      { question: 'How important is Monolith placement?', answer: 'Critical — never let it be isolated before engaging the main army.' },
      { question: 'What CC troops are best for Legend League defense?', answer: 'Super Witch + Ice Golem is highly effective.' },
    ],
  },
];

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // ── Layouts ──────────────────────────────────────────────────────────────
    const layoutsPath = join(process.cwd(), 'data', 'layouts.json');
    const rawLayouts: Layout[] = JSON.parse(readFileSync(layoutsPath, 'utf-8'));

    const layoutRows = rawLayouts.map((l) => ({
      id: l.id,
      title: l.title,
      level: l.level,
      type: l.type,
      category: l.category,
      image: l.image,
      description: l.description,
      base_link: l.baseLink,
      key_features: l.keyFeatures ?? null,
      how_to_use: l.howToUse ?? null,
      tips: l.tips ?? null,
      about: l.about ?? null,
      faq: l.faq ?? null,
      tags: l.tags ?? null,
      created_at: l.createdAt,
      updated_at: l.updatedAt ?? null,
    }));

    const { error: layoutError } = await supabaseAdmin
      .from('layouts')
      .upsert(layoutRows, { onConflict: 'id' });

    if (layoutError) {
      return NextResponse.json({ error: 'Layouts upsert failed', detail: layoutError.message }, { status: 500 });
    }

    // ── Blogs ─────────────────────────────────────────────────────────────────
    const { error: blogError } = await supabaseAdmin
      .from('blogs')
      .upsert(BLOG_SEED, { onConflict: 'slug' });

    if (blogError) {
      return NextResponse.json({ error: 'Blogs upsert failed', detail: blogError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${layoutRows.length} layouts and ${BLOG_SEED.length} blog posts to Supabase.`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Sync failed', detail: message }, { status: 500 });
  }
}
