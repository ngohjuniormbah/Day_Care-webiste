import { NextResponse } from "next/server";
import { getContent, saveContent, resetContent, deepMerge } from "@/lib/content-store";
import { defaultContent, type SiteContent } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContent());
}

export async function PUT(req: Request) {
  let body: SiteContent;
  try {
    body = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }
  // Merge onto defaults so a partial/malformed payload can't corrupt the shape.
  const next: SiteContent = deepMerge(defaultContent, body);
  const { persisted } = await saveContent(next);
  return NextResponse.json({ ok: true, persisted });
}

export async function DELETE() {
  await resetContent();
  return NextResponse.json({ ok: true });
}
