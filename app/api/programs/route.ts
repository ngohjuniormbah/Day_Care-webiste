import { NextResponse } from "next/server";
import db from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = db.prepare("SELECT * FROM programs ORDER BY id").all() as any[];
  const programs = rows.map((p) => ({ ...p, features: JSON.parse(p.features || "[]") }));
  return NextResponse.json(programs);
}
