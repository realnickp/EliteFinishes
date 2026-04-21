// Shared in-memory rate limiter (best-effort: per function instance).
// At ~500+ users migrate to Upstash Redis.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function consume(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = buckets.get(key);
  if (!record || now > record.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}

export function getClientIp(request: { headers: Headers }): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
