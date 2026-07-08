import { NextResponse } from "next/server";
import { programSeed } from "@/lib/programs";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(programSeed);
}
