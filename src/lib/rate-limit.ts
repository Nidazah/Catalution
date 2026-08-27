// Lightweight in-process rate limiter for authentication endpoints.
// For multi-instance/serverless production deployments, use a shared store
// (for example Redis/Upstash) so limits apply across every instance.
type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

export function isRateLimited(
  key: string,
  maxAttempts: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;
  const bucket = buckets.get(key) ?? { timestamps: [] };

  bucket.timestamps = bucket.timestamps.filter((timestamp) => timestamp > cutoff);

  if (bucket.timestamps.length >= maxAttempts) {
    buckets.set(key, bucket);
    return true;
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);

  // Prevent an unbounded map when keys are continuously changing.
  if (buckets.size > 10000) {
    for (const [bucketKey, value] of buckets) {
      if (value.timestamps.every((timestamp) => timestamp <= cutoff)) {
        buckets.delete(bucketKey);
      }
    }
  }

  return false;
}
