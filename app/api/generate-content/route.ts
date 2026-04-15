import { NextRequest, NextResponse } from 'next/server';

// ─── Persona pool ─────────────────────────────────────────────────────────────
const PERSONAS = [
  'a seasoned Clash of Clans war strategist with 8 years of competitive experience who writes with precision and authority',
  'a casual but highly skilled pro gamer who explains things in a direct, no-nonsense way with occasional dry humour',
  'a technical base architect who loves analysing defensive funnels, compartment theory, and trap placement in granular detail',
  'a content creator with a large CoC audience who writes engaging, punchy copy that gets straight to the point',
  'a former Legend League player who shares hard-won battlefield insights in a confident, first-person coaching tone',
];

// ─── Banned AI clichés ────────────────────────────────────────────────────────
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

// ─── Synonyms hint ────────────────────────────────────────────────────────────
const SYNONYM_HINT =
  'Vary your vocabulary: use synonyms for common words — ' +
  '"base" → fortress / layout / setup / design / configuration; ' +
  '"strategy" → approach / gameplan / tactic / method; ' +
  '"defense" → protection / defensive shell / warding off; ' +
  '"war" → clan war / conflict / battle. Do NOT repeat the same noun more than twice in a row.';

// ─── Structure randomiser ─────────────────────────────────────────────────────
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

// ─── System-level writing rules injected into every prompt ───────────────────
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

// ─── Default fallback prompts (used when no custom prompt is passed) ──────────
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

function buildBlogPrompt(title: string): string {
  return `${buildSystemPrefix()}Write a Clash of Clans blog post about: "${title}".

Return ONLY valid JSON — no markdown fences, no prose before or after, no extra keys:
{
  "title": "SEO-optimized title, max 65 characters",
  "slug": "url-friendly-lowercase-slug-with-dashes-only",
  "description": "compelling SEO meta description, maximum 155 characters — do not cut off mid-sentence",
  "author": "ClashLayoutsHub Team",
  "category": "choose the single best fit from EXACTLY these options: Strategy | Base Design | Attack Guide | Defense | Update",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "content": "Full blog post in Markdown, 750–1000 words.

STRUCTURE REQUIREMENTS — follow exactly:

1. START with a Table of Contents (use ## Table of Contents as the heading). List all main sections (## headings) as clickable links using the format: [Section Name](#section-name). Do NOT include the ToC itself in the list.

2. After the ToC, write your introduction and main content sections using ## for main sections and ### for sub-sections.

3. NEAR THE END (before FAQ), add a Pros & Cons section using ## Pros & Cons as the heading. Format as:
   - **Pros:** (3–5 bullet points with green checkmark emojis ✅)
   - **Cons:** (2–4 bullet points with red X emojis ❌)

4. End with FAQ section:
   ## Frequently Asked Questions

   **Q: question one?**
   A: answer one.

   **Q: question two?**
   A: answer two.

   **Q: question three?**
   A: answer three.

   **Q: question four?**
   A: answer four.

Use **bold** for key terms. Mix bullet and numbered lists. Keep paragraphs short (2–4 sentences max)."
}`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, level, category, title, prompt } = body as {
      type?: string;
      level?: number;
      category?: string;
      title?: string;
      prompt?: string;
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    // Custom prompts from forms are self-contained — use as-is to avoid double-persona conflict.
    // Built-in prompt builders include buildSystemPrefix() themselves.
    const contentPrompt = prompt
      ? prompt
      : type && level
        ? buildLayoutPrompt(type, level, category ?? 'war')
        : buildBlogPrompt(title ?? 'base building strategies');

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
      return NextResponse.json({ error: 'Gemini API error', details: errText }, { status: 502 });
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: 'No content generated' }, { status: 502 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      // 1. Strip markdown code fences (```json ... ``` or ``` ... ```)
      const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (fenceMatch) {
        try { parsed = JSON.parse(fenceMatch[1].trim()); } catch { /* fall through */ }
      }
      // 2. Extract outermost JSON object from prose
      if (!parsed) {
        const objMatch = text.match(/\{[\s\S]*\}/);
        if (objMatch) {
          try { parsed = JSON.parse(objMatch[0]); } catch { /* fall through */ }
        }
      }
      // 3. Last resort — surface raw text so the caller can see what happened
      if (!parsed) {
        parsed = { content: text };
      }
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
