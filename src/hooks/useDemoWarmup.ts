import { useEffect, useRef, useState, RefObject } from 'react';

export type DemoStatus = 'unknown' | 'checking' | 'warm' | 'cold';

const WARM_TIMEOUT_MS = 4000;

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
 * Silently pre-warms a Render free-tier demo the moment its project card
 * scrolls into view, and reports whether it answered fast enough to be
 * "warm" by the time a visitor is likely to click Launch.
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
    if (cached === 'warm') {
      setStatus('warm');
      return;
    }

    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !triggered.current) {
          triggered.current = true;
          warmUp(url, setStatus);
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

function warmUp(url: string, setStatus: (s: DemoStatus) => void) {
  setStatus('checking');
  sessionCache.set(url, 'checking');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WARM_TIMEOUT_MS);

  fetch(url, { mode: 'no-cors', cache: 'no-store', signal: controller.signal })
    .then(() => {
      clearTimeout(timer);
      sessionCache.set(url, 'warm');
      setStatus('warm');
    })
    .catch(() => {
      // Timed out, aborted, or genuinely unreachable. We deliberately don't
      // distinguish "still spinning up" from "actually broken" here — the
      // Launch link stays fully clickable either way, so the only cost of
      // treating both as "cold" is a slightly-too-cautious badge, never a
      // false claim that something is live when it isn't.
      clearTimeout(timer);
      sessionCache.set(url, 'cold');
      setStatus('cold');
    });
}
