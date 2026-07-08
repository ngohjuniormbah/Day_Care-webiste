import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { defaultContent, type SiteContent } from "./content";

// ---------------------------------------------------------------------------
// Reads/writes the editable site content. Uses an in-memory cache as the source
// of truth within a running instance (so admin edits are instant across
// requests), backed by a best-effort JSON file on disk.
//
// - Local / self-hosted Node: persists to ./data/content.json (durable).
// - Serverless (Vercel): the project dir is read-only, so it falls back to the
//   OS temp dir. That is ephemeral (cleared on cold start), so for durable edits
//   in production, commit the exported JSON or wire a hosted store here.
// ---------------------------------------------------------------------------

const g = globalThis as unknown as { __gdc_content?: SiteContent };

function dataFile() {
  return join(process.cwd(), "data", "content.json");
}
function tmpFile() {
  return join(tmpdir(), "grannys-daycare-content.json");
}

function merge(stored: Partial<SiteContent>): SiteContent {
  // Shallow-merge each top-level key so new default fields survive old saves.
  return {
    banner: { ...defaultContent.banner, ...stored.banner },
    site: { ...defaultContent.site, ...stored.site },
    hero: { ...defaultContent.hero, ...stored.hero },
    plans: stored.plans ?? defaultContent.plans,
    programs: stored.programs ?? defaultContent.programs,
    testimonials: stored.testimonials ?? defaultContent.testimonials,
    faqs: stored.faqs ?? defaultContent.faqs,
  };
}

export async function getContent(): Promise<SiteContent> {
  if (g.__gdc_content) return g.__gdc_content;
  for (const f of [dataFile(), tmpFile()]) {
    try {
      const raw = await readFile(f, "utf8");
      g.__gdc_content = merge(JSON.parse(raw));
      return g.__gdc_content;
    } catch {
      /* try next location */
    }
  }
  g.__gdc_content = defaultContent;
  return g.__gdc_content;
}

export async function saveContent(next: SiteContent): Promise<{ persisted: boolean }> {
  g.__gdc_content = next;
  const body = JSON.stringify(next, null, 2);
  // Try the durable project dir first, then the temp dir.
  try {
    await mkdir(join(process.cwd(), "data"), { recursive: true });
    await writeFile(dataFile(), body);
    return { persisted: true };
  } catch {
    /* read-only FS — fall through */
  }
  try {
    await writeFile(tmpFile(), body);
    return { persisted: true };
  } catch {
    return { persisted: false };
  }
}

export async function resetContent(): Promise<void> {
  await saveContent(defaultContent);
}
