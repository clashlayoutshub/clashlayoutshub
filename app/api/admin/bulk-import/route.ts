import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// ─── Persona pool (same as generate-content) ───────────────────────────────────
const PERSONAS = [
  'a seasoned Clash of Clans war strategist with 8 years of competitive experience who writes with precision and authority',
  'a casual but highly skilled pro gamer who explains things in a direct, no-nonsense way with occasional dry humour',
  'a technical base architect who loves analysing defensive funnels, compartment theory, and trap placement in granular detail',
  'a content creator with a large CoC audience who writes engaging, punchy copy that gets straight to the point',
  'a former Legend League player who shares hard-won battlefield insights in a confident, first-person coaching tone',
];

const BANNED_PHRASES = [
  'In the ever-evolving world of',
  'Unlock the potential',
  'Master the art of',
  'In this comprehensive guide',
  'Look no further',
  'without further ado',
  'it goes without saying',
  'game-changing',
  'cutting-edge',
  'take your gameplay to the next level',
  'elevate your strategy',
  'dive deep into',
  'In conclusion,',
  'To summarize,',
  'At the end of the day,',
  'It is worth noting that',
  'Needless to say',
];

const SYNONYM_HINT =
  'Vary your vocabulary: use synonyms for common words — ' +
  '"base" → fortress / layout / setup / design / configuration; ' +
  '"strategy" → approach / gameplan / tactic / method; ' +
  '"defense" → protection / defensive shell / warding off; ' +
  '"war" → clan war / conflict / battle. Do NOT repeat the same noun more than twice in a row.';

const STRUCTURE_HINTS = [
  'Open with a direct, punchy strategy tip — no preamble.',
  'Open with a short hook (1–2 sentences) that immediately names the biggest threat this base counters.',
  'Open with a bold claim about why this is one of the strongest designs for its TH level right now.',
  'Open mid-action: describe a typical attack scenario this base crushes before explaining why it works.',
  'Open with a quick bullet summary of the top 3 reasons players choose this setup, then explain each.',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildSystemPrefix(): string {
  return `You are ${pick(PERSONAS)}.

WRITING RULES — follow every rule exactly:
1. BANNED PHRASES — never use any of these (not even paraphrased): ${BANNED_PHRASES.map(p => `"${p}"`).join(', ')}.
2. SYNONYM VARIETY — ${SYNONYM_HINT}
3. STRUCTURE — ${pick(STRUCTURE_HINTS)}
4. MARKDOWN VARIETY — Mix heading levels (## and ###) and occasionally use numbered lists instead of bullets. Do not use the same heading level for every section. Keep paragraphs short (2–4 sentences max).
5. HUMAN TONE — Write as if talking to a fellow player, not as a corporate content tool. Contractions are fine. Avoid passive voice.
6. SEO — Naturally work in the primary keyword (TH level + category + "base") in the first 40 words and at least twice more — never keyword-stuff.
7. UNIQUENESS — Every piece must read differently from any other. Vary sentence length: mix short punchy sentences with longer analytical ones.

`;
}

function buildLayoutPrompt(type: string, level: number, category: string): string {
  return `${buildSystemPrefix()}Generate content for a Clash of Clans ${type === 'th' ? 'Town Hall' : 'Builder Hall'} ${level} ${category} base layout.

Return ONLY valid JSON with these exact fields:
{
  "title": "keyword-rich title, max 60 chars",
  "description": "meta description, max 155 chars",
  "keyFeatures": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5"],
  "howToUse": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "tips": ["tip 1", "tip 2", "tip 3"],
  "about": "2–3 sentence paragraph about this base design",
  "faq": [
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."}
  ],
  "tags": ["tag1", "tag2", "tag3"]
}`;
}

// ─── CSV Parser ───────────────────────────────────────────────────────────────
function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
  const rows: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length !== headers.length) continue;

    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    rows.push(row);
  }

  return rows;
}

// ─── AI Content Generation ─────────────────────────────────────────────────────
async function generateAIContent(type: string, level: number, category: string): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const contentPrompt = buildLayoutPrompt(type, level, category);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: contentPrompt }] }],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error: ${errText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('No content generated');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      try { parsed = JSON.parse(fenceMatch[1].trim()); } catch { /* fall through */ }
    }
    if (!parsed) {
      const objMatch = text.match(/\{[\s\S]*\}/);
      if (objMatch) {
        try { parsed = JSON.parse(objMatch[0]); } catch { /* fall through */ }
      }
    }
    if (!parsed) {
      parsed = { content: text };
    }
  }

  return parsed;
}

// ─── Batch Save to Supabase ───────────────────────────────────────────────────
async function saveLayoutToSupabase(layoutData: any): Promise<string> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('layouts')
    .insert({
      title: layoutData.title,
      description: layoutData.description,
      level: layoutData.level,
      type: layoutData.type,
      category: layoutData.category,
      image: layoutData.image || '',
      base_link: layoutData.base_link || '',
      key_features: layoutData.keyFeatures || [],
      how_to_use: layoutData.howToUse || [],
      tips: layoutData.tips || [],
      about: layoutData.about || '',
      faq: layoutData.faq || [],
      tags: layoutData.tags || [],
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  return data.id;
}

// ─── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { csv } = body as { csv: string };

    if (!csv) {
      return NextResponse.json({ error: 'CSV data is required' }, { status: 400 });
    }

    const rows = parseCSV(csv);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'No valid data found in CSV' }, { status: 400 });
    }

    const results = {
      total: rows.length,
      processed: 0,
      successful: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const row of rows) {
      results.processed++;

      try {
        // Validate required fields
        const type = row.type || 'th';
        const level = parseInt(row.level || row.townhall || row.builderhall);
        const category = row.category || 'war';
        const baseLink = row.baselink || row.link || '';

        if (!level || isNaN(level)) {
          throw new Error('Invalid level');
        }

        // Generate AI content
        const aiContent = await generateAIContent(type, level, category);

        // Save to Supabase
        const layoutData = {
          title: aiContent.title || `${type.toUpperCase()}${level} ${category} base`,
          description: aiContent.description || '',
          level,
          type,
          category,
          image: row.image || row.imageurl || '',
          base_link: baseLink,
          keyFeatures: aiContent.keyFeatures || [],
          howToUse: aiContent.howToUse || [],
          tips: aiContent.tips || [],
          about: aiContent.about || '',
          faq: aiContent.faq || [],
          tags: aiContent.tags || [],
        };

        await saveLayoutToSupabase(layoutData);
        results.successful++;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        results.failed++;
        results.errors.push(`Row ${results.processed}: ${message}`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
