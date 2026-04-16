import type { BlogPost, BlogMeta } from './types';
import { supabase, isSupabaseConfigured } from './supabase';

// ─── Supabase helpers ────────────────────────────────────────────────────────

function mapMeta(r: Record<string, unknown>): BlogMeta {
  return {
    slug:          r.slug as string,
    title:         r.title as string,
    description:   (r.description ?? '') as string,
    featuredImage: (r.featured_image ?? '') as string,
    category:      r.category as BlogMeta['category'] | undefined,
    tags:          r.tags as string[] | undefined,
    publishedAt:   (r.published_at ?? '') as string,
    updatedAt:     r.updated_at as string | undefined,
    author:        r.author as string | undefined,
  };
}

function mapPost(r: Record<string, unknown>): BlogPost {
  return {
    ...mapMeta(r),
    content: (r.content ?? '') as string,
    faq: r.faq as { question: string; answer: string }[] | undefined,
  };
}

export async function getAllBlogMeta(): Promise<BlogMeta[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false });
  return (data ?? []).map(mapMeta);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!isSupabaseConfigured) return undefined;
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return data ? mapPost(data) : undefined;
}

export async function getRecentBlogs(limit = 3): Promise<BlogMeta[]> {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapMeta);
}


// Seed data lives in app/api/admin/sync/route.ts — not needed here.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _unused: Record<string, string> = {
  'best-th14-war-base-2026': `
## Why TH14 War Bases Matter in 2026

Town Hall 14 introduced the Pet House and powerful new defenses, making base design more critical than ever in Clan Wars. A well-structured TH14 war base can deny 3-star attacks from even top players.

## Top TH14 Anti-3 Star War Base Designs

### 1. The Ring Base Configuration

The ring base places the Town Hall in the center surrounded by multiple layers of splash damage defenses. Scattershots and Inferno Towers cover every angle of approach.

**Key placements:**
- Town Hall centralized with 3+ building buffer
- Scattershots covering all three lanes
- Eagle Artillery positioned off-center to avoid funnel attacks
- CC troops placed centrally for maximum activation range

### 2. The Spread Box Design

This layout spreads key defenses wide to force attackers into sub-optimal pathing. The design excels against Queen Charge LaLoon and Hydra attacks.

**Key placements:**
- Defenses spread across all four quadrants
- Compartmentalized sections with double walls
- Air defenses covering the entire base perimeter
- Bomb Towers positioned at funnel entry points

## How to Use a TH14 War Base

1. Copy the base link before war preparation day begins
2. Apply the layout during preparation day — editing is disabled once war starts
3. Adjust hero positions based on your hero levels
4. Fill your Clan Castle with defensive troops (Super Minions or Headhunters recommended)
5. Test with friendly challenge if possible

## War Attack Strategies to Defend Against

- **Queen Charge LaLoon** — Use high-HP compartments and split air defense coverage
- **Hydra** — Use centralized Inferno Towers on multi-mode to stop healing
- **Zap Quake Dragon** — Place Air Defenses within 2.5 tile spacing to minimize lightning damage

## Tips & Strategy for TH14 War Defense

- Always upgrade your CC before war season
- Use Inferno Towers on multi-target for mass army compositions
- Single-target Infernos counter Queen Walk effectively
- Keep Scattershots pointing outward to reduce splash overlap waste

## About This Base Guide

This guide was compiled from top clan war performances across Crystal, Masters, and Champion leagues. All base links were tested in war environments before publication.

## Frequently Asked Questions

**Q: Can I use a TH14 war base at a lower Town Hall in CWL?**
A: No — base links are Town Hall specific. You must use bases designed for your exact TH level.

**Q: How often should I change my war base?**
A: Change your base every 2-3 war seasons or whenever you notice attackers finding a reliable path.

**Q: What's the best CC troop for TH14 war defense?**
A: Super Minions or a combination of Headhunters + Valkyrie is highly recommended for 2026 meta.

**Q: Are these bases anti-air or anti-ground?**
A: The bases listed are hybrid designs effective against both ground and air attacks.

**Q: Do base links expire?**
A: Base links do not expire, but the meta evolves. Always check the publication date and update regularly.
`,
  'best-th13-farming-base-2026': `
## Protecting Your Resources at TH13

Town Hall 13 brought the Royal Champion and Giga Inferno upgrades, significantly changing the farming meta. Your base design must now account for powerful new attack strategies targeting dark elixir.

## Best TH13 Farming Base Designs

### 1. The Anti-Dragon Farming Base

Ground-level collectors placed outside with a fortified dark elixir core. This design sacrifices outer gold/elixir to protect the valuable dark elixir storage.

**Key features:**
- Dark elixir storage double-compartment protected
- Gold storages on the outer edge as bait
- Royal Champion in a dedicated compartment
- Giga Inferno covering the Town Hall perimeter

### 2. The Hybrid Protection Layout

Balances resource protection with trophy maintenance. Ideal for players who need both without sacrificing either.

**Key features:**
- Centralized DE with semi-centralized Town Hall
- All three elixir storages accessible only through heavy defenses
- Anti-hog sections with double giant bombs
- Air sweepers covering anti-balloonion approaches

## How to Use This Farming Base

1. Download the base link and apply to your village
2. Keep collectors and mines outside to lure ground attacks away from storages
3. Fill CC with defensive troops (Witch + Valkyrie works well)
4. Update Giga Inferno as soon as upgrade completes
5. Check logs after each attack to identify weak points

## Resource Protection Priority

Always protect in this order:
1. Dark elixir (hardest to farm, most valuable)
2. Builder elixir (for BH upgrades)
3. Regular elixir
4. Gold

## Tips for Maximum Loot Protection

- Keep Town Hall in the base — losing it to a shield costs more than the base drop
- Build walls to level 12+ before focusing on defenses
- Use Builder Base earnings to supplement main village upgrades
- Log on twice daily to spend excess loot below raid cap

## About This Guide

These farming designs were optimized for the TH13 environment and tested across thousands of attacks by the ClashLayoutsHub community.

## Frequently Asked Questions

**Q: Should I keep my TH outside for a shield?**
A: At TH13, the Town Hall shield is rarely worth it. Keep it inside for defensive value.

**Q: What's the biggest threat to TH13 farming bases?**
A: Super Goblin + Sneaky Goblin raids are the most effective farming attack. Your base should have clustered storages behind walls.

**Q: How do I protect dark elixir at TH13?**
A: Place it in the very center with at least 2 layers of walls, surrounded by your highest-DPS defenses.

**Q: Is a hybrid base better than a pure farming base?**
A: Hybrid bases are generally recommended unless you're in a dedicated loot phase.

**Q: Can I use these bases at TH12?**
A: The designs are optimized for TH13 buildings. TH12 players should use TH12-specific layouts.
`,
  'best-th15-trophy-base-2026': `
## Reaching Legend League with TH15

Town Hall 15 is the current meta pinnacle, featuring the powerful Monolith and Spell Tower. Trophy pushing requires a base that can consistently score 16+ cups per defense cycle.

## Best TH15 Trophy Base Designs

### 1. The Legend League Qualifier Base

Designed to deny 3-star attacks in the Champion to Legend push range. Uses the Monolith as a psychological centerpiece to deter careless attackers.

**Key features:**
- Monolith centrally placed with 360-degree wall coverage
- Spell Tower set to Rage for aggressive counter-spell
- Multi-target Infernos defending the southern lane
- Eagle Artillery positioned to cover all base segments

### 2. The 5000+ Cup Maintenance Base

Once in Legend League, the game becomes about limiting stars given. This base is designed to consistently hold at 1-star or 0-star defense.

**Key features:**
- Asymmetric design to confuse funneling
- Town Hall heavily compartmented with 4 wall layers
- Root Riders countered by spread Bomb Towers
- All heroes in separate protected compartments

## How to Use a TH15 Trophy Base

1. Apply the base link before pushing begins
2. Select appropriate Clan Castle troops (Super Witch recommended for Legend)
3. Set Inferno Towers to single-target above 5000 cups
4. Use Siege Machines in CC for additional surprise defense
5. Review replays and adjust weak compartments weekly

## Understanding the TH15 Attack Meta

The 2026 TH15 attack meta revolves around:
- **Root Rider Dragon Rider** — Requires spread defenses and Bomb Towers
- **Super Witch Smash** — Counter with tight compartments
- **Hybrid** — Anti-hog design with Giant Bombs and Infernos

## Tips for Trophy Pushing

- Stay active during your local off-peak hours for easier matchups
- Always have a maxed CC troop donation before Legend
- Practice your attack strategy to maintain offensive cups as well
- Use Book of Heroes during active push to keep heroes available

## About This Guide

This trophy pushing guide combines knowledge from multiple Legend League players and was validated against real 2026 war data.

## Frequently Asked Questions

**Q: What's the minimum defense level needed for Legend League at TH15?**
A: You can enter Legend with any defense level, but maxed or near-maxed defenses significantly improve defense rates.

**Q: Should I use single or multi-target Inferno Towers for trophy pushing?**
A: Single-target above 4500 cups; multi-target below for farming and hybrid defense.

**Q: How important is the Monolith placement?**
A: Critical — the Monolith should never be in a position where it can be isolated and taken down before engaging the main army.

**Q: What CC troops are best for Legend League defense?**
A: Super Witch + Ice Golem combination is highly effective in 2026 meta.

**Q: How many cups can I realistically hold per day in Legend?**
A: Expect to hold 40-60% of attacks on a well-designed base, netting you 8 attacks per day at 8 cups each.
`,
};

