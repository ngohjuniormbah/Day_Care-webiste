// Lightweight admin gate. This is a simple shared-password login suitable for a
// small business site — set a strong ADMIN_PASSWORD env var in production.
// The token hash is pure JS so it works in both the Edge middleware and Node.

export const COOKIE = "gdc_admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "granny-admin-2026";

// djb2 hash — deterministic, no async crypto, identical on edge and node.
export function tokenFor(password: string): string {
  let h = 5381;
  const s = password + "::granny-daycare-salt";
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

export function expectedToken(): string {
  return tokenFor(ADMIN_PASSWORD);
}

export function isValidToken(token: string | undefined): boolean {
  return !!token && token === expectedToken();
}
