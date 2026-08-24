import { useEffect, useRef, useState, RefObject } from 'react';

export type DemoStatus = 'unknown' | 'checking' | 'warm' | 'cold' | 'down';

const CHECK_TIMEOUT_MS = 10000;

// Per-tab-session cache so scrolling past a project card twice (or revisiting
// the Projects section) doesn't re-fire a warm-up ping that's already resolved.
const sessionCache = new Map<string, DemoStatus>();

function isColdStartRisk(url: string): boolean {
  // Only Render's free tier is known to spin down idle instances. Netlify/
  // Lovable-hosted demos are always-on static/edge deploys — no need to ping
  // them, and skipping them keeps the UI free of unnecessary badges.
  try {
    return new URL(url).hostname.endsWith('onrender.com');
  } catch {
    return false;
  }
}

/**
 * Silently checks a Render free-tier demo's real health the moment its
 * project card scrolls into view, via a same-origin serverless function
 * (see netlify/functions/demo-health.js) that can read the demo's actual
 * HTTP status — something a direct client-side fetch cannot do for a
 * cross-origin, non-CORS-enabled target (a `no-cors` fetch reports "it
 * responded" identically for a 200 and a 500, which used to make a demo
 * that's actively erroring out show as falsely "Live").
 *
 * This never blocks or disables the Launch link — it only ever adds
 * information on top of the existing behavior. If the check errors, is
 * blocked, or the browser doesn't support IntersectionObserver, the status
 * simply stays 'unknown' and the UI falls back to exactly today's behavior.
 */
export function useDemoWarmup(url: string, elementRef: RefObject<Element>): DemoStatus {
  const coldStartRisk = isColdStartRisk(url);
  const [status, setStatus] = useState<DemoStatus>(() =>
    coldStartRisk ? sessionCache.get(url) ?? 'unknown' : 'warm'
  );
  const triggered = useRef(false);

  useEffect(() => {
    if (!coldStartRisk) return;
    const cached = sessionCache.get(url);
    if (cached === 'warm' || cached === 'down') {
      setStatus(cached);
      return;
    }

    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !triggered.current) {
          triggered.current = true;
          checkHealth(url, setStatus);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return status;
}

function checkHealth(url: string, setStatus: (s: DemoStatus) => void) {
  setStatus('checking');
  sessionCache.set(url, 'checking');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);

  fetch(`/.netlify/functions/demo-health?url=${encodeURIComponent(url)}`, {
    cache: 'no-store',
    signal: controller.signal,
  })
    .then((r) => r.json())
    .then((data: { ok: boolean; status: number; unreachable?: boolean }) => {
      clearTimeout(timer);
      // A real response with a 5xx status means the app itself is broken —
      // distinct from "still spinning up", which never gets far enough to
      // return a status at all (unreachable/timeout instead).
      const next: DemoStatus =
        data.ok ? 'warm' : data.unreachable ? 'cold' : 'down';
      sessionCache.set(url, next);
      setStatus(next);
    })
    .catch(() => {
      // The health-check function itself is unreachable (not deployed yet,
      // cold-starting, network hiccup for the visitor). Fail closed to the
      // pre-existing "cold" treatment rather than claiming anything false.
      clearTimeout(timer);
      sessionCache.set(url, 'cold');
      setStatus('cold');
    });
}
