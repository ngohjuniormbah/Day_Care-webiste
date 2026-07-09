import { NextResponse } from "next/server";
import { getContent } from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { program } = await getContent();
  return NextResponse.json(program.programs);
}
