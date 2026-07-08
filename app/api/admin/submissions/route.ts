import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const subs = await getSubmissions();
  return NextResponse.json(subs.slice().reverse()); // newest first
}
