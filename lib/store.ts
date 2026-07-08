import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

// Serverless-safe, best-effort submission log.
// Vercel's filesystem is read-only except for the OS temp dir, and that dir is
// ephemeral (cleared between cold starts), so this keeps the endpoints working
// without ever crashing. For durable storage, wire an email service or a hosted
// database (e.g. Vercel Postgres / Turso) into `saveSubmission`.
const FILE = join(tmpdir(), "grannys-daycare-submissions.json");

type Submission = { type: string; data: Record<string, unknown>; at: string };

export async function saveSubmission(
  type: string,
  data: Record<string, unknown>
): Promise<number> {
  let all: Submission[] = [];
  try {
    all = JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    /* first write, or the ephemeral temp file was cleared */
  }
  all.push({ type, data, at: new Date().toISOString() });
  try {
    await writeFile(FILE, JSON.stringify(all));
  } catch {
    /* best-effort only — never fail the request over storage */
  }
  // Surface the submission somewhere durable in serverless logs.
  console.log(`[${type}]`, JSON.stringify(data));
  return all.length;
}
