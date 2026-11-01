import 'server-only';

/**
 * Limiteur de débit en mémoire, par clé (ex. IP). L'état est propre à chaque
 * instance serverless (non partagé) : c'est une défense en profondeur, pas une
 * garantie globale.
 */

/** IP cliente (Cloudflare puis proxy standard). */
export function getClientIp(request: Request): string {
  const fwd =
    request.headers.get('CF-Connecting-IP') ?? request.headers.get('x-forwarded-for') ?? '';
  return fwd.split(',')[0]?.trim() || 'unknown';
}

/** Crée un limiteur : au plus `max` appels par `windowMs` et par clé. */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function rateLimited(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      return true;
    }
    recent.push(now);
    hits.set(key, recent);
    return false;
  };
}
